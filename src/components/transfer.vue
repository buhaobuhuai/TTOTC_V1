<template>


    <el-form label-position="right" :rules="rules" :model="transfer" ref="transfer" label-width="90px"
        style="width: 550px;margin: auto;">
        <template v-if="networkID!=1">
            <el-alert style="margin-bottom:10px;" title="MetaMask当前网络不是主网,无法转账,请切换钱包至主网!" type="warning" show-icon
                :closable="false">
            </el-alert>
        </template>
        <el-form-item class="cion-inp" label="我的钱包" prop="yhzh">
            <el-input v-model="transfer.yhzh" disabled></el-input>
        </el-form-item>
        <el-form-item class="cion-inp" label="收款钱包" prop="bszh">
            <el-input v-model="transfer.bszh"></el-input>
        </el-form-item>
        <el-form-item class="cion-inp" label="币种" prop="bzmc">
            <el-select v-model="transfer.bzmc" filterable @change="hqhydz">
                <el-option v-for="item in options" :key="item.value" :label="item.mc"
                    :value="{value:item.mc,hydz:item.hydz}">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="cion-inp" label="转账数量" prop="bzsl">
            <el-input v-model="transfer.bzsl" :placeholder="bzsl" type=""></el-input>
        </el-form-item>
        <!-- <div class="zzbut"> -->
        <div class="zzbut" v-if="networkID == 1">
            <el-button type="success" class="el-buttons" @click="transferAccount('transfer')"
                v-loading.fullscreen.lock="fullscreenLoading">转 账</el-button>
        </div>
    </el-form>
</template>

<script>
    import {
        cionSel
    } from '@/api'
    import wallet from "@/constants/wallet/wallets"
    export default {
        name: "transfer",
        props: {
            dateList: Object,
            activeName: String,
            dialogVisible: Boolean
        },
        data() {
            var slpd = (rule, value, callback) => {
                // console.log(0)
                if (value === '') {
                    callback(new Error('请输入数量'));
                } else if (isNaN(parseFloat(value)) && !isFinite(value)) {
                    callback(new Error('请输入数字值'));
                } else if (parseFloat(value) > this.bzsl) {
                    callback(new Error('超出现有数量'));
                } else if (parseFloat(value) === 0) {
                    callback(new Error('不能为0'));
                } else {
                    callback();
                }
            };
            return {
                networkID: ethereum.networkVersion,
                transfer: {
                    yhzh: sessionStorage.getItem("userKey"),
                    bszh: '',
                    bzmc: '',
                    hydz: '',
                    bzsl: '',
                    js: 2
                },
                bzsl: 0,
                fullscreenLoading: false,
                options: [],
                rules: {
                    yhzh: [{
                        required: true,
                        message: '请输入转账钱包',
                        trigger: 'change'
                    }],
                    bszh: [{
                        required: true,
                        message: '请输入收账钱包',
                        trigger: 'change'
                    }],
                    bzmc: [{
                        required: true,
                        message: '请选择币种',
                        trigger: 'change'
                    }],
                    bzsl: [{
                        validator: slpd,
                        required: true,
                        // message: "请输入数量",
                        trigger: 'blur'
                    }],
                },
            }
        },
        created() {
            if (this.dateList) {
                this.transfer.yhzh = this.dateList.yhdz;
                this.transfer.bszh = this.dateList.bsdz;
                this.transfer.bzmc = this.dateList.bzmc;
                this.transfer.hydz = this.dateList.bzhy;
                this.transfer.bzsl = this.dateList.sl;
                let cs = {
                    mc: this.dateList.bzmc,
                    hy: this.dateList.bzhy,
                    zh: this.dateList.yhdz
                }
                this.bzsysk(cs);
            } else {
                this.getcionSel()
            }
        },
        mounted() {
            // this.networkID = ethereum.networkVersion;
            // console.log(await ethereum.networkVersion,99)
            this.networkVersion()
            
            let than = this;
            ethereum.on('networkChanged', function(networkIDstring) {
                than.networkID = networkIDstring
            })
        },
        methods: {
            async networkVersion(){
                this.networkID = await wallet.networkJudge();
            },
            async hqhydz(e) {
                console.log(e)
                this.transfer.bzmc = e.value;
                this.transfer.hydz = e.hydz;
                let cs = {
                    mc: e.value,
                    hy: e.hydz,
                    zh: sessionStorage.getItem("userKey")
                }
                await this.bzsysk(cs);
                // this.bzsl=sl;
                // this.transfer.bzsl=sl;
            },
            async bzsysk(cs) {
                this.bzsl = await wallet.balanceSel(cs);
            },
            getcionSel() {
                cionSel().then((res) => {
                    if (res.code == 0) {
                        this.options = res.data;
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            },
            async transferAccount(formName) {
                if (sessionStorage.getItem("userKey")) {

                    this.fullscreenLoading = true;
                    this.$refs[formName].validate(async (valid) => {
                        if (valid) {

                            const hxz = await wallet.transferAccounts(this.transfer);
                            if (hxz.code === 200) {
                                this.hxz = 'https://etherscan.io/token/' + hxz.hxz;
                                this.$message({
                                    message: "转账成功。",
                                    type: 'warning'
                                });
                                if (this.dateList) {
                                    let qrfb = {
                                        ddid: this.jbxx.ddid,
                                        hxz: this.hxz,
                                        skzh: this.zhxx.zhid
                                    }
                                    payUser(qrfb).then((res) => {
                                        if (res.code == 0) {
                                            this.fullscreenLoading = false;

                                            if (window.location.href.indexOf("#reloaded") == -
                                                1) {
                                                window.location.href = window.location.href +
                                                    "#reloaded";
                                                window.location.reload();
                                            }
                                        }
                                    }).catch(err => {
                                        this.$message.error('请重新尝试。');
                                        // loading.close();
                                        this.fullscreenLoading = false;
                                    });

                                } else {
                                    this.fullscreenLoading = false;
                                }
                            } else {
                                // loading.close();
                                this.fullscreenLoading = false;
                                this.$message.error('转账失败，请重新操作。');
                            }
                        } else {
                            this.fullscreenLoading = false;
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.$message.error('请登录账号后使用。');
                }
            }
        }
    }
</script>

<style>
    .zzbut {
        padding: 20px;
        height: 80px;
        text-align: center;
    }

    .zzbut button {
        width: 50%;
    }

    .zzsl .el-form-item__content {
        display: flex;
    }

    .el-input {
        margin-right: 20px;
    }

    .el-select {
        width: 100%;
    }
</style>
