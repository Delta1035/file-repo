package com.wistron.avatar.effective.service.postgre;

import com.wistron.avatar.common.entity.postgre.AtBaModifyLog;

public interface IPostgreUpdateLogService {
    public void updateTableModifiedInfo(AtBaModifyLog atBaModifyLog);
}
