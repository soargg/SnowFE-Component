---
title: Loading
tags: Loading component
---

# Loading

加载时的等待动画特效。

## 引入

组件内使用

```javascript
import Loading from '../../appassets/components/Loading';
// 显示loading效果
Loading.loading('页面加载中');
// 关闭loading
Loading.close();
```

全局注册Loading

```javascript
import Vue from 'vue';
import Loading from '../../appassets/components/Loading';
Vue.use(Loading);
```

在组件中需要时使用

```javascript
this.$Loading.loading('页面加载中');
this.$Loading.close();
```

## 例子

Loading

![loading](../../assets/img/component/loading/loading.png)