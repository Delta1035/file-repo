package com.wistron.avatar.sharerate.jpaaccess.postgresql.repository;

import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.NewShareRateVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.NewShareRateVOPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NewShareRateRepository extends JpaRepository<NewShareRateVO, NewShareRateVOPK>,
        JpaSpecificationExecutor<NewShareRateVO> {

    List<NewShareRateVO> findAllByPlant(String plant);

    @Transactional
    void deleteByPlant(String plant);

}
