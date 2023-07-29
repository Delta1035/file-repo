package com.wistron.avatar.lineworkcentermap.controlller;

import com.wistron.avatar.common.util.GlobalStaticUtil;
import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.JobParamVo;
import com.wistron.avatar.common.vo.RequestInfo;
import com.wistron.avatar.lineworkcentermap.service.impl.GetDateFormESImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/es")
public class GenSfcLineStage {

    @Autowired
    GetDateFormESImplService getDateFormESImpl;

    @PostMapping(value="/genSfcLineStage",produces = "application/json")
    ApiResponseVo<RequestInfo> genSfcLineStage(@RequestBody JobParamVo<RequestInfo> request){
        RequestInfo requestInfo = request.getRequestInfo();
        ApiResponseVo<RequestInfo> apiResponseVo = new ApiResponseVo(requestInfo);
        this.getDateFormESImpl.getDateFromES(requestInfo);
        GlobalStaticUtil.responseObject = requestInfo;
       return apiResponseVo;
   }

}
