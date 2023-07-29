package com.wistron.avatar.sharerate.summary.sharerate.function.impl;

import com.wistron.avatar.sharerate.ApplicationContextProvider;
import com.wistron.avatar.sharerate.common.util.FormatConvertUtils;
import com.wistron.avatar.sharerate.common.vo.AvatarResponse;
import com.wistron.avatar.sharerate.jpaaccess.oracle.entity.CbgDataVO;
import com.wistron.avatar.sharerate.jpaaccess.oracle.repository.CbgDataRepository;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.AltGroupVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.repository.AltGroupRepository;
import com.wistron.avatar.sharerate.summary.sharerate.function.CbgDailyDataFunction;
import com.wistron.avatar.sharerate.summary.sharerate.vo.QueryVO;
import org.apache.commons.lang3.StringUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class CbgDailyDataFunctionImpl implements CbgDailyDataFunction {
    private final FormatConvertUtils formateUtils = new FormatConvertUtils();
    private final AltGroupRepository altRepository = ApplicationContextProvider.getBean(AltGroupRepository.class);

    @Override
    public AvatarResponse saveCbgDailyData(QueryVO queryVO) throws Exception {
        String mode = queryVO.getMode();
        List<String> plants = queryVO.getPlant();
        CbgDataRepository cbgRepository = ApplicationContextProvider.getBean(CbgDataRepository.class);
        //執行時間
        Timestamp datetime = formateUtils.convertToSqlTimestamp(formateUtils.getNowTimeFullWithMs());
        if ("append".equals(mode)) {
            //根據plant和ver抓到cbgDataVO
            List<CbgDataVO> cbgDataVOList = cbgRepository.getCbgDataListByVer(plants);
            this.saveAltGroup(cbgDataVOList, datetime);
        } else if ("initial".equals(mode)) {
            //根據plant刪除postgre原本的數據
            altRepository.deleteAltGroup(plants);
            //重新根據plant抓最新的CbgDataVO
            List<CbgDataVO> cbgDataVOList = cbgRepository.getCbgDataList(plants);
            this.saveAltGroup(cbgDataVOList, datetime);
        }

        AvatarResponse resp = new AvatarResponse();
        resp.setResult("0000000");
        resp.setMessage("ok");
        return resp;
    }

    private void saveAltGroup(List<CbgDataVO> cbgDataVOList, Timestamp datetime) {
        //將CbgDataVO轉為AltgroupVO
        List<AltGroupVO> altGroupVOList = this.getAltGroupVOList(cbgDataVOList, datetime);
        //將轉好的altGroupVOList寫入到postgresql
        altRepository.saveAll(altGroupVOList);
    }

    private List<AltGroupVO> getAltGroupVOList(List<CbgDataVO> cbgDataVOList, Timestamp datetime) {
        List<AltGroupVO> altGroupVOList = new ArrayList<>();
        for (CbgDataVO cbgDataVO : cbgDataVOList) {
            AltGroupVO altGroupVO = new AltGroupVO();
            altGroupVO.setVersion(cbgDataVO.getVer());
            altGroupVO.setPlant(cbgDataVO.getPlant());
            altGroupVO.setGroupId(cbgDataVO.getAgrp());
            altGroupVO.setComponent(cbgDataVO.getSitem());
            if (StringUtils.isEmpty(String.valueOf(cbgDataVO.getAdj_per()))
                    || "null".equals(String.valueOf(cbgDataVO.getAdj_per()))) {
                altGroupVO.setTargetRate(0.0);
            } else {
                altGroupVO.setTargetRate(cbgDataVO.getAdj_per());
            }
            altGroupVO.setPnType(cbgDataVO.getMpflag());
            altGroupVO.setMrpDate(cbgDataVO.getMrpdate());
            altGroupVO.setSourcerCode(cbgDataVO.getScode());
            altGroupVO.setSourcerName(cbgDataVO.getSname());
            altGroupVO.setBuyerCode(cbgDataVO.getBuyercode());
            altGroupVO.setBuyerName(cbgDataVO.getBuyername());
            altGroupVO.setTotalReq(cbgDataVO.getTotalreq());
            if (StringUtils.isEmpty(String.valueOf(cbgDataVO.getOnhand()))
                    || "null".equals(String.valueOf(cbgDataVO.getOnhand()))) {
                altGroupVO.setOnhand(0.0);
            } else {
                altGroupVO.setOnhand(cbgDataVO.getOnhand());
            }

            altGroupVO.setBalance1(cbgDataVO.getBalance1());
            altGroupVO.setBalabce2(cbgDataVO.getBalance2());

            String versionDate = "20" + cbgDataVO.getVer().substring(1, 7);
            altGroupVO.setVersionDate(versionDate);

            altGroupVO.setCbgUpdateDatetime(cbgDataVO.getInsdate());
            altGroupVO.setAvatarUpdateDatetime(datetime);

            altGroupVOList.add(altGroupVO);
        }

        return altGroupVOList;
    }
}
