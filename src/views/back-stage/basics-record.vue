<!--
 * @Author       : dj
 * @desc         : 保证金记录
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:19:12
 * @LastEditors  : dj
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\basics-record.vue
-->
<template>
    <div class='pledge'>
        <div>
            <!-- <el-page-header @back="goBack" content="保证金记录">
            </el-page-header> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '../pledge' }">保证金</el-breadcrumb-item>
            <el-breadcrumb-item>保证金记录</el-breadcrumb-item>
        </el-breadcrumb>
            <el-divider />
        </div>
        <div>
            <el-form :model="shopForm" :inline="true" ref="shopForm" class="demo-form-inline" size="mini">

                <el-form-item label="法币" prop="fbid">
                    <el-select v-model="shopForm.fbid" placeholder="请选择">
                        <el-option v-for="item in fblist" :label="item.name" :value="item.fbid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('shopForm')">查询</el-button>
                    <el-button @click="resetForm('shopForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <template>
            <el-table :data="dateList" stripe style="width: 100%">
                <el-table-column prop="fbmc" label="法币"></el-table-column>
                <el-table-column prop="jned" label="缴纳金额"></el-table-column>
                <el-table-column prop="jsed" label="解锁金额"></el-table-column>
                <el-table-column prop="kced" label="扣除金额"></el-table-column>
                <el-table-column prop="kcyy" label="扣除原因"></el-table-column>
                <el-table-column prop="sded" label="锁定金额"></el-table-column>
                <el-table-column prop="sdyy" label="锁定原因"></el-table-column>
                <el-table-column prop="tcbzj" label="退还金额"></el-table-column>
                <el-table-column prop="ksyed" label="可用金额"></el-table-column>
                <el-table-column prop="cjsj" label="创建时间"></el-table-column>
            </el-table>
        </template> -->
        <template>
            <div class="bourse-index-tab-record" v-for="item in dateList">
                <label>{{item.cjsj}}</label>
                <span>
                    <span>法币：{{item.fbmc}}</span>
                    <span v-if="item.bzj!==null">保证金：{{item.bzj}}</span>
                    <span v-if="item.sded!==null">锁定金额：{{item.sded}}</span>
                    <span v-if="item.sdyy!==null">锁定原因：{{item.sdyy}}</span>
                    <span v-if="item.kced!==null">扣除金额：{{item.kced}}</span>
                    <span v-if="item.kcyy!==null">扣除原因：{{item.kcyy}}</span>
                    <span v-if="item.jsed!==null">解锁金额：{{item.jsed}}</span>
                    <span v-if="item.ksyed!==null">可使用金额：{{item.ksyed}}</span>
                    <span v-if="item.jned!==null">缴纳金额：{{item.jned}}</span>
                    <span v-if="item.tcbzj!==null">退还金额：{{item.tcbzj}}</span>
                    <span v-if="item.kcsxf!==null">扣除手续费：{{item.kcsxf}}</span>
                </span>
            </div>
        </template>
    </div>
</template>

<script>
    import {
        depositRecord,
        legalCurrencySelect
    } from '@/api'
    export default {
        name: '',
        mixins: [],
        components: {},
        props: {

        },
        data() {
            return {
                count: 0,
                formLabelWidth: '120px',
                dateList: [],
                currencyList: [],
                fblist: [],
                shopForm: {
                    bzjid: sessionStorage.getItem('bzjid'),
                    // bsid: sessionStorage.getItem('userKey'),
                    limit: 10,
                    page: 1,
                },
                dialogVisible: false,
            }
        },
        mounted() {},
        created() {
            this.getDepositList()
            this.getlegalCurrencySelect();
        },
        methods: {
            load() {
                this.count += 2
            },
            goBack() {
                this.$router.back()
            },
            async getlegalCurrencySelect() {
                await legalCurrencySelect().then(({
                    data
                }) => {
                    this.fblist = data;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.resetForm(formName);
                        this.getDepositList()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getDepositList()
            },

            getDepositList() {
                depositRecord(this.shopForm).then(({
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
    .pledge {
        background: #fff;
        padding: 20px;

    }

    .el-select {
        width: 100%;
    }

    .bourse-index-tab-record {
        font-size: 15px;
        color: #606266;
        margin: 15px 0;
        background: #eefcfc80;
        padding: 10px;

        label {

            float: left;
            width: 250px
        }

        >span {
            float: left;
            width: calc(100% - 250px);
            line-height: 20px;
            span{
                padding: 0 10px;
            }
        }

        &::after {
            content: '';
            clear: both;
            display: block;
        }

    }
</style>
