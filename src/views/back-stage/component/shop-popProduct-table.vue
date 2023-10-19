<!--
 
 * @Author       : wenquan
 * @desc         : otc首页列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-04-15 17:26:33
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\component\shop-popProduct-table.vue
 -->
<template>
    <el-table :data="dateList" stripe style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" :sortable="item.sortable" v-for="(item, index) in columnList"
            :key="index">
            <template slot-scope="scope">
                <section v-if="item.prop === 'type'">
                    <el-tag type="primary" disable-transitions>卖出</el-tag>
                </section>
                <section v-else-if="item.prop === 'state'">
                    <el-tag type="success" disable-transitions>下单成功</el-tag>
                </section>
                <section v-else>
                    {{ scope.row[item.prop] }}
                </section>
            </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
                <el-popconfirm title="确定冻结吗？">
                    <el-button size="mini" type="danger" slot="reference"> 冻结
                    </el-button>
                </el-popconfirm>
                <el-popconfirm title="确定下架吗？" class="mal ">
                    <el-button size="mini" type="primary" slot="reference"> 下架
                    </el-button>
                </el-popconfirm>
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
    data () {
        return {
            columnList: [
                { prop: 'pair', label: '代售' },
                { prop: 'low', label: '法币' },
                { prop: 'pair', label: '虚拟币' },
                { prop: 'pair', label: '数量' },
                { prop: 'pair', label: '价格' },
                { prop: 'pair', label: '截止时间' },
            ]
        }
    },
    created () {
        let time = setTimeout(() => {
            const h = this.$createElement;
            this.$notify({
                message: h('i', { style: 'color: teal' }, '保证金不足')
            });

            clearTimeout(time)
        }, 500);
    },
    methods: {

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
