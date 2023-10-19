<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-02-21 20:06:09
 * @LastEditTime : 2023-02-27 20:28:35
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\otc-tabs.vue
 -->

<!-- 投资首页tabs组件 -->
<template>
    <el-tabs class="tab-top"
             v-model="activeName"
             @tab-click="handleClick">
        <!-- <el-select v-model="cionName"
                   filterable>
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
        </el-select> -->
        <!-- <el-tab-pane v-for="item in paneList"
                     :key="item.name"
                     :label="item.label"
                     :name="item.name" /> -->
        <!-- <template>
            <ul class="currency"
                @click="currencyClick"
                v-if="currencyList.length">
                <li v-for="item in currencyList"
                    :class="{'currency-active': styles === item.name}"
                    :id="item.name">
                    {{item.name}}</li>
            </ul>
        </template> -->
        <el-row class="tab-top-autocomplete">
            <el-select v-model="screenObj.moneyValue"
                       placeholder="全部"
                       filterable>
                <el-option label="1"
                           value="1"></el-option>
                <!-- <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option> -->
            </el-select>
            <el-select v-model="screenObj.moneyValue"
                       placeholder="法币选择"
                       filterable>
                <el-option label="1"
                           value="1"></el-option>
                <!-- <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option> -->
            </el-select>
            <el-input v-model="screenObj.moneyValue"
                      placeholder="请输入金额"
                      style="width :auto"
                      type="">
                <el-button slot="append"
                           icon="el-icon-search"></el-button>
            </el-input>
            <el-select v-model="screenObj.moneyValue"
                       placeholder="所有支付方式"
                       filterable>
                <el-option label="1"
                           value="1"></el-option>
                <!-- <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option> -->
            </el-select>
        </el-row>
        <otc-table :dateList="dateList"
                   :activeName="activeName"
                   :dialogVisible.sync="dialogVisible"></otc-table>
        <create-oder :dialogVisible.sync="dialogVisible"
                     :activeName="activeName"></create-oder>
    </el-tabs>
</template>
<script>
import otcTable from '@/components/table/otc-table'
import createOder from '@/components/createOder'
export default {
    name: "invest-tabs",
    data () {
        return {
            activeName: 'acBuy',
            paneList: [{
                label: '买入',
                name: 'acBuy'
            }, {
                label: '卖出',
                name: 'acSale'
            }],
            dateList: [],
            currencyList: [],
            styles: 'USDT',
            //筛选条件
            screenObj: {
                moneyValue: '',
                ALL: '全部',
                sel: '',
                way: ''
            },
            dialogVisible: false,

        };
    },
    components: {
        otcTable, createOder
    },
    mounted () {
        this.currency()
    },
    created () {
        this.hotCoin()
    },
    methods: {

        handleClick (tab, event) {
            console.log(tab.name)
            if (tab.name == "hotCoin") {
                this.hotCoin()
            }
            if (tab.name == "newCoin") {
                this.$http({
                    url: this.$http.adornUrl("/table/newCoin"),
                    method: "get",
                }).then(({
                    data
                }) => {
                    this.dateList = data.data[1].cont;
                    this.headerList = data.data[0].header;

                });
            }
            if (tab.name == "turnover") {
                this.$http({
                    url: this.$http.adornUrl("/table/turnover"),
                    method: "get",
                }).then(({
                    data
                }) => {
                    console.log(data.data[1].cont)
                    this.dateList = data.data[1].cont;
                    this.headerList = data.data[0].header;

                });
            }
            if (tab.name == "contracts") {
                this.$http({
                    url: this.$http.adornUrl("/table/contracts"),
                    method: "get",
                }).then(({
                    data
                }) => {
                    console.log(data.data[1].cont)
                    this.dateList = data.data[1].cont;
                    this.headerList = data.data[0].header;

                });
            }
            if (tab.name == "cgabge") {
                this.$http({
                    url: this.$http.adornUrl("/table/cgabge"),
                    method: "get",
                }).then(({
                    data
                }) => {
                    // console.log(data.data[1].cont)
                    this.dateList = data.data[1].cont;
                    this.headerList = data.data[0].header;

                });
            }


        },
        hotCoin () {
            this.$http({
                url: this.$http.adornUrl("/table/hotCoin"),
                method: "get",
            }).then(({
                data
            }) => {
                this.dateList = data.data;
                console.log(this.dateList, '71')

            });
        },
        currencyClick (e) {
            this.styles = e.srcElement.id
            // console.log(e.srcElement.id)
        },
        currency () {
            this.$http({
                url: this.$http.adornUrl("/currency"),
                method: "get",
            }).then(({
                data
            }) => {
                console.log(data)
                this.currencyList = data.data;
            });
        }
    }
};
</script>

<style scoped lang="less">
.tab-top {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    &-autocomplete {
        text-align: right;
        > div {
            // margin-left: 10px;
            margin: 10px 0 10px 10px;
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
</style>
