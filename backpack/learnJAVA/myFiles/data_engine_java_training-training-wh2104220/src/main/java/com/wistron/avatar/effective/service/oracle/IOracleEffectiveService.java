package com.wistron.avatar.effective.service.oracle;

import com.wistron.avatar.common.entity.oracle.OracleEffective;

import java.util.List;

public interface IOracleEffectiveService {
    List<OracleEffective> getAll();
    List<OracleEffective> selectByPlants(List<String> plants);

    void deleteByPlants(List<String> plants);

}
