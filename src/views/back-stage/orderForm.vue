<!--
 * @Author       : wenquan
 * @desc         : 订单管理
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 16:48:33
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\orderForm.vue
-->
<template>
    <div class='orderForm'>
        <el-row class="tab-top-autocomplete">
            <div>
                <el-form :model="shopForm" :inline="true" ref="shopForm" class="demo-form-inline" size="mini">
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="shopForm.status" placeholder="出售类型">
                            <el-option v-for="item in ztdm" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitOder('shopForm')">查询</el-button>
                        <el-button @click="resetForm('shopForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template>
                <el-table :data="dateList" stripe style="width: 100%">
                    <el-table-column prop="bzmc" label="币种" width="80"></el-table-column>
                    <el-table-column prop="sl" label="数量" width="80"></el-table-column>
                    <el-table-column prop="fbmc" label="法币" width="100"></el-table-column>
                    <el-table-column prop="je" label="金额" width="100"></el-table-column>
                    <el-table-column prop="sxf" label="手续费" width="100"></el-table-column>
                    <el-table-column prop="yhdz" label="用户" width="160"></el-table-column>
                    <el-table-column prop="ddlx" label="类型" width="80">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.ddlx == 0" type="warning">买入</el-tag>
                            <el-tag v-if="scope.row.ddlx == 1" type="success">卖出</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cjsj" label="下单时间" width="180"></el-table-column>
                    <el-table-column prop="zt" label="状态"width="120">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.zt == 1001" type="primary"><span>下单成功</span></el-tag>
                            <el-tag v-if="scope.row.zt == 1002" type="info">订单取消</el-tag>
                            <el-tag v-if="scope.row.zt == 1003" type="warning">币商确认收款</el-tag>
                            <el-tag v-if="scope.row.zt == 1004" type="warning">用户确认收币</el-tag>
                            <el-tag v-if="scope.row.zt == 1005" type="success">交易完成</el-tag>
                            <el-tag v-if="scope.row.zt == 1006" type="warning">币商未收款-用户上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1007" type="warning">币商未收款-币商上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1008" type="warning">币商未收款-用户上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1009" type="warning">币商未收款-币商上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1010" type="warning">订单异常等待平台处理</el-tag>
                            <el-tag v-if="scope.row.zt == 1011" type="info">交易失败</el-tag>
                            <el-tag v-if="scope.row.zt == 1012" type="info">异常交易</el-tag>
                            <el-tag v-if="scope.row.zt == 1013" type="warning">用户未收币-用户上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1014" type="warning">用户未收币-币商上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1015" type="warning">用户未收币-用户上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1016" type="warning">用户未收币-币商上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1017" type="warning">币商确认收币</el-tag>
                            <el-tag v-if="scope.row.zt == 1018" type="warning">用户确认收款</el-tag>
                            <el-tag v-if="scope.row.zt == 1019" type="warning">币商未收币-用户上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1020" type="warning">币商未收币-币商上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1021" type="warning">币商未收币-用户上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1022" type="warning">币商未收币-币商上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1023" type="warning">用户未收款-用户上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1024" type="warning">用户未收款-币商上传图片凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1025" type="warning">用户未收款-用户上传视频凭证</el-tag>
                            <el-tag v-if="scope.row.zt == 1026" type="warning">用户未收款-币商上传视频凭证</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shzt" label="审核情况" width="100">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.shzt == 0" type="warning">待审核</el-tag>
                            <el-tag v-if="scope.row.shzt == 1" type="success">已审核</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"
                                @click="ddxqy(scope.row.ddid)"> 详情
                            </el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1003" @click="ddxqy(scope.row.ddid)">确认收款</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1007" @click="ddxqy(scope.row.ddid)">确认收款</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1009" @click="ddxqy(scope.row.ddid)">确认收款</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1014" @click="ddxqy(scope.row.ddid)">确认付币</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1016" @click="ddxqy(scope.row.ddid)">确认付币</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1017" @click="ddxqy(scope.row.ddid)">确认收币</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1020" @click="ddxqy(scope.row.ddid)">确认收币</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1022" @click="ddxqy(scope.row.ddid)">确认收币</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1024" @click="ddxqy(scope.row.ddid)">确认付款</el-button>
                            <el-button size="mini" type="primary" v-if="scope.row.zt==1026" @click="ddxqy(scope.row.ddid)">确认付款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>
    </div>
</template>

<script>
    import {
        orderList,
    } from '@/api'
    export default {
        name: '',
        mixins: [],
        components: {},
        props: {

        },
        data() {
            return {
                dateList: [],
                shopForm: {
                    status:'',
                    qbid: sessionStorage.getItem('userKey'),
                    limit: 10,
                    page: 1},
                dialogVisible: false,
                ztdm: [{
                        id: 1000,
                        name: "全部"
                    },{
                        id: 1001,
                        name: "下单成功"
                    },
                    {
                        id: 1002,
                        name: "订单取消"
                    },
                    {
                        id: 1111,
                        name: "交易中"
                    },
                    {
                        id: 1005,
                        name: "交易完成"
                    },
                    {
                        id: 1011,
                        name: "交易失败"
                    },
                    {
                        id: 1012,
                        name: "异常交易"
                    }
                ],
            }
        },
        mounted() {
            // this.currency()
        },
        created() {
            this.getOrderList()
        },
        methods: {
            
            ddxqy(id){
                sessionStorage.setItem("orderid",id)
                this.$router.push('/htBackStage/orderForm/detail')
            },

            submitOder(formName){
                this.getOrderList();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getOrderList();
            },
            getOrderList() {
                orderList(this.shopForm).then(({
                    data
                }) => {
                    this.dateList = data.list;
                    console.log(this.dateList, '71')

                });
            },
        }
    }
</script>
<style scoped lang='less'>
    .orderForm {
        background: #fff;
        padding: 20px;
    }
    .el-table td.el-table__cell div{
        white-space: nowrap;
    }
</style>
