<!-- 交易首页 -->
<template>
    <div>
        <div style="background-color: white;">
            <div class="site-content">
                <!-- 广告-->
                <!-- <banner></banner> -->
            </div>
        </div>
        <div class="site-content">
            <div class="purchase-type">
                <el-radio-group v-model="form.cslx" @change="spcslx">
                    <el-radio-button label="1">买入</el-radio-button>
                    <el-radio-button label="0">卖出</el-radio-button>
                </el-radio-group>
                <template>
                    <ul class="currency" @click="currencyClick" v-if="cionList.length">
                        <li v-for="item in cionList" :class="{'currency-active': form.bzmc === item.mc}" :id="item.mc">
                            {{item.mc}}
                        </li>
                    </ul>
                </template>
            </div>
            <div class="submit">
                <el-form :model="form" :inline="true" ref="shopForm" class="demo-form-inline" size="mini">
                    <el-form-item label="" prop="">
                        <el-select v-model="form.fbid" placeholder="请选择法币">
                            <el-option label="全部法币" value=""></el-option>
                            <el-option v-for="item in currencyList" :key="item.fbid" :label="item.name"
                                :value="item.fbid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <el-select v-model="zffsid" multiple collapse-tags placeholder="请选择支付方式">
                            <!-- <el-option label="全部支付方式" value=""></el-option> -->
                            <el-option v-for="item in zffsList" :key="item.zffsid" :label="item.mc"
                                :value="item.zffsid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitOder('shopForm')">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <otcTable :dateList="dateList" :activeName="form.bzmc"></otcTable>
        </div>
    </div>

</template>

<script>
    import {
        cionSel,
        otcList,
        legalCurrencySel,
        paymentmethodList,
    } from '@/api'
    // import otcTabs from '@/components/otc-tabs'
    import Banner from '@/components/banner'
    import otcTable from '@/components/table/otc-table'

    export default {
        name: 'transaction',
        data() {
            return {
                dateList: [],
                currencyList: [],
                cionList: [],
                zffsList: [],
                zffsid: '',
                form: {
                    fbid: '',
                    zffs:'',
                    cslx: 1,
                    bzmc: '',
                    limit: 10,
                    page: 1
                }
            }
        },
        components: {
            // otcTabs,
            Banner,
            otcTable
        },
        computed: {

        },
        methods: {
            spcslx(v){
                this.form.cslx=v
                this.otcList();
            },
            submitOder(){
                // console.log(this.form.zffsid.join(","))
                this.form.zffs=this.zffsid.join(",")
                this.otcList();
            },
            otcList() {
                otcList(this.form).then(({
                    data
                }) => {
                    this.dateList = data.list;

                });
            },
            async currency() {
                await cionSel().then(({
                    data
                }) => {
                    this.cionList = data;
                    // this.form.bzmc = data[0].mc;
                    this.otcList();
                });
            },
            legalCurrencySel() {
                legalCurrencySel().then(({
                    data
                }) => {
                    this.currencyList = data;

                });
            },
            paymentmethodList() {
                paymentmethodList().then(({
                    data
                }) => {
                    this.zffsList = data;

                });
            },
            currencyClick(e) {
                this.form.bzmc=e.srcElement.id
                // this.styles = e.srcElement.id
                this.otcList();
                
            },
        },
        created() {
            // console.log(0/1)
            this.currency();
            this.legalCurrencySel();
            this.paymentmethodList();
        }
    }
</script>

<style scoped lang="less">
    .purchase-type {
        display: flex;

    }

    .submit {
        text-align: right;
    }

    .currency {
        padding-left: 20px;
        padding-bottom: 10px;

        li {
            margin: 0 20px;
            height: 40px;
            box-sizing: border-box;
            line-height: 40px;
            display: inline-block;
            list-style: none;
            font-size: 16px;
            font-weight: 500;
            color: #303133;
            cursor: pointer;
            position: relative;

            &:hover {
                color: #0d5959;
                // font-weight: 600;
                // border-bottom: 2px solid #409eff;
            }
        }

        .currency-active {
            color: #0d5959;
            font-weight: 600;
            // border-bottom: 2px solid #409eff;
        }
    }

    .el-row {
        margin: 0 !important;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        /* border-radius: 4px; */
        /* background-color: #f9fafc; */
        border: 1px solid #0d5959;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #ffffff;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        /* border-radius: 4px; */
        min-height: 106px;
        position: relative;
        align-items: center;
        text-align: center;
    }

    // .row-bg {
    // padding: 10px 0;
    /* background-color: #f9fafc; */
    // }

    .grid-data {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        font-size: 12px;
        color: #757575;
        line-height: 25px;
    }

    .grid-title {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }

    .grid-syl {
        padding: 0 10px;
        font-size: 15px;
        color: #0fcdd5;
        // font-weight: 600;
    }

    @media (max-width: 767px) {
        .el-col {
            padding: 5px;
        }
    }
</style>
<style>
    .el-radio-button__inner {
        font-size: 16px;
        font-weight: 600;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
            background-color: #0d5959;
            border-color: #0d5959;
    }
    /* .el-radio-button .el-radio-button__inner:hover{
        color: #0d5959;
    } */
</style>
