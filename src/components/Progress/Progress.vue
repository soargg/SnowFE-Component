<template>
    <div class="snow-progressbar">
        <div v-if="(standard == 0) || (rate < standard)" class="progress-standard" :style="{'left': standard + '%'}"></div>
        <div class="progress-bar" :style="{'width': (active ? activeWidth : barWidth) + '%'}" :class="{'done': rate >= standard}"></div>
    </div>
</template>

<script>
    export default {
        name: 'pro',
        props: {
            rate: {
                type: Number,
                default: 0
            },
            standard: { //阈值
                type: Number,
                default: 0
            },
            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeWidth: 0,
            };
        },
        computed: {
            barWidth() {// 对比率大于100处理
                return this.rate < 100 ? this.rate : this.rate % 100;
            }
        },
        watch: {
            barWidth(val) {
                this.activeWidth = val;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.activeWidth = this.barWidth;
            });
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem;
    }

    .snow-progressbar {
        position: relative;
        width: 100%;
        height: remfun(18);
        border-radius: remfun(9);
        background-color: #F1F1F1;

        .progress-standard {
            position: absolute;
            width: remfun(4);
            height: 100%;
            top: 0;
            transform: translateX(-50%);
            background-color: #E0E0E0;
            z-index: 5;
        }

        .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            border-radius: remfun(9);
            background: linear-gradient(to right, #FFCB0B, #FF9E3B);
            transition: width .8s ease;
            z-index: 10;

            &.done {
                background: linear-gradient(to right, #3DDD8A, #00C3A6);
            }
        }
    }
</style>
