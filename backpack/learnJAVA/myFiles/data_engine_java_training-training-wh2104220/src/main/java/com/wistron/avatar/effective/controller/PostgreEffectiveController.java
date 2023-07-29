package com.wistron.avatar.effective.controller;
import com.wistron.avatar.effective.service.GenAtBaMoLineEffectiveService;
import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.GenAtBaMoLineEffectiveRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/postgre")
@RestController
public class PostgreEffectiveController {
        @Autowired
        GenAtBaMoLineEffectiveService genAtBaMoLineEffectiveService;

    @PostMapping(value = "/genAtBaMoLineEffective",produces = "application/json")
    public ApiResponseVo<String> genAtBaMoLineEffective(@RequestBody GenAtBaMoLineEffectiveRequest request){
        try{
            return this.genAtBaMoLineEffectiveService.genAtBaMoLineEffective(request);
        }catch (Exception e){
            return new ApiResponseVo("9000000",e.getMessage(),request.requestInfo);
        }
    }
}
