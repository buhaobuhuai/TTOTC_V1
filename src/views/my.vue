<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-02-27 21:05:45
 * @LastEditTime : 2023-03-08 19:42:56
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\views\my.vue
-->
<template>
    <div class='my'>
        <div class="site-content">
            <h3>我的订单</h3>
            <el-select v-model="form.status" class="site-content-screen" style="width: 200px;" placeholder="筛选" filterable @change="myOders">
               <el-option v-for="item in ztdm" :key="item.id" :label="item.name" :value="item.id">
               </el-option>
            </el-select>
            <my-table :dateList="dateList" :activeName="activeName" :dialogVisible.sync="dialogVisible"></my-table>
            <!-- <my-Dig :dialogVisible.sync="dialogVisible"
                            :activeName="activeName"></my-Dig> -->
        </div>
    </div>
</template>

<script>
    import {
        userOrderList
    } from '@/api'
import myTable from '@/components/table/my-table'
// import myDig from '@/components/createOder/my-dig'
export default {
    name: '',
    mixins: [],
    components: {
        myTable,
        // myDig
    },
    props: {

    },
    data () {
        return {
            activeName: 'acBuy',
            dateList: [],
            dialogVisible: false,
            form: {
                    status: 1000,
                    qbid: sessionStorage.getItem("userKey"),
                    limit: 10,
                    page: 1
            },
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
    computed: {

    },
    watch: {

    },
    created () {
        this.myOders();
    },
    mounted () {

    },
    destroyed () {

    },
    methods: {
        myOders(){
            userOrderList(this.form).then((res) => {
                    if (res.code == 0) {
                        this.dateList = res.data.list; 
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            // this.dateList=
        }
    }
}
</script>
<style scoped lang='less'>
.site-content {
    margin-top: 20px;

    &-screen {
        margin-bottom: 20px;
        float: right;
    }
}
</style>
