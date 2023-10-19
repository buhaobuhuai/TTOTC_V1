<!--
 
 * @Author       : wenquan
 * @desc         : otc首页列表
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-03-08 19:58:19
 * @LastEditors  : wenquan
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\table\otc-table.vue
 -->
<template>
    <div>
        <el-table :data="dateList" stripe style="width: 100%">
            <el-table-column prop="pair" label="币商（数量|完成率）">
                <template slot-scope="scope">
                    <section class="otcTableColumn-adver">
                        <!-- <img :src="'http://localhost/imgsave/icon-save/'+scope.row.dptp"> -->
                        <el-avatar fit="contain" :src="'/imgsave/icon-save/'+scope.row.dptp"></el-avatar>
                        <span>
                            <b>{{scope.row.jc}}</b>
                            <label>交易：{{scope.row.xdl}} |
                                {{scope.row.xdl === 0 ? 0 : parseInt(scope.row.wcl/scope.row.xdl*100)}}%</label>
                        </span>
                    </section>
                </template>
            </el-table-column>
            <el-table-column prop="bzdj" label="价格">
                <template slot-scope="scope">
                    <span class="price-type">{{scope.row.bzdj.toLocaleString()}} {{scope.row.fbdm}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cgabge" width="" label="数量 | 限额">
                <template slot-scope="scope">
                    <section class="otcTableColumn-usable">
                        <p><label>数量</label>{{scope.row.kcsl}} {{scope.row.bzmc}}</p>
                        <p><label>限额</label>{{scope.row.zdxe.toLocaleString()}}-{{scope.row.zgxe>scope.row.ksyed ? scope.row.ksyed.toLocaleString() : scope.row.zgxe.toLocaleString()}}
                            {{scope.row.fbmc}}
                        </p>
                    </section>
                </template>

            </el-table-column>
            <el-table-column prop="zffs" label="付款方式" width="">
                <template slot-scope="scope">
                    <el-tag v-for="(item,i) in scope.row.zffs.split(',')" :key="item" :type="tagtype[i].type"
                        effect="plain">{{item}}</el-tag>
                    <!-- <section class="otcTableColumn-way">
                    <span v-for="item in scope.row.zffs.split(',')" :key="item">{{item}}</span>
                </section> -->
                </template>

            </el-table-column>
            <el-table-column prop="action" label="交易" width="140">
                <template slot-scope="scope" v-if="scope.row.cjr!=yhzh">
                    <el-button v-if="scope.row.cslx==1" @click="handleClick(scope.row)" type="primary" size="medium">
                        购买{{scope.row.bzmc}}</el-button>
                    <el-button v-else @click="handleClick(scope.row)" type="danger" size="medium">出售{{scope.row.bzmc}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 下单-->
        <el-dialog title="交易下单" :visible.sync="dialogVisibles" width="500px">

            <div>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <div>
                            <el-statistic title="数量">
                                <template slot="formatter">{{otcData.bzsl + otcData.bzmc}} </template>
                            </el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <el-statistic title="限额">
                                <template slot="formatter">{{zdxe.toLocaleString()}}-{{zgxe.toLocaleString()}}
                                    {{otcData.fbdm}}</template>
                            </el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="8">

                        <div>
                            <el-statistic title="单价">
                                <template slot="formatter">{{bzdj+ otcData.fbdm}} </template>
                            </el-statistic>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">

                <el-form-item label="总价" prop="jg">
                    <el-input placeholder="请输入总价" v-model="form.jg" @change="jsfbsl">
                        <template slot="append">{{otcData.fbdm}}</template>
                    </el-input>
                    <!-- <el-input-number v-model="form.jg" :precision="2" :step="0.1" autocomplete="off" placeholder="总价">
                        
                    </el-input-number> -->
                </el-form-item>
                <el-form-item label="数量" prop="sl">
                    <el-input placeholder="请输入数量" v-model="form.sl" @change="jszjg">
                        <template slot="append">{{otcData.bzmc}}</template>
                    </el-input>
                    <!-- <el-input-number v-model="form.sl" :precision="6" :step="0.1" autocomplete="off" placeholder="数量"></el-input-number> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeFome('form')">取 消</el-button>
                <el-button type="primary" @click="placeOrder('form')">下 单</el-button>
            </div>
        </el-dialog>
        
        <!-- -->
        <!-- <create-oder :orderId="ddid" :dialogVisible.sync="dialogVisible" :activeName="activeName"></create-oder> -->
    </div>
</template>

<script>
    import {
        orderSave,
    } from '@/api'
    import createOder from '@/components/createOder'
    export default {
        name: 'invest-table',
        components:{createOder},
        props: {
            dateList: Array,
            activeName: String,
            // dialogVisible: Boolean
        },
        data() {
            var jgyz = (rule, value, callback) => {
                // console.log(parseFloat(this.zdxe))
                if (value === '') {
                    callback(new Error('请输入总价'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) < this.zdxe) {
                    callback(new Error('不能低于最低限额'));
                } else if (parseFloat(value) > this.zgxe) {
                    callback(new Error('不能高于最高限额'));
                } else if (parseFloat(value) === 0) {
                    callback(new Error('不能为0'));
                } else {
                    callback();
                }
            };
            var slpd = (rule, value, callback) => {
                // console.log(0)
                if (value === '') {
                    callback(new Error('请输入数量'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) > this.otcData.bzsl) {
                    callback(new Error('超出现有数量'));
                } else if (parseFloat(value) === 0) {
                    callback(new Error('不能为0'));
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: '80px',
                dialogVisibles: false,
                dialogVisible: true,
                yhzh:sessionStorage.getItem("userKey"),
                form: {jg:'',sl:''},
                otcData: {},
                zgxe: '',
                zdxe: '',
                bzdj: '',
                ddid: '',
                tagtype: [{
                        type: ''
                    },
                    {
                        type: 'success'
                    },
                    {
                        type: 'info'
                    },
                    {
                        type: 'danger'
                    },
                    {
                        type: 'warning'
                    }
                ],
                rules: {
                    jg: [{
                        validator: jgyz,
                        required: true,
                        // message: "请输入总价",
                        trigger: 'blur'
                    }],
                    sl: [{
                        validator: slpd,
                        required: true,
                        // message: "请输入数量",
                        trigger: 'blur'
                    }]
                }

            }
        },
        created() {
            let geturl = window.location.href
            let getqyinfo = geturl.split('/')[3]
            // console.log(this.dateList + '104')
        },
        methods: {
            placeOrder(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let parm={
                            spid:this.otcData.spid,
                            fbmc:this.otcData.fbmc,
                            fbid:this.otcData.fbid,
                            bzhy:this.otcData.bzhy,
                            bzmc:this.otcData.bzmc,
                            sl:this.form.sl,
                            je:this.form.jg,
                            yhdz:sessionStorage.getItem("userKey"),
                            bsdz:this.otcData.cjr,
                            ddlx:this.otcData.cslx
                        };
                        orderSave(parm).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '恭喜你，下单成功。',
                                        type: 'success'
                                    });
                                    this.ddid=res.data;
                                    this.closeFome(formName);
                                    // this.dialogVisible=true;
                                    this.$router.push('/bourse?'+res.data);
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }).catch(err => {
                                this.$message.error('下单出错，请重新尝试。');
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            closeFome(formName){
                this.dialogVisibles = false
                this.$refs[formName].resetFields();
            },
            jszjg(e) {
                this.form.jg = (e * this.otcData.bzdj).toFixed(2)
                console.log(e)
            },
            jsfbsl(e) {
                let sl=(e / this.otcData.bzdj).toFixed(6);
                // let sls=sl.toFixed(6);
                this.form.sl = sl
                // console.log(sls)
            },

            handleClick(e) {
                if (sessionStorage.getItem("userKey")) {
                    console.log(e)
                    this.otcData = e;
                    this.zdxe = e.zdxe;
                    this.zgxe = e.zgxe > e.ksyed ? e.ksyed : e.zgxe;
                    this.bzdj = e.bzdj.toLocaleString();
                    this.dialogVisibles = true
                    // this.$router.push('/bourse')
                } else {
                    this.$message.error('请先登录账号在进行操作。');
                }
                // this.$router.push('/bourse')
                // this.$emit('update:dialogVisible', !this.dialogVisible)
            }
        }
    }
</script>

<style scoped lang='less'>
    .otcTableColumn {
        &-adver {
            img {
                float: left;
                width: 42px;
                height: 42px;
                margin-right: 10px;
                border-radius: 50%;
                background: #eefcfc;
                padding: 2px;
            }

            span {
                float: left;
                line-height: 1.5;
                margin-right: 10px;

                b {
                    display: block;
                }

                label {
                    color: #909090;
                    font-size: 12px;
                }

            }
        }

        &-usable {
            p {
                color: #666;

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

    .price-type {
        font-size: 20px;
        font-weight: 600;
    }

    .el-button--medium {
        font-weight: 600;
    }

    .like {
        cursor: pointer;
        font-size: 25px;
        display: inline-block;
    }
</style>
<style>
    .el-statistic .con .number {
        font-size: 14px;
    }

    .el-input-number .el-input__inner {
        border: 1px solid #DCDFE6;
        background-color: white;
    }
    .el-avatar--circle{
        
    }
</style>
