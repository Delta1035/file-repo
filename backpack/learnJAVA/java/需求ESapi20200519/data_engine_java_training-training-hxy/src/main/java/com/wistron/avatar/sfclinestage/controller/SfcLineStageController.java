package com.wistron.avatar.sfclinestage.controller;

import com.wistron.avatar.sfclinestage.service.SfcLineStageService;
import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.GenSfcLineStageParamVo;
import com.wistron.avatar.common.vo.JobApiRequestVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequestMapping("sfcLineStage")
@RestController
@Validated
public class SfcLineStageController {
    @Autowired
    private SfcLineStageService sfcLineStageService;

    @PostMapping("/genSfcLineStage")
    public ApiResponseVo<GenSfcLineStageParamVo> genSfcLineStage(@RequestBody @Valid JobApiRequestVo<GenSfcLineStageParamVo> genSfcLineStageParam) throws Exception {
        GenSfcLineStageParamVo genSfcLineStageParamVo = genSfcLineStageParam.getJobParameter().getRequestInfo();
        ApiResponseVo<GenSfcLineStageParamVo> apiResponseVo = new ApiResponseVo<>(genSfcLineStageParamVo);
        sfcLineStageService.genSfcLineStage(genSfcLineStageParamVo);
        return apiResponseVo;
    }
}
