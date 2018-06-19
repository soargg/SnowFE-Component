---
title: LoopImg
tags: LoopImg component 轮播图
---

# LoopImg

基于Vue，可横滑的无缝轮播图；

## 引入使用

```vue
<template>
	<div class="loop-wrap">
        <loop-img :imgs="imgs" :duration="0.5" :swipeable="true" :gap-time="4"/>
    </div>
</template>
<script>
    import loopImg from '../../appassets/components/LoopImg';
    export default {
        data() {
            return {
                imgs: [
                    {
                        imgSrc: '/src/assets/img/bg1/bg1.jpg',
                        link: 'https://tall-ui.github.io'
                    },
                    '/src/assets/img/bg1/bg2.jpg',
                    '/src/assets/img/bg1/bg3.jpg',
                    '/src/assets/img/bg1/bg4.jpg',
                ]
            };
        },
        component: {
            loopImg
        }
    };
</script>
```

## 例子

通过属性`imgs`向组件传递一个存放图片地址的数组，如果点击图片可以跳转的，每一项为一个对象，包含两个属性，`imgSrc` 和`link`，分别存放图片地址，和跳转链接；

图片：暂无

## API

| 参数           | 说明                   | 类型          | 可选值           | 默认值 |
| -------------- | ---------------------- | ------------- | ---------------- | ------ |
| imgs           | 图片地址集合           | Array         | ['/bg1/bg2.jpg'] | []     |
| imgs[i]        | 图片地址或图片信息相关 | String/Object | -                | -      |
| imgs[i].imgSrc | 图片地址               | String        | -                | -      |
| imgs[i].link   | 跳转落地链接           | String        | -                | -      |
| duration       | 动画过渡时间 单位 s    | Number        | -                | 0.5    |
| gapTime        | 轮播图间隔时间 单位 s  | Number        | -                | 4      |
| swipeable      | 是否可滑动             | Boolean       | true,false       | true   |

