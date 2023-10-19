<!--
 
 * @Author       : wenquan
 * @desc         : otc首页列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-04-15 16:31:49
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\component\shop-table.vue
 -->
<template>
    <el-table :data="dateList" stripe style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in columnList" :key="index">
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
        <el-table-column prop="action" label="操作" fixed="right">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="$router.push('/htBackStage/orderForm/detail')"> 详情
                </el-button>
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
                { prop: 'pair', label: '币种' },
                { prop: 'low', label: '数量' },
                { prop: 'pair', label: '法币' },
                { prop: 'pair', label: '金额' },
                { prop: 'pair', label: '币商' },
                { prop: 'pair', label: '用户' },
                { prop: 'type', label: '类型' },
                { prop: 'pair', label: '下单时间' },
                { prop: 'state', label: '状态' },
                { prop: 'pair', label: '审核情况' },
            ]
        }
    },
    created () {
        console.log(this.dateList)
    },
    methods: {

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
