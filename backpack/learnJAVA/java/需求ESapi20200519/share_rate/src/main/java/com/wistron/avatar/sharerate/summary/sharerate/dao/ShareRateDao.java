package com.wistron.avatar.sharerate.summary.sharerate.dao;

import com.google.common.collect.Lists;
import com.wistron.avatar.sharerate.ApplicationContextProvider;
import com.wistron.avatar.sharerate.common.util.ConstUtil;
import com.wistron.avatar.sharerate.common.util.LogstashUtil;
import com.wistron.avatar.sharerate.common.util.QueryStringHelper;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveShareRateVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.NewShareRateVO;
import com.wistron.avatar.sharerate.summary.sharerate.vo.*;
import com.wistron.avatar.utils.es.EsUtil;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ShareRateDao {
    private static final String MATERIAL_TRANSACTION_INDEX = "material_transaction";

    private static final String MARAMARC_INDEX = "sap_material_master_maramarc";

    private static final String SAP_STANDARD_COST_INDEX = "sap_standard_cost";

    private static final String SAP_EXCHANGE_RATE_INDEX = "sap_exchange_rate";

    private static final String SAP_IMG_STORAGE_LOCATIONS = "sap_img_storage_locations";

    private static final String SAP_IMG_MRP_AREA_STORAGE_LOCATIONS = "sap_img_mrp_area_storage_location";

    private static final String WERKSKEY  = "werks:";

    private static final String ES7_ERROR_MESSAGE  = "Es7执行错误";

    private static final String AND_KEY = " AND ";

    private final EsUtil es7Util = EsUtil.getInstance();

    public ShareRateDao(){
        //构造函数
    }

    public List<SapImgStorageLocationsVo> queryImgStoreLocation(String plant){
        List<SapImgStorageLocationsVo> sapImgStorageLocationsVos = new ArrayList<>();
        try {
            sapImgStorageLocationsVos = this.es7Util.getByQueryString(SAP_IMG_STORAGE_LOCATIONS,WERKSKEY + plant,SapImgStorageLocationsVo.class);
        } catch (IOException e) {
            LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
        }
        return sapImgStorageLocationsVos;
    }

    public List<SapImgMrpAreaStorageLocationVo> queryImgMrpAreaStoreLocation(String plant){
        List<SapImgMrpAreaStorageLocationVo> sapImgMrpAreaStorageLocationVos = new ArrayList<>();
        try {
            sapImgMrpAreaStorageLocationVos = this.es7Util.getByQueryString(SAP_IMG_MRP_AREA_STORAGE_LOCATIONS,WERKSKEY + plant,SapImgMrpAreaStorageLocationVo.class);
        } catch (IOException e) {
            LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
        }
        return sapImgMrpAreaStorageLocationVos;
    }

    public List<MaterialTransactionVO> getMaterialTransaction(String plant, String date, List<String> pnList,
                                                              List<String> locationList){
        List<MaterialTransactionVO> result = new ArrayList<>();
        List<List<String>> splitList;
        var queryString = new StringBuilder();

        var queryStringHelper = new QueryStringHelper();
        splitList = queryStringHelper.splitBatchQueryStringList(pnList);
        for (List<String> splitPnList : splitList) {
            queryString.delete(0, queryString.length());
            queryString.append("partNum:(");
            for (var i = 0; i < splitPnList.size(); i++) {
                queryString.append(splitPnList.get(i)).append(" OR ");
            }
            queryString.setLength(queryString.length() - 3);
            queryString.append(" )");

            if (!locationList.isEmpty()) {
                queryString.append(AND_KEY);
                queryString.append("storageLocation:(");
                for (var i = 0; i < locationList.size(); i++) {
                    queryString.append(locationList.get(i)).append(" OR ");
                }
                queryString.setLength(queryString.length() - 3);
                queryString.append(" ) ");
            }
            queryString.append("  AND plant:" + plant);
            queryString.append(" AND entryDate: " + date);
            queryString.append(" AND movementType: (101 OR 102)");
            queryString.append(" AND _exists_: orderNum");

            List<String> lstSourceField = Lists.newArrayList("enrtyQty", "partNum", "movementType");
            //2021.06.09 调整使用es7查询资料


            List<MaterialTransactionVO> transactionVOList = null;
            try {
                transactionVOList = es7Util.getByQueryString(MATERIAL_TRANSACTION_INDEX,
                        queryString.toString(), lstSourceField, MaterialTransactionVO.class);
            } catch (IOException e) {
                LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
            }
            result.addAll(transactionVOList);

        }

        return result;
    }

    public List<MaramarcVO> getMaterialMaster(String plant, List<String> pnList){
        List<MaramarcVO> result = new ArrayList<>();
        List<List<String>> splitList;
        var queryString = new StringBuilder();

        var queryStringHelper = new QueryStringHelper();
        splitList = queryStringHelper.splitBatchQueryStringList(pnList);
        for (List<String> splitPnList : splitList) {
            queryString.delete(0, queryString.length());
            queryString.append("matnr:(");
            for (var i = 0; i < splitPnList.size(); i++) {
                queryString.append(splitPnList.get(i))
                        .append(" OR ");
            }
            queryString.setLength(queryString.length() - 3);
            queryString.append(" ) AND werks:" + plant);

            List<String> lstSourceField = Lists.newArrayList("matnr", "zzcate", "zzcontyp1", "zzcontyp2", "zzbsar",
                    "zzsermode", "maktx");
            List<MaramarcVO> maramarcVOList = null;
            try {
                maramarcVOList = es7Util.getByQueryString(MARAMARC_INDEX, queryString.toString(), lstSourceField, MaramarcVO.class);
            } catch (IOException e) {
                LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
            }

            result.addAll(maramarcVOList);
        }

        return result;
    }

    public List<StandardVO> getStprsAndWaers(List<NewShareRateVO> shareRateList){
        List<StandardVO> result = new ArrayList<>();
        List<List<NewShareRateVO>> splitList;
        var queryString = new StringBuilder();

        var queryStringHelper = new QueryStringHelper();
        splitList = queryStringHelper.splitBatchQueryStringList(shareRateList);

        for (List<NewShareRateVO> splitPnList : splitList) {
            queryString.delete(0, queryString.length());
            List<String> plants =
                    splitPnList.stream().map(NewShareRateVO::getPlant).distinct().collect(Collectors.toList());

            List<String> pns =
                    splitPnList.stream().map(NewShareRateVO::getComponent).distinct().collect(Collectors.toList());

            queryString.append(WERKSKEY);
            for (var i = 0; i < plants.size(); i++) {
                queryString.append(plants.get(i))
                        .append(" OR ");
            }
            queryString.setLength(queryString.length() - 3);
            queryString.append(AND_KEY);

            queryString.append("matnr:(");
            for (var i = 0; i < pns.size(); i++) {
                queryString.append(pns.get(i))
                        .append(" OR ");
            }
            queryString.setLength(queryString.length() - 3);
            queryString.append(" ) ");

            List<String> lstSourceField = Lists.newArrayList("stprs", "waers", "werks", "matnr", "peinh", "cdate", "freidat");
            List<StandardVO> standardVOList = null;
            try {
                standardVOList = es7Util.getByQueryString(SAP_STANDARD_COST_INDEX, queryString.toString(), lstSourceField, StandardVO.class);
            } catch (IOException e) {
                LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
            }

            result.addAll(standardVOList);
        }

        return result;
    }

    public List<ExchangeRateVO> getExchangeRate(Set<String> waersList){
        List<String> waers = new ArrayList<>(waersList);
        var queryString = new StringBuilder();
        queryString.append("fcurr:(");
        for (var i = 0; i < waers.size(); i++) {
            queryString.append(waers.get(i))
                    .append(" OR ");
        }
        queryString.setLength(queryString.length() - 3);
        queryString.append(")");
        queryString.append(AND_KEY);
        queryString.append("tcurr: NTD");

        List<String> lstSourceField = Lists.newArrayList("ukurs", "fcurr", "tcurr", "gdatu");
        List<ExchangeRateVO> exchangeRateVOS = null;
        try {
            exchangeRateVOS = es7Util.getByQueryString(SAP_EXCHANGE_RATE_INDEX, queryString.toString(), lstSourceField, ExchangeRateVO.class);
        } catch (IOException e) {
            LogstashUtil.writeErrorLog(ES7_ERROR_MESSAGE,e);
        }
        return exchangeRateVOS;
    }

    public void batchInsertNewShareRate(List<NewShareRateVO> list) throws SQLException {
        var stringBuilder = new StringBuilder();
        stringBuilder.append("INSERT INTO PUBLIC.whq_avatar_sim_ww_share_rate_result (\n" +
                "actual_amount_ntd,\n" +
                "actual_qty,\n" +
                "actual_rate,\n" +
                "buyer_code,\n" +
                "buyer_name,\n" +
                "component_description,\n" +
                "component_type_1,\n" +
                "component_type_2,\n" +
                "diff_qty,\n" +
                "diff_rate,\n" +
                "effective_date,\n" +
                "effective_duration,\n" +
                "effective_flag,\n" +
                "hit_rate,\n" +
                "ineffective_date,\n" +
                "last_mrp_date,\n" +
                "last_mrp_onhand,\n" +
                "material_category,\n" +
                "priority_diff,\n" +
                "priority_hit,\n" +
                "replaced_group_id,\n" +
                "service_mode,\n" +
                "sourcer_code,\n" +
                "sourcer_name,\n" +
                "std_price_ntd,\n" +
                "supply_type,\n" +
                "target_amount_ntd,\n" +
                "target_qty,\n" +
                "target_rate,\n" +
                "batchid,\n" +
                "component,\n" +
                "plant,\n" +
                "unique_group_id \n" +
                ")\n" +
                "VALUES\n" +
                "\t( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ON CONFLICT (plant,batchid,component,unique_group_id ) DO\n" +
                "UPDATE \n" +
                "\tSET batchid =  excluded.batchid,plant =  excluded.plant,unique_group_id =  excluded.unique_group_id,\n" +
                "component =  excluded.component,component_description =  excluded.component_description,\n" +
                "effective_flag =  excluded.effective_flag,effective_date =  excluded.effective_date,\n" +
                "ineffective_date =  excluded.ineffective_date,effective_duration =  excluded.effective_duration,\n" +
                "target_rate =  excluded.target_rate,target_qty =  excluded.target_qty,actual_rate =  excluded.actual_rate,\n" +
                "actual_qty =  excluded.actual_qty,hit_rate =  excluded.hit_rate,diff_rate =  excluded.diff_rate,\n" +
                "diff_qty =  excluded.diff_qty,priority_hit =  excluded.priority_hit,priority_diff =  excluded.priority_diff,\n" +
                "sourcer_code =  excluded.sourcer_code,sourcer_name =  excluded.sourcer_name,buyer_code =  excluded.buyer_code,\n" +
                "buyer_name =  excluded.buyer_name,material_category =  excluded.material_category,component_type_1 =  excluded.component_type_1,\n" +
                "component_type_2 =  excluded.component_type_2,supply_type =  excluded.supply_type,service_mode =  excluded.service_mode,\n" +
                "replaced_group_id =  excluded.replaced_group_id,std_price_ntd =  excluded.std_price_ntd,target_amount_ntd =  excluded.target_amount_ntd,\n" +
                "actual_amount_ntd =  excluded.actual_amount_ntd,last_mrp_date =  excluded.last_mrp_date,last_mrp_onhand =  excluded.last_mrp_onhand");

        DataSource postgresqlDataSource = (DataSource) ApplicationContextProvider
                .getBean(ConstUtil.DATA_SOURCE_PG);
        Connection conn = postgresqlDataSource.getConnection();
        try (PreparedStatement ps = conn.prepareStatement(stringBuilder.toString())) {
            conn.setAutoCommit(false);
            for (var i = 0; i < list.size(); i++) {//100万条数据
                NewShareRateVO vo = list.get(i);
                ps.setBigDecimal(1, vo.getActualAmountNtd());
                ps.setDouble(2, vo.getActualQty());
                ps.setDouble(3, vo.getActualRate());
                ps.setString(4, vo.getBuyerCode());
                ps.setString(5, vo.getBuyerName());
                ps.setString(6, vo.getComponentDescription());
                ps.setString(7, vo.getComponentType1());
                ps.setString(8, vo.getComponentType2());
                ps.setDouble(9, vo.getDiffQty());
                ps.setDouble(10, vo.getDiffRate());
                ps.setString(11, vo.getEffectiveDate());
                ps.setDouble(12, vo.getEffectiveDuration());
                ps.setString(13, vo.getEffectiveFlag());
                ps.setDouble(14, vo.getHitRate());
                ps.setString(15, vo.getIneffectiveDate());
                if (!StringUtils.hasText(vo.getLastMrpDate())){
                    vo.setLastMrpDate("X");
                }
                ps.setString(16, vo.getLastMrpDate());
                ps.setDouble(17, vo.getLastMrpOnhand());
                ps.setString(18, vo.getMaterialCategory());
                ps.setDouble(19, vo.getPriorityDiff());
                ps.setDouble(20, vo.getPriorityHit());
                ps.setString(21, vo.getReplacedGroupId());
                ps.setString(22, vo.getServiceMode());
                ps.setString(23, vo.getSourcerCode());
                ps.setString(24, vo.getSourcerName());
                ps.setBigDecimal(25, vo.getStdPriceNtd());
                ps.setString(26, vo.getSupplyType());
                ps.setBigDecimal(27, vo.getTargetAmountNtd());
                ps.setDouble(28, vo.getTargetQty());
                ps.setDouble(29, vo.getTargetRate());
                ps.setString(30, vo.getBatchid());
                ps.setString(31, vo.getComponent());
                ps.setString(32, vo.getPlant());
                ps.setString(33, vo.getUniqueGroupId());
                ps.addBatch();
                if ((i + 1) % 2000 == 0) {
                    ps.executeBatch();
                }
            }
            ps.executeBatch();
            conn.commit();
        }catch (Exception e){
            LogstashUtil.writeErrorLog("[12].saveShareRateVOList-insert into postgre",e);
        }finally {
            conn.close();
        }
    }
    public void batchInsertIneffectiveShareRate(List<IneffectiveShareRateVO> list) throws SQLException {
        var stringBuilder = new StringBuilder();
        stringBuilder.append("INSERT INTO PUBLIC.whq_avatar_sim_ww_share_rate_result_archiving (\n" +
                "actual_amount_ntd,\n" +
                "actual_qty,\n" +
                "actual_rate,\n" +
                "buyer_code,\n" +
                "buyer_name,\n" +
                "component_description,\n" +
                "component_type_1,\n" +
                "component_type_2,\n" +
                "diff_qty,\n" +
                "diff_rate,\n" +
                "effective_date,\n" +
                "effective_duration,\n" +
                "effective_flag,\n" +
                "hit_rate,\n" +
                "ineffective_date,\n" +
                "last_mrp_date,\n" +
                "last_mrp_onhand,\n" +
                "material_category,\n" +
                "priority_diff,\n" +
                "priority_hit,\n" +
                "replaced_group_id,\n" +
                "service_mode,\n" +
                "sourcer_code,\n" +
                "sourcer_name,\n" +
                "std_price_ntd,\n" +
                "supply_type,\n" +
                "target_amount_ntd,\n" +
                "target_qty,\n" +
                "target_rate,\n" +
                "batchid,\n" +
                "component,\n" +
                "plant,\n" +
                "unique_group_id \n" +
                ")\n" +
                "VALUES\n" +
                "\t( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ON CONFLICT ( plant, batchid, unique_group_id,component ) DO\n" +
                "UPDATE \n" +
                "\tSET batchid =  excluded.batchid,plant =  excluded.plant,unique_group_id =  excluded.unique_group_id,\n" +
                "component =  excluded.component,component_description =  excluded.component_description,\n" +
                "effective_flag =  excluded.effective_flag,effective_date =  excluded.effective_date,\n" +
                "ineffective_date =  excluded.ineffective_date,effective_duration =  excluded.effective_duration,\n" +
                "target_rate =  excluded.target_rate,target_qty =  excluded.target_qty,actual_rate =  excluded.actual_rate,\n" +
                "actual_qty =  excluded.actual_qty,hit_rate =  excluded.hit_rate,diff_rate =  excluded.diff_rate,\n" +
                "diff_qty =  excluded.diff_qty,priority_hit =  excluded.priority_hit,priority_diff =  excluded.priority_diff,\n" +
                "sourcer_code =  excluded.sourcer_code,sourcer_name =  excluded.sourcer_name,buyer_code =  excluded.buyer_code,\n" +
                "buyer_name =  excluded.buyer_name,material_category =  excluded.material_category,component_type_1 =  excluded.component_type_1,\n" +
                "component_type_2 =  excluded.component_type_2,supply_type =  excluded.supply_type,service_mode =  excluded.service_mode,\n" +
                "replaced_group_id =  excluded.replaced_group_id,std_price_ntd =  excluded.std_price_ntd,target_amount_ntd =  excluded.target_amount_ntd,\n" +
                "actual_amount_ntd =  excluded.actual_amount_ntd,last_mrp_date =  excluded.last_mrp_date,last_mrp_onhand =  excluded.last_mrp_onhand");

        var postgresqlDataSource = (DataSource) ApplicationContextProvider
                .getBean(ConstUtil.DATA_SOURCE_PG);
        var conn = postgresqlDataSource.getConnection();
        try (PreparedStatement ps = conn.prepareStatement(stringBuilder.toString())) {
            conn.setAutoCommit(false);
            for (var i = 0; i < list.size(); i++) {//100万条数据
                IneffectiveShareRateVO vo = list.get(i);
                ps.setBigDecimal(1, vo.getActualAmountNtd());
                ps.setDouble(2, vo.getActualQty());
                ps.setDouble(3, vo.getActualRate());
                ps.setString(4, vo.getBuyerCode());
                ps.setString(5, vo.getBuyerName());
                ps.setString(6, vo.getComponentDescription());
                ps.setString(7, vo.getComponentType1());
                ps.setString(8, vo.getComponentType2());
                ps.setDouble(9, vo.getDiffQty());
                ps.setDouble(10, vo.getDiffRate());
                ps.setString(11, vo.getEffectiveDate());
                ps.setDouble(12, vo.getEffectiveDuration());
                ps.setString(13, vo.getEffectiveFlag());
                ps.setDouble(14, vo.getHitRate());
                ps.setString(15, vo.getIneffectiveDate());
                if (!StringUtils.hasText(vo.getLastMrpDate())){
                    vo.setLastMrpDate("X");
                }
                ps.setString(16, vo.getLastMrpDate());
                ps.setDouble(17, vo.getLastMrpOnhand());
                ps.setString(18, vo.getMaterialCategory());
                ps.setDouble(19, vo.getPriorityDiff());
                ps.setDouble(20, vo.getPriorityHit());
                ps.setString(21, vo.getReplacedGroupId());
                ps.setString(22, vo.getServiceMode());
                ps.setString(23, vo.getSourcerCode());
                ps.setString(24, vo.getSourcerName());
                ps.setBigDecimal(25, vo.getStdPriceNtd());
                ps.setString(26, vo.getSupplyType());
                ps.setBigDecimal(27, vo.getTargetAmountNtd());
                ps.setDouble(28, vo.getTargetQty());
                ps.setDouble(29, vo.getTargetRate());
                ps.setString(30, vo.getBatchid());
                ps.setString(31, vo.getComponent());
                ps.setString(32, vo.getPlant());
                ps.setString(33, vo.getUniqueGroupId());
                ps.addBatch();
                if ((i + 1) % 2000 == 0) {
                    ps.executeBatch();
                }
            }
            ps.executeBatch();
            conn.commit();
        }catch (Exception e){
            LogstashUtil.writeErrorLog("[12].saveShareRateVOList-insert into postgre",e);
        }finally {
            conn.close();
        }
    }
}
