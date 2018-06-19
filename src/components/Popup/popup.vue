<template>
    <div class="popup">
        <transition name="overlay">
            <div v-show="value" @click.self="handleClick" class="popup-overlay-container"
                :class="'popup-position-' + popupPosition">
                <transition :name="popupName">
                    <div v-show="value" class="popup-content" :style="{'width': width}">
                        <slot />
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            popupTranstion: {
                type: String,
                default: ''
            },
            popupPosition: {// popup出现的位置
                type: String,
                default: ''
            },
            toBlock: {// popup出现的位置
                type: Boolean,
                default: false
            },
            close: {
                type: Function
            }
        },
        data() {
            return {
                popupName: this.popupTranstion,
                width: this.toBlock? '100%' : 'auto'
            };
        },
        methods: {
            handleClick() {
                this.$emit('input', false);
                // 触发关闭事件
                this.$emit('close');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .popup {
        position: relative;

        .popup-overlay-container {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, .4);
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: center;

            &.popup-position-top {
                -webkit-box-align: start;
                align-items: flex-start;
            }
            &.popup-position-bottom {
                -webkit-box-align: end;
                align-items: flex-end;
            }
            &.popup-position-left {
                -webkit-box-pack: start;
                justify-content: flex-start;
            }
            &.popup-position-right {
                -webkit-box-pack: end;
                justify-content: flex-end;
            }

            .popup-content {
                width: auto;
                height: auto;
                transition: all .4s ease-out;
            }
        }
    }

    .overlay-leave-active {
        transition: opacity .2s .2s;
        opacity: .1;
    }

    // 默认
    .v-enter,
    .v-leave-active {
        opacity: 0;
    }

    // 淡入淡出
    .popup-opacity-enter,
    .popup-opacity-leave-active {
        opacity: 0;
    }

    // 缩放
    .popup-scale-enter,
    .popup-scale-leave-active {
        -webkit-transform: scale(.25);
        transform: scale(.25);
    }

    // 右滑
    .popup-slide-right-enter,
    .popup-slide-right-leave-active {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }

    // 左滑
    .popup-slide-left-enter,
    .popup-slide-left-leave-active {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    // 上滑
    .popup-slide-top-enter,
    .popup-slide-top-leave-active {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    // 下滑
    .popup-slide-bottom-enter,
    .popup-slide-bottom-leave-active {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
</style>

