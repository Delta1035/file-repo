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