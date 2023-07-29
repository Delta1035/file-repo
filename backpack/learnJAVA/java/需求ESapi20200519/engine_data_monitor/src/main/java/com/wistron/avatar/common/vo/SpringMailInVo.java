package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Setter
@Getter
public class SpringMailInVo {
	private String[] to;
	private String[] cc;
	private String subject;
	private String body;
	private File[] files;
}
