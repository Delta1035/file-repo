package com.wistron.avatar.effective.service.postgre;

import com.wistron.avatar.common.entity.postgre.PostgreEffective;

import java.util.List;

public interface IPostgreEffectiveService {
    public List<PostgreEffective> getAll();
    List<PostgreEffective> selectByPlants(List<String> plants);

}
