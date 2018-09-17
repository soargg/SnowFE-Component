<template>
    <div class="snow-loop-img-container">
        <ul class="snow-loop-img-wrap"
            :style="{
                'transform': 'translate('+ distance +'px, 0)',
                'transition-duration': transTime +'s'
            }"
            @touchstart.stop="touchstart($event)"
            @touchmove.prevent.stop="touchmove($event)"
            @touchend.stop="touchend($event)"
            ref="wrap">
            <li v-for="(item, index) in innerImgs" :key="index" class="snow-loop-item">
                <a :href="item.link" class="link">
                    <img :src="item.imgSrc" class="loop-item">
                </a>
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
                default: 4
            },
            swipeable: { // 是否可滑动
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                wrap: null,
                timer: 0,// 定时器
                index: 0,// 图片索引
                count: 0,// 图片的数量
                stepLen: 0,// 每次滑动的距离
                isTouching: false,// 手指正在触碰
                transTime: 0,// 动画过渡时间单位 s
                startX: 0,// 记录手指触碰的初始位置
                deltaX: 0,// 记录手指滑动的距离
            };
        },
        computed: {
            innerImgs() {
                let arr = [];
                this.imgs.forEach(item => {
                    if (typeof item === 'string') {
                        arr.push({
                            imgSrc: item,
                            link: 'javascript:;'
                        });
                    }else if (Object.prototype.toString.call(item) == '[object Object]') {
                        arr.push({
                            imgSrc: item.imgSrc,
                            link: item.link
                        })
                    }
                });
                if (this.imgs.length > 1) {
                    this.index = 1;
                    arr.push(arr[0]);
                    arr.unshift(arr[arr.length - 2]);
                }
                this.count = arr.length;
                return arr;
            },
            distance() {// slide滑动的距离
                if (this.isTouching) {
                    return -this.index * this.stepLen + this.deltaX;
                }
                return -this.index * this.stepLen;
            }
        },
        watch: {
            index(val) {
                if (0 < val && val < this.count - 1) {
                    this.$emit('change', val - 1);
                }
            },
            imgs() {
                this.active();
            }
        },
        mounted() {
            // 一张图片时什么都不做；
            this.wrap = this.$refs.wrap;
            this.stepLen = this.wrap.offsetWidth;
            window.addEventListener('resize', () => { this.stepLen = this.wrap.offsetWidth; }, false);
            this.$nextTick(() => {
                this.transitionEnd();
                if (this.count <= 1) return;
                this.active();
            });
        },
        methods: {
            active() {
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.index ++;
                    this.transTime = this.duration;// 接受动画过渡时间
                }, (this.gapTime + this.duration) * 1000);
            },
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
                    this.endPoint();
                });
            },
            touchstart(e) {// 开始滑动
                if(!this.swipeable || this.count <= 1) return;
                // 已经记录滑动的距离清零
                this.deltaX = 0;
                this.isTouching = true;
                this.transTime = 0;
                let point = this.getPoint(e);
                // 记录指尖触碰的初始位置
                this.startX = point.pageX;
                // 为避免队列尾部空白，端点处理
                clearInterval(this.timer);
                this.endPoint();
            },
            touchmove(e) {// 滑动过程
                if(!this.swipeable || this.count <= 1) return;
                // 是否是触碰滑动中
                let point = this.getPoint(e);
                // 获取手指滑动的间距
                this.deltaX = point.pageX - this.startX;
            },
            touchend(e) {// 滑动结束
                if(!this.swipeable || this.count <= 1) return;
                // 手指离开
                this.isTouching = false;
                this.transTime = 0.3;

                if (Math.abs(this.deltaX / this.stepLen) > 0.1) {
                    if (this.deltaX > 0) { //右滑，index--
                        this.index--;
                    }else { // 左滑
                        this.index ++;
                    }
                }
                this.active();
            },
            getPoint(e) {// 默认以第一个手指的位置计算
                return e.touches ? e.touches[0] : e;
            },
            endPoint() {// 端点处理
                if (this.index + 1 >= this.count) {
                    this.index = 1;
                }
                if (this.index - 1 < 0) {
                    this.index = this.count - 2;
                }
                this.transTime = 0;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .snow-loop-img-container {
        position: relative;
        height: 100%;
        overflow: hidden;
        .snow-loop-img-wrap {
            display: box;
            display: -webkit-box;
            display: flex;
            transition: transform 0.8s linear;
            .snow-loop-item {
                width: 100%;
                flex-shrink: 0;
                >a.link {
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    -webkit-tap-highlight-color: transparent;
                    >img.loop-item {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
