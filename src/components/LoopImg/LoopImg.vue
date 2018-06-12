<template>
    <div class="snow-loop-img-container">
        <ul class="snow-loop-img-wrap"
            :style="{
                'transform': 'translate('+ distance +'px, 0)',
                'transition-duration': transTime +'s'
            }"
            ref="wrap">
            <li v-for="(item, index) in innerImgs" :key="index" class="snow-loop-item">
                <img :src="item">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'snow-loop-img',
        props: {
            imgs: {// 图片数据
                type: Array,
                default: () => []
            },
            duration: {// 动画过渡时间 单位 s
                type: Number,
                default: 0.5
            },
            gapTime: {// 轮播图间隔时间 单位 s 
                type: Number,
                default: 3
            }
        },
        data() {
            return {
                wrap: null,
                timer: 0,// 定时器
                index: 0,// 图片索引
                count: 0,// 图片的数量
                stepLen: 0,// 每次滑动的距离
                transTime: 0.5,// 动画过渡时间单位 s
            };
        },
        computed: {
            innerImgs() {
                let arr = [];
                this.imgs.forEach(item => {
                    arr.push(item);
                });
                if (this.imgs.length > 1) {
                    arr.push(this.imgs[0]);
                }
                this.count = arr.length;
                return arr;
            },
            distance() {
                return -this.index * this.stepLen;
            }
        },
        mounted() {
            this.wrap = this.$refs.wrap;
            this.stepLen = this.wrap.offsetWidth;
            this.$nextTick(() => {
                this.transitionEnd();
                if (this.count > 1) {// 判断当前图片的数量大于1轮播
                    this.timer = setInterval(() => {
                        this.index ++;
                        this.transTime = this.duration;// 接受动画过渡时间
                    }, (this.gapTime + this.duration) * 1000);
                }
            });
        },
        methods: {
            transitionEnd() {// 图片切换结束之后处理
                // transitionend 的兼容性
                let t;
                let transitions = {
                    'transition':'transitionend',
                    'OTransition':'oTransitionEnd',
                    'MozTransition':'transitionend',
                    'WebkitTransition':'webkitTransitionEnd'
                };
                for(t in transitions) {
                    if (this.$refs.wrap.style[t] !== undefined) break;
                }
                this.$refs.wrap.addEventListener(transitions[t], () => {
                    if (this.index + 1 >= this.count) {
                        this.index = 0,
                        this.transTime = 0;
                    }
                });
            }
        }
    };
</script>

<style lang='scss' scoped>
    .snow-loop-img-container {
        position: relative;
        overflow: hidden;

        .snow-loop-img-wrap {
            width: 100%;
            display: box;
            display: -webkit-box;
            display: flex;
            transition: transform 0.8s linear;

            .snow-loop-item {
                width: 100%;
                flex-shrink: 0;

                >img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
</style>
