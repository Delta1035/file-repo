package com.wistron.avatar.sharerate.summary.sharerate.controller;

import com.wistron.avatar.sharerate.common.vo.AvatarResponse;
import com.wistron.avatar.sharerate.common.vo.JobApiRequestVo;
import com.wistron.avatar.sharerate.summary.sharerate.function.CbgDailyDataFunction;
import com.wistron.avatar.sharerate.summary.sharerate.function.ShareRateFunction;
import com.wistron.avatar.sharerate.summary.sharerate.function.impl.CbgDailyDataFunctionImpl;
import com.wistron.avatar.sharerate.summary.sharerate.function.impl.ShareRateFunctionImpl;
import com.wistron.avatar.sharerate.summary.sharerate.vo.QueryVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class ShareRateController {
    private static final Logger logger = LoggerFactory.getLogger(ShareRateController.class);

    @PostMapping(path = "/genShareRateAltGroupTarget")
    public AvatarResponse genShareRateAltGroupTarget(@RequestBody JobApiRequestVo<QueryVO> request) {
        AvatarResponse response = new AvatarResponse();
        try {
            CbgDailyDataFunction fun = new CbgDailyDataFunctionImpl();
            QueryVO queryVO = request.getJobParameter().getRequestInfo();
            response = fun.saveCbgDailyData(queryVO);
        } catch (Exception e) {
            logger.error("genShareRateAltGroupTarget : ", e);
            response.setMessage(e.getMessage());
            response.setResult("9000000");
        }
        return response;
    }

    @PostMapping(path = "/genShareRate")
    public AvatarResponse genShareRate(@RequestBody JobApiRequestVo<QueryVO> request) {
        AvatarResponse response = new AvatarResponse();
        try {
            ShareRateFunction fun = new ShareRateFunctionImpl();
            QueryVO queryVO = request.getJobParameter().getRequestInfo();
            response = fun.genShareRateResult(queryVO);
        } catch (Exception e) {
            logger.error("genShareRate : ", e);
            response.setMessage(e.getMessage());
            response.setResult("9000000");
        }
        return response;
    }
}
