<!--
 
 * @Author       : wenquan
 * @desc         : 保证金table
 * @Date         : 2023-02-21 20:17:31
 * @LastEditTime : 2023-04-15 17:58:11
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\views\back-stage\component\basics-pledge-table.vue
 -->
<template>
    <div>
        <el-table :data="dateList" stripe style="width: 100%">
            <el-table-column :prop="item.prop" :label="item.label" :sortable="item.sortable"
                v-for="(item, index) in columnList" :key="index" width="100">
                <template slot-scope="scope">
                    <section v-if="item.prop === 'zt'">
                        <el-tag type="danger" v-if="scope.row.zt === 0" disable-transitions>冻结</el-tag>
                        <el-tag type="success" v-if="scope.row.zt === 1" disable-transitions>使用中</el-tag>
                        <el-tag type="warning" v-if="scope.row.zt === 2" disable-transitions>审核中</el-tag>
                    </section>
                    <section v-else>
                        {{ scope.row[item.prop] }}
                    </section>
                </template>
            </el-table-column>
            <el-table-column prop="action" label="操作" fixed="right" width="290">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="bzjjl(scope.row.bzjid)">详情
                    </el-button>
                    <el-popconfirm title="确定冻结吗？" v-if="scope.row.zt === 1" @confirm="djjd(scope.row.bzjid, 0)">
                        <el-button size="mini" class="mal" type="danger" slot="reference"> 冻结</el-button>
                    </el-popconfirm>
                    <el-popconfirm title="确定解冻吗？" v-if="scope.row.zt === 0" @confirm="djjd(scope.row.bzjid, 1)">
                        <el-button size="mini" class="mal" type="primary" slot="reference"> 解冻</el-button>
                    </el-popconfirm>
                    <el-button size="mini" class="mal" type="primary" @click="xjbzj(scope.row)">
                        续费</el-button>
                    <el-button v-if="scope.row.zt != 2" size="mini" class="mal" type="primary" @click="tdbzj(scope.row)">
                        退费</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--保证金续费 -->
        <el-dialog title="保证金续费" destroy-on-close :visible.sync="dialogVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币" prop="fbid">
                    <el-input v-model="form.fbmc" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="支付方式" prop="zffs">
                    <el-select v-model="form.zffs" placeholder="请选择支付方式" @change="hqzhlb">
                        <el-option v-for="item in zffsSel" :label="item.name"
                            :value="{ value: item.id, name: item.name, lb: item.lb, fbid: item.fbid }"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门户账户" prop="mhzh" v-if="zflx == 0">
                    <el-select v-model="form.mhzh" placeholder="请选择门户账户" @change="fkmhzh">
                        <el-option v-for="item in zhSel" :label="item.zhm" :value="{ value: item.zhid, item: item }">
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
                    <el-form-item label="收款码" v-if="skm">
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
                    <el-input v-model="form.bzj" type="number" autocomplete="off" placeholder="需支付的保证金额"></el-input>
                </el-form-item>
                <el-form-item label="支付人姓名" prop="zfr" v-if="zflx == 0">
                    <el-input v-model="form.zfr" autocomplete="off" placeholder="支付人姓名"></el-input>
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
                <el-button @click="closeFome('form')">取 消</el-button>
                <el-button type="primary" @click="applyPay('form')">提 交</el-button>
            </div>
        </el-dialog>
        <!--申请保证金退费 -->
        <el-dialog title="申请保证金退费" :visible.sync="dialogVisibles" width="500px">
            <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
                <el-form-item label="法币" prop="fbid">
                    <el-input v-model="form.fbmc" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="支付方式" prop="zffs">
                    <el-select v-model="form.zffs" placeholder="请选择支付方式" @change="skzhlb">
                        <el-option v-for="item in zffsSel" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账户" prop="zhid" v-if="zflx == 0">
                    <el-select v-model="form.zhid" placeholder="请选择账户">
                        <el-option v-for="item in zhSel" :label="item.zhm" :value="item.zhid">
                            <span style="float: left">{{ item.zhmc }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhm }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账户" prop="zhid" v-else>
                    <el-select v-model="form.zhid" placeholder="请选择账户">
                        <el-option v-for="item in zhSel" :label="item.khmc" :value="item.zhid">
                            <span style="float: left">{{ item.zhmc }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.khmc }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退除金额" prop="bzj">
                    <el-input v-model="form.bzj" type="number" autocomplete="off" placeholder="退除金额"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名" prop="zfr" v-if="zflx == 0">
                    <el-input v-model="form.zfr" autocomplete="off" placeholder="收款人姓名"></el-input>
                </el-form-item>
                <el-form-item label="收款备注" prop="zfr" v-else>
                    <el-input v-model="form.zfr" autocomplete="off" placeholder="收款备注"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeFome('form')">取 消</el-button>
                <el-button type="primary" @click="applyRrfund('form')">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 门户账户信息-->
        <el-dialog title="门户账户信息" append-to-body destroy-on-close :visible.sync="dialogAccountInfo" width="500px">
            <el-form size="small" :label-width="formLabelWidth">
                <el-form-item label="法币："><span>{{ form.fbmc }}</span></el-form-item>
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
    depositDel,
    depositUp,
    depositRenew,
    depositRefund,
    legalCurrencySelect,
    accounSelectes,
    accounSelects,
} from '@/api'
export default {
    name: 'invest-table',
    props: {
        dateList: Array,
        activeName: String,
    },
    data() {
        return {
            formLabelWidth: '120px',
            skm: '',
            wztp: '',
            skzhxx: [],
            dialogAccountInfo: false,
            dialogVisible: false,
            dialogVisibles: false,
            zflx: '',
            form: {
                bsid: sessionStorage.getItem("userKey"),
                mhzh: '',
                fbid: '',
                bzjid: '',
                bzj: '',
                zfr: '',
                zhid: '',
                fbmc: '',
            },
            fblist: [],
            zffsSel: [],
            zhSel: [],
            rules: {
                fbid: [{
                    required: true,
                    message: "请选择法币",
                    trigger: 'blur'
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
                    trigger: 'blur'
                }],
                zfr: [{
                    required: true,
                    message: "请输入内容",
                    trigger: 'blur'
                }],
                bzj: [{
                    required: true,
                    message: "请输入金额",
                    trigger: 'blur'
                }]
            },
            columnList: [{
                prop: 'fbmc',
                label: '法币名称'
            },
            {
                prop: 'bzj',
                label: '保证金额度'
            },
            {
                prop: 'sded',
                label: '锁定金额'
            },
            {
                prop: 'kced',
                label: '扣除金额'
            },
            {
                prop: 'ksyed',
                label: '可使用金额'
            },
            {
                prop: 'kcsxf',
                label: '被扣手续费'
            },
            {
                prop: 'zt',
                label: '状态'
            },
            {
                prop: 'xgsj',
                label: '更新时间'
            },
            ]
        }
    },
    created() { },
    methods: {

        fkmhzh(id) {
            this.skzhxx.zh = id.item.zhmc;
            this.skzhxx.hm = id.item.khmc;
            this.skzhxx.zhdm = id.item.zhm;
            this.form.zhid = id.value
        },
        dmjysj(e) {
            console.log(e, 0)
            this.wztp = '/imgsave/icon-save/' + e.item.wztp;
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
            this.skzhxx.zh = e.item.zhmc;
            this.skzhxx.hm = e.item.khmc;
            this.form.zhid = e.value
            this.skm = '/imgsave/icon-save/' + e.item.skm;
            console.log(e)
        },
        bzjjl(id) {
            sessionStorage.setItem("bzjid", id)
            this.$router.push("/htBackStage/basics/pledge/record")
        },
        applyPay(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.skzhxx.zfr = this.form.zfr
                    this.skzhxx.bzj = this.form.bzj
                    try {
                        depositRenew(this.form).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '恭喜你，信息提交成功，请等待审核。',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                                this.$emit('submitForm', 'basicspledge');
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
        applyRrfund(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        depositRefund(this.form).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '恭喜你，信息提交成功，请等待审核。',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                                this.$emit('submitForm', 'basicspledge');
                                this.dialogVisibles = false;
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
        closeFome(formName) {
            this.resetForm(formName);
            this.dialogVisible = false
            this.dialogVisibles = false
        },
        async tdbzj(r) {
            await this.getlegalCurrencySelect()
            this.form.fbid = r.fbid
            this.form.fbmc = r.fbmc
            this.form.bzjid = r.bzjid
            await this.zhfzhs(r.fbid)
            this.zffsSel = this.zffsSel.filter(i => i.lb != 2);

            this.dialogVisibles = true
        },
        async xjbzj(r) {
            await this.getlegalCurrencySelect()
            this.form.fbid = r.fbid
            this.form.bzjid = r.bzjid
            this.form.fbmc = r.fbmc
            this.zhfzhs(r.fbid)
            this.dialogVisible = true
        },
        zhfzhs(fbid) {
            let obj = this.fblist.find((item) => item.fbid = fbid)
            let zffs = [];
            let name = obj.zffs.split(",");
            let id = [];
            obj.zffsid.split(",").forEach(function (v) {
                id.push(Number(v))
            })
            let lb = [];
            obj.zffslb.split(",").forEach(function (v) {
                lb.push(Number(v))
            })
            id.forEach(function (v, i) {
                let obj = new Object();
                obj.name = name[i];
                obj.id = id[i];
                obj.lb = lb[i];
                obj.fbid = fbid;
                zffs.push(obj);
            })
            this.zffsSel = zffs
        },
        skzhlb(id) {
            this.form.zhid = ''
            this.getaccounSelects(id);
        },
        hqzhlb(id) {
            this.skzhxx.zffs = id.name;
            this.form.zhid = ''
            this.form.mhzh = ''
            this.getaccounSelect(id);
        },
        getaccounSelects(id) {
            accounSelects({
                id: id,
                bsqb: sessionStorage.getItem("userKey")
            }).then(({
                data
            }) => {
                this.zhSel = data;
                if (data.length > 0) {
                    this.zflx = data[0].zflx
                }
            })
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
                if (data.length > 0) {
                    this.zflx = data[0].zflx
                }
            })
        },
        async getlegalCurrencySelect() {
            await legalCurrencySelect().then(({
                data
            }) => {
                this.fblist = data;
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        djjd(a, b) {
            depositUp({
                bzjid: a,
                zt: b
            }).then(res => {
                if (res.code == 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.$emit('submitForm', 'basicspledge');
                } else {
                    this.$message.error('操作失败，请重新尝试！');
                }
            })
        },
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

.el-select {
    width: 100%;
}
</style>
