<template>
    <div class="snow-tab-container">
        <div class="snow-tab-wrap" ref="wrap">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'snow-tab-container',
        props: {},
        data() {
            return {
                prev: {
                    x: 0,
                    y: 0
                }
            };
        },
        methods: {
            
        }
    };
</script>

<style lang="scss" scoped>
    .snow-tab-wrap {
        position: relative;
        width: 100%;
        overflow: hidden;
        .snow-tab-wrap {
            display: box;
            display: -webkit-box;
            display: flex;
        }
    }
</style>

