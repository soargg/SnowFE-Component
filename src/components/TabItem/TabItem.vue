<template>
    <div class="snow-tab-item">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'snow-tab-item',
        props: ['id']
    };
</script>

<style lang='scss' scoped>
    .snow-tab-item {
        flex-shrink: 0;
        width: 100%;
    }
</style>

