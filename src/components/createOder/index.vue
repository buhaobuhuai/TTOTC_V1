<!--
 * @Author       : wenquan
 * @desc         : 创建订单操作
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-02-26 15:42:50
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\createOder\index.vue
 -->
<template>
    <el-dialog center class="otc-add-oder-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
        <section>
            <p>订单创建成功！</p>
            <span v-if="activeName==='acBuy'">本订单已经锁定币商 124.84USDT请在60分钟内支付虚拟币至币商钱包</span>
            <span v-if="activeName==='acSale'">本订单已经锁定 124.84USDT用户将在60分钟内支付</span>
            <!--<span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span> -->
            <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"
                class="demo-ruleForm">
                <el-form-item label="购买USTD" prop="name">
                    <span class="oderSpan">123.4</span>
                </el-form-item>
                <el-form-item label="需要支付(GTQ)" prop="name">
                    <span class="oderSpan">1000</span>
                </el-form-item>
                <el-form-item label="支付方式" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择">
                        <el-option label="银行卡支付" value="1"></el-option>
                        <el-option label="微信二维码" value="2"></el-option>
                        <el-option label="当面交易" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="币商账户名称" prop="name">
                    <span class="oderSpan">李运</span>
                </el-form-item>
                <!-- <template v-if="activeName==='acBuy'"> -->
                <template v-if="ruleForm.region==='1'">
                    <el-form-item label="币商银行卡号" prop="name">
                        <span class="oderSpan">5123 1234 2321 3432 527</span>
                    </el-form-item>
                    <el-form-item label="币商银行开户行" prop="name">
                        <span class="oderSpan"></span>
                    </el-form-item>

                </template>
                <template v-if="ruleForm.region==='2'">

                    <el-form-item label="币商二维码" prop="name">
                        <span class="oderSpan">我是二维码</span>
                    </el-form-item>
                </template>
                <template v-if="ruleForm.region==='3'">
                    <el-form-item label="币商联系方式" prop="name">
                        <span class="oderSpan">
                            地址 xxxxxxxxxxxxxxxxx
                            <br />
                            电话 xxxxxxxxxxxxxxxxxx
                            <br />
                            营业时间 xxxxxxxxxxxx

                        </span>
                    </el-form-item>
                </template>
                <el-form-item label="用户收币地址" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择">
                        <el-option label="钱包" value="shanghai"></el-option>
                        <el-option label="添加新钱包" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="name">
                    <span class="oderSpan">这是一个备注</span>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <span v-if="activeName==='acBuy'">

                        <el-button type="primary" plain @click="submitForm('ruleForm')">退出</el-button>
                        <el-button type="success" plain @click="resetForm('ruleForm')">支付</el-button>
                        <el-button type="danger" plain @click="resetForm('ruleForm')">关闭</el-button>
                    </span>
                    <span v-else>
                        <el-button type="info" plain @click="submitForm('ruleForm')">查看</el-button>
                    </span>
                </el-form-item>
                <!-- </template> -->
                <!-- <template v-if="activeName==='acSale'">
                    <el-form-item style="text-align: right;">
                    </el-form-item>
                </template> -->

            </el-form>
        </section>
    </el-dialog>
</template>
<script>
    export default {
        name: '',
        mixins: [],
        components: {

        },
        props: {
            dialogVisible: Boolean,
            activeName: String,
            orderId: String
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }]
                }

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
            /**
             * @description: 关闭订单探窗
             * @return {*}
             */
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit('update:dialogVisible', false)
                        // done();
                    })
                    .catch(_ => {});
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped lang='less'>
    .otc-add-oder-dialog {
        ::v-deep {
            .el-dialog__header {
                padding: 0;
            }
        }

        .oderSpan {
            color: #999;

        }

        section {
            >p {
                text-align: center;
                font-size: 27px;
                font-family: cursive;
                font-weight: bold;
                color: #7fbc10;
                text-shadow: 0px 0px 3px #fff, 0px 0px 3px #a7a2a2;
                padding-bottom: 20px;
                border-bottom: 1px dashed #eee;
                margin-bottom: 10px;
            }

            >span {
                margin: 10px 0 20px;
                color: #22ad20;
                line-height: 1.3;
                display: block;
                text-align: center;
            }
        }
    }
</style>
