<template>
    <div class="fold-container">
        <div class="fold-box" ref="foldbox" :class="{'folded': more}" :style="{
            'height': boxHeight + 'px'
        }">
            <div ref="foldlist">
                <slot />
            </div>
        </div>
        <div class="fold-more" @click="fold" v-show="more">
            <span v-show="!isClose">收起全部</span>
            <span v-show="isClose">展开全部</span>
            <span class="fold-icon-more" :class="{'fold-icon-more-up': !isClose}">
                <t-icon type="more_unfold"/>
            </span>
        </div>
    </div>
</template>

<script>
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
            }
        },
        data() {
            return {
                more: false,// 更多按钮展示
                isClose: true, // 手风琴列表是否被折叠
                boxHeight: 0,
                child: 0
            }
        },
        watch: {
            child(curVal, oldVal) {
                this.resize();
                if (!this.isClose) {
                    this.isClose = true;
                }
            }
        },
        mounted() {
            // 用于计算所有项目的总高度；
            this.foldlist = this.$refs.foldlist;
            this.maxHeight = this.foldlist.offsetHeight;
            this.resize();
        },
        updated() {
            this.child = [].slice.call(this.foldlist.querySelectorAll('.tal-fold-list-item')).length;
        },
        methods: {
            fold() {
                if (this.isClose) {
                    this.boxHeight = this.maxHeight;
                }
                else {
                    this.boxHeight = this.initHeight;
                }
                this.isClose = !this.isClose;
            },
            resize() {
                this.$nextTick(() => {
                    // 计算出其中一个项目的高
                    let itemHeight = this.foldlist.querySelector('.tal-fold-list-item').offsetHeight;

                    let h = this.initialNumber * itemHeight;
                    let lis = [].slice.call(this.foldlist.querySelectorAll('.tal-fold-list-item'));
                    let len = lis.length;

                    if (len > this.initialNumber) {
                        // 如果项目的总数大于3,计算初始高度
                        h = this.initialNumber * itemHeight;
                        this.more = true;
                        this.initHeight = h;
                        this.$refs.foldbox.setAttribute('style', 'height: '+ h +'px;');
                    }else {
                        this.more = false;
                        this.$refs.foldbox.setAttribute('style', 'height: auto;');
                    }
                    this.maxHeight = len * itemHeight;
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    
    .fold-container {
        background-color: #ffffff;

        .fold-box {
            -webkit-transition: height .8s ease;
            transition: height .8s ease;
            transform: translateZ(0);
            padding-bottom:remfun(30);

            &.folded {
                overflow: hidden;
            }
        }

        .fold-more {
            padding-bottom:remfun(30);
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