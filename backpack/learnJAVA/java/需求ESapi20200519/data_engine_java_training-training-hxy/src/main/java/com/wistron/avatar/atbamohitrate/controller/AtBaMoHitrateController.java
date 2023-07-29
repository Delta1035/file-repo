package com.wistron.avatar.atbamohitrate.controller;

import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.JobApiRequestVo;
import com.wistron.avatar.common.vo.GenAtBaMoHitrateParamVo;
import com.wistron.avatar.atbamohitrate.service.AtBaMoHitrateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RequestMapping("atBaMoHitrate")
@RestController
@Validated
public class AtBaMoHitrateController {

    @Autowired
    private AtBaMoHitrateService atBaMoHitrateService;

    @PostMapping("/genAtBaMoHitrate")
    public ApiResponseVo<GenAtBaMoHitrateParamVo> genAtBaMoHitrate(@RequestBody @Valid JobApiRequestVo<GenAtBaMoHitrateParamVo> genAtBaMoHitrateParam) {
        GenAtBaMoHitrateParamVo genAtBaMoHitrateParamVo = genAtBaMoHitrateParam.getJobParameter().getRequestInfo();
        ApiResponseVo<GenAtBaMoHitrateParamVo> apiResponseVo = new ApiResponseVo<>(genAtBaMoHitrateParamVo);
        atBaMoHitrateService.genAtBaMoHitrate(genAtBaMoHitrateParamVo);
        return apiResponseVo;
    }
}
