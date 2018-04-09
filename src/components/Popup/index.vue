<template>
    <div class="popup">
        <transition :name="popupName">
            <div class="popup-overlay-container" v-show="value" @click.self="handleClick">
                <div class="popup-content">
                    <slot />
                </div>
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
            close: {
                type: Function
            }
        },
        data() {
            return {
                popupName: this.popupTranstion
            };
        },
        methods: {
            handleClick() {
                this.$emit('input', false);
                // 出发关闭事件
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
            background-color: rgba(0, 0, 0, .5);
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease-out;

            .popup-content {
                width: 85%;
                height: 85%;
                background-color: #fff;
            }
        }
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

