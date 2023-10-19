<!--
 
 * @Author       : wenquan
 * @desc         : otc首页列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-04-15 16:57:45
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\component\shop-table.vue
 -->
<template>
    <el-table :data="dateList" stripe style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" :sortable="item.sortable" v-for="(item, index) in columnList"
            :key="index"  :width="item.w">
            <template slot-scope="scope">
                <section v-if="item.prop === 'cslx'">
                    <el-tag type="primary" v-if="scope.row.cslx === 0">买入</el-tag>
                    <el-tag type="primary" v-if="scope.row.cslx === 1">卖出</el-tag>
                </section>
                <section v-else-if="item.prop === 'zt'">
                    <el-tag type="danger"  v-if="scope.row.zt === 0">下架</el-tag>
                    <el-tag type="success"  v-if="scope.row.zt === 1">上架</el-tag>
                </section>
                <section v-else>
                    {{ scope.row[item.prop] }}
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
                <el-popconfirm title="确定上架吗？" v-if="scope.row.zt==0" @confirm="getcommodityGrounding(scope.row.spid)">
                    <el-button size="mini" type="primary" slot="reference"> 上架
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定下架吗？" class="mal " v-if="scope.row.zt==1" @confirm="getcommodityWithdraw(scope.row.spid)">
                    <el-button size="mini" type="danger" slot="reference"> 下架
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定删除吗？" class="mal " v-if="scope.row.zt==0" @confirm="delfb(scope.row.spid)">
                    <el-button size="mini" type="danger" slot="reference"> 删除
                    </el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {
        commodityGrounding,
        commodityWithdraw,
        commodityDel,
    } from '@/api'
export default {
    name: 'invest-table',
    props: {
        dateList: Array,
        activeName: String,
        dialogVisible: Boolean
    },
    data () {
        return {
            columnList: [
                { prop: 'zt', label: '状态' },
                { prop: 'cslx', label: '交易方向' },
                { prop: 'fbmc', label: '法币' },
                { prop: 'bzmc', label: '虚拟币' },
                { prop: 'bzdj', label: '单价', sortable: true },
                { prop: 'bzsl', label: '数量' },
                { prop: 'zgxe', label: '最高限额' },
                { prop: 'zdxe', label: '最低限额' },
                { prop: 'jzsj', label: '截止时间', w:180},
                { prop: 'sdsl', label: '锁定数量' },
                { prop: 'cjsl', label: '成交数量' },
                { prop: 'kcsl', label: '库存数量' },
                // { prop: 'pair', label: '盈利', sortable: true },
                { prop: 'gxsj', label: '更新时间', w:180},
            ]
        }
    },
    created () {
        console.log(this.dateList)
    },
    methods: {
        getcommodityGrounding(a){
            commodityGrounding({spid:a}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('submitForm','shopForm');
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        getcommodityWithdraw(a){
            commodityWithdraw({spid:a}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('submitForm','shopForm');
                } else {
                    this.$message.error('操作失败，请重新尝试！');
                }
            })
        },
        delfb(a){
            commodityDel({spid:a}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('submitForm','shopForm');
                } else {
                    this.$message.error('操作失败，请重新尝试！');
                }
                })
        }
    }
}
</script>

<style scoped lang='less'>
.mal {
    margin-left: 10px
}

.otcTableColumn {
    &-adver {
        img {
            float: left;
            width: 30px;
            margin-top: 8px;
            margin-right: 5px;
        }

        span {
            float: left;
            line-height: 1.5;

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
<style>
    .el-popconfirm p{
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        }
        .el-button--text{
            padding: 7px 15px;
        }
</style>
