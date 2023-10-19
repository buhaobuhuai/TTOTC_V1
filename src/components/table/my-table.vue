<!--
 
 * @Author       : wenquan
 * @desc         : otc首页列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-02-27 21:43:48
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\table\my-table.vue
 -->
<template>

    <el-table :data="dateList" stripe style="width: 100%">
        <el-table-column prop="bzmc" width="" label="币种">
            <template slot-scope="scope">
                <section class="otcTableColumn-adver">
                    <el-avatar> {{scope.row.bzmc}} </el-avatar>
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="sl" label="数量">
            <template slot-scope="scope">
                <section>
                    <span>{{scope.row.sl}}{{scope.row.bzmc}}</span>
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="pair" label="价格" width="">
            <template slot-scope="scope">
                <section <span>{{scope.row.je}}{{scope.row.fbmc}}</span>
                </section>
            </template>

        </el-table-column>
        <el-table-column prop="ddlx" label="订单类型" width="">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.ddlx===1" type="success" size="mini">购买</el-tag>
                <el-tag v-else type="danger" size="mini">出售</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="zt" label="当前状态" width="210">
            <template slot-scope="scope">
                <section class="otcTableColumn-way">
                    <span v-if="scope.row.zt == 1001">下单成功</span>
                    <span v-if="scope.row.zt == 1002">订单取消</span>
                    <span v-if="scope.row.zt == 1003">币商确认收款</span>
                    <span v-if="scope.row.zt == 1004">用户确认收币</span>
                    <span v-if="scope.row.zt == 1005">交易完成</span>
                    <span v-if="scope.row.zt == 1006">币商未收款-用户上传图片凭证</span>
                    <span v-if="scope.row.zt == 1007">币商未收款-币商上传图片凭证</span>
                    <span v-if="scope.row.zt == 1008">币商未收款-用户上传视频凭证</span>
                    <span v-if="scope.row.zt == 1009">币商未收款-币商上传视频凭证</span>
                    <span v-if="scope.row.zt == 1010">订单异常等待平台处理</span>
                    <span v-if="scope.row.zt == 1011">交易失败</span>
                    <span v-if="scope.row.zt == 1012">异常交易</span>
                    <span v-if="scope.row.zt == 1013">用户未收币-用户上传图片凭证</span>
                    <span v-if="scope.row.zt == 1014">用户未收币-币商上传图片凭证</span>
                    <span v-if="scope.row.zt == 1015">用户未收币-用户上传视频凭证</span>
                    <span v-if="scope.row.zt == 1016">用户未收币-币商上传视频凭证</span>
                    <span v-if="scope.row.zt == 1017">币商确认收币</span>
                    <span v-if="scope.row.zt == 1018">用户确认收款</span>
                    <span v-if="scope.row.zt == 1019">币商未收币-用户上传图片凭证</span>
                    <span v-if="scope.row.zt == 1020">币商未收币-币商上传图片凭证</span>
                    <span v-if="scope.row.zt == 1021">币商未收币-用户上传视频凭证</span>
                    <span v-if="scope.row.zt == 1022">币商未收币-币商上传视频凭证</span>
                    <span v-if="scope.row.zt == 1023">用户未收款-用户上传图片凭证</span>
                    <span v-if="scope.row.zt == 1024">用户未收款-币商上传图片凭证</span>
                    <span v-if="scope.row.zt == 1025">用户未收款-用户上传视频凭证</span>
                    <span v-if="scope.row.zt == 1026">用户未收款-币商上传视频凭证</span>
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="gxsj" label="变更时间" width="180"></el-table-column>
        <el-table-column prop="action" label="操作" width="240">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <el-button v-if="scope.row.zt===1001&&scope.row.ddlx===1" type="danger" size="small" @click="handleClick(scope.row)">
                    付款</el-button>
                <el-button v-if="scope.row.zt===1001&&scope.row.ddlx===0" type="danger" size="small" @click="handleClick(scope.row)">
                    付币</el-button>
                <el-button v-if="scope.row.zt===1006||scope.row.zt===1019" type="danger" size="small" plain
                    @click="handleClick(scope.row)">上传图片凭据</el-button>
                <el-button v-if="scope.row.zt===1008||scope.row.zt===1021" type="danger" size="small" plain
                    @click="handleClick(scope.row)">上传视频凭据</el-button>

                <el-button v-if="scope.row.zt===1018" type="danger" size="small" plain @click="handleClick(scope.row)">未收款上传凭证
                </el-button>
                <el-button v-if="scope.row.zt===1004" type="danger" size="small" plain @click="handleClick(scope.row)">未收币上传凭证
                </el-button>
                <el-button v-if="scope.row.zt===1017&&zhxx.zflx===2" type="success" size="small" plain
                    @click="handleClick(scope.row)">转 账</el-button>
                <el-button v-if="scope.row.zt===1018" type="success" size="small" plain @click="handleClick(scope.row)">确认收款
                </el-button>
                <el-button v-if="scope.row.zt===1004" type="success" size="small" plain @click="handleClick(scope.row)">确认收币
                </el-button>
                <el-button v-if="scope.row.zt===1006||scope.row.zt===1008||scope.row.zt===1019||scope.row.zt===1021" size="small"
                    @click="handleClick(scope.row)">取消订单</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    export default {
        name: 'invest-table',
        props: {
            dateList: Array,
            activeName: String,
            dialogVisible: Boolean
        },
        data() {
            return {
                name: "",

            }
        },
        created() {
            let geturl = window.location.href
            let getqyinfo = geturl.split('/')[3]
            // console.log(this.dateList.ddid + '104')
        },
        methods: {
            handleClick(e) {
                this.$router.push('/bourse?'+e.ddid);
            }
        }
    }
</script>

<style scoped lang='less'>
    .otcTableColumn {
        &-adver {
            img {
                float: left;
                width: 30px;
                margin-top: 8px;
                margin-right: 5px;
            }

            span {
                /* float: left;
                line-height: 1.5; */

                b {
                    display: block;
                }

                label {
                    color: #aaa9a9;
                    font-size: 12px;
                }
            }
        }

        &-usable {
            p {
                color: #333;

                label {
                    color: #999;
                    font-size: 14px;
                    margin-right: 10px;
                    display: inline-block;
                    width: 50px;
                }
            }
        }

        &-way {
            span {
                font-size: 12px;
                display: inline-block;
                margin-right: 10px;
                padding: 0 5px;
                background-color: #fff8f8;
                border-radius: 4px;
            }
        }
    }
</style>
