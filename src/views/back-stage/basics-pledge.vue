<!--
 * @Author       : wenquan
 * @desc         : 保证金
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:19:12
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\basics-pledge.vue
-->
<template>
    <div class='pledge'>
        <div>
            <el-form :model="shopForm" :inline="true" ref="basicspledge" class="demo-form-inline" size="mini">
                
                <el-form-item label="法币" prop="fbid">
                    <el-select v-model="shopForm.fbid" placeholder="请选择">
                        <el-option v-for="item in fblist" :label="item.name" :value="item.fbid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('basicspledge')">查询</el-button>
                    <el-button @click="resetForm('basicspledge')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <shop-table :dateList="dateList" @submitForm="submitForm"></shop-table>
        
    </div>
</template>

<script>
    import {
        depositList,
        legalCurrencySelect,
    } from '@/api'
    import shopTable from './component/basics-pledge-table'
    export default {
        name: '',
        mixins: [],
        components: {
            shopTable,
        },
        props: {

        },
        data() {
            return {
                formLabelWidth: '120px',
                dateList: [],
                currencyList: [],
                fblist:[],
                shopForm: {
                    fbid: '',
                    bsid: sessionStorage.getItem('userKey'),
                    limit: 10,
                    page: 1,
                },
                dialogVisible: false,
            }
        },
        mounted() {
        },
        created() {
            this.getDepositList()
            this.getlegalCurrencySelect()
        },
        methods: {
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
                depositList(this.shopForm).then(({
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
    .el-select{
        width: 100%;
    }
</style>
