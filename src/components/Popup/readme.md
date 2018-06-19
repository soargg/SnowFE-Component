---
title: Popup
tags: popup component
---

# Popup

弹出框，可自定义内容。

## 引入

组件内使用

```javascript
import Popup from "../../appassets/components/Popup";
export default {
    components: {
        "t-popup": Popup,
    }
};
```

全局注册popup组件

```javascript
import Vue from 'vue';
import Popup from "../../appassets/components/Popup";
Vue.use(Popup);
```

## 例子

将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `popup` 的显示与隐藏。

`popup-transtion`可以设置 `Popup`入场和离场时的动画

```html
<template>
    <t-popup v-model="ispop" popup-transtion="popup-scale">
        <!-- 内容 -->
    </t-popup>
  	<button @click="ispop = true">Popup</button>
</template>
<script>
    export default {
        data() {
            return {
                ispop: false
            }
        }
    };
</script>

```

## API

| 参数              | 说明             | 类型      | 可选值                                      | 默认值       |
| --------------- | -------------- | ------- | ---------------------------------------- | --------- |
| model           | 是否创建一个 modal 层 | Boolean |                                          | false     |
| popup-transtion | 显示/隐藏的动画效果     | String  | 'opacity'<br>'scale'<br>'slide-right'<br>'slide-left'<br>'slide-top'<br>'slide-bottom' | 'opacity' |

## 事件

| 事件    | 描述         | 参数   |
| ----- | ---------- | ---- |
| close | popup关闭时触发 | -    |

## Slot

| name | 描述     |
| ---- | ------ |
| -    | 弹出框的内容 |

---

## 展示

![popup](../../assets/img/component/popup/popup.png)