<template>
    <div class="snow-slide-item">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'snow-slide-item',
        props: ['id']
    };
</script>

<style lang='scss' scoped>
    .snow-slide-item {
        flex-shrink: 0;
        width: 100%;
    }
</style>

