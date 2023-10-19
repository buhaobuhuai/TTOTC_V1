<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-02-19 13:38:22
 * @LastEditTime : 2023-04-01 20:08:48
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\components\table\basics-table.vue
-->
<!-- 基础表格模板 -->
<template>
    <el-table :data="dateList" stripe style="width: 100%">
        <!-- {{dateList}} -->
        <el-table-column v-for="item in headerList" :key="item.id" :prop="item.id" :label="item.name">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'basics-table',
    props: {
        dateList: Array,
        headerList: Array
    }
}
</script>

<style>
</style>
