## tips:

1. 设置默认生成 onpush 组件

```json
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "changeDetection": "OnPush"
        }
      },
```

2. 多级注入器
ModuleInjector
ElementInjector


