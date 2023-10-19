<!--
 我的收款账号
-->
<template>
    <div class="site-content">
        <div class="haed">
            <el-page-header @back="goBack" content="我的收款账号">
            </el-page-header>
        </div>
        <div class='pledge'>
            <el-button type="primary" size="mini" @click="dialogAccount=true">新 建</el-button>
            <template>
                <el-table :data="paymentaccountData" stripe style="width: 100%">
                    <el-table-column prop="zhmc" label="账户名称"></el-table-column>
                    <el-table-column prop="khmc" label="开户姓名"></el-table-column>
                    <el-table-column prop="zhm" label="账号">
                        <template slot-scope="scope">
                            <span v-if="scope.row.zflx == 0">{{ scope.row.zhm}}</span>
                            <el-image v-if="scope.row.zflx == 1" style="width: auto; height: 50px" :src="'/imgsave/icon-save/'+scope.row.skm"
                                fit="scale-down" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="fbmc" label="法币"></el-table-column>
                    <el-table-column prop="zffs" label="支付方式"></el-table-column>
                    <el-table-column prop="zflx" label="账号类型">
                        <template slot-scope="scope">
                            <el-tag>
                                {{ scope.row.zflx == 0 ? "账号" : "收款码" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定删除吗？" class="mal" @confirm="delfb(scope.row.zhid)">
                                <el-button size="mini" type="danger" slot="reference"> 删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

        </div>

        <!-- 新建收款账户-->

        <el-dialog title="新增收款账户" :visible.sync="dialogAccount" width="500px">
            <el-form :model="accountForm" :rules="rules" ref="accountForm" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币" prop="fbid">
                    <el-select v-model="accountForm.fb" placeholder="请选择法币" @change="hqfbxz">
                        <el-option v-for="item in fbList" :label="item.name" :value="{value:item.fbid,item:item}"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" prop="zffs">
                    <el-select v-model="accountForm.zffs" placeholder="请选择支付方式" @change="hqzfzhlb">
                        <el-option v-for="item in payList" :label="item.name" :value="{value:item.id,lb:item.lb}">
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="lb==2">
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
                    <el-form-item label="地址图片">
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
                    <el-form-item label="开户姓名" prop="khmc" v-if="lb==0">
                        <el-input v-model="accountForm.khmc" autocomplete="off" placeholder="开户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="转账备注" prop="khmc" v-if="lb==1">
                        <el-input v-model="accountForm.khmc" autocomplete="off" placeholder="转账备注"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="zhm" v-if="lb==0">
                        <el-input v-model="accountForm.zhm" autocomplete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item label="收款码" prop="skm" v-if="lb==1">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                            :on-change="beforeAvatarUpload" :auto-upload="false">
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
    </div>
</template>

<script>
    import {
        paymentaccountListUser,
        paymentaccountAddUser,
        legalCurrencySelect,
        paymentmethodSel,
        paymentaccountDelUser
    } from '@/api'
    export default {
        name: '',
        components: {},
        props: {

        },
        data() {
            return {
                formLabelWidth: '120px',
                accountForm: {
                    bsid: sessionStorage.getItem("userKey"),
                    zffsid: '',
                    skm: '',
                    dztp: '',
                    jmtp: '',
                    ewm: '',
                    zhm: '',
                },
                dialogAccount: false,
                paymentaccountData: [],
                rules: {
                    fbid: [{
                        required: true,
                        message: "请选择法币",
                        trigger: 'blur'
                    }],
                    zffs: [{
                        required: true,
                        message: "请选择支付方式",
                        trigger: 'blur'
                    }],
                    zhid: [{
                        required: true,
                        message: "请选择账户",
                        trigger: 'blur'
                    }],
                    zfr: [{
                        required: true,
                        message: "请输入支付人姓名",
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
                    }]
                },
                payList: [],
                fbList: [],
                lb: '',
                image: '',
            }
        },
        mounted() {},
        created() {
            this.getpaymentaccountListUser()
            // this.getpaymentmethodSel()
            this.getlegalCurrencySelect()
        },
        methods: {
            hqfbxz(a) {
                console.log(a,0)
                this.accountForm.fbid=a.value;
                let zffs = [];
                let name = a.item.zffs.split(",");
                let id = [];
                a.item.zffsid.split(",").forEach(function(v) {
                    id.push(Number(v))
                })
                let lb = [];
                a.item.zffslb.split(",").forEach(function(v) {
                    lb.push(Number(v))
                })
                id.forEach(function(v, i) {
                    let obj = new Object();
                    obj.name = name[i];
                    obj.id = id[i];
                    obj.lb = lb[i];
                    zffs.push(obj);
                })
                this.payList = zffs.filter(a =>{return a.lb!=2 })
            },
            delfb(id) {
                paymentaccountDelUser({
                    zhid: id
                }).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getpaymentaccountListUser()
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            },
            goBack() {
                this.$router.back()
            },
            newAccount(formName) {
                let formdata = new FormData();
                formdata.append("cjr", this.accountForm.bsid)
                formdata.append("fbid", this.accountForm.fbid)
                formdata.append("zffsid", this.accountForm.zffsid)
                formdata.append("zflx", this.lb)
                formdata.append("zhmc", this.accountForm.zhmc)
                formdata.append("khmc", this.accountForm.khmc)
                formdata.append("zhm", this.accountForm.zhm)
                if (this.accountForm.ewm != '') {
                    formdata.append("ewm", this.accountForm.ewm)
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        paymentaccountAddUser(formdata).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '账号创建成功',
                                    type: 'success'
                                })
                                this.closeNewAccount(formName);
                                this.getpaymentaccountListUser()
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(err => {
                            this.$message.error('请重新尝试。');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            closeNewAccount(formName) {
                this.$refs[formName].resetFields();
                this.dialogAccount = false;
            },
            beforeAvatarUpload(file) {
                this.accountForm.ewm = file.raw;
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
            hqzfzhlb(a) {
                this.accountForm.zffsid = a.value
                this.lb = a.lb
            },
            getpaymentaccountListUser() {
                paymentaccountListUser({
                    qbdz: sessionStorage.getItem("userKey")
                }).then(({
                    data
                }) => {
                    this.paymentaccountData = data;
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            },
            // getpaymentmethodSel() {
            //     paymentmethodSel().then(({
            //         data
            //     }) => {
            //         this.payList = data;
            //     }).catch(err => {
            //         this.$message.error('请重新尝试。');
            //     });
            // },
            getlegalCurrencySelect() {
                legalCurrencySelect().then(({
                    data
                }) => {
                    this.fbList = data;
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            },
        }
    }
</script>
<style scoped lang='less'>
    .haed {
        margin: 20px 0;
    }

    .pledge {
        background: #fff;
        padding: 20px;

    }

    .el-select {
        width: 100%;
    }
</style>

<style>
    /* .el-button--primary {
        background-color: #0d5959;
    }

 */
    .el-page-header__content {
        font-size: 14px;
    }

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
