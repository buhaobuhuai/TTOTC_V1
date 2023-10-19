<!--
 * @Author       : wenquan
 * @desc         : 订单状态列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-02-26 15:54:48
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\table\oder-table.vue
 -->
<template>
    <el-table :data="oderList"
              stripe
              style="width: 100%">
        <el-table-column prop="pair"
                         label="id"></el-table-column>
        <el-table-column prop="last_price"
                         label="币商"></el-table-column>
        <el-table-column prop="cgabge"
                         label="法币"></el-table-column>
        <el-table-column prop="high"
                         label="虚拟币"></el-table-column>
        <el-table-column prop="low"
                         label="时间"></el-table-column>
        <el-table-column prop="day_vol"
                         label="金额"></el-table-column>
        <el-table-column prop="day_turnover"
                         label="凭证"></el-table-column>
        <el-table-column prop="day_turnover"
                         width="120"
                         label="凭证">
            <template slot-scope="scope">
                <el-button type="text">点击查看</el-button>
            </template>

        </el-table-column>
        <el-table-column prop="type"
                         width="140"
                         label="类型"></el-table-column>
        <el-table-column prop="state"
                         label="状态"></el-table-column>
        <el-table-column prop="action"
                         width="300"
                         label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">查看</el-button>
                <el-button @click="handleClick(scope.row)"
                           type="success"
                           plain
                           size="small">支付</el-button>
                <!-- <el-button @click="handleClick(scope.row)"
                           type="warning"
                           plain
                           size="small">已收款</el-button> -->
                <el-button @click="handleClick(scope.row)"
                           type="danger"
                           plain
                           size="small">申诉</el-button>

                <!-- <el-button @click="handleClick(scope.row)"
                           :type="oderCut==='acBuy'?'success':'danger'"
                           size="small"
                           plain>{{oderCut==='oder-sale'?'购买USTD':'卖出USDT'}}</el-button> -->
            </template>
        </el-table-column>

    </el-table>
</template>

<script>

import centerDig from '@/components/createOder/center-dig.vue'
export default {
    name: 'invest-table',
    components: {
        centerDig
    },
    props: {
        oderList: Array,
        oderCut: String,
        dialogVisible: Boolean
    },
    data () {
        return {
            name: "投资",
            // dialogVisible: false,
            // activeName: 'acBuy',
        }
    },
    created () {

    },
    methods: {
        handleClick (e) {
            this.$emit('update:dialogVisible', !this.dialogVisible)
        }
    }
}
</script>

<style>
</style>
