<template>
    <div>
        <transition name="overlay">
            <div v-show="isPop"  @click.self="handleCancel" class="overlay-container" @touchmove.prevent>
                <transition name="picker-slide-top">
                    <div class="tal-picker-container" v-show="isPop">
                        <div class="picker-options">
                            <div class="options-btn" @click="handleCancel">取消</div>
                            <div v-if="title" class="picker-title">{{ title }}</div>
                            <div class="options-btn">确定</div>
                        </div>
                        <!-- 选项 -->
                        <div class="picker-content-wheel-wrapper">
                            <div class="picker-wrap"  ref="pickerwrap">
                                <ul>
                                    <li v-for="i in 10" :key="i" class="picker-item">{{i}}</li>
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
        cancel: Function,
        select: Function
    },
    data() {
        return {
            isPop: false
        };
    },
    mounted() {
        this.$nextTick(() => {
            let scroll = new BScroll(this.$refs.pickerwrap, {
                scrollX: false,
                scrollY: true,
                click: true,
                startY: 0,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: .3,
                    speed: 400
                },
            })
        });
    },
    methods: {
        show() {
            this.isPop = true;
        },
        handleCancel() {
            this.isPop = false;
            typeof this.cancel === 'function' && this.cancel();
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
                height: remfun(60);;

                .picker-item {
                    height: remfun(60);
                    width: 100%;
                    text-align: center;
                    font-size: remfun(30);
                    line-height: remfun(60);
                    box-sizing: border-box;
                    border-bottom: remfun(1) solid #DFDFDF; 
                }
            }
            
        }
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
