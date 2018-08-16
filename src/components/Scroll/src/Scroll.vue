<template>
    <div class="snow-Scroll-box" ref="box">
        <div class="snow-scroll-container"
            ref="wrap"
            :style="{
                'transform': 'translate(0, '+ distance +'px)',
                'transition-duration': duration +'s'
            }"
            @touchstart.stop="startDrag($event)"
            @touchmove.stop.prevent="onDrag($event)"
            @touchend.stop="endDrag($event)">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
        },
        data() {
            return {
                currentY: 0, // 当前滑动的距离
                maxlen: 0,
                duration: 0,// 动画过渡时间
                deltaY: 0,// 记录指尖y轴滑动的距离
                wrapH: 0,
                boxH: 0,
                startPoint: {x:0, y:0},// 记录手指触碰的初始位置
                deltaTime: 0,//
                isTouching: false
            };
        },
        computed: {
            distance() {
                this.$emit('pageScroll');
                return this.isTouching ? this.currentY + this.deltaY : this.currentY;
            }
        },
        mounted() {
            this.boxH = this.$refs.box.offsetHeight;
            this.wrapH = this.$refs.wrap.offsetHeight;
            this.maxlen = this.wrapH - this.boxH;
        },
        updated() {
            // 当内容的高度变化时，重新设置maxlean属性， 并恢复初始状态；
            if (this.wrapH != this.$refs.wrap.offsetHeight) {
                this.wrapH = this.$refs.wrap.offsetHeight;
                this.maxlen = this.wrapH - this.boxH;
                this.currentY = 0;
                this.deltaY = 0;
                this.duration = 0;
            }
        },
        methods: {
            startDrag(e) {
                // 初始化一些变量
                this.deltaY = 0;
                this.duration = 0;
                this.isTouching = true;
                const point = this.getPoint(e);
                // 记录初始坐标
                this.startPoint.x = point.pageX;
                this.startPoint.y = point.pageY;

                // 记录触碰时的时间
                this.deltaTime = Date.now();
            },
            onDrag(e) {
                const point = this.getPoint(e);
                let deltaX = point.pageX- this.startPoint.x;
                let deltaY = point.pageY - this.startPoint.y;
                let k = deltaY / deltaX;
                if (Math.abs(k) >= 1.732) {
                    if ((this.currentY + deltaY) > 0) {
                        let overlen = 1 - (this.currentY + deltaY) / 400;
                        deltaY = deltaY * (overlen > 0 ? overlen : 0);
                    }
                    if ((this.currentY + deltaY) < -this.maxlen) {
                        let overlen = 1 - (-this.maxlen - (this.currentY + deltaY)) / 400;
                        deltaY = deltaY * (overlen > 0 ? overlen : 0);
                    }
                    this.deltaY = deltaY;
                }
            },
            endDrag() {
                this.currentY += this.deltaY;
                // 手指滑动屏幕所用的时间
                this.deltaTime = Date.now() - this.deltaTime;
                if (this.deltaTime < 400 && Math.abs(this.deltaY) > 50) {
                    // 加速度 末速度 
                    let a = 1.5; // px/s
                    let endV = this.deltaY / this.deltaTime; // px/ms
                    this.duration = Math.abs(endV / a) * 2;
                    // 缓冲距离 // v0*v0 / 2a = s 位移
                    let bufferDistance = parseInt(endV * endV / (2 * a) * 1500);
                    this.currentY += this.deltaY > 0 ? bufferDistance : -bufferDistance;
                };
                if (this.currentY > 0) {
                    this.duration = 0.5;
                    this.currentY = 0;
                    // 触发到达顶部事件
                    this.$emit('toTop');
                } else if (this.currentY < -this.maxlen) {
                    this.duration = 0.5;
                    this.currentY = (this.wrapH <= this.boxH) ? 0 : -this.maxlen;
                    // 触发到达底部事件
                    this.$emit('toBottom');
                } else {
                    // 处于中间状态
                    if (Math.abs(this.deltaY) > 10) {
                        this.$emit('inMiddle');
                    }
                }
                this.isTouching = false;
            },
            getPoint(e) {// 默认以第一个手指的位置计算
                return e.touches ? e.touches[0] : e;
            },
            reset() {
                // 初始化位置
                this.currentY = 0;
                this.deltaY = 0;
                this.duration = 0;
            }
        }
    };
</script>

<style scoped lang="scss">
    .snow-Scroll-box {
        height: 100%;
        overflow: hidden;
        .snow-scroll-container {
            transition-timing-function: cubic-bezier(0.32, 0.9, 0.49, 0.99);
        }
    }
</style>
