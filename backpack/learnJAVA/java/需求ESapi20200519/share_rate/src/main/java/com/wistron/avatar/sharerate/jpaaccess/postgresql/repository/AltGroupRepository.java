package com.wistron.avatar.sharerate.jpaaccess.postgresql.repository;

import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.AltGroupVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.AltGroupVOPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AltGroupRepository extends JpaRepository<AltGroupVO, AltGroupVOPK>,
        JpaSpecificationExecutor<AltGroupVO> {

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "Delete FROM data_engine_share_rate_alt_group_target WHERE plant in (?1) ")
    void deleteAltGroup(List<String> plants);

    List<AltGroupVO> findAllByPlantAndVersionDate(String plant, String version_date);

    List<AltGroupVO> findAllByPlant(String plant);
}
