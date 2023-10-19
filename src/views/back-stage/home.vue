<!--
 * @Author       : wenquan
 * @desc         : 首页
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 16:45:30
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\home.vue
-->
<template>
    <div class='home'>
        <div class="header">
            <img :src="img" />
            <span>{{dateList.jc}}</span>
        </div>
        <div class="shop">
            <p>
                <span>
                    <b>0</b>
                    <label>
                        总营业额
                    </label>
                </span>
                <span>
                    <b>0</b>
                    <label>
                        季度营业额
                    </label>
                </span>
                <span>
                    <b>0</b>
                    <label>
                        出售金额最多
                    </label>
                </span>
                <span>
                    <b>0</b>
                    <label>
                        买入金额最多
                    </label>
                </span>
            </p>
        </div>
        <el-tabs class="tab-top" v-model="activeName" @tab-click="handleClick">

        </el-tabs>
    </div>
</template>

<script>
    import {
        storeInfo
    } from '@/api'
    import otcTable from '@/components/table/otc-table'
    import createOder from '@/components/createOder'
    export default {
        name: '',
        mixins: [],
        components: {
            otcTable,
            createOder
        },
        props: {

        },
        data() {
            return {
                activeName:'',
                dateList: [],
                img:'',
                currencyList: [],
                dialogVisible: false,
            }
        },
        mounted() {
            this.currency()
        },
        created() {
            this.getStoreInfo()
        },
        methods: {

            handleClick(tab, event) {
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
            hotCoin() {
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
            currencyClick(e) {
                this.styles = e.srcElement.id
                // console.log(e.srcElement.id)
            },
            currency() {
                this.$http({
                    url: this.$http.adornUrl("/currency"),
                    method: "get",
                }).then(({
                    data
                }) => {
                    console.log(data)
                    this.currencyList = data.data;
                });
            },
            
            getStoreInfo() {
                storeInfo({
                    bsid: sessionStorage.getItem('userKey')
                }).then(({
                    data
                }) => {
                    this.dateList = data;
                    this.img = "/imgsave/icon-save/" + data.dptp;
            
                });
            },
        }
    }
</script>
<style scoped lang='less'>
    .home {
        .header {
            padding: 20px;
            display: flex;
            background: #0fd0d780;
            img {width: 80px;height: 80px;border: #d7d2d2 1px solid; border-radius: 10px;background-color: #fff;}
            span{font-size: 18px;font-weight: 600;line-height: 80px;padding-left: 20px;}
        }

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
        }

        .tab-top {
            background: #fff;
            padding: 20px;

            &-autocomplete {
                text-align: right;

                >div {
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

    }
</style>
