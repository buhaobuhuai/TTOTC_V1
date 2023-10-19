<!--
 
 * @Author       : wenquan
 * @desc         : 法币table
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-04-15 17:57:24
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\component\basics-legal-table.vue
 -->
<template>
    <el-table :data="dateList" stripe style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" :sortable="item.sortable" v-for="(item, index) in columnList"
            :key="index" :width="item.w">
            <template slot-scope="scope">
                <section v-if="item.prop === 'zt'">
                    <el-tag type="danger"  v-if="scope.row.zt === 0" disable-transitions>冻结</el-tag>
                    <el-tag type="success"  v-if="scope.row.zt === 1" disable-transitions>流通</el-tag>
                </section>
                <section v-else-if="item.prop === 'zflx'">
                    <el-tag type="success"  v-if="scope.row.zflx === 0" disable-transitions>账号</el-tag>
                    <el-tag type="success"  v-if="scope.row.zflx === 1" disable-transitions>收款码</el-tag>
                    <el-tag type="success"  v-if="scope.row.zflx === 2" disable-transitions>现金</el-tag>
                </section>
                <section v-else-if="item.prop === 'zhm'">
                    <span v-if="scope.row.zflx == 0">{{ scope.row.zhm}}</span>
                    <el-image v-if="scope.row.zflx == 1" style="width: auto; height: 50px" :src="'/imgsave/icon-save/'+scope.row.skm"
                        fit="scale-down" />
                </section>
                <section v-else>
                    {{ scope.row[item.prop] }}
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" width="160">
            <template slot-scope="scope">
                <el-popconfirm title="确定冻结吗？" v-if="scope.row.zt === 1" @confirm="djjd(scope.row.zhid,0)">
                    <el-button size="mini" type="danger" slot="reference"> 冻结
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定解冻吗？" class="mal" v-if="scope.row.zt === 0" @confirm="djjd(scope.row.zhid,1)">
                    <el-button size="mini" type="primary" slot="reference"> 解冻
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定删除吗？" class="mal" v-if="scope.row.zt==0" @confirm="delfb(scope.row.zhid)">
                    <el-button size="mini" type="danger" slot="reference"> 删除
                    </el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {
        paymentaccountUp,
        paymentaccountDel,
    } from '@/api'
export default {
    name: 'invest-table',
    props: {
        dateList: Array,
        // activeName: String,
        // dialogVisible: Boolean
    },
    data () {
        return {
            columnList: [
                { prop: 'zhmc', label: '收款账户' },
                { prop: 'khmc', label: '户名' },
                { prop: 'zhm', label: '账号' },
                { prop: 'fbmc', label: '法币' },
                { prop: 'zffs', label: '支付方式' },
                { prop: 'zflx', label: '账号类型' },
                { prop: 'lxr', label: '联系人' },
                { prop: 'lxfs', label: '联系方式' },
                { prop: 'dz', label: '联系地址' },
                { prop: 'yysj', label: '营业时间' },
                { prop: 'zt', label: '状态' },
                // { prop: 'cjsj', label: '创建时间',w:180 },
            ]
        }
    },
    created () {
        console.log(this.dateList)
    },
    methods: {
        djjd(a,b){
            paymentaccountUp({zhid:a,zt:b}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('accountForms');
                } else {
                    this.$message.error('操作失败，请重新尝试！');
                }
            })
        },
        delfb(a){
            paymentaccountDel({zhid:a}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('accountForms');
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
