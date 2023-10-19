<!--
 * @Author       : wenquan
 * @desc         : 上架商品
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:22:14
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\shop-popProduct.vue
-->
<template>
    <div class='shop'>

        <el-tabs class="tab-top" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in paneList" :key="item.name" :label="item.label" :name="item.name" />

            <shop-popProduct-table :dateList="dateList" :activeName="activeName"
                :dialogVisible.sync="dialogVisible"></shop-popProduct-table>
            <create-oder :dialogVisible.sync="dialogVisible" :activeName="activeName"></create-oder>
        </el-tabs>
    </div>
</template>

<script>
import shopPopProductTable from './component/shop-popProduct-table'
import createOder from '@/components/createOder'
export default {
    name: '',
    mixins: [],
    components: {
        shopPopProductTable, createOder
    },
    props: {

    },
    data () {
        return {
            activeName: 'acBuy',
            dateList: [],
            currencyList: [],
            paneList: [{
                label: '买入',
                name: 'acBuy'
            }, {
                label: '卖出',
                name: 'acSale'
            }],
            styles: 'USDT',
            //筛选条件
            screenObj: {
                moneyValue: '',
                ALL: '全部',
                sel: '',
                way: ''
            },
            dialogVisible: false,
        }
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
}
</script>
<style scoped lang='less'>
.shop {
    background: #fff;
    padding: 20px;

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
</style>
