package com.wistron.avatar.sharerate.common.vo;

public class JobApiRequestVo<T> {
    private String jobApi;
    private JobParamVo<T> jobParameter;

    public String getJobApi() {
        return jobApi;
    }

    public void setJobApi(String jobApi) {
        this.jobApi = jobApi;
    }

    public JobParamVo<T> getJobParameter() {
        return jobParameter;
    }

    public void setJobParameter(JobParamVo<T> jobParameter) {
        this.jobParameter = jobParameter;
    }
}