<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-04-01 10:51:25
 * @LastEditTime : 2023-04-02 10:33:41
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\components\backStage\components\content.vue
-->
<template>
    <el-row class="content">
        <el-col :span="24">
            <!-- <div class="content-header">
                        页签区
                    </div> -->
            <div class="content-actionScope">
                <el-scrollbar wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view"
                    class="default-scrollbar appsrolclbar">
                    <slot></slot>
                </el-scrollbar>
            </div>
        </el-col>

    </el-row>
</template>

<script>
export default {
    name: '',
    mixins: [],
    components: {

    },
    props: {

    },
    data () {
        return {

        }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {

    },
    destroyed () {

    },
    methods: {

    }
}
</script>
<style scoped lang='less'>
.content {
    height: 100%;
    overflow: hidden;

    .el-col {
        height: 100%;
    }

    &-header {
        height: 60px;
        line-height: 60px;
        text-align: center;
        box-shadow: 0 0 5px #b7b2b2;
        z-index: 1;
        position: relative;
    }

    &-actionScope {
        box-sizing: border-box;
        height: calc(100% - 0px);
    }

    .appsrolclbar {
        // height: calc(100% - 64px);
        height: calc(100% - 0px);
        // padding: 16px;
        box-sizing: border-box;
    }

    ::v-deep .el-scrollbar__wrap {
        overflow: auto;
        width: calc(100% + 5px);
    }
}
</style>
