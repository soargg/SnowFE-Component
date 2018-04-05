<template>
    <div class="fold-container">
        <div class="fold-box" ref="foldbox" :class="{'folded': more}">
            <div ref="foldlist">
                <slot />
            </div>
        </div>
        <div class="fold-item fold-more" @click="fold" v-show="more">
            <span v-show="!isClose">收起</span>
            <span v-show="isClose">更多</span>
            <span class="fold-icon-more" :class="{'fold-icon-more-up': !isClose}">
                <t-icon type="more_unfold"/>
            </span>
        </div>
    </div>
</template>

<script>
    import Icon from '../Icon';
    export default {
        data() {
            return {
                more: false,// 更多按钮展示
                isClose: true // 手风琴列表是否被折叠
            }
        },
        mounted() {
            // 展开与收起的容器
            this.foldbox = this.$refs.foldbox;
            // 用于计算所有项目的总高度；
            this.foldlist = this.$refs.foldlist;
            // 所有的列表项（元素节点）
            let lis = [].filter.call(this.foldlist.childNodes, item => item.nodeType === 1)
            let len = lis.length;
            
            if (len > 3) {
                // 如果项目的总数大于3，累加前两个项目的高度
                this.initHeight = lis.slice(0, 2).reduce((x, y) => x.offsetHeight + y.offsetHeight);
                this.foldbox.setAttribute('style', 'height:' + this.initHeight + 'px');
                this.more = true;
            }
        },
        methods: {
            fold() {
                if (this.isClose) {
                    this.foldbox.setAttribute('style','height:' + this.foldlist.offsetHeight + 'px');
                }
                else {
                    this.foldbox.setAttribute('style', 'height:' + this.initHeight + 'px');
                    // this.foldbox.removeAttribute('style');
                }

                this.isClose = !this.isClose;
            }
        },
        components: {
            't-icon': Icon
        },
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    
    .fold-container {
        background-color: #ffffff;
        border-top: 1px solid #E6E6E6;

        .fold-box {
            padding: remfun(8) 0;
            -webkit-transition: height .5s;
            transition: height .5s;

            &.folded {
                height: remfun(120);
                overflow: hidden;
            }
        }

        .fold-more {
            padding: remfun(8) 0;
            border-top: 1px solid #E6E6E6;
            text-align: center;
            font-size: remfun(28);
            line-height: remfun(44);
            color: #666;
            box-shadow: 0 2px 2px #E6E6E6;

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