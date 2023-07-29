package com.wistron.avatar.sharerate.jpaaccess.oracle.repository;

import com.wistron.avatar.sharerate.jpaaccess.oracle.entity.CbgDataVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CbgDataRepository extends JpaRepository<CbgDataVO, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM OAS.SR_ITEM_ALT_AGRP_AVG WHERE plant in (?1) AND MPFLAG " +
            "like 'F%' AND ver in (select max(ver) from OAS.SR_ITEM_ALT_AGRP_AVG)")
    List<CbgDataVO> getCbgDataListByVer(List<String> plants);

    @Query(nativeQuery = true, value = "SELECT * FROM OAS.SR_ITEM_ALT_AGRP_AVG WHERE plant in (?1) AND MPFLAG like 'F%'")
    List<CbgDataVO> getCbgDataList(List<String> plants);
}
