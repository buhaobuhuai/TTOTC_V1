<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-02-19 13:38:22
 * @LastEditTime : 2023-04-01 20:09:10
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\components\breadcrumb.vue
-->
<!-- 面包屑组件 -->
<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(mbx, index) in mbx" :key="index" :to="{ path: mbx.url }">
            {{ mbx.name }}<span v-if="mbx.url == ''">({{ cion }})</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: "breadcrumb",
    props: {
        mbx: {
            type: Array,
            required: true
        },
        cion: String
    },
    data () {
        return {
            // cion: "ETH/BTC",
        }
    }
}
</script>

<style>
.el-breadcrumb {
    padding: 20px;
}
</style>
