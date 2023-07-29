package com.wistron.avatar.sharerate.summary.sharerate.function;

import com.wistron.avatar.sharerate.common.vo.AvatarResponse;
import com.wistron.avatar.sharerate.summary.sharerate.vo.QueryVO;

public interface ShareRateFunction {

    AvatarResponse genShareRateResult(QueryVO queryVO);
}
