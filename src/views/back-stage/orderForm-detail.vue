<template>
    <div class="bourse-index site-content">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '../orderForm' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="bourse-index-tab">
            <el-descriptions class="margin-top" title="信息" size="large" border>
                <template v-if="dateList.ddxx">
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                交易类型
                            </div>
                        </template>
                        <el-tag v-if="dateList.ddxx.ddlx == 0" type="warning">卖出</el-tag>
                        <el-tag v-if="dateList.ddxx.ddlx == 1" type="success">买入</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                币种
                            </div>
                        </template>
                        {{dateList.ddxx.bzmc}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                数量
                            </div>
                        </template>
                        {{dateList.ddxx.sl}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                法币
                            </div>
                        </template>
                        {{dateList.ddxx.fbmc}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                金额
                            </div>
                        </template>
                        {{dateList.ddxx.je}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="dateList.ddxx.fl!=0">
                        <template slot="label">
                            <div class="cell-item">
                                手续费费率
                            </div>
                        </template>
                        {{dateList.ddxx.fl}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="dateList.ddxx.sxf!=0">
                        <template slot="label">
                            <div class="cell-item">
                                手续费
                            </div>
                        </template>
                        {{dateList.ddxx.sxf}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                币商
                            </div>
                        </template>
                        {{dateList.ddxx.bsdz.substr(0, 10) + "..."}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                用户
                            </div>
                        </template>
                        {{dateList.ddxx.yhdz.substr(0, 10) + "..."}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                交易时间
                            </div>
                        </template>
                        {{dateList.ddxx.cjsj}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                交易限制时间
                            </div>
                        </template>
                        {{dateList.ddxx.zdsx}}
                    </el-descriptions-item>
                    <template v-if="dateList.ddxx.shzt!=null">
                        <el-descriptions-item>
                            <template slot="label">
                                <div class="cell-item">
                                    审核状态
                                </div>
                            </template>
                            <el-tag v-if="dateList.ddxx.shzt == 1" type="warning">已审核</el-tag>
                            <el-tag v-if="dateList.ddxx.shzt == 0" type="success">待审核</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <div class="cell-item">
                                    审核意见
                                </div>
                            </template>
                            {{dateList.ddxx.shyj}}
                        </el-descriptions-item>
                    </template>
                    <el-descriptions-item v-if="dateList.ddxx.dkr">
                        <template slot="label">
                            <div class="cell-item">
                                打款人
                            </div>
                        </template>
                        {{dateList.ddxx.dkr}}
                    </el-descriptions-item>
                </template>
                <template v-if="zhxx">

                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                开户姓名
                            </div>
                        </template>
                        {{zhxx.khmc}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <div class="cell-item">
                                账户名称
                            </div>
                        </template>
                        {{zhxx.zhmc}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="zhxx.zflx==0">
                        <template slot="label">
                            <div class="cell-item">
                                账号
                            </div>
                        </template>
                        {{zhxx.zhm}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="zhxx.zflx==1">
                        <template slot="label">
                            <div class="cell-item">
                                收款码
                            </div>
                        </template>
                        <img :src="skmdz" />
                    </el-descriptions-item>
                    <template v-if="zhxx.zflx==2">
                        <el-descriptions-item>
                            <template slot="label">
                                <div class="cell-item">
                                    联系人
                                </div>
                            </template>
                            {{zhxx.lxr}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <div class="cell-item">
                                    联系方式
                                </div>
                            </template>
                            {{zhxx.lxfs}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <div class="cell-item">
                                    地址
                                </div>
                            </template>
                            {{zhxx.dz}}
                        </el-descriptions-item>
                        <el-descriptions-item v-if="zhxx.wztp">
                            <template slot="label">
                                <div class="cell-item">
                                    位置图片
                                </div>
                            </template>
                            <img :src="skmdz" />
                        </el-descriptions-item>
                    </template>
                </template>
            </el-descriptions>
            <template v-if="dateList.ddxx">
                <el-link style="margin-top: 15px;" type="primary" :href="dateList.ddxx.hxz" v-if="dateList.ddxx.hxz"
                    target="_blank">
                    打币结果记录查看</el-link>
            </template>
        </div>
        <div class="bourse-index-tab">
            <el-descriptions class="margin-top" title="当前交易进程" :column="3" border>
            </el-descriptions>
            <div style="padding: 20px;background: #fafafa;">
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in dateList.status" :key="index"
                        :timestamp="activity.ztsj">
                        <span v-if="activity.ddzt == 1001" type="warning">下单成功</span>
                        <span v-if="activity.ddzt == 1002" type="warning">订单取消</span>
                        <span v-if="activity.ddzt == 1003" type="warning">币商确认收款</span>
                        <span v-if="activity.ddzt == 1004" type="warning">用户确认收币</span>
                        <span v-if="activity.ddzt == 1005" type="warning">交易完成</span>
                        <span v-if="activity.ddzt == 1006" type="warning">币商未收款-用户上传图片凭证</span>
                        <span v-if="activity.ddzt == 1007" type="warning">币商未收款-币商上传图片凭证</span>
                        <span v-if="activity.ddzt == 1008" type="warning">币商未收款-用户上传视频凭证</span>
                        <span v-if="activity.ddzt == 1009" type="warning">币商未收款-币商上传视频凭证</span>
                        <span v-if="activity.ddzt == 1010" type="warning">订单异常等待平台处理</span>
                        <span v-if="activity.ddzt == 1011" type="warning">交易失败</span>
                        <span v-if="activity.ddzt == 1012" type="warning">异常交易</span>
                        <span v-if="activity.ddzt == 1013" type="warning">用户未收币-用户上传图片凭证</span>
                        <span v-if="activity.ddzt == 1014" type="warning">用户未收币-币商上传图片凭证</span>
                        <span v-if="activity.ddzt == 1015" type="warning">用户未收币-用户上传视频凭证</span>
                        <span v-if="activity.ddzt == 1016" type="warning">用户未收币-币商上传视频凭证</span>
                        <span v-if="activity.ddzt == 1017" type="warning">币商确认收币</span>
                        <span v-if="activity.ddzt == 1018" type="warning">用户确认收款</span>
                        <span v-if="activity.ddzt == 1019" type="warning">币商未收币-用户上传图片凭证</span>
                        <span v-if="activity.ddzt == 1020" type="warning">币商未收币-币商上传图片凭证</span>
                        <span v-if="activity.ddzt == 1021" type="warning">币商未收币-用户上传视频凭证</span>
                        <span v-if="activity.ddzt == 1022" type="warning">币商未收币-币商上传视频凭证</span>
                        <span v-if="activity.ddzt == 1023" type="warning">用户未收款-用户上传图片凭证</span>
                        <span v-if="activity.ddzt == 1024" type="warning">用户未收款-币商上传图片凭证</span>
                        <span v-if="activity.ddzt == 1025" type="warning">用户未收款-用户上传视频凭证</span>
                        <span v-if="activity.ddzt == 1026" type="warning">用户未收款-币商上传视频凭证</span>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="bourse-index-tab">
            <div class="bourse-index-tab-bak">
                <!-- <el-descriptions class="margin-top" v-if="jspd==0" title="我的图片凭证" :column="3" border /> -->
                <el-descriptions class="margin-top" title="用户图片凭证" :column="3" border />

                <p v-if="yhtppz.length>0">
                    <el-image style="width: 100px; height: 100px" :src="yhtppz[0]" :preview-src-list="yhtppz">
                    </el-image>
                </p>
            </div>
            <div class="bourse-index-tab-bak">
                <!-- <el-descriptions class="margin-top" v-if="jspd==0" title="我的视频凭证" :column="3" border /> -->
                <el-descriptions class="margin-top" title="用户视频凭证" :column="3" border />
                <el-button v-for="(i,index) in dateList.yhsppz" :key="index" type="primary" size="small"
                    @click="loadVideo(i.sppz)">
                    <i class="el-icon-video-camera"></i>&nbsp;{{i.cjsj}}
                </el-button>

            </div>
            <div style="clear: both;padding-top: 20px;display: block;"></div>
            <div class="bourse-index-tab-bak">
                <el-descriptions class="margin-top" title="我的图片凭证" :column="3" border />
                <!-- <el-descriptions class="margin-top" v-else title="币商图片凭证" :column="3" border /> -->

                <p v-if="bstppz.length>0">
                    <el-image style="width: 100px; height: 100px" :src="bstppz[0]" :preview-src-list="bstppz">
                    </el-image>
                </p>
            </div>
            <div class="bourse-index-tab-bak">
                <el-descriptions class="margin-top" title="我的视频凭证" :column="3" border />
                <!-- <el-descriptions class="margin-top" v-else title="币商视频凭证" :column="3" border /> -->
                <el-button v-for="(i,index) in dateList.bssppz" :key="index" type="primary" size="small"
                    @click="loadVideo(i.sppz)">
                    <i class="el-icon-video-camera"></i>&nbsp;{{i.cjsj}}
                </el-button>

            </div>
            <div style="clear:both;"></div>
        </div>

        <div class="bourse-index-tab" v-if="jbxx">
            <template>
                <el-button type="primary" v-if="jbxx.zt==1003||jbxx.zt===1007||jbxx.zt===1009"
                    @click="bsqrsk">确认收款</el-button>
                <el-button type="primary" v-if="jbxx.zt==1014||jbxx.zt===1016"
                    @click="bsqrsk">确认付币</el-button>
                <el-popconfirm v-if="jbxx.zt===1003" title="确定未收款" style="margin-left: 10px;" @confirm="uncollected">
                    <el-button type="danger" plain slot="reference">未收款</el-button>
                </el-popconfirm>
                <el-button type="primary" v-if="jbxx.zt==1017||jbxx.zt===1022||jbxx.zt===1020"
                    @click="dialogPayment=true">确认收币</el-button>
                <el-button type="primary" v-if="jbxx.zt==1024||jbxx.zt===1026"
                    @click="dialogPayment=true">确认付款</el-button>
                <el-popconfirm v-if="jbxx.zt===1017" title="确定未收币" style="margin-left: 10px;"
                    @confirm="uncollectedCion">
                    <el-button type="danger" plain slot="reference">未收币</el-button>
                </el-popconfirm>
                <el-button v-if="jbxx.zt===1007" type="danger" plain @click="upImgs">币商未收款-上传图片凭据</el-button>
                <el-button v-if="jbxx.zt===1014" type="danger" plain @click="upImgs">用户未收币-上传图片凭据</el-button>
                <el-button v-if="jbxx.zt===1020" type="danger" plain @click="upImgs">币商未收币-上传图片凭据</el-button>
                <el-button v-if="jbxx.zt===1024" type="danger" plain @click="upImgs">用户未收款-上传图片凭据</el-button>
                <el-button v-if="jbxx.zt===1009" type="danger" plain @click="upVideos">币商未收款-上传视频凭据</el-button>
                <el-button v-if="jbxx.zt===1016" type="danger" plain @click="upVideos">用户未收币-上传视频凭据</el-button>
                <el-button v-if="jbxx.zt===1022" type="danger" plain @click="upVideos">币商未收币-上传视频凭据</el-button>
                <el-button v-if="jbxx.zt===1026" type="danger" plain @click="upVideos">用户未收款-上传视频凭据</el-button>
            </template>
            <!-- <template>
                <el-button type="primary" @click="dialogPayCion=true">确认收款</el-button>
                <el-popconfirm title="确定未收款" style="margin-left: 10px;" @confirm="uncollected">
                    <el-button type="danger" plain slot="reference">未收款</el-button>
                </el-popconfirm>
                <el-button type="primary" @click="dialogPayment=true">确认收币</el-button>
                <el-popconfirm title="确定未收币" style="margin-left: 10px;" @confirm="uncollectedCion">
                    <el-button type="danger" plain slot="reference">未收币</el-button>
                </el-popconfirm>
                <el-button type="danger" plain @click="upImgs">上传图片凭据</el-button>
                <el-button type="danger" plain @click="upVideos">上传视频凭据</el-button>
            </template> -->
        </div>
        <!-- 视频查看-->
        <el-dialog :visible.sync="dialogVisible" width="500px">
            <VideoPlay style="width:100%" ref="videos" :urls="videoUrl" :showDialog="dialogVisible"></VideoPlay>
        </el-dialog>

        <!-- 确认收币确认付款-->
        <el-dialog :visible.sync="dialogPayment" title="确认付款" width="500px" @close="closeForm('accountForm')">
            <el-form :model="payForm" :rules="rules" ref="accountForm" size="small" :label-width="formLabelWidth"
                v-if="zhxx">
                <template v-if="zhxx.zflx!=2">
                    <el-form-item label="账号名称">
                        <span>{{zhxx.zhmc}}</span>
                    </el-form-item>
                    <el-form-item label="开户名称">
                        <span>{{zhxx.khmc}}</span>
                    </el-form-item>
                    <el-form-item v-if="zhxx.zflx===0" label="账户号码">
                        <span>{{zhxx.zhm}}</span>
                    </el-form-item>
                    <el-form-item v-else label="收款码">
                        <el-image style="width: 80px; height: 80px" :src="'/imgsave/icon-save/'+zhxx.skm"
                            :preview-src-list="['/imgsave/icon-save/'+zhxx.skm]">
                        </el-image>
                    </el-form-item>
                    <el-form-item label="支付金额">
                        <span>{{jbxx.je}}{{jbxx.fbmc}}</span>
                    </el-form-item>
                    <el-form-item label="打款人" prop="dkr">
                        <el-input v-model="payForm.dkr" autocomplete="off" placeholder="请输入打款人"></el-input>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('accountForm')">取 消</el-button>
                <el-button type="primary" @click="finishPay('accountForm')"
                    v-loading.fullscreen.lock="fullscreenLoading">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 确认收款确认付币-->
        <el-dialog :visible.sync="dialogPayCion" title="确认付币" width="500px" @close="closeForm('payForm')">
            <el-form ref="payForm" size="small" :label-width="formLabelWidth">
                <el-form-item label="用户钱包">
                    <span>{{jbxx.yhdz}}</span>
                </el-form-item>
                <el-form-item label="支付币种">
                    <span>{{jbxx.bzmc}}</span>
                </el-form-item>
                <el-form-item label="支付数量">
                    <span>{{jbxx.sl}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('payForm')">取 消</el-button>
                <el-button type="primary" @click="finishPayCion('payForm')"
                    v-loading.fullscreen.lock="fullscreenLoading">支 付</el-button>
            </div>
        </el-dialog>
        <!-- 上传图片凭据-->
        <el-dialog :visible.sync="dialogimgs" title="上传图片凭据" width="500px" @close="closeForm('imgsForm')">
            <el-form :model="imgsForm" :rules="rules" ref="imgsForm" size="small" :label-width="formLabelWidth">
                <template>
                    <el-form-item label="上传凭据" prop="tppj">
                        <el-upload class="avatar-uploader" action="#" multiple accept=".jpg,.png" :file-list="fileList"
                            :on-change="beforeAvatarUploads" :auto-upload="false" :limit="5">
                            <img v-if="imgsForm.tppj" :src="imgsForm.tppj" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>已选中{{fileList.length}}张图片</span>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('imgsForm')">取 消</el-button>
                <el-button type="primary" @click="finishUpImgs('imgsForm')"
                    v-loading.fullscreen.lock="fullscreenLoading">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 上传视频凭据-->
        <el-dialog :visible.sync="dialogvideos" title="上传视频凭据" width="500px" @close="closeForm(0)">
            <el-upload class="upload-demo" multiple action="#" accept=".mp4,.MOV" :on-change="handlePreview"
                :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传mp4/mov文件，且不超过10MB</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm(0)">取 消</el-button>
                <el-button type="primary" @click="finishUpVideos(0)" v-loading.fullscreen.lock="fullscreenLoading">提 交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        orderInfo,
        uncolulectedMer,
        uncolulectedCionMer,
        collectionMer,
        collectCurrencyMer,
        upImgMer,
        upVideoMer
    } from '@/api'
    import VideoPlay from '@/components/video/VideoPlayer'
    import wallet from "@/constants/wallet/wallets"
    export default {
        name: '',
        mixins: [],
        components: {
            VideoPlay
        },
        props: {},
        data() {
            return {
                networkID:'',
                formLabelWidth: '120px',
                bstppz: [],
                yhtppz: [],
                rules: {
                    dkr: [{
                        required: true,
                        message: '请输入打款人',
                        trigger: 'change'
                    }],
                    tppj: [{
                        required: true,
                        message: '请上传付款凭据图片',
                        trigger: 'change'
                    }],
                },
                fileList: [],
                dialogvideos: false,
                dialogimgs: false,
                fullscreenLoading: false,
                dialogPayment: false,
                dialogPayCion: false,
                imgsForm: {
                    tppj: ''
                },
                payForm: {
                    tppj: '',
                    dkr: '',
                },
                videoUrl: '',
                dialogVisible: false,
                value: '',
                showWarning: true,
                infoList: [],
                jbxx: {},
                dateList: [],
                zhxx: {},
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ],
                radio: 'http://localhost/wxhmxt/dynamic-material/6/39/1638259621476.mp4'

            }
        },
        computed: {},
        watch: {},
        created() {
            // this.networkID = 1;//ethereum.networkVersion;
            this.getOrderList()
        },
        mounted() {
            this.networkVersion()
            let than = this;
            ethereum.on('networkChanged', function(networkIDstring) {
                than.networkID = networkIDstring
            })
        },
        destroyed() {},
        methods: {
            async networkVersion(){
                this.networkID = await wallet.networkJudge();
            },
            bsqrsk(){
                if (this.networkID === 1) {
                    this.dialogPayCion=true
                } else{
                    this.$message({
                        showClose: true,
                        message: 'MetaMask当前网络不是主网,不支持当前操作，请切换钱包网络!',
                        type: 'warning'
                    });
                }
            },
            finishPay(formName) {
                this.fullscreenLoading = true;
                let cs = {
                    ddid: this.jbxx.ddid,
                    dkr: this.payForm.dkr,
                    ztdm: this.jbxx.zt,
                    bsid: sessionStorage.getItem("userKey")
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        collectCurrencyMer(cs).then(res => {
                            if (res.code == 0) {
                                this.fullscreenLoading = false;
                                this.$message({
                                    message: '完成支付',
                                    type: 'success'
                                })
                                this.closeForm(formName);
                                this.getOrderList()
                            } else {
                                this.fullscreenLoading = false;
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(err => {
                            this.fullscreenLoading = false;
                            this.$message.error('请重新尝试。');
                        });
                    } else {
                        this.fullscreenLoading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            async finishPayCion() {
                this.fullscreenLoading = true;
                let fbcs = {
                    yhzh: this.jbxx.yhdz,
                    bszh: sessionStorage.getItem("userKey"),
                    hydz: this.jbxx.bzhy,
                    bzmc: this.jbxx.bzmc,
                    bzsl: this.jbxx.sl,
                    js: 1
                }
                const hxz = await wallet.transferAccounts(fbcs);
                if (hxz.code === 200) {
                    this.hxz = 'https://etherscan.io/token/' + hxz.hxz;
                    let qrfb = {
                        ddid: this.jbxx.ddid,
                        hxz: this.hxz,
                        bsid: sessionStorage.getItem("userKey"),
                        ztdm: this.jbxx.zt
                    }
                    collectionMer(qrfb).then((res) => {
                        if (res.code == 0) {
                            this.fullscreenLoading = false;
                            this.dialogPayCion = false;
                            this.getOrderList()
                        }
                    }).catch(err => {
                        this.$message.error('请重新尝试。');
                        // loading.close();
                        this.fullscreenLoading = false;
                    });
                } else {
                    // loading.close();
                    this.fullscreenLoading = false;
                    this.$message.error('支付失败，请重新支付。');
                }
            },
            uncollected() {
                let cs = {
                    ddid: this.jbxx.ddid,
                    ztdm: this.jbxx.zt,
                    bsid: sessionStorage.getItem("userKey")
                }
                uncolulectedMer(cs).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: '成功',
                            type: 'success'
                        })
                        this.getOrderList()
                    } else {
                        this.$message.error(res.msg);
                    }

                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });
            },
            uncollectedCion() {
                let cs = {
                    ddid: this.jbxx.ddid,
                    ztdm: this.jbxx.zt,
                    bsid: sessionStorage.getItem("userKey")
                }
                uncolulectedCionMer(cs).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: '成功',
                            type: 'success'
                        })
                        this.getOrderList()
                    } else {
                        this.$message.error(res.msg);
                    }

                }).catch(err => {
                    this.$message.error('请重新尝试。');
                });

            },
            handlePreview(file, fileList) {
                console.log(file.raw)
                if (file.raw.type === 'video/mp4' || file.raw.type === 'video/mov') {
                    // this.imgsForm.tppj = URL.createObjectURL(fileList[0].raw);
                    this.fileList = fileList;
                    const isLt10M = file.size / 1024 / 1024 < 10;
                    if (!isLt10M) {
                        this.$message.error('上传视频大小不能超过 10MB!');
                        this.fileList = [];
                    }
                } else {
                    this.$message.error('只能上传mp4/mov格式视频!');
                    this.fileList = [];
                }
            },
            beforeAvatarUploads(file, fileList) {
                if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png') {
                    this.imgsForm.tppj = URL.createObjectURL(fileList[0].raw);
                    this.fileList = fileList;

                } else {
                    this.$message.error('只能上传jpg/png格式!');
                    this.fileList = [];
                    this.imgsForm.tppj = '';
                }
            },

            finishUpVideos() {

                this.fullscreenLoading = true;
                let formdata = new FormData();
                formdata.append("ddid", this.jbxx.ddid)
                formdata.append("ztdm", this.jbxx.zt)
                // formdata.append("yhzh", sessionStorage.getItem('userKey'))
                this.fileList.forEach(file => {
                    formdata.append("sps", file.raw)
                })
                if (this.fileList.length > 0) {
                    upVideoMer(formdata).then(res => {
                        if (res.code == 0) {
                            this.fullscreenLoading = false;
                            this.$message({
                                message: '完成上传',
                                type: 'success'
                            })
                            this.closeForm(0);
                            this.getOrderList()
                        } else {
                            this.fullscreenLoading = false;
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }).catch(err => {
                        this.fullscreenLoading = false;
                        this.$message.error('请重新尝试。');
                    });
                } else {
                    this.fullscreenLoading = false;
                    console.log('error submit!!');
                    return false;
                }
            },
            finishUpImgs(formName) {
                this.fullscreenLoading = true;
                let formdata = new FormData();
                formdata.append("ddid", this.jbxx.ddid)
                formdata.append("ztdm", this.jbxx.zt)
                // formdata.append("yhzh", sessionStorage.getItem('userKey'))
                this.fileList.forEach(file => {
                    formdata.append("imgs", file.raw)
                })

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        upImgMer(formdata).then(res => {
                            if (res.code == 0) {
                                this.fullscreenLoading = false;
                                this.$message({
                                    message: '完成上传',
                                    type: 'success'
                                })
                                this.closeForm(formName);
                                this.getOrderList()
                            } else {
                                this.fullscreenLoading = false;
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(err => {
                            this.fullscreenLoading = false;
                            this.$message.error('请重新尝试。');
                        });
                    } else {
                        this.fullscreenLoading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            upImgs() {
                this.dialogimgs = true
            },
            upVideos() {
                this.dialogvideos = true
            },
            closeForm(formName) {
                if (formName != 0) {
                    this.$refs[formName].resetFields();
                }
                this.dialogPayment = false;
                this.dialogPayCion = false;
                this.dialogvideos = false;
                this.dialogimgs = false;
                this.fileList = [];
            },
            loadVideo(url) {
                this.videoUrl = '/imgsave/voucher-save/' + url
                this.dialogVisible = true
                if (this.$refs.videos != undefined)
                    this.$refs.videos.handle_src(this.videoUrl);
            },
            getOrderList() {
                let id = {
                    id: sessionStorage.getItem("orderid")
                }
                orderInfo(id).then((res) => {
                    if (res.code == 0) {
                        this.dateList = res;
                        this.jbxx = res.ddxx;
                        this.zhxx = res.zhxx;
                        console.log(this.dateList, '71')
                        // this.bstppz = res.bstppz;
                        // this.yhtppz = res.yhtppz;
                        if (res.bstppz) {
                            for (let i = 0; i < res.bstppz.length; i++) {
                                this.bstppz.push('/imgsave/voucher-save/' + res.bstppz[i])
                            }
                        }
                        if (res.yhtppz) {
                            for (let i = 0; i < res.yhtppz.length; i++) {
                                this.yhtppz.push('/imgsave/voucher-save/' + res.yhtppz[i])
                            }
                        }
                    }

                });
            },
            copyDomText(ev) {
                ev.children[3].style.display = "none"
                let val = ev.innerText
                navigator.clipboard.writeText(val).then(() => {
                    this.$message.success("复制成功");
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>
<style scoped lang="less">
    .size14 {
        font-size: 14px;
    }

    .mart12 {
        margin-top: 12px;
    }

    .bourse-index {
        box-sizing: border-box;
        padding: 20px;
        color: #333;

        &-warning {
            padding: 8px 16px;
            background-color: #fdf6ec;
            border-radius: 4px;
            border-left: 5px solid #dcc845;
        }

        &-tab {
            border-top: 1px solid #dcdfe6;
            display: block;
            width: 100%;
            margin-top: 24px;
            padding-top: 24px;

            >p {
                color: #333;
                font-weight: bold;
                font-size: 16px;
            }

            /deep/.el-step__icon.is-text {
                background: #e4e7ed;
                border: #e4e7ed;
                width: 20px;
                height: 20px;
                margin-left: 2px;
                margin-top: -2px;

                .el-step__icon-inner {
                    color: #e4e7ed;

                }


            }

            /deep/ .el-step__title.is-finish,
            /deep/ .el-step__title.is-wait {
                color: #333;
                font-weight: 100;

            }

            /deep/ .el-step__description {
                color: #909399
            }

            &-bak {
                width: 50%;
                float: left;

                >p {
                    img {
                        width: 100px;
                        height: 100px;
                    }
                }

                >button {
                    margin: 5px;
                }
            }

            &-record {
                font-size: 16px;
                color: #606266;
                margin-bottom: 10px;

                label {

                    float: left;
                    width: 250px
                }

                span {
                    float: left;
                    width: calc(100% - 250px);
                }

                &::after {
                    content: '';
                    clear: both;
                    display: block;
                }

            }

        }


    }
</style>

<style>
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
