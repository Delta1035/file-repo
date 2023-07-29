package com.wistron.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

public @interface myAnnotation {
    int type() default 0;
    String level() default "info";
    String value() default  "";
}
