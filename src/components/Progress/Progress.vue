<template>
    <div class="snow-progressbar">
        <div v-if="standard || rote < standard" class="progress-standard" :style="{'left': standard + '%'}"></div>
        <div class="progress-bar" :style="{'width': barWidth + '%'}" :class="{'done': rote >= standard}"></div>
    </div>
</template>

<script>
    export default {
        name: 'pro',
        props: {
            rote: {
                type: Number,
                default: 0
            },
            standard: { //阈值
                type: Number,
                default: 0
            }
        },
        data() {
            return {};
        },
        computed: {
            barWidth() {// 对比率大于100处理
                return this.rote < 100 ? this.rote : this.rote % 100;
            }
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
            height: 100%;
            border-radius: remfun(9);
            background: linear-gradient(to right, #FFCB0B, #FF9E3B);
            z-index: 10;

            &.done {
                background: linear-gradient(to right, #3DDD8A, #00C3A6);
            }
        }
    }
</style>
