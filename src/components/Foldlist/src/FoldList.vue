<template>
    <div class="fold-container">
        <div class="fold-box" ref="foldbox"
            :class="{
                'folded': !more,
                'active': isActive
            }"
            :style="{
                'height': boxHeight + 'px'
            }">
            <div ref="foldlist" id="foldlist">
                <slot />
            </div>
        </div>
        <div class="fold-more" @click="fold" v-show="more">
            <span>{{isClose ? openText : foldText}}</span>
            <span class="fold-icon-more" :class="{'fold-icon-more-up': !isClose}">
                <t-icon type="more_unfold"/>
            </span>
        </div>
    </div>
</template>

<script>
    import tIcon from '../../Icon'
    export default {
        name: 'Foldlist',
        props: {
            sideBySide: {
                type: Number,
                default: 1
            },
            initialNumber: {
                type: Number,
                default: 2
            },
            foldText: {
                type: String,
                default: '收起全部'
            },
            openText: {
                type: String,
                default: '展开全部'
            }
        },
        data() {
            return {
                more: false,// 更多按钮展示
                isClose: true, // 手风琴列表是否被折叠
                boxHeight: 0,
                childCount: 0,
                isActive: false,
                top: 0
            }
        },
        watch: {
            childCount(curVal, oldVal) {
                this.resize();
                if (!this.isClose) {
                    this.isClose = true;
                }
            }
        },
        mounted() {
            // 用于计算所有项目的总高度；
            setTimeout(()=> {
                this.foldlist = this.$refs.foldlist;
                this.childCount = [].slice.call(this.foldlist.querySelectorAll('.tal-fold-list-item')).length;
                // 计算出其中一个项目的高
                let item = this.foldlist.querySelector('.tal-fold-list-item');
                let itemHeight = (item.getBoundingClientRect && item.getBoundingClientRect().height) || item.offsetHeight;
                this.initHeight = this.initialNumber * itemHeight;
                // 处理列表
                this.resize();
            },20)
        },
        updated() {
            this.childCount = [].slice.call(this.foldlist.querySelectorAll('.tal-fold-list-item')).length;
        },
        methods: {
            fold() {
                if (this.isClose) {
                    this.top = this.foldlist.offsetTop;
                    // 遮挡层的高度等于内容的的总高度
                    this.boxHeight = (this.foldlist.getBoundingClientRect && this.foldlist.getBoundingClientRect().height) || this.foldlist.offsetHeight;
                }
                else {
                    window.scrollTo(0, this.top);
                    this.boxHeight = this.initHeight;
                }
                this.isClose = !this.isClose;
            },
            resize() {
                this.$nextTick(() => {
                    // 重新渲染时初始化一些变量
                    this.isActive = false;

                    // 如果列表项目的总数大于初始数目,计算初始高度
                    if (this.childCount > this.initialNumber) {
                        this.more = true;
                        this.$refs.foldbox.setAttribute('style', 'height: '+ this.initHeight +'px;');

                        // 首次展示没有动画效果
                        let timerActive = setTimeout(() => {
                            this.isActive = true;
                            clearTimeout(timerActive);
                        }, 100);
                    }else {
                        this.more = false;
                        this.$refs.foldbox.setAttribute('style', 'height: auto;');
                    }
                });
            }
        },
        components: {
            tIcon
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    };
    
    .fold-container {
        background-color: #ffffff;
        padding-bottom:remfun(30);

        .fold-box {
            height: 0;
            overflow: hidden;
            &.folded {
                overflow: auto;
            }
            &.active {
                -webkit-transition: height .8s ease;
                transition: height .8s ease;
                transform: translateZ(0);
            }
        }

        .fold-more {
            padding-top: remfun(30);
            text-align: center;
            font-size: remfun(26);
            line-height: remfun(37);
            color: #999;

            .fold-icon-more {
                display: inline-block;
                -webkit-transition: transform .5s;
                transition: transform .5s;

                &.fold-icon-more-up {
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>