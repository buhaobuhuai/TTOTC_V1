<!--
 * @Author       : wenquan
 * @desc         : 店铺管理
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:19:12
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\shop.vue
-->
<template>
    <div class='shop'>
        <div>
            <el-form :model="shopForm" :inline="true" ref="shopForm" class="demo-form-inline" size="mini">
                <el-form-item label="交易方向" prop="cslx">
                    <el-select v-model="shopForm.cslx" placeholder="交易方向">
                        <el-option label="买入" value=0></el-option>
                        <el-option label="卖出" value=1></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="虚拟币" prop="xnb">
                    <el-select v-model="shopForm.xnb" placeholder="虚拟币">
                        <el-option v-for="item in cion" :key="item.id" :label="item.mc" :value="item.mc">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="zt">
                    <el-select v-model="shopForm.zt" placeholder="状态">
                        <el-option label="下架" value=0></el-option>
                        <el-option label="上架" value=1></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('shopForm')">查询</el-button>
                    <el-button @click="resetForm('shopForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-row class="tab-top-autocomplete">
            <div>
                <el-button size="mini" type="primary" @click="dialogVisible = true"> 新建商品
                </el-button>
            </div>
        </el-row>
        <shopTable :dateList="dateList" @submitForm="submitForm"></shopTable>
        <el-dialog title="新建商品" :visible.sync="dialogVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币" prop="fbid">
                    <el-select v-model="form.fbmc" placeholder="请选择法币" @change="fbsxqk">
                        <el-option v-for="item in currencyList" :label="item.fbmc"
                            :value="{value:item.fbid,name:item.fbmc}"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="加密货币" prop="bzmc">
                    <el-select v-model="form.bzmc" placeholder="请选择加密货币" @change="bzsxqk">
                        <el-option v-for="item in cion" :label="item.mc" :value="{value:item.mc,hydz:item.hydz}">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价" prop="bzdj">
                    <el-input-number v-model="form.bzdj" :precision="3" :step="0.1" placeholder="加密货币单价">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="数量" prop="bzsl">
                    <el-input-number v-model="form.bzsl" autocomplete="off" :precision="6" :step="0.1"
                        placeholder="加密货币数量"></el-input-number>
                </el-form-item>
                <el-form-item label="最低成交额" prop="zdxe">
                    <el-input-number v-model="form.zdxe" autocomplete="off" :precision="3" :step="0.1"
                        placeholder="单笔最低成交额限制"></el-input-number>
                </el-form-item>
                <el-form-item label="最高成交额" prop="zgxe">
                    <el-input-number v-model="form.zgxe" autocomplete="off" :precision="3" :step="0.1"
                        placeholder="单笔最高成交额限制"></el-input-number>
                </el-form-item>
                <el-form-item label="截止时间" prop="jzsj">
                    <el-date-picker v-model="form.jzsj" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交易方向" prop="cslx">
                    <el-radio-group v-model="form.cslx">
                        <el-radio :label="0">买入</el-radio>
                        <el-radio :label="1">卖出</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="支付方式" prop="zffsid">
                    <el-select v-model="form.zffsid" multiple collapse-tags placeholder="请选择支付方式">
                        <el-option v-for="item in zffsList" :label="item.mc" :value="item.zffsid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeNewShop('form')">取 消</el-button>
                <el-button type="primary" @click="newShop('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        commodityList,
        legalcurrencySel,
        cionSel,
        commodityCre,
        paySel,
        commoditySav
    } from '@/api'
    import shopTable from './component/shop-table'
    export default {
        name: '',
        components: {
            shopTable,
        },
        props: {

        },
        data() {
            var slpd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入最低成交额限制'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) > this.form.zgxe) {
                    callback(new Error('超出最高成交额数量'));
                } else if (parseFloat(value) <= 0) {
                    callback(new Error('最低成交额需大于0'));
                } else {
                    callback();
                }
            };
            var spdj = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入加密货币单价'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) <= 0) {
                    callback(new Error('加密货币单价需大于0'));
                } else {
                    callback();
                }
            };
            var spsl = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入加密货币数量'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) <= 0) {
                    callback(new Error('加密货币数量需大于0'));
                } else {
                    callback();
                }
            };
            var spzgxe = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入最高成交额限制'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) <= 0) {
                    callback(new Error('加密货币最高成交额需大于0'));
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: '120px',
                form: {
                    fbid: '',
                    fbmc: '',
                    bzhy: '',
                    bzmc: '',
                    bzdj: 0,
                    bzsl: 0,
                    zdxe: '',
                    zgxe: '',
                    jzsj: '',
                    cslx: '',
                    zffsid: '',
                    cjr: sessionStorage.getItem('userKey')
                },
                dateList: [],
                cion: [],
                zffsList: [],
                currencyList: [],
                shopForm: {
                    cslx: '',
                    xnb: '',
                    zt: '',
                    bsqb: sessionStorage.getItem('userKey'),
                    limit: 10,
                    page: 1,
                },
                dialogVisible: false,
                rules: {
                    fbid: [{
                        required: true,
                        message: "请选择法币",
                        trigger: 'blur'
                    }],
                    zffsid: [{
                        required: true,
                        message: "请选择支付方式",
                        trigger: 'blur'
                    }],
                    bzmc: [{
                        required: true,
                        message: "请选择加密货币",
                        trigger: 'blur'
                    }],
                    bzdj: [{
                        validator: spdj,
                        required: true,
                        // message: "请输入币种单价",
                        trigger: 'blur'
                    }],
                    bzsl: [{
                        validator: spsl,
                        required: true,
                        // message: "请输入币种数量",
                        trigger: 'blur'
                    }],
                    zgxe: [{
                        validator: spzgxe,
                        required: true,
                        // message: "请输入最高成交额限制",
                        trigger: 'blur'
                    }],
                    zdxe: [{
                        validator: slpd,
                        required: true,
                        // message: "请输入最低成交额限制",
                        trigger: 'blur'
                    }],
                    jzsj: [{
                        required: true,
                        message: "请选择截止时间",
                        trigger: 'blur'
                    }],
                    cslx: [{
                        required: true,
                        message: "请选择交易方向",
                        trigger: 'blur'
                    }]
                },
            }
        },
        mounted() {
            this.getlegalcurrencySel();
            this.getcionSel();
            this.getpaySel();
        },
        created() {
            this.commodityList()
        },
        methods: {
            fbsxqk(a) {
                this.form.fbid = a.value
                this.form.fbmc = a.name
            },
            bzsxqk(a) {
                this.form.bzmc = a.value
                this.form.bzhy = a.hydz
            },
            newShop(formName) {
                let sj = this.form.jzsj
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            this.form.jzsj = this.form.jzsj.getTime()
                            commoditySav(this.form).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '恭喜你，创建成功。',
                                        type: 'success'
                                    });
                                    this.resetForm(formName);
                                    // this.getLegalcurrencyList()
                                    this.dialogVisible = false;
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                    this.form.jzsj=sj;
                                }
                            });
                        } catch (e) {
                            this.form.jzsj=sj;
                            console.error(error);
                            return false;
                        }
                    } else {
                        this.form.jzsj=sj;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            closeNewShop(formName) {
                this.dialogVisible = false
                this.$refs[formName].resetFields();
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.commodityList();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.commodityList();
            },

            commodityList() {
                commodityList(this.shopForm).then(({
                    data
                }) => {
                    this.dateList = data.list;
                    console.log(this.dateList, '71')

                });
            },
            getlegalcurrencySel() {
                let form = {
                    id: sessionStorage.getItem('userKey')
                }
                legalcurrencySel(form).then(({
                    data
                }) => {
                    console.log(data)
                    this.currencyList = data;
                });
            },
            getpaySel() {
                let form = {
                    bsqb: sessionStorage.getItem('userKey')
                }
                paySel(form).then(({
                    data
                }) => {
                    console.log(data)
                    this.zffsList = data;
                });
            },
            getcionSel() {
                cionSel().then(({
                    data
                }) => {
                    this.cion = data;
                });
            }
        }
    }
</script>
<style scoped lang='less'>
    .shop {
        background: #fff;
        padding: 20px;

        >p {
            margin-left: -15px;

            span {
                float: left;
                padding: 15px;
                margin: 0 15px;
                text-align: center;
                box-shadow: 0 0 5px #d7d2d2;
                border-radius: 5px;

                b {
                    display: block;
                    font-size: 24px;
                    margin-bottom: 10px;
                }

                label {
                    font-size: 16px
                }
            }

            &::after {
                content: '';
                display: block;
                clear: both;


            }
        }

        .tab-top {

            &-autocomplete {
                text-align: right;

                >div {
                    // margin-left: 10px;
                    margin: 10px 0 10px 10px;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .currency {
            padding-bottom: 20px;

            li {
                margin: 0 20px;
                height: 40px;
                box-sizing: border-box;
                line-height: 40px;
                display: inline-block;
                list-style: none;
                font-size: 14px;
                font-weight: 500;
                color: #303133;
                cursor: pointer;
                position: relative;

                &:hover {
                    color: #409eff;
                    border-bottom: 2px solid #409eff;
                }
            }

            .currency-active {
                color: #409eff;
                border-bottom: 2px solid #409eff;
            }
        }

    }

    .el-select {
        width: 100%;
    }
</style>
<style>
    .el-input-number .el-input__inner {
        border: 1px solid #DCDFE6;
        background-color: white;
    }
</style>
