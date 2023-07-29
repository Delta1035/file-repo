package com.wistron.avatar.sharerate.jpaaccess.postgresql.repository;

import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.ActualGrtVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.ActualGrtVOPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ActualGrtRepository extends JpaRepository<ActualGrtVO, ActualGrtVOPK>,
        JpaSpecificationExecutor<ActualGrtVO> {

    @Transactional
    void deleteByPlantAndReceivingDate(String plant, String receiving_date);

    List<ActualGrtVO> findAllByPlant(String plant);
}
