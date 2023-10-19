<!--
 * @Author       : wenquan
 * @desc         : 法币
 * @Date         : 2023-04-01 13:12:03
 * @LastEditTime : 2023-04-15 17:43:58
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\basics-legal.vue
-->
<template>
    <div class='basics'>
        <el-tabs class="tab-top" v-model="activeName">
            <el-tab-pane label="法币" name="acBuy">
                <el-row class="tab-top-autocomplete">
                    <div>
                        <el-form :model="acSaleForm" :inline="true" ref="acSaleForms" class="demo-form-inline" size="mini">
                            <el-form-item label="法币" prop="fbid">
                                <el-select v-model="acSaleForm.fbid" placeholder="请选择">
                                    <el-option v-for="item in fblist" :label="item.name" :value="item.fbid"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('acSaleForms')">查询</el-button>
                                <el-button @click="czForm('acSaleForms')">重置</el-button>
                                <el-button size="mini" type="primary" @click="dialogVisible = true">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
                <basics-legal-table @submitForm="submitForm" :dateList="dateList">
                </basics-legal-table>
                <!-- <create-oder :dialogVisible.sync="dialogVisible" :activeName="activeName"></create-oder> -->
            </el-tab-pane>
            <el-tab-pane label="收款账户配置" name="acSale">
                <el-row class="tab-top-autocomplete">
                    <div>
                        <el-form :model="acSaleForm" :inline="true" ref="acSaleForm" class="demo-form-inline" size="mini">
                            <el-form-item label="法币" prop="fbid">
                                <el-select v-model="acSaleForm.fbid" placeholder="请选择">
                                    <el-option v-for="item in fblist" :label="item.name" :value="item.fbid"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="accountForms('acSaleForm')">查询</el-button>
                                <el-button @click="zhcz('acSaleForm')">重置</el-button>
                                <el-button size="mini" type="primary" @click="xzskzh">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
                <basicsAccountTable @accountForms="accountForms" :dateList="accountList">
                </basicsAccountTable>
                <!-- <create-oder :dialogVisible.sync="dialogVisible" :activeName="activeName"></create-oder> -->
            </el-tab-pane>
        </el-tabs>
        <!-- 新建法币-->
        <el-dialog title="新增法币" append-to-body destroy-on-close :visible.sync="dialogVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币(本门户支持)" prop="mhfb">
                    <el-select v-model="form.mhfb" placeholder="请选择法币" @change="hqfbxz" @visible-change="czbdl">
                        <el-option v-for="item in fblist" :label="item.name"
                            :value="{ value: item.fbid,name:item.name, bzj: item.bzjed, zffs: item.zffs, zfid: item.zffsid, zffslb: item.zffslb }"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="保证金支付方式" prop="zffs">
                    <el-select v-model="form.zffs" placeholder="请选择支付方式" @change="hqzhlb">
                        <el-option v-for="item in zffsSel" :label="item.name"
                            :value="{ value: item.id, name:item.name, lb: item.lb, fbid: item.fbid }"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门户账户" prop="mhzh" v-if="zflx == 0">
                    <el-select v-model="form.mhzh" placeholder="请选择门户账户" @change="fkmhzh">
                        <el-option v-for="item in zhSel" :label="item.zhm" :value="{ value: item.zhid, name: item.zhm, item: item }">
                            <span style="float: left">{{ item.zhmc }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhm }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="zflx == 1">
                    <el-form-item label="门户账户" prop="mhzh">
                        <el-select v-model="form.mhzh" placeholder="请选择门户账户" @change="skmxs">
                            <el-option v-for="item in zhSel" :label="item.khmc" :value="{ value: item.zhid, item: item }">
                                <span style="float: left">{{ item.zhmc }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.khmc }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门户收款码" v-if="skm">
                        <el-image style="width: 80px; height: 80px" :src="skm" :preview-src-list="[skm]">
                        </el-image>
                        <span>点击图片查看大图</span>
                    </el-form-item>
                </template>
                <template v-if="zflx == 2">
                    <el-form-item label="门户账户" prop="mhzh">
                        <el-select v-model="form.mhzh" placeholder="请选择门户账户" @change="dmjysj">
                            <el-option v-for="item in zhSel" :label="item.lxr" :value="{ value: item.zhid, item: item }">
                                <span style="float: left">{{ item.lxr }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.lxfs }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门户联系人" prop="lxr">
                        <el-input v-model="form.lxr" autocomplete="off" disabled placeholder="门户联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="门户联系方式" prop="lxfs">
                        <el-input v-model="form.lxfs" autocomplete="off" disabled placeholder="门户联系方式"></el-input>
                    </el-form-item>
                    <el-form-item label="门户地址" prop="dz">
                        <el-input v-model="form.dz" autocomplete="off" disabled placeholder="门户地址"></el-input>
                    </el-form-item>
                    <el-form-item label="门户营业时间" prop="yysj">
                        <el-input v-model="form.yysj" autocomplete="off" disabled placeholder="门户营业时间"></el-input>
                    </el-form-item>
                    <el-form-item label="门户地址图片" v-if="wztp">
                        <el-image style="width: 80px; height: 80px" :src="wztp" :preview-src-list="[wztp]">
                        </el-image>
                        <span>点击图片查看大图</span>
                    </el-form-item>
                </template>
                <el-form-item label="保证金额" prop="bzj">
                    <el-input v-model="form.bzj" autocomplete="off" disabled placeholder="需支付的保证金额"></el-input>
                </el-form-item>
                <el-form-item label="打款账户姓名" prop="zfr" v-if="zflx == 0">
                    <el-input v-model="form.zfr" autocomplete="off" placeholder="请输入打款账户姓名"></el-input>
                </el-form-item>
                <el-form-item label="打款备注" prop="zfr" v-else>
                    <el-input v-model="form.zfr" autocomplete="off" placeholder="请输入打款备注,支付时，请备注币商简称"></el-input>
                </el-form-item>
                <template>
                    <el-alert title="提交前请确认已支付保证金给门户账户!" type="warning" show-icon :closable="false">
                    </el-alert>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeNewShop('form')">取 消</el-button>
                <el-button type="primary" @click="newShop('form')">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 新建收款账户-->

        <el-dialog title="新增收款账户" :visible.sync="dialogAccount" width="500px">
            <el-form :model="accountForm" :rules="rules" ref="accountForm" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币" prop="fbid">
                    <el-select v-model="accountForm.fb" placeholder="请选择法币" @change="cjzhfb">
                        <el-option v-for="item in dateLists" :label="item.name"
                            :value="{ value: item.fbid, item: item }"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" prop="zffs">
                    <el-select v-model="accountForm.zffs" placeholder="请选择支付方式" @change="hqzfzhlb">
                        <el-option v-for="item in payList" :label="item.name" :value="{ value: item.id, lb: item.lb }">
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="lb == 2">
                    <el-form-item label="交易地址" prop="dz">
                        <el-input v-model="accountForm.dz" autocomplete="off" placeholder="交易地址"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="lxfs">
                        <el-input v-model="accountForm.lxfs" autocomplete="off" placeholder="联系方式"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="lxr">
                        <el-input v-model="accountForm.lxr" autocomplete="off" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="yysj">
                        <el-time-picker is-range v-model="accountForm.yysj" range-separator="至" start-placeholder="开始时间"
                            end-placeholder="结束时间" placeholder="选择时间范围" value-format="HH:mm:ss" style="width: 100%;">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="地址图片" prop="dztp">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="dztpsc"
                            :auto-upload="false">
                            <img v-if="accountForm.dztp" :src="accountForm.dztp" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="账户名称" prop="zhmc">
                        <el-input v-model="accountForm.zhmc" autocomplete="off" placeholder="账户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开户姓名" prop="khmc" v-if="lb == 0">
                        <el-input v-model="accountForm.khmc" autocomplete="off" placeholder="开户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="khmc" v-if="lb == 1">
                        <el-input v-model="accountForm.khmc" autocomplete="off" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="zhm" v-if="lb == 0">
                        <el-input v-model="accountForm.zhm" autocomplete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item label="收款码" prop="skm" v-if="lb == 1">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="skmsc"
                            :auto-upload="false">
                            <img v-if="accountForm.skm" :src="accountForm.skm" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeNewAccount('accountForm')">取 消</el-button>
                <el-button type="primary" @click="newAccount('accountForm')">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 门户账户信息-->
        <el-dialog title="门户账户信息" append-to-body destroy-on-close :visible.sync="dialogAccountInfo" width="500px">
            <el-form size="small" :label-width="formLabelWidth">
                <el-form-item label="法币："><span>{{ skzhxx.fb }}</span></el-form-item>
                <el-form-item label="保证金额："><span>{{ skzhxx.bzj }}</span></el-form-item>
                <el-form-item label="支付方式："><span>{{ skzhxx.zffs }}</span></el-form-item>
                <template v-if="zflx != 2">
                    <el-form-item label="门户账户："><span>{{ skzhxx.zh }}</span></el-form-item>
                    <el-form-item label="门户户名："><span>{{ skzhxx.hm }}</span></el-form-item>
                    <el-form-item v-if="zflx == 0" label="门户账号："><span>{{ skzhxx.zhdm }}</span></el-form-item>
                    <el-form-item v-if="zflx == 1" label="门户收款码："><el-image style="width: 80px; height: 80px" :src="skm"
                            :preview-src-list="[skm]">
                        </el-image>
                        <span>点击图片查看大图</span></el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="门户联系人："><span>{{ skzhxx.lxr }}</span></el-form-item>
                    <el-form-item label="门户联系方式："><span>{{ skzhxx.lxfs }}</span></el-form-item>
                    <el-form-item label="门户地址："><span>{{ skzhxx.dz }}</span></el-form-item>
                    <el-form-item label="门户营业时间："><span>{{ skzhxx.yysj }}</span></el-form-item>
                    <el-form-item label="门户地址图片："><el-image style="width: 80px; height: 80px" :src="wztp"
                            :preview-src-list="[wztp]">
                        </el-image>
                        <span>点击图片查看大图</span></el-form-item>
                </template>
                <el-form-item label="备注："><span>{{ skzhxx.zfr }}</span></el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    legalcurrencyList,
    legalcurrencyAdd,
    legalCurrencySelect,
    accounSelectes,
    paymentaccountList,
    paymentmethodList,
    paymentaccountAdd, legalCurrencyBsLists
} from '@/api'
import basicsLegalTable from './component/basics-legal-table'
import basicsAccountTable from './component/basics-account-table'
import createOder from '@/components/createOder'
export default {
    name: '',
    mixins: [],
    components: {
        basicsLegalTable,
        basicsAccountTable,
        createOder
    },
    props: {

    },
    data() {
        return {
            formLabelWidth: '140px',
            skm: '',
            wztp: '',
            skzhxx: [],
            accountForm: {
                bsid: sessionStorage.getItem("userKey"),
                zffsid: '',
                skm: '',
                dztp: '',
                jmtp: '',
                ewm: '',
                zhm: '',
                dz: '',
                lxr: '',
                lxfs: '',
                yysj: '',
            },
            form: {
                mhfb:'',
                zffs:'',
                mhzh:'',
                fbid: '',
                zhid: '',
                bzj: '',
                zfr: '',
                lxr: '',
                lxfs: '',
                dz: '',
                yysj: '',
                bsid: sessionStorage.getItem("userKey")
            },
            activeName: 'acBuy',
            acSaleForm: {
                bsid: sessionStorage.getItem('userKey'),
                zhid: '',
                limit: 10,
                page: 1,
            },
            accountList: [],
            dateList: [],
            dateLists: [],
            currencyList: [],
            fblist: [],
            zffsSel: [],
            zhSel: [],
            payList: [],
            zflx: '',
            lb: '',
            dialogVisible: false,
            titleVisible: false,
            dialogAccount: false,
            dialogAccountInfo: false,
            rules: {
                fbid: [{
                    required: true,
                    message: "请选择法币",
                    trigger: 'blur'
                }],
                mhfb: [{
                    required: true,
                    message: "请选择法币",
                    trigger: 'change'
                }],
                zffs: [{
                    required: true,
                    message: "请选择支付方式",
                    trigger: 'change'
                }],
                zhid: [{
                    required: true,
                    message: "请选择账户",
                    trigger: 'blur'
                }],
                mhzh: [{
                    required: true,
                    message: "请选择账户",
                    trigger: 'change'
                }],
                zfr: [{
                    required: true,
                    message: "请输入内容",
                    trigger: 'blur'
                }],
                zhmc: [{
                    required: true,
                    message: "请输入账号名称",
                    trigger: 'blur'
                }],
                khmc: [{
                    required: true,
                    message: "请输入内容",
                    trigger: 'blur'
                }],
                zhm: [{
                    required: true,
                    message: "请输入账号",
                    trigger: 'blur'
                }],
                skm: [{
                    required: true,
                    message: "请上传收款码",
                    trigger: 'blur'
                }],
                dz: [{
                    required: true,
                    message: "请输入交易地址",
                    trigger: 'blur'
                }],
                lxr: [{
                    required: true,
                    message: "请输入联系人",
                    trigger: 'blur'
                }],
                lxfs: [{
                    required: true,
                    message: "请输入联系方式",
                    trigger: 'blur'
                }],
                yysj: [{
                    required: true,
                    message: "请选择营业时间",
                    trigger: 'blur'
                }]
            },
        }
    },
    mounted() {
        // this.currency()
    },
    created() {
        this.getLegalcurrencyList()
        this.getpaymentaccountList()
        this.getlegalCurrencySelect()
        // this.getpaymentmethodList()
    },
    methods: {
        xzskzh() {
            this.dialogAccount = true
            this.getLegalCurrencyBsLists()
        },
        getLegalCurrencyBsLists() {
            legalCurrencyBsLists({ bsid: sessionStorage.getItem('userKey') }).then(({
                data
            }) => {
                this.dateLists = data;
            })
        },
        cjzhfb(a) {
            this.accountForm.fbid = a.value;
            let zffs = [];
            let name = a.item.zffs.split(",");
            let id = [];
            a.item.zffsid.split(",").forEach(function (v) {
                id.push(Number(v))
            })
            let lb = [];
            a.item.zffslb.split(",").forEach(function (v) {
                lb.push(Number(v))
            })
            id.forEach(function (v, i) {
                let obj = new Object();
                obj.name = name[i];
                obj.id = id[i];
                obj.lb = lb[i];
                zffs.push(obj);
            })
            this.payList = zffs
        },
        dmjysj(e) {
            console.log(e, 0)
            this.wztp = '/imgsave/icon-save/' + e.item.wztp;
            this.form.zhid = e.value
            this.form.lxr = e.item.lxr
            this.form.lxfs = e.item.lxfs
            this.form.dz = e.item.dz
            this.form.yysj = e.item.yysj.replace(',', '-')

            this.skzhxx.lxr = e.item.lxr
            this.skzhxx.lxfs = e.item.lxfs
            this.skzhxx.dz = e.item.dz
            this.skzhxx.yysj = e.item.yysj.replace(',', '-')
            
        },
        skmxs(e) {
            this.form.khmc = e.item.khmc;
            this.skzhxx.zh=e.item.zhmc;
            this.skzhxx.hm=e.item.khmc;
            this.skm = '/imgsave/icon-save/' + e.item.skm;
            this.form.zhid = e.value
            console.log(e)
        },
        newAccount(formName) {
            let formdata = new FormData();
            formdata.append("cjr", this.accountForm.bsid)
            formdata.append("fbid", this.accountForm.fbid)
            formdata.append("zffsid", this.accountForm.zffsid)
            formdata.append("zflx", this.lb)
            if (this.lb == 2) {
                formdata.append("dz", this.accountForm.dz)
                formdata.append("lxr", this.accountForm.lxr)
                formdata.append("lxfs", this.accountForm.lxfs)
                formdata.append("yysj", this.accountForm.yysj)
            } else {
                formdata.append("zhmc", this.accountForm.zhmc)
                formdata.append("khmc", this.accountForm.khmc)
                formdata.append("zhm", this.accountForm.zhm)
            }
            if (this.accountForm.ewm != '') {
                formdata.append("ewm", this.accountForm.ewm)
            }
            if (this.accountForm.jmtp != '') {
                formdata.append("pmdztp", this.accountForm.jmtp)
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        paymentaccountAdd(formdata).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '账号创建成功',
                                    type: 'success'
                                })
                                this.dialogAccount = false
                                this.resetForm(formName);
                                this.getpaymentaccountList()
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        });
                    } catch (e) {
                        console.error(error);
                        return false;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeNewAccount(formName) {
            this.resetForm(formName);
            this.dialogAccount = false;
        },
        // handleAvatarSuccess(res, file) {
        //     this.accountForm.skm = URL.createObjectURL(file.raw);
        // },
        skmsc(file) {
            this.accountForm.ewm = file.raw;
            this.accountForm.skm = URL.createObjectURL(file.raw);
        },
        dztpsc(file) {
            this.accountForm.jmtp = file.raw;
            this.accountForm.dztp = URL.createObjectURL(file.raw);
        },
        hqzfzhlb(a) {
            this.accountForm.zffsid = a.value
            this.lb = a.lb
            console.log(a.lb)
        },
        beforeAvatarUpload(file) {
            this.image = file.raw;
            this.accountForm.skm = URL.createObjectURL(file.raw);
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
        },
        // async getpaymentmethodList() {
        //     await paymentmethodList().then(({
        //         data
        //     }) => {
        //         this.payList = data;
        //     })
        // },
        async getpaymentaccountList() {
            await paymentaccountList(this.acSaleForm).then(({
                data
            }) => {
                this.accountList = data;
            })
        },
        closeNewShop(formName) {
            this.resetForm(formName);
            this.dialogVisible = false;
        },
        accountForms(formName) {
            this.getpaymentaccountList();
        },
        zhcz(formName) {
            this.resetForm(formName);
            this.getpaymentaccountList();
        },
        newShop(formName) {
            console.log(this.form)
            this.skzhxx.bzj = this.form.bzj;
            this.skzhxx.zfr = this.form.zfr;
            console.log(this.skzhxx)

            this.$refs[formName].validate(async (valid,e) => {
                console.log(e)
                if (valid) {
                    try {
                        legalcurrencyAdd(this.form).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '恭喜你，信息提交成功，请等待审核。',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                                this.getLegalcurrencyList()
                                this.dialogVisible = false;
                                this.dialogAccountInfo=true
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        });
                    } catch (e) {
                        console.error(error);
                        return false;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        hqzhlb(id) {
            this.skzhxx.zffs=id.name;
            this.form.zhid = ''
            this.getaccounSelect(id);
        },
        fkmhzh(id) {
            this.skzhxx.zh=id.item.zhmc;
            this.skzhxx.hm=id.item.khmc;
            this.skzhxx.zhdm=id.item.zhm;
            this.form.zhid = id.value
        },
        getaccounSelect(id) {
            let user = sessionStorage.getItem("userKey")
            user = user.substr(user.length - 3, 3)
            user = parseInt(user, 16)
            accounSelectes({
                id: id.value,
                lb: id.lb,
                fbid:id.fbid,
                pd: user
            }).then(({
                data
            }) => {
                this.zhSel = data;
                if(data.length>0)
                this.zflx = data[0].zflx
            })
        },
        czbdl(e){
            if(e){
                this.$refs['form'].resetFields();
            this.zffsSel = [];
            this.zhSel = [];
            console.log(e)
            }
        },
        hqfbxz(a) {
            console.log(a)
            // this.zffsSel = [];
            // this.zhSel = [];
            // this.form.zffs = [];
            // this.form.zh = [];
            // this.form.fb=a.name;
            this.skzhxx.fb=a.name;
            let zffs = [];
            let name = a.zffs.split(",");
            let id = [];
            a.zfid.split(",").forEach(function (v) {
                id.push(Number(v))
            })
            let lb = [];
            a.zffslb.split(",").forEach(function (v) {
                lb.push(Number(v))
            })
            id.forEach(function (v, i) {
                let obj = new Object();
                obj.name = name[i];
                obj.id = id[i];
                obj.lb = lb[i];
                obj.fbid = a.value;
                zffs.push(obj);
            })
            this.zffsSel = zffs
            this.form.bzj = a.bzj
            this.form.fbid = a.value
            this.titleVisible = true
        },
        async getlegalCurrencySelect() {
            await legalCurrencySelect().then(({
                data
            }) => {
                this.fblist = data;
            })
        },
        submitForm(formName) {
            console.log(this.acSaleForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getLegalcurrencyList()
                    this.resetForm(formName);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        czForm(formName) {
            this.resetForm(formName);
            this.getLegalcurrencyList();
        },
        newAcSale() { },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getLegalcurrencyList() {
            legalcurrencyList(this.acSaleForm).then(({
                data
            }) => {
                this.dateList = data.list;
            })
        }
    }
}
</script>
<style scoped lang='less'>
.el-select {
    width: 100%;
}

.basics {
    .tab-top {
        background: #fff;
        padding: 20px;

        &-autocomplete {
            text-align: right;

            >div {
                // margin-left: 10px;
                margin: 10px 0 10px 10px;
                display: flex;
                align-items: center;
            }
        }
    }

    .currency {
        padding-bottom: 20px;

        li {
            margin: 0 20px;
            height: 40px;
            box-sizing: border-box;
            line-height: 40px;
            display: inline-block;
            list-style: none;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            cursor: pointer;
            position: relative;

            &:hover {
                color: #409eff;
                border-bottom: 2px solid #409eff;
            }
        }

        .currency-active {
            color: #409eff;
            border-bottom: 2px solid #409eff;
        }
    }

}
</style>

<style>
/* .el-button--primary {
        background-color: #0d5959;
    }

 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
