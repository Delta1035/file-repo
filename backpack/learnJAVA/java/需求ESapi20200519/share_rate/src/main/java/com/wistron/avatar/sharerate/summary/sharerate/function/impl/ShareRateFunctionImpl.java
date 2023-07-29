package com.wistron.avatar.sharerate.summary.sharerate.function.impl;

import com.wistron.avatar.sharerate.ApplicationContextProvider;
import com.wistron.avatar.sharerate.common.util.FormatConvertUtils;
import com.wistron.avatar.sharerate.common.util.LogstashUtil;
import com.wistron.avatar.sharerate.common.vo.AvatarResponse;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.ActualGrtVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.AltGroupVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveSettingVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveShareRateVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.NewShareRateVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.repository.ActualGrtRepository;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.repository.AltGroupRepository;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.repository.IneffectiveSettingRepository;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.repository.NewShareRateRepository;
import com.wistron.avatar.sharerate.summary.sharerate.dao.ShareRateDao;
import com.wistron.avatar.sharerate.summary.sharerate.function.ShareRateFunction;
import com.wistron.avatar.sharerate.summary.sharerate.vo.*;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class ShareRateFunctionImpl implements ShareRateFunction {
    private final Logger logger = LoggerFactory.getLogger(ShareRateFunctionImpl.class);
    private final FormatConvertUtils formateUtils = new FormatConvertUtils();
    private final AltGroupRepository altRepository = ApplicationContextProvider.getBean(AltGroupRepository.class);
    private final ActualGrtRepository actualGrtRepository =
            ApplicationContextProvider.getBean(ActualGrtRepository.class);
    private final NewShareRateRepository newShareRateRepository =
            ApplicationContextProvider.getBean(NewShareRateRepository.class);
    private final IneffectiveSettingRepository ineffectiveSettingRepository =
            ApplicationContextProvider.getBean(IneffectiveSettingRepository.class);
    private final ShareRateDao shareRateDao = new ShareRateDao();
    final SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
    final SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    private static final String LOG_MESSAGE = "genShareRate.run -";
    private static final String LOG_MESSAGE2 = " Diff: ";

    String batchId = sdf2.format(new Date());

    public ShareRateFunctionImpl(){
        //construct
    }

    @Override
    public AvatarResponse genShareRateResult(QueryVO queryVO) {
        String step = "";
        AvatarResponse resp = new AvatarResponse();
        try {
            long reduceDate;
            List<String> plants = queryVO.getPlant();

            if (Integer.parseInt(queryVO.getDateFrom()) <= Integer.parseInt(queryVO.getDateTo())) {//判断时间格式是否合法
                for (String plant : plants) {//遍历所有plant
                    reduceDate = Long.parseLong(queryVO.getDateFrom());
                    while (reduceDate <= Integer.parseInt(queryVO.getDateTo())) { //判断循环次数
                        Date targetDate = new Date();
                        targetDate.setTime(targetDate.getTime() + (reduceDate * 24 * 60 * 60 * 1000));
                        String date = sdf1.format(targetDate);
                        reduceDate = reduceDate + 1;
                        Date startDate;
                        int stepSeq = 0;

                        stepSeq++;
                        step = "[" + stepSeq + "]. getAltGroupVOPn";
                        //抓到AltGroupVO的pn  对应api4-1
                        List<AltGroupVO> altGroupVOList = this.getAltGroupVOList(plant, date);
                        //如果当前date下altGroupVOList是空则直接结束当前循环
                        if (CollectionUtils.isEmpty(altGroupVOList)) {
                            continue;
                        }

                        List<String> pnList = new ArrayList<>();
                        //pn去重
                        if (CollectionUtils.isNotEmpty(altGroupVOList)) {
                            pnList =
                                    altGroupVOList.stream().map(AltGroupVO::getComponent).distinct().collect(Collectors.toList());
                        }
                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getsLocMap";
                        //抓到所有的StorageLocationVo
                        Map<String, StorageLocationVO> getsLocMap = this.getsLocMap(plant);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getLocationList";
                        //過濾出MRPArea=plant，NetableFlag=Y的資料location
                        List<String> locationList = this.getLocationList(plant, getsLocMap);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getTransactionVOList";

                        //抓取es.material_transaction的enrtyQty的合
                        List<MaterialTransactionVO> transactionVOList = this.getTransactionVOList(plant, date, pnList,
                                locationList);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. deleteOldData";
                        //刪掉data_engine_share_rate_pn_actual_grt舊的資料
                        this.deleteOldData(plant, date);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. saveActualGrt";
                        //將得到的新的資料insert到data_engine_share_rate_pn_actual_grt
                        List<ActualGrtVO> actualGrtVOList = this.getActualGtrVo(transactionVOList);
                        actualGrtRepository.saveAll(actualGrtVOList);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getShareRateList";
                        //抓到該plant下所有的舊資料
                        List<NewShareRateVO> newShareRateList = this.getNewShareRateList(plant);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        //刪掉data_engine_share_rate_result这个plant下上一版舊的資料
                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. deleteDataFromShareResult";
                        this.deleteDataFromNewShareResult(plant);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getShareRateValidGroup";
                        //將altGroupVO去碰撞舊的ShareRate資料
                        if (CollectionUtils.isNotEmpty(newShareRateList)) {
                            //用當前date抓到的altGroupVO去碰撞舊的ShareRate資料
                            newShareRateList = this.getNewShareRateValidGroup(newShareRateList, altGroupVOList);
                        } else {
                            //將altGroupVOList轉為shareRateList
                            newShareRateList = this.getNewShareRateValidGroup(altGroupVOList);
                        }
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getMaterialMaster";
                        //獲取物料主檔的資料
                        List<String> componentList =
                                newShareRateList.stream().map(NewShareRateVO::getComponent).collect(Collectors.toList());
                        Map<String, MaramarcVO> maramarcMap = this.getMaterialMaster(plant, componentList);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. getActualGtrVoByPlant";
                        //抓到該廠所有的actualGrt
                        actualGrtVOList = this.getActualGtrVoByPlant(plant);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        startDate = new Date();
                        stepSeq++;
                        step = "[" + stepSeq + "]. setShareRateVOList";
                        //填充shareRateVOList剩下的欄位
                        List<NewShareRateVO> shareRateVOList = this.setShareRateVOList(newShareRateList, actualGrtVOList,
                                maramarcMap);
                        logger.info(LOG_MESSAGE + plant + "-" + step + LOG_MESSAGE2 + formateUtils.getDiffSec(startDate, new Date()));

                        //將整理好的shareRateVOList insert到DB
                        stepSeq++;
                        step = "[" + stepSeq + "]. saveShareRateVOList";


                        List<IneffectiveShareRateVO> ivoList = new ArrayList<>();
                        List<NewShareRateVO> nvoList = new ArrayList<>();
                        Map<String, IneffectiveSettingVO> settingMap = new HashMap<>();
                        //遍历ineffectiveSetting表，取出所有的plant对应时间
                        List<IneffectiveSettingVO> settings = ineffectiveSettingRepository.findAll();
                        for (IneffectiveSettingVO setting : settings) {
                            settingMap.put(setting.getPlant(), setting);
                        }
                        //遍历shareRateVOList
                        for (NewShareRateVO shareRateVO : shareRateVOList) {
                            String nplant = shareRateVO.getPlant();
                            //若data_engine_share_rate_setting沒資料，就不做備份
                            IneffectiveSettingVO setting = settingMap.get(nplant);
                            if (setting != null) {
                                long pastDueDayToArchive = Long.parseLong(setting.getPastDueDayToArchive());
                                String nDate = sdf1.format(new Date());
                                String pDate = shareRateVO.getIneffectiveDate();
                                long realPastDay = this.calDateDiffence(pDate, nDate);

                                if ("N".equals(shareRateVO.getEffectiveFlag()) && (realPastDay > pastDueDayToArchive)) {
                                    IneffectiveShareRateVO ineffectiveShareRateVO = ShareRateFunctionImpl.changeNvoToIvo(shareRateVO);
                                    ineffectiveShareRateVO.setBatchid(batchId);
                                    ivoList.add(ineffectiveShareRateVO);
                                } else {
                                    shareRateVO.setBatchid(batchId);
                                    nvoList.add(shareRateVO);
                                }
                            } else {
                                shareRateVO.setBatchid(batchId);
                                nvoList.add(shareRateVO);
                            }
                        }
                        //判断list是否非空并批量插入数据库
                        if (!ivoList.isEmpty()) {
                            shareRateDao.batchInsertIneffectiveShareRate(ivoList);
                        }
                        if (!nvoList.isEmpty()) {
                            shareRateDao.batchInsertNewShareRate(nvoList);
                        }
                    }
                }
            }
            resp.setResult("0000000");
            resp.setMessage("ok");
        }catch (Exception e){
            LogstashUtil.writeErrorLog(step,e);
        }
            return resp;
    }


    private List<AltGroupVO> getAltGroupVOList(String plant, String date) {
        return altRepository.findAllByPlantAndVersionDate(plant, date);
    }

    public List<NewShareRateVO> getNewShareRateList(String plant) {
        return newShareRateRepository.findAllByPlant(plant);
    }

    private Map<String, StorageLocationVO> getsLocMap(String plant){
        Map<String, StorageLocationVO> returnMap = new HashMap<>();

        //Get sap_img_storage_locations by Plant
        List<SapImgStorageLocationsVo> imgStorageLocationsVoList = shareRateDao.queryImgStoreLocation(plant);

        //Get sap_img_mrp_area_storage_location by plant
        List<SapImgMrpAreaStorageLocationVo> imgMrpAreaStorageLocationVoList =
                shareRateDao.queryImgMrpAreaStoreLocation(plant);
        Map<String, String> imgMrpAreaMap =
                imgMrpAreaStorageLocationVoList.stream().collect(Collectors.toMap(SapImgMrpAreaStorageLocationVo::getLgort, SapImgMrpAreaStorageLocationVo::getBerid));

        //Set returnMap, Key = location, value = StorageLocationVo
        for (SapImgStorageLocationsVo vo : imgStorageLocationsVoList) {
            String location = vo.getLgort();

            StorageLocationVO storageLocationVo = new StorageLocationVO();
            storageLocationVo.setMrpArea((null == imgMrpAreaMap.get(location)) ? plant : imgMrpAreaMap.get(location));
            storageLocationVo.setNettableFlag("1".equalsIgnoreCase(vo.getDiskz()) ? "N" : "Y");

            returnMap.put(location, storageLocationVo);
        }
        return returnMap;
    }

    private List<String> getLocationList(String plant, Map<String, StorageLocationVO> getsLocMap) {
        List<String> locationList = new ArrayList<>();
        for (String location : getsLocMap.keySet()) {
            StorageLocationVO storageLocationVo = getsLocMap.get(location);
            if (StringUtils.equals(plant, storageLocationVo.getMrpArea()) && "Y".equals(storageLocationVo.getNettableFlag())) {
                locationList.add(location);
            }
        }

        return locationList;
    }

    private List<MaterialTransactionVO> getTransactionVOList(String plant, String date, List<String> pnList,
                                                             List<String> locationList){
        List<MaterialTransactionVO> result = new ArrayList<>();
        List<String> partNumList = new ArrayList<>();
        List<MaterialTransactionVO> transactionVOList = shareRateDao.getMaterialTransaction(plant, date, pnList,
                locationList);

        Map<String, List<MaterialTransactionVO>> map = transactionVOList.stream()
                .collect(Collectors.groupingBy(MaterialTransactionVO::getPartNum));
        for (MaterialTransactionVO transactionVO : transactionVOList) {
            String partNum = transactionVO.getPartNum();
            if (!partNumList.contains(partNum)) {
                double accQty = 0.0;
                for (MaterialTransactionVO vo : map.get(partNum)) {
                    if (StringUtils.isNotEmpty(String.valueOf(vo.getEnrtyQty()))) {
                        if ("102".equals(vo.getMovementType())) {
                            accQty = accQty - vo.getEnrtyQty();
                        } else {
                            accQty = accQty + vo.getEnrtyQty();
                        }
                    }
                }
                MaterialTransactionVO resultVO = new MaterialTransactionVO();
                resultVO.setPlant(plant);
                resultVO.setPartNum(transactionVO.getPartNum());
                resultVO.setEntryDate(date);
                resultVO.setEnrtyQty(accQty);
                result.add(resultVO);

                partNumList.add(partNum);
            }
        }

        return result;
    }

    private void deleteOldData(String plant, String date) {
        actualGrtRepository.deleteByPlantAndReceivingDate(plant, date);
    }

    private List<ActualGrtVO> getActualGtrVo(List<MaterialTransactionVO> transactionVOList) {
        List<ActualGrtVO> actualGrtVOList = new ArrayList<>();
        for (MaterialTransactionVO vo : transactionVOList) {
            ActualGrtVO actualGrtVO = new ActualGrtVO();
            actualGrtVO.setPlant(vo.getPlant());
            actualGrtVO.setReceivingDate(vo.getEntryDate());
            actualGrtVO.setComponent(vo.getPartNum());
            actualGrtVO.setAcc_qty(vo.getEnrtyQty());

            actualGrtVOList.add(actualGrtVO);
        }

        return actualGrtVOList;
    }

    private List<ActualGrtVO> getActualGtrVoByPlant(String plant) {
        return actualGrtRepository.findAllByPlant(plant);
    }

    private List<NewShareRateVO> getNewShareRateValidGroup(List<AltGroupVO> altGroupVoList) {
        List<NewShareRateVO> shareRateVOList = new ArrayList<>();
        for (AltGroupVO altGroupVO : altGroupVoList) {
            NewShareRateVO newShareVo = new NewShareRateVO();
            newShareVo.setEffectiveDate(altGroupVO.getVersionDate());
            newShareVo.setIneffectiveDate(altGroupVO.getVersionDate());
            newShareVo.setUniqueGroupId(altGroupVO.getVersion() + "_" + altGroupVO.getGroupId());
            newShareVo.setReplacedGroupId(altGroupVO.getVersion() + "_" + altGroupVO.getGroupId());
            newShareVo.setComponent(altGroupVO.getComponent());
            newShareVo.setTargetRate("null".equals(String.valueOf(altGroupVO.getTargetRate()))?0:altGroupVO.getTargetRate());
            newShareVo.setEffectiveFlag("Y");
            newShareVo.setPlant(altGroupVO.getPlant());
            newShareVo.setSourcerCode(altGroupVO.getSourcerCode());
            newShareVo.setSourcerName(altGroupVO.getSourcerName());
            newShareVo.setBuyerCode(altGroupVO.getBuyerCode());
            newShareVo.setBuyerName(altGroupVO.getBuyerName());
            newShareVo.setLastMrpOnhand("null".equals(String.valueOf(altGroupVO.getOnhand()))?0:altGroupVO.getOnhand());
            newShareVo.setLastMrpDate(altGroupVO.getMrpDate()==null?null:sdf1.format(altGroupVO.getMrpDate()));
            newShareVo.setBatchid(batchId);

            shareRateVOList.add(newShareVo);
        }
        return shareRateVOList;
    }

    private Map<String, MaramarcVO> getMaterialMaster(String plant, List<String> componentList){
        Map<String, MaramarcVO> maramarcMap = new HashMap<>();
        List<MaramarcVO> maramarcVOList = shareRateDao.getMaterialMaster(plant, componentList);
        for (MaramarcVO maramarcVO : maramarcVOList) {
            maramarcMap.put(maramarcVO.getMatnr(), maramarcVO);
        }

        return maramarcMap;
    }

    private List<NewShareRateVO> setShareRateVOList(List<NewShareRateVO> shareRateList, List<ActualGrtVO> actualGrtVOList,
                                                 Map<String, MaramarcVO> maramarcMap) throws Exception {
        List<NewShareRateVO> result = new ArrayList<>();

        Map<String, List<ActualGrtVO>> actualMap = actualGrtVOList.stream()
                .collect(Collectors.groupingBy(ActualGrtVO::getComponent));

        //set maramarc
        this.setMaramacr(shareRateList, maramarcMap);
        //set actualQty
        this.setActualQty(shareRateList, actualMap);

        Map<String, List<NewShareRateVO>> mapByGroup = shareRateList.stream()
                .collect(Collectors.groupingBy(NewShareRateVO::getUniqueGroupId));

        for (String groupId : mapByGroup.keySet()) {
            List<NewShareRateVO> shareRateVOList = mapByGroup.get(groupId);
            this.setQtyAndRate(shareRateVOList);

            double priorityDiff = 0.0;
            double priorityHit = 0.0;

            List<NewShareRateVO> allList = new ArrayList<>();
            List<NewShareRateVO> allHitList = new ArrayList<>();
            List<NewShareRateVO> priorityDiffList = new ArrayList<>();
            List<NewShareRateVO> priorityHitList;
            List<NewShareRateVO> shareRateHitList;

            //挑出target_rate=0 & a.onhand <>0
            for (int i=shareRateVOList.size()-1;i>=0;i--) {
                double onhand =  shareRateVOList.get(i).getLastMrpOnhand();
                double targetRate = shareRateVOList.get(i).getTargetRate();
                if (targetRate == 0 && onhand != 0){
                    priorityDiffList.add(shareRateVOList.get(i));
                    shareRateVOList.remove(i);
                }
            }


            //diffRate優先排序
            priorityDiffList= priorityDiffList.stream().sorted(Comparator.comparing(NewShareRateVO::getDiffRate)
                            .thenComparing(NewShareRateVO::getTargetRate, Comparator.reverseOrder()).thenComparing(NewShareRateVO::getComponent))
                            .collect(Collectors.toList());
            //diffRate非優先排序
            shareRateVOList = shareRateVOList.stream().sorted(Comparator.comparing(NewShareRateVO::getDiffRate)
                            .thenComparing(NewShareRateVO::getTargetRate, Comparator.reverseOrder()).thenComparing(NewShareRateVO::getComponent))
                            .collect(Collectors.toList());

            //依序合併
            allList.addAll(priorityDiffList);
            allList.addAll(shareRateVOList);

            //priorityDiff給予排序數字
            for (NewShareRateVO vo : allList) {
                priorityDiff = priorityDiff + 1;
                vo.setPriorityDiff(priorityDiff);
            }

            //hitRate優先排序
            priorityHitList= priorityDiffList.stream().sorted(Comparator.comparing(NewShareRateVO::getHitRate)
                            .thenComparing(NewShareRateVO::getTargetRate, Comparator.reverseOrder()).thenComparing(NewShareRateVO::getComponent))
                            .collect(Collectors.toList());
            //diffRate非優先排序
            shareRateHitList = shareRateVOList.stream().sorted(Comparator.comparing(NewShareRateVO::getHitRate)
                            .thenComparing(NewShareRateVO::getTargetRate, Comparator.reverseOrder()).thenComparing(NewShareRateVO::getComponent))
                            .collect(Collectors.toList());

            //依序合併
            allHitList.addAll(priorityHitList);
            allHitList.addAll(shareRateHitList);

            Map<String, Double> sortMap = allList.stream()
                    .collect(Collectors.toMap(NewShareRateVO::getComponent, NewShareRateVO::getPriorityDiff));

            //給予排序數字
            for (int i = 0 ; i < allHitList.size() ; i ++) {
                priorityHit = priorityHit + 1;
                int sort = (int) Math.round((sortMap.get(allHitList.get(i).getComponent()) -1));
                allList.get(sort).setPriorityHit(priorityHit);
            }

            result.addAll(allList);

        }

        //set std_price
        this.setStdPrice(shareRateList);

        return result;
    }

    private void setActualQty(List<NewShareRateVO> shareRateList, Map<String, List<ActualGrtVO>> actualMap) throws ParseException {
        for (NewShareRateVO newShareRateVO : shareRateList) {
            double actualQty = 0.0;
            long effectiveTime = sdf1.parse(newShareRateVO.getEffectiveDate()).getTime();
            long ineffectiveTime = sdf1.parse(newShareRateVO.getIneffectiveDate()).getTime();
            long day = (ineffectiveTime - effectiveTime) / (1000L * 3600L * 24L) + 1;
            newShareRateVO.setEffectiveDuration((double) day);

            List<ActualGrtVO> actualGrtVOList = actualMap.get(newShareRateVO.getComponent());
            //set該pn在生效期內所有actualQty的和
            if (CollectionUtils.isNotEmpty(actualGrtVOList)) {
                for (ActualGrtVO grtVO : actualGrtVOList) {
                    if (Integer.parseInt(newShareRateVO.getEffectiveDate()) <= Integer.parseInt(grtVO.getReceivingDate()) &&
                            Integer.parseInt(grtVO.getReceivingDate()) <= Integer.parseInt(newShareRateVO.getIneffectiveDate())) {
                        actualQty = actualQty + grtVO.getAcc_qty();
                    }
                }
            }

            if (actualQty <= 0) {
                newShareRateVO.setActualQty(0.0);
            } else {
                newShareRateVO.setActualQty(actualQty);
            }
        }
    }

    private void setNewShareRateByGroupGtr(NewShareRateVO newShareVo, AltGroupVO groupVO) {
        newShareVo.setEffectiveDate(groupVO.getVersionDate());
        newShareVo.setIneffectiveDate(groupVO.getVersionDate());
        newShareVo.setComponent(groupVO.getComponent());
        newShareVo.setTargetRate("null".equals(String.valueOf(groupVO.getTargetRate()))?0:groupVO.getTargetRate());
        newShareVo.setEffectiveFlag("Y");
        newShareVo.setPlant(groupVO.getPlant());
        newShareVo.setSourcerCode(groupVO.getSourcerCode());
        newShareVo.setSourcerName(groupVO.getSourcerName());
        newShareVo.setBuyerCode(groupVO.getBuyerCode());
        newShareVo.setBuyerName(groupVO.getBuyerName());
        newShareVo.setLastMrpOnhand("null".equals(String.valueOf(groupVO.getOnhand()))?0:groupVO.getOnhand());
        newShareVo.setLastMrpDate(groupVO.getMrpDate() == null ? "" : sdf1.format(groupVO.getMrpDate()));
        newShareVo.setBatchid(batchId);
    }

    private void setMaramacr(List<NewShareRateVO> shareRateList, Map<String, MaramarcVO> maramarcMap) {
        for (NewShareRateVO newShareRateVO : shareRateList) {
            MaramarcVO maramarcVo = maramarcMap.get(newShareRateVO.getComponent());
            if (null != maramarcVo) {
                newShareRateVO.setComponentDescription(maramarcVo.getMaktx());
                newShareRateVO.setMaterialCategory(maramarcVo.getZzcate());
                newShareRateVO.setComponentType1(maramarcVo.getZzcontyp1());
                newShareRateVO.setComponentType2(maramarcVo.getZzcontyp2());
                newShareRateVO.setSupplyType(maramarcVo.getZzbsar());
                newShareRateVO.setServiceMode(maramarcVo.getZzsermode());
            }
        }
    }

    private void setQtyAndRate(List<NewShareRateVO> shareRateVOList) {
        double countActualQty = 0.0;
        for (NewShareRateVO vo : shareRateVOList) {
            double actualQty = vo.getActualQty();
            actualQty = Math.round(actualQty);
            vo.setActualQty(actualQty);
            countActualQty = countActualQty + actualQty;
        }

        for (NewShareRateVO vo : shareRateVOList) {
            double targetQty = countActualQty * (vo.getTargetRate() / 100);
            targetQty = Math.round(targetQty);

            vo.setTargetQty(targetQty);

            if (vo.getActualQty() == 0 || countActualQty == 0) {
                vo.setActualRate(0.0);
            } else {
                String actualRate = new DecimalFormat("#.00").format((vo.getActualQty() / countActualQty) * 100);
                vo.setActualRate(Double.parseDouble(actualRate));
            }

            if (vo.getTargetRate() == 0 && vo.getActualRate() == 0) {
                vo.setHitRate(100.0);
            } else if (vo.getTargetRate() == 0 || vo.getActualRate() == 0) {
                vo.setHitRate(0.0);
            } else {
                String hitRate = new DecimalFormat("#.00").format((vo.getActualRate() / vo.getTargetRate()) * 100);
                vo.setHitRate(Double.parseDouble(hitRate));
            }

            if (vo.getActualRate() - vo.getTargetRate() == 0) {
                vo.setDiffRate(0.0);
            } else {
                String diffRate = new DecimalFormat("#.00").format(vo.getActualRate() - vo.getTargetRate());
                vo.setDiffRate(Double.parseDouble(diffRate));
            }

            if (vo.getActualQty() - vo.getTargetQty() == 0) {
                vo.setDiffQty(0.0);
            } else {
                String diffQty = new DecimalFormat("#.00").format(vo.getActualQty() - vo.getTargetQty());
                vo.setDiffQty(Double.parseDouble(diffQty));
            }

        }
    }

    private List<NewShareRateVO> getNewShareRateValidGroup(List<NewShareRateVO> newShareRateList,
                                                     List<AltGroupVO> altGroupVoList) {
        List<NewShareRateVO> newShareRateResultList = new ArrayList<>();
        List<NewShareRateVO> filterNewShareRate;

        //過濾出有效的shareRateVo 判断当前shareratevo的Effective_flag，如果是Y则有效，为N则无效
        List<NewShareRateVO> shareRateVoByEffective =
                newShareRateList.stream().filter(s -> StringUtils.equals("Y", s.getEffectiveFlag())).collect(Collectors.toList());

        //過濾出無效的shareRateVo
        List<NewShareRateVO> shareRateVoByInvalid =
                newShareRateList.stream().filter(s -> StringUtils.equals("N", s.getEffectiveFlag())).collect(Collectors.toList());

        newShareRateResultList.addAll(shareRateVoByInvalid);
        //將shareRateVOList轉為map，key是每個group的所有pn拼接，value是每個group的所有ShareRateVO
        Map<String, List<NewShareRateVO>> shareMap = this.getShareRateMap(shareRateVoByEffective);
        //將altGroupVoList轉為map，key是每個group的所有pn拼接，value是每個group的所有AltGroupVO
        Map<String, List<AltGroupVO>> groupMap = this.getGroupMap(altGroupVoList);

        for (String key : shareMap.keySet()) {
            List<AltGroupVO> altList = groupMap.get(key);
            List<NewShareRateVO> shareList = shareMap.get(key);
            //存在所有pn相同的group
            if (CollectionUtils.isNotEmpty(altList)) {
                //altList轉map  以component为KEY，具体VO为VALUE
                Map<String, AltGroupVO> altMap = this.getAltGroupMap(altList);
                filterNewShareRate = new ArrayList<>();
                for (NewShareRateVO newShareRateVO : shareList) {
                    //根據pn找到AltGroupVO
                    AltGroupVO vo = altMap.get(newShareRateVO.getComponent());
                    if (vo.getComponent().equals(newShareRateVO.getComponent())) {
                        if ((vo.getTargetRate() - newShareRateVO.getTargetRate()) > 5
                                || (vo.getTargetRate() - newShareRateVO.getTargetRate()) < -5) {
                            //只要有一个满足条件就整组替换
                            List<NewShareRateVO> newshareList = this.getNewshareList(shareList, altMap);
                            newShareRateResultList.addAll(newshareList);
                            break;
                        } else {
                            filterNewShareRate.add(newShareRateVO);
                        }
                    }
                }
                List<NewShareRateVO> srList = this.getFilterShareRate(shareList, filterNewShareRate, altMap);
                if (CollectionUtils.isNotEmpty(srList)) {
                    newShareRateResultList.addAll(srList);
                }
            } else {
                //group下pn部分重複或全都不重複,舊的effective_flag改為N
                for (NewShareRateVO vo : shareList) {
                    vo.setEffectiveFlag("N");
                }
                newShareRateResultList.addAll(shareList);
            }
        }

        for (String key : groupMap.keySet()) {
            List<NewShareRateVO> shareList = shareMap.get(key);
            List<AltGroupVO> altList = groupMap.get(key);
            if (CollectionUtils.isEmpty(shareList)) {
                //新增一組新的vo
                for (AltGroupVO altGroupVO : altList) {
                    NewShareRateVO newShareVo = new NewShareRateVO();
                    newShareVo.setUniqueGroupId(altGroupVO.getVersion() + "_" + altGroupVO.getGroupId());
                    newShareVo.setReplacedGroupId(altGroupVO.getVersion() + "_" + altGroupVO.getGroupId());
                    this.setNewShareRateByGroupGtr(newShareVo, altGroupVO);
                    newShareRateResultList.add(newShareVo);
                }
            }
        }

        return newShareRateResultList;
    }

    private Map<String, List<NewShareRateVO>> getShareRateMap(List<NewShareRateVO> newShareRateVOList) {
        //根據group_id分組轉為map，key是Unique_group_id
        Map<String, List<NewShareRateVO>> newShareRateMap =
                newShareRateVOList.stream().collect(Collectors.groupingBy(NewShareRateVO::getUniqueGroupId));

        Map<String, List<NewShareRateVO>> shareMap = new HashMap<>();
        //遍历所有Unique_group_id,[A1,A2,A3]
        for (String group : newShareRateMap.keySet()) {
            List<String> newShareRatePnList = new ArrayList<>();
            //遍历一个Unique_group_id下所有对象的Component值，放入一个list中[74.04280.099,CS.16K74.001]
            for (NewShareRateVO vo : newShareRateMap.get(group)) {
                newShareRatePnList.add(vo.getComponent());
            }
            //对这个unique_group_id下所有对象的Component值的list排序
            Collections.sort(newShareRatePnList);
            //对这个list中所有的值进行拼接
            StringBuilder sb = new StringBuilder();
            for (String pn : newShareRatePnList) {
                sb.append(pn);
                sb.append("_");
            }
            //把最后一个_删掉
            sb.setLength(sb.length() - 1);
            //返回的map以这个拼接的字符串为KEY，以这个unique_group_id下所有对象的list为VALUE
            shareMap.put(sb.toString(), newShareRateMap.get(group));
        }

        return shareMap;
    }

    private Map<String, List<AltGroupVO>> getGroupMap(List<AltGroupVO> altGroupVoList) {
        //根據group_id分組轉為map，key是group_id
        Map<String, List<AltGroupVO>> altGroupMap =
                altGroupVoList.stream().collect(Collectors.groupingBy(AltGroupVO::getGroupId));

        Map<String, List<AltGroupVO>> groupMap = new HashMap<>();

        for (String group : altGroupMap.keySet()) {
            List<String> altGroupPnList = new ArrayList<>();
            for (AltGroupVO vo : altGroupMap.get(group)) {
                altGroupPnList.add(vo.getComponent());
            }
            Collections.sort(altGroupPnList);
            StringBuilder sb = new StringBuilder();
            for (String pn : altGroupPnList) {
                sb.append(pn);
                sb.append("_");
            }
            sb.setLength(sb.length() - 1);

            groupMap.put(sb.toString(), altGroupMap.get(group));
        }

        return groupMap;
    }

    private Map<String, AltGroupVO> getAltGroupMap(List<AltGroupVO> altList) {
        Map<String, AltGroupVO> altMap = new HashMap<>();
        for (AltGroupVO altVO : altList) {
            altMap.put(altVO.getComponent(), altVO);
        }

        return altMap;
    }

    private List<NewShareRateVO> getNewshareList(List<NewShareRateVO> shareList, Map<String, AltGroupVO> altMap) {
        List<NewShareRateVO> newshareList = new ArrayList<>();
        for (NewShareRateVO rateVO : shareList) {
            rateVO.setEffectiveFlag("N");
            AltGroupVO vo = altMap.get(rateVO.getComponent());
            NewShareRateVO newShareVo = new NewShareRateVO();
            newShareVo.setUniqueGroupId(vo.getVersion() + "_" + vo.getGroupId());
            newShareVo.setReplacedGroupId(rateVO.getReplacedGroupId());
            this.setNewShareRateByGroupGtr(newShareVo, vo);
            newshareList.add(newShareVo);
        }
        newshareList.addAll(shareList);

        return newshareList;
    }

    private List<NewShareRateVO> getFilterShareRate(List<NewShareRateVO> shareList, List<NewShareRateVO> filterShareRate,
                                                 Map<String, AltGroupVO> altMap) {
        List<NewShareRateVO> updateShareRateList = new ArrayList<>();
        if (shareList.size() == filterShareRate.size()) {
            for (NewShareRateVO newShareRateVO : shareList) {
                AltGroupVO vo = altMap.get(newShareRateVO.getComponent());
                newShareRateVO.setUniqueGroupId(vo.getVersion() + "_" + vo.getGroupId());
                newShareRateVO.setIneffectiveDate(vo.getVersionDate());
                newShareRateVO.setLastMrpOnhand("null".equals(String.valueOf(vo.getOnhand()))?0:vo.getOnhand());
                String mrpdate = vo.getMrpDate() !=null ? sdf1.format(vo.getMrpDate()) : null;
                newShareRateVO.setLastMrpDate(mrpdate);
                newShareRateVO.setBatchid(batchId);
            }
            updateShareRateList.addAll(shareList);
        }

        return updateShareRateList;
    }

    public void deleteDataFromNewShareResult(String plant) {
        newShareRateRepository.deleteByPlant(plant);
    }

    private void setStdPrice(List<NewShareRateVO> shareRateList){
        //抓到shareRateList下所有的pn的價錢和幣別和數量
        List<StandardVO> stprsAndWaers = shareRateDao.getStprsAndWaers(shareRateList);
        //根據werks和matnr分組轉map
        Map<String, Map<String, List<StandardVO>>> map = stprsAndWaers.stream()
                .collect(Collectors.groupingBy(StandardVO::getWerks, Collectors.groupingBy(StandardVO::getMatnr)));

        //拿到該廠所有料的幣別
        Set<String> waersList = new HashSet<>();
        for (StandardVO stprsAndWaer : stprsAndWaers) {
            waersList.add(stprsAndWaer.getWaers());
        }

        //抓到當前幣別對台幣的匯率
        List<ExchangeRateVO> exchangeRate = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(waersList)) {
            for (String waers : waersList) {
                //如果當前幣別是NTD
                if ("NTD".equals(waers)) {
                    ExchangeRateVO changeRateVO = new ExchangeRateVO();
                    changeRateVO.setFcurr("NTD");
                    changeRateVO.setTcurr("NTD");
                    changeRateVO.setGdatu(formateUtils.getNowDateWithDash());
                    changeRateVO.setUkurs("1");
                    exchangeRate.add(changeRateVO);
                }
            }
            exchangeRate.addAll(shareRateDao.getExchangeRate(waersList));
        }

        //根據要轉換的幣種Fcurr分類轉為map
        Map<String, List<ExchangeRateVO>> exchangeMap =
                exchangeRate.stream().collect(Collectors.groupingBy(ExchangeRateVO::getFcurr));

        if (CollectionUtils.isNotEmpty(stprsAndWaers) && CollectionUtils.isNotEmpty(exchangeRate)) {
            for (NewShareRateVO vo : shareRateList) {
                //根據plant和component拿到standardVOList
                List<StandardVO> standardVOList = map.get(vo.getPlant()).get(vo.getComponent());
                if (CollectionUtils.isNotEmpty(standardVOList)) {
                    //如果Freidat不存在設定Freidat=Cdate
                    for (StandardVO standardVO : standardVOList) {
                        if (StringUtils.isEmpty(standardVO.getFreidat())) {
                            standardVO.setFreidat(standardVO.getCdate());
                        }
                    }
                    //standardVOList根據Freidat倒序排序取最大一個
                    StandardVO standardVO =
                            standardVOList.stream().sorted(Comparator.comparing(StandardVO::getFreidat).reversed()).collect(Collectors.toList()).get(0);

                    //根據該廠這個料的幣種獲取對台幣的匯率
                    List<ExchangeRateVO> exchangeRateVOs = exchangeMap.get(standardVO.getWaers());
                    //對台幣的匯率根據時間排序取最大
                    ExchangeRateVO exchangeRateVO =
                            exchangeRateVOs.stream().sorted(Comparator.comparing(ExchangeRateVO::getGdatu).reversed()).collect(Collectors.toList()).get(0);

                    BigDecimal stprs = new BigDecimal(standardVO.getStprs());
                    BigDecimal peinh = new BigDecimal(standardVO.getPeinh());
                    BigDecimal ukurs = new BigDecimal(exchangeRateVO.getUkurs());

                    BigDecimal unitPrice = stprs.divide(peinh, 2, RoundingMode.UP);
                    BigDecimal stdPriceNtd = unitPrice.multiply(ukurs).setScale(2, RoundingMode.UP);
                    vo.setStdPriceNtd(stdPriceNtd);

                    BigDecimal targetQty = new BigDecimal(String.valueOf(vo.getTargetQty()));
                    BigDecimal stdPrice = new BigDecimal(String.valueOf(stdPriceNtd));
                    BigDecimal targetAmountNtd = targetQty.multiply(stdPrice).setScale(2, RoundingMode.UP);
                    vo.setTargetAmountNtd(targetAmountNtd);

                    BigDecimal actualQty = new BigDecimal(String.valueOf(vo.getActualQty()));
                    BigDecimal actualAmountNtd = actualQty.multiply(stdPrice).setScale(2, RoundingMode.UP);
                    vo.setActualAmountNtd(actualAmountNtd);
                } else {
                    vo.setStdPriceNtd(new BigDecimal("0.0"));
                    vo.setTargetAmountNtd(new BigDecimal("0.0"));
                    vo.setActualAmountNtd(new BigDecimal("0.0"));
                }
            }
        } else {
            for (NewShareRateVO vo : shareRateList) {
                vo.setStdPriceNtd(new BigDecimal("0.0"));
                vo.setTargetAmountNtd(new BigDecimal("0.0"));
                vo.setActualAmountNtd(new BigDecimal("0.0"));
            }
        }
    }

    public static IneffectiveShareRateVO changeNvoToIvo(NewShareRateVO nvo){
        IneffectiveShareRateVO ivo = new IneffectiveShareRateVO();
        BeanUtils.copyProperties(nvo,ivo);
        return ivo;
    }

    public Long calDateDiffence(String a,String b) throws ParseException {
        long c = sdf1.parse(b).getTime()-sdf1.parse(a).getTime();
        return c/1000/60/60/24;//天
    }

}
