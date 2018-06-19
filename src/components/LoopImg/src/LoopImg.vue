<template>
    <div class="snow-loop-img-container">
        <ul class="snow-loop-img-wrap"
            :style="{
                'transform': 'translate('+ distance +'px, 0)',
                'transition-duration': transTime +'s'
            }"
            @touchstart="touchstart($event)"
            @touchmove.prevent="touchmove($event)"
            @touchend="touchend($event)"
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
                index: 1,// 图片索引
                count: 0,// 图片的数量
                stepLen: 0,// 每次滑动的距离
                isTouching: false,// 手指正在触碰
                transTime: 0,// 动画过渡时间单位 s
                startX: 0,// 记录手指触碰的初始位置
                prevX: 0,// 记录当前滑动的距离
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
        mounted() {
            this.wrap = this.$refs.wrap;
            this.stepLen = this.wrap.offsetWidth;
            window.addEventListener('resize', () => { this.stepLen = this.wrap.offsetWidth; }, false);
            this.$nextTick(() => {
                this.transitionEnd();
                this.active();
            });
        },
        methods: {
            active() {
                if (this.count > 1) {// 判断当前图片的数量大于1轮播
                    this.timer = setInterval(() => {
                        this.index ++;
                        this.transTime = this.duration;// 接受动画过渡时间
                    }, (this.gapTime + this.duration) * 1000);
                }
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
                if(!this.swipeable) return;
                // 已经记录滑动的距离清零
                this.deltaX = 0;
                this.isTouching = true;
                clearInterval(this.timer);
                this.transTime = 0;
                let point = this.getPoint(e);
                // 记录指尖触碰的初始位置
                this.startX = point.pageX;
                // 为避免队列尾部空白，端点处理
                this.endPoint();
            },
            touchmove(e) {// 滑动过程
                if(!this.swipeable) return;
                // 是否是触碰滑动中
                let point = this.getPoint(e);
                // 获取手指滑动的间距
                this.deltaX = point.pageX - this.startX;
            },
            touchend(e) {// 滑动结束
                if(!this.swipeable) return;
                // 手指离开
                this.isTouching = false;
                this.transTime = 0.3;
                if (this.deltaX > 0) { //右滑，index--
                    if ((this.deltaX / this.stepLen) > 0.3) {
                        this.index--;
                    }
                }else {
                     if (Math.abs(this.deltaX / this.stepLen) > 0.3) {
                        this.index ++;
                    }   
                }
                // 清零 deltaX;
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
