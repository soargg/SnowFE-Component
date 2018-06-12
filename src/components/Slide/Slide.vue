<template>
    <div class="snow-slide-container">
        <div class="snow-slide-wrap" ref="wrap">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'snow-slide-container',
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
    .snow-slide-wrap {
        position: relative;
        overflow: hidden;

        .snow-slide-wrap {
            display: box;
            display: -webkit-box;
            display: flex;
        }
    }
</style>

