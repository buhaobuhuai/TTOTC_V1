<!--
 * @Author       : dj
 * @desc         : 申请结果
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:19:12
 * @LastEditors  : dj
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\basics-apply.vue
-->
<template>
    <div class='pledge'>
        <div>
            <el-form :model="shopForm" :inline="true" ref="shopForm" class="demo-form-inline" size="mini">
                <el-form-item label="类型" prop="apply">
                    <el-select v-model="shopForm.apply" placeholder="请选择">
                        <el-option key="1" label="新币商" value="1"></el-option>
                        <el-option key="2" label="新增法币" value="2"></el-option>
                        <el-option key="3" label="续交保证金" value="3"></el-option>
                        <el-option key="4" label="退除保证金" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('shopForm')">查询</el-button>
                    <el-button @click="resetForm('shopForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <template>
            <el-table :data="dateList" stripe style="width: 100%">
                <el-table-column prop="fbmc" label="法币名称"></el-table-column>
                <el-table-column prop="sqlb" label="申请类别">
                    <template v-slot:default="scope">
                        <el-tag v-if="scope.row.sqlb == 1">新币商</el-tag>
                        <el-tag v-if="scope.row.sqlb == 2">新增法币</el-tag>
                        <el-tag v-if="scope.row.sqlb == 3">续交保证金</el-tag>
                        <el-tag v-if="scope.row.sqlb == 4">退除保证金</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="bzj" label="金额"></el-table-column>
                <el-table-column prop="zt" label="申请状态">
                    <template v-slot:default="scope">
                        <el-tag v-if="scope.row.zt == 0" type="danger">未审核</el-tag>
                        <el-tag v-if="scope.row.zt == 1" type="success">已通过</el-tag>
                        <el-tag v-if="scope.row.zt == 2" type="warning">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="shyj" label="审核意见"></el-table-column>
                <el-table-column prop="sqsj" label="申请时间"></el-table-column>
                <el-table-column prop="bgsj" label="审核时间"></el-table-column>
            </el-table>
        </template>

    </div>
</template>

<script>
    import {
        applyList,
    } from '@/api'
    export default {
        name: '',
        mixins: [],
        components: {},
        props: {

        },
        data() {
            return {
                formLabelWidth: '120px',
                dateList: [],
                currencyList: [],
                fblist: [],
                shopForm: {
                    apply: '',
                    bsid: sessionStorage.getItem('userKey'),
                    limit: 10,
                    page: 1,
                },
                dialogVisible: false,
            }
        },
        mounted() {},
        created() {
            this.getDepositList()
        },
        methods: {
            submitForm(formName) {
                        console.log(this.shopForm);
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
                applyList(this.shopForm).then(({
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
</style>
