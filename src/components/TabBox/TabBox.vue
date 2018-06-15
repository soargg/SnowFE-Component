<template>
    <div class="snow-tab-box">
        <div class="snow-tab-wrap"
            :style="{
                'transform': 'translate('+ distance +'px, 0)',
                'transition-duration': duration +'s'
            }"
            @touchstart="touchStart($event)"
            @touchmove.prevent="touchMove($event)"
            @touchend="touchEnd($event)"
            ref="wrap">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'snow-tab-box',
        props: {},
        data() {
            return {
                wrap: null,
                index: 0,// tabitem 索引
                count: 0,// item 总数
                stepLen: 0, // 横滑步长
                isTouching: false,// 手指正在触碰
                duration: 0,// 动画过渡时间单位 s
                startX: 0,// 记录手指触碰的初始位置
                prevX: 0,// 记录当前滑动的距离
                deltaX: 0,// 记录手指滑动的距离
            };
        },
        computed: {
            distance() {// slide滑动的距离
                if (this.isTouching) {
                    return -this.index * this.stepLen + this.deltaX;
                }
                return -this.index * this.stepLen;
            }
        },
        mounted() {
            this.stepLen = this.$refs.wrap.offsetWidth;
            window.addEventListener('resize', () => { this.stepLen = this.$refs.wrap.offsetWidth; }, false);
            this.count = this.$refs.wrap.childElementCount;
        },
        methods: {
            touchStart(e) {// 触碰屏幕瞬间
                // 点击时deltaX 清零
                this.deltaX = 0;
                this.isTouching = true;
                this.duration = 0;
                let point = this.getPoint(e);
                this.startX = point.pageX;
            },
            touchMove(e) {// 滑动中
                let point = this.getPoint(e);
                let deltaX = point.pageX - this.startX;
                // 第一页右滑或做后一页左滑时缓冲
                if ((this.index - 1 < 0 && deltaX > 0) || (this.index + 1 >= this.count) && deltaX < 0) {
                    let rate = Math.abs(deltaX / this.stepLen);
                    this.deltaX = deltaX * (1 - rate);
                }else {
                    this.deltaX = deltaX;
                }
            },
            touchEnd(e) {// 触碰结束
                this.isTouching = false;
                this.duration = 0.3;
                //当滑动距离
                if ( Math.abs(this.deltaX / this.stepLen) < 0.3) return;
                if (this.deltaX > 0) {
                    if(this.index - 1 >= 0) {
                        this.index--;
                    }
                }else {
                    if(this.index + 1 < this.count) {
                        this.index++;
                    }
                }
            },
            getPoint(e) {// 默认以第一个手指的位置计算
                return e.touches ? e.touches[0] : e;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .snow-tab-box {
        position: relative;
        overflow: hidden;
        .snow-tab-wrap {
            display: box;
            display: -webkit-box;
            display: flex;
        }
    }
    
</style>

