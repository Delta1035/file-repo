package com.wistron.avatar.checkdata.controller;


import com.wistron.avatar.checkdata.service.ICheckDataService;
import com.wistron.avatar.common.util.GlobalStaticUtil;
import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.JobApiRequestVo;
import com.wistron.avatar.common.vo.StageInputParamVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/checkData")
public class CheckDataController {

    @Autowired
    ICheckDataService checkDataService;

    /**
     * checkStageData
     * @param param
     * @return
     */
    @PostMapping(path = "/checkStageData",produces = "application/json")
    @ResponseBody
    public ApiResponseVo<StageInputParamVo> checkStageData(@RequestBody JobApiRequestVo<StageInputParamVo> param) {
        StageInputParamVo stageInputParamVo = param.getJobParameter().getRequestInfo();
        ApiResponseVo<StageInputParamVo> apiResponseVo = new ApiResponseVo<>(stageInputParamVo);
        GlobalStaticUtil.responseObject = stageInputParamVo;

        checkDataService.checkData(stageInputParamVo);
        return apiResponseVo;
    }
}
