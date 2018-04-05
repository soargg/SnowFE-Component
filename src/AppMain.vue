<template>
    <div class="container">
        <h1>Hello World!!</h1>
        <t-icon type="4column"/>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 5" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 1" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 3" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 4" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
    </div>
</template>

<script>
    import Icon from './components/Icon';
    import Foldlist from './components/Foldlist';
    import Folditem from './components/Folditem';
    export default {
        data() {
            return {};
        },
        components: {
            't-icon': Icon,
            't-foldlist': Foldlist,
            't-folditem': Folditem
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .container {
        background-color: #eeeeee;
    }

    .box {
        margin-bottom: remfun(20);

        .item {
            padding-left: remfun(20);
        }
    }
</style>
