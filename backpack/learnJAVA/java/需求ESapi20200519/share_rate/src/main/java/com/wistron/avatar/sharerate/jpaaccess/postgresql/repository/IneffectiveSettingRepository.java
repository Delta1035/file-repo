package com.wistron.avatar.sharerate.jpaaccess.postgresql.repository;

import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveSettingVO;
import com.wistron.avatar.sharerate.jpaaccess.postgresql.entity.IneffectiveSettingVOPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IneffectiveSettingRepository extends JpaRepository<IneffectiveSettingVO, IneffectiveSettingVOPK>,
        JpaSpecificationExecutor<IneffectiveSettingVO> {

    IneffectiveSettingVO findByPlant(String plant);


}
