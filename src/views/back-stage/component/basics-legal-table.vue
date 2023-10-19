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
                    <el-tag type="warning"  v-if="scope.row.zt === 2" disable-transitions>待审核</el-tag>
                </section>
                <section v-else-if="item.prop === 'sfsxf'">
                    <el-tag type="danger"  v-if="scope.row.sfsxf === 0" disable-transitions>否</el-tag>
                    <el-tag type="success"  v-if="scope.row.sfsxf === 1" disable-transitions>是</el-tag>
                </section>
                <section v-else-if="item.prop === 'fl'">
                    <span v-if="scope.row.sfsxf === 0">0</span>
                    <span v-else>{{scope.row.fl*100}}</span>
                </section>
                <section v-else>
                    {{ scope.row[item.prop] }}
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
                <el-popconfirm title="确定冻结吗？" v-if="scope.row.zt === 1" @confirm="djjd(scope.row.id,0)">
                    <el-button size="mini" type="danger" slot="reference"> 冻结
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定解冻吗？" class="mal" v-if="scope.row.zt === 0" @confirm="djjd(scope.row.id,1)">
                    <el-button size="mini" type="primary" slot="reference"> 解冻
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定删除吗？" class="mal " v-if="scope.row.ksyed<1" @confirm="delfb(scope.row.id)">
                    <el-button size="mini" type="danger" slot="reference"> 删除
                    </el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {
        legalcurrencyUp,
        legalcurrencyDel,
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
                { prop: 'fbmc', label: '名称' ,w:80 },
                { prop: 'fbfh', label: '符号' ,w:60},
                { prop: 'fbdm', label: '代码' ,w:60},
                { prop: 'bzj', label: '保证金额度' ,w:120},
                { prop: 'ksyed', label: '可使用额度' ,w:120},
                { prop: 'sfsxf', label: '是否收手续费' ,w:120},
                { prop: 'fl', label: '手续费费率%' ,w:120},
                { prop: 'zt', label: '状态' },
                { prop: 'cjsj', label: '创建时间',w:180 },
            ]
        }
    },
    created () {
        console.log(this.dateList)
    },
    methods: {
        djjd(a,b){
            legalcurrencyUp({id:a,zt:b}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('submitForm','acSaleForms');
                } else {
                    this.$message.error('操作失败，请重新尝试！');
                }
            })
        },
        delfb(a){
            legalcurrencyDel({id:a}).then(res => {
                if(res.code==0){
                    this.$message({
                              message: '操作成功',
                              type: 'success'
                            });
                    this.$emit('submitForm','acSaleForms');
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
.el-popconfirm{
    p{margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;}
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
