<template>
    <div>
        <transition name="overlay">
            <div v-show="isPop"  @click.self="handleCancel" class="overlay-container" @touchmove.prevent>
                <transition name="picker-slide-top">
                    <div class="tal-picker-container" v-show="isPop">
                        <div class="picker-options">
                            <div class="options-btn" @click="handleCancel">取消</div>
                            <div v-if="title" class="picker-title">{{ title }}</div>
                            <div class="options-btn" @click="handleConfirm">确定</div>
                        </div>
                        <!-- 选项 -->
                        <div class="picker-content-wheel-wrapper">
                            <div class="picker-wrap"  ref="pickerwrap">
                                <ul v-if="items.length < 1">
                                    <li class="picker-item text-color-6">没有可选项</li>
                                </ul>
                                <ul v-else>
                                    <li v-for="(item, index) in items" :key="index" class="picker-item">{{ item.text }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';

export default {
    props: {
        title: String || Number,
        items: {
            type: Array,
            default: () => []
        },
        cancel: Function,
        select: Function
    },
    data() {
        return {
            isPop: false,
            selectedIndex: 0
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.pickerwrap, {
                scrollX: false,
                scrollY: true,
                click: true,
                startY: 0,
                bounce: {
                    top: true,
                    bottom: true
                },
                momentum: false,
                wheel:{
                    selectedIndex: this.selectedIndex,
                    rotate: 25,
                    adjustTime: 400,
                    wheelWrapperClass: 'wheel-scroll',
                    wheelItemClass: 'wheel-item'
                }
            })
        });
    },
    methods: {
        show() {
            this.isPop = true;
        },
        handleCancel() {// 取消
            this.isPop = false;
            // 执行取消回调函数
            typeof this.cancel === 'function' && this.cancel();
        },
        handleConfirm() {// 确认
            let index = this.scroll.getSelectedIndex() || this.selectedIndex;
            let text = this.items[index].text;
            let value = this.items[index].value;
            this.isPop = false;
            // 执行选中回调函数
            typeof this.select === 'function' && this.select(text, value, index);
        }
    }
};
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .overlay-container {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        display: -webkit-box;
        -webkit-box-align: end;
        -webkit-box-pack: center;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .tal-picker-container {
            width: 100%;
            height: remfun(490);
            background-color: #FFFFFF;
            transition: all .4s ease-out;
            .picker-options {
                width: 100%;
                height: remfun(80);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .options-btn {
                    padding: 0 remfun(30);
                    line-height: remfun(80);
                    font-size: remfun(30);
                    color: #138EFF;
                }
                .picker-title {
                    font-size: remfun(36);
                    color: #000000;
                }
            }
        }
        .picker-content-wheel-wrapper {
            margin-top: remfun(20);
            padding: 0 remfun(75);
            height: remfun(300);
            display: flex;
            align-items: center;
            overflow: hidden;
            .picker-wrap {
                width: 100%;
                height: remfun(60);
                position: relative;
                &::before {
                    content: "";
                    position: absolute;
                    height: remfun(120);
                    width: 100%;
                    top: 0;
                    left: 0;
                    transform: translateY(-100%);
                    background: linear-gradient(rgba(255, 255, 255, .9), rgba(255, 255, 255, .1));
                    z-index: 10;
                    border-bottom: remfun(1) solid #DFDFDF; 
                }
                &::after {
                    content: "";
                    position: absolute;
                    height: remfun(120);
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    transform: translateY(100%);
                    background: linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .9));
                    z-index: 10;
                    border-top: remfun(1) solid #DFDFDF; 
                }
                .picker-item {
                    height: remfun(60);
                    width: 100%;
                    text-align: center;
                    font-size: remfun(30);
                    line-height: remfun(60);
                    box-sizing: border-box;
                }
            }
            
        }
    }
    .text-color-6 {
        color: #666666;
    }
    .overlay-leave-active {
        transition: opacity .2s .2s;
        opacity: .1;
    }
    .picker-slide-top-enter,
    .picker-slide-top-leave-active {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
</style>
