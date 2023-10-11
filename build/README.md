# Antdv5 StyleProvider兼容

## 复现启动

执行以下命令启动 会使用antd.min.js来运行

```
npm start
```

## 正常启动

执行以下命令启动，会使用常规引用antd

```
npm run normal
```

### 代码示意

在`App.tsx`中会使用StyleProvider并且配置一个`transformer`

在transformer会输出日志

- 在使用antd.min.js时transformer不生效

- 相反不使用antd.min.js时，transformer会执行

