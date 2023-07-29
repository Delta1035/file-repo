package com.wistron.avatar.sharerate.jpaaccess.postgresql.repository;

import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveShareRateVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveShareRateVOPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IneffectiveShareRateRepository extends JpaRepository<IneffectiveShareRateVO, IneffectiveShareRateVOPK>,
        JpaSpecificationExecutor<IneffectiveShareRateVO> {

    List<IneffectiveShareRateVO> findAllByPlant(String plant);

    @Transactional
    void deleteByPlant(String plant);

}
