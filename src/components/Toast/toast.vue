<template>
    <transition name="toast-pop">
        <div class="toast" v-show="visible" :class="customClass">
            <span class="toast-text">{{ text }}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            text: String,
            position: {
                type: String,
                default: 'middle'
            }
        },
        data() {
            return {
                visible: false
            };
        },
        computed: {
            customClass() {
                var classes = [];
                switch (this.position) {
                case 'top':
                    classes.push('placetop');
                    break;
                case 'bottom':
                    classes.push('placebottom');
                    break;
                default:
                    classes.push('placemiddle');
                }
                classes.push(this.className);
                return classes;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }

    .toast {
        position: fixed;
        max-width: 80%;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.7);
        color: #FFFFFF;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        transition: opacity .3s linear;
        padding: 10px;

        .toast-text {
            font-size: 14px;
            display: block;
            text-align: center;
        }
        // 顶部
        &.placetop {
            top: 50px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        // 中部
        &.placemiddle {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        // 底部
        &.placebottom {
            bottom: 50px;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }

    .toast-pop-enter, .toast-pop-leave-active {
        opacity: 0;
    }
</style>
