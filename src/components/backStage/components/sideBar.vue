<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-04-01 10:36:35
 * @LastEditTime : 2023-04-15 18:06:59
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\components\backStage\components\sideBar.vue
-->
<template>
    <el-row class="sideBar-left">
        <el-col :span="4">
            <!-- <div class="sideBar-left-info">登录信息</div> -->
            <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="/htBackStage/home">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="/htBackStage">
                    <template slot="title">
                        <i class="el-icon-s-shop"></i>
                        <span>店铺管理</span>
                    </template>
                        <el-menu-item index="/htBackStage/shop">商品管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="/htBackStage/orderForm">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-submenu index="/basics">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>基础配置</span>
                    </template>
                    <el-menu-item index="/htBackStage/basics/store">店铺信息</el-menu-item>
                    <el-menu-item index="/htBackStage/basics/legal">法币</el-menu-item>
                    <el-menu-item index="/htBackStage/basics/pledge">保证金</el-menu-item>
                    <el-menu-item index="/htBackStage/basics/apply">申请结果</el-menu-item>

                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="20">
            <contents>
                <slot></slot>
            </contents>
        </el-col>
    </el-row>
</template>

<script>
    import contents from "./content";
    export default {
        name: 'sideBar',
        mixins: [],
        components: {
            contents
        },
        props: {

        },
        data() {
            return {

            }
        },
        computed: {

        },
        watch: {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped lang='less'>
    .sideBar-left {
        display: flex;
        background-color: #fff;

        >.el-col {
            &:nth-child(1) {
                // width: 100%;
                height: calc(100vh - 60px);
                padding: 0;
                background-color: #fff;
                overflow: auto;
                border-right: 3px solid #f6f6f6;


                .el-menu {
                    border-right: none
                }

                .el-menu-item {
                    min-width: auto;
                }
            }

            &:nth-child(2) {
                height: calc(100vh - 60px);
            }
        }

        &-info {
            text-align: center;
            color: #fff;
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #6e6868;
        }
    }
</style>
