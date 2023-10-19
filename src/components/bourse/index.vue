<template>
    <div class="bourse-index site-content">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/otc' }">OTC</el-breadcrumb-item>
            <el-breadcrumb-item>买入以太坊 (ETH)</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="haed">
            <el-page-header @back="goBack" content="订单详情">
            </el-page-header>
        </div>
        <div class="bourse-index-warning">
            <span v-if="jbxx.zt == 1001">下单成功</span>
            <span v-if="jbxx.zt == 1002">订单取消</span>
            <span v-if="jbxx.zt == 1003">币商确认收款</span>
            <span v-if="jbxx.zt == 1004">用户确认收币</span>
            <span v-if="jbxx.zt == 1005">交易完成</span>
            <span v-if="jbxx.zt == 1006">币商未收款-用户上传图片凭证</span>
            <span v-if="jbxx.zt == 1007">币商未收款-币商上传图片凭证</span>
            <span v-if="jbxx.zt == 1008">币商未收款-用户上传视频凭证</span>
            <span v-if="jbxx.zt == 1009">币商未收款-币商上传视频凭证</span>
            <span v-if="jbxx.zt == 1010">订单异常等待平台处理</span>
            <span v-if="jbxx.zt == 1011">交易失败</span>
            <span v-if="jbxx.zt == 1012">异常交易</span>
            <span v-if="jbxx.zt == 1013">用户未收币-用户上传图片凭证</span>
            <span v-if="jbxx.zt == 1014">用户未收币-币商上传图片凭证</span>
            <span v-if="jbxx.zt == 1015">用户未收币-用户上传视频凭证</span>
            <span v-if="jbxx.zt == 1016">用户未收币-币商上传视频凭证</span>
            <span v-if="jbxx.zt == 1017">币商确认收币</span>
            <span v-if="jbxx.zt == 1018">用户确认收款</span>
            <span v-if="jbxx.zt == 1019">币商未收币-用户上传图片凭证</span>
            <span v-if="jbxx.zt == 1020">币商未收币-币商上传图片凭证</span>
            <span v-if="jbxx.zt == 1021">币商未收币-用户上传视频凭证</span>
            <span v-if="jbxx.zt == 1022">币商未收币-币商上传视频凭证</span>
            <span v-if="jbxx.zt == 1023">用户未收款-用户上传图片凭证</span>
            <span v-if="jbxx.zt == 1024">用户未收款-币商上传图片凭证</span>
            <span v-if="jbxx.zt == 1025">用户未收款-用户上传视频凭证</span>
            <span v-if="jbxx.zt == 1026">用户未收款-币商上传视频凭证</span>

            <span
                v-if="jbxx.zdsx&&jbxx.zt == 1001||jbxx.zt == 1004||jbxx.zt == 1006||jbxx.zt == 1008||jbxx.zt == 1015||jbxx.zt == 1018||jbxx.zt == 1019||jbxx.zt == 1021||jbxx.zt == 1025"
                style="margin-left: 200px;font-size: 14px;color: red;">请在{{jbxx.zdsx}}前完成操作,超时后系统将自动处理.</span>
        </div>
        <div class="bourse-index-screen">
            <span> {{jbxx.bzmc}} </span>
            <label v-if="jbxx.ddlx==1"> {{jbxx.je}}{{jbxx.fbmc}} 购买 {{jbxx.sl}}{{jbxx.bzmc}}</label>
            <label v-else> {{jbxx.sl}}{{jbxx.bzmc}} 兑换 {{jbxx.je}}{{jbxx.fbmc}} </label>
            <div v-if="jbxx.ddlx==1">
                <section>
                    <label>买入</label>
                    <el-input style="width: calc(100% - 20px)" size="mini" v-model="jbxx.sl" disabled>
                    </el-input>
                </section>
                <section>
                    <label v-if="jbxx.zt===1001||jbxx.zt===1002">待支付 ({{jbxx.fbmc}})</label>
                    <label v-else>支付 ({{jbxx.fbmc}})</label>
                    <el-input style="width: calc(100% - 20px)" size="mini" v-model="jbxx.je" disabled>
                    </el-input>
                </section>
                <template v-if="jbxx.zt===1001">
                    <section>
                        <label>支付方式</label>
                        <el-select style="width: calc(100% - 20px)" v-model="zffs" placeholder="请选择支付方式" size="mini"
                            @change="zffshs">
                            <el-option v-for="item in bszffslb" :label="item.mc"
                                :value="{value:item.zffsid,lb:item.lb}">
                            </el-option>
                        </el-select>
                    </section>
                    <section>
                        <label>打款账号</label>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==0" @change="zhqk">
                            <el-option v-for="item in bsqblb" :label="item.zhm" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.zhmc }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhm }}</span>
                            </el-option>
                        </el-select>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==1" @change="zhqk">
                            <el-option v-for="item in bsqblb" :label="item.zhmc" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.khmc }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhmc }}</span>
                            </el-option>
                        </el-select>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==2" @change="zhqk">
                            <el-option v-for="item in bsqblb" :label="item.lxr" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.lxr }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.lxfs }}</span>
                            </el-option>
                        </el-select>
                    </section>
                </template>
            </div>
            <div v-else>
                <section>
                    <label>卖出</label>
                    <el-input style="width: calc(100% - 20px)" size="mini" v-model="jbxx.sl" disabled>
                    </el-input>
                </section>
                <section>
                    <label v-if="jbxx.zt===1001||jbxx.zt===1002">待收款 ({{jbxx.fbmc}})</label>
                    <label v-else-if="jbxx.zt===1005||jbxx.zt===1012">已收款 ({{jbxx.fbmc}})</label>
                    <label v-else>收款 ({{jbxx.fbmc}})</label>
                    <el-input style="width: calc(100% - 20px)" size="mini" v-model="jbxx.je" disabled>
                    </el-input>
                </section>
                <template v-if="jbxx.zt===1001">
                    <section>
                        <label>交易方式</label>
                        <el-select style="width: calc(100% - 20px)" v-model="zffs" placeholder="请选择支付方式" size="mini"
                            @change="zffshs">
                            <el-option v-for="item in bszffslb" :label="item.mc"
                                :value="{value:item.zffsid,lb:item.lb}">
                            </el-option>
                        </el-select>
                    </section>
                    <section>
                        <label>收款账号</label>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==0" @change="zhqk">
                            <el-option v-for="item in yhqblb" :label="item.zhm" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.zhmc }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhm }}</span>
                            </el-option>
                        </el-select>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==1" @change="zhqk">
                            <el-option v-for="item in yhqblb" :label="item.zhmc" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.khmc }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhmc }}</span>
                            </el-option>
                        </el-select>
                        <el-select style="width: calc(100% - 20px)" v-model="zhid" size="mini" placeholder="请选择账户"
                            v-if="lb==2" @change="zhqk">
                            <el-option v-for="item in bsqblb" :label="item.lxr" :value="{value:item.zhid,item:item}">
                                <span style="float: left">{{ item.lxr }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.lxfs }}</span>
                            </el-option>
                        </el-select>
                    </section>

                </template>
            </div>
        </div>
        <div class="bourse-index-info">
            <div>
                <!-- <div class="bourse-index-info-let">
                    <p>
                        <img src="" alt="" />
                        <label>币商id</label>
                    </p>
                    <p>
                        <el-input type="textarea" autosize :rows="1" placeholder="备注" v-model="value">
                        </el-input>
                    </p>
                </div> -->

                <div class="bourse-index-info-rit" v-if="zhxx">
                    <div ref="rit">
                        <template v-if="zhxx.zflx===0">
                            <p><span>开户名称</span>{{zhxx.khmc}}</p>
                            <p><span>账户号码</span>{{zhxx.zhm}}</p>
                            <p><span>账号名称</span>{{zhxx.zhmc}}</p>
                        </template>
                        <template v-if="zhxx.zflx===1">
                            <p><span>开户名称</span>{{zhxx.khmc}}</p>
                            <p><span>账号名称</span>{{zhxx.zhmc}}</p>
                            <p><span>币商二维码</span>
                                <el-image style="width: 80px; height: 80px" :src="'/imgsave/icon-save/'+zhxx.skm"
                                    :preview-src-list="['/imgsave/icon-save/'+zhxx.skm]">
                                </el-image>
                            </p>
                        </template>
                        <template v-if="zhxx.zflx===2">
                            <p>币商联系方式</p>
                            <p><span>联系人</span> {{zhxx.lxr}}</p>
                            <p><span>联系地址</span> {{zhxx.dz}}</p>
                            <p><span>联系方式</span> {{zhxx.lxfs}}</p>
                            <p><span>营业时间</span> {{zhxx.yysj.replace(',', '-')}}</p>
                            <p v-if="zhxx.wztp"><span>地址图片</span>
                                <el-image style="width: 80px; height: 80px" :src="'/imgsave/icon-save/'+zhxx.wztp"
                                    :preview-src-list="['/imgsave/icon-save/'+zhxx.wztp]"></el-image>
                                点击图片查看大图
                            </p>
                            <!-- </label> -->
                            </p>

                        </template>
                    </div>

                    <i>
                        <el-button type="text" @click="copyDomText($refs.rit)">点击复制账户信息</el-button>
                    </i>
                </div>
            </div>
        </div>
        <div class="bourse-index-enquiry" v-if="scpzsj">
            <template v-for="i in scpzsj">
                <p v-if="i.sppz" @click="loadVideo(i.sppz)">
                    <label style="cursor: pointer">{{i.cjsj}} {{i.js===2?'我':'币商'}}上传的视频凭据</label>
                    <i class="el-icon-video-camera-solid"></i>
                </p>
                <p v-else>
                    <label v-if="i.tppz">{{i.cjsj}} {{i.js===2?'我':'币商'}}上传的图片凭据</label>
                    <el-image style="width: 40px; height: 40px" v-if="i.tppz" :src="'/imgsave/voucher-save/'+i.tppz"
                        :preview-src-list="['/imgsave/voucher-save/'+i.tppz]">
                    </el-image>
                </p>
            </template>
        </div>
        <div style="margin: 10px 0;">
            <el-link style="margin-top: 15px;" type="primary" :href="jbxx.hxz" v-if="jbxx.hxz" target="_blank">
                打币结果记录查看</el-link>
        </div>
        <div style="text-align: right;">
            <!-- v-if="jbxx.zt===1001&&ddlx===1" -->
            <el-button v-if="jbxx.zt===1001&&jbxx.ddlx===1" type="danger" @click="paymentSub">付款</el-button>
            <el-button v-if="jbxx.zt===1001&&jbxx.ddlx===0" type="danger" @click="payCion">付币</el-button>
            <!-- <el-button v-if="jbxx.zt===1006||jbxx.zt===1008" type="danger" plain @click="paymentSub">确认付款</el-button>
            <el-button v-if="jbxx.zt===1021||jbxx.zt===1019" type="danger" plain @click="payCion">确认付币</el-button> -->
            <el-button v-if="jbxx.zt===1006" type="danger" plain @click="upImgs">币商未收款-上传图片凭据</el-button>
            <el-button v-if="jbxx.zt===1019" type="danger" plain @click="upImgs">币商未收币-上传图片凭据</el-button>
            <el-button v-if="jbxx.zt===1008" type="danger" plain @click="upVideos">币商未收款-上传视频凭据</el-button>
            <el-button v-if="jbxx.zt===1015" type="danger" plain @click="upVideos">用户未收币-上传视频凭据</el-button>
            <el-button v-if="jbxx.zt===1021" type="danger" plain @click="upVideos">币商未收币-上传视频凭据</el-button>
            <el-button v-if="jbxx.zt===1025" type="danger" plain @click="upVideos">用户未收款-上传视频凭据</el-button>
                

            <el-button v-if="jbxx.zt===1018" type="danger" plain @click="upImgs">未收款上传凭证</el-button>
            <el-button v-if="jbxx.zt===1004" type="danger" plain @click="upImgs">未收币上传凭证</el-button>
            <el-button v-if="jbxx.zt===1017&&zhxx.zflx===2" type="danger" plain @click="dialogTransfer=true">转 账
            </el-button>
            <el-popconfirm v-if="jbxx.zt===1018||jbxx.zt===1025" title="确定已收款" style="margin-left: 10px;"
                @confirm="confirmReceipt">
                <el-button type="success" plain slot="reference">确认收款</el-button>
            </el-popconfirm>
            <el-popconfirm v-if="jbxx.zt===1004||jbxx.zt===1015" title="确定已收币" style="margin-left: 10px;"
                @confirm="confirmCion">
                <el-button type="success" plain slot="reference">确认收币</el-button>
            </el-popconfirm>
            <el-popconfirm v-if="jbxx.zt===1006||jbxx.zt===1008||jbxx.zt===1019||jbxx.zt===1021" title="确定取消订单吗？"
                style="margin-left: 10px;" @confirm="cancelOrder">
                <el-button plain slot="reference">取消订单</el-button>
            </el-popconfirm>
        </div>
        <!-- 转 账-->
        <el-dialog :visible.sync="dialogTransfer" width="650px">
            <Transfer :dateList="jbxx"></Transfer>
        </el-dialog>
        <!-- 视频查看-->
        <el-dialog :visible.sync="dialogVisible" width="500px">
            <VideoPlay style="width:100%" ref="videos" :urls="videoUrl" :showDialog="dialogVisible"></VideoPlay>
        </el-dialog>
        <!-- 确认付款-->
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
                    <el-form-item label="付款凭据" prop="tppj">
                        <el-upload class="avatar-uploader" action="#" multiple accept=".jpg,.png"
                            :on-change="beforeAvatarUpload" :auto-upload="false" :file-list="fileList" :limit="5">
                            <img v-if="payForm.tppj" :src="payForm.tppj" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>已选中{{fileList.length}}张图片</span>
                    </el-form-item>
                </template>
                <template v-else>
                    <span>当面交易币商联系方式</span>
                    <el-form-item label="联系人">
                        <span>{{zhxx.lxr}}</span>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <span>{{zhxx.lxfs}}</span>
                    </el-form-item>
                    <el-form-item label="联系地址">
                        <span>{{zhxx.dz}}</span>
                    </el-form-item>
                    <el-form-item label="营业时间">
                        <span>{{zhxx.yysj.replace(',', '-')}}</span>
                    </el-form-item>
                    <el-form-item label="地址图片" v-if="zhxx.wztp">
                        <el-image style="width: 80px; height: 80px" :src="'/imgsave/icon-save/'+zhxx.wztp"
                            :preview-src-list="['/imgsave/icon-save/'+zhxx.wztp]">
                        </el-image>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('accountForm')">取 消</el-button>
                <el-button type="primary" @click="finishPay('accountForm')"
                    v-loading.fullscreen.lock="fullscreenLoading">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 确认付币-->
        <el-dialog :visible.sync="dialogPayCion" title="确认付币" width="500px" @close="closeForm('payForm')">
            <el-form ref="payForm" size="small" :label-width="formLabelWidth">
                <el-form-item label="币商钱包">
                    <span>{{jbxx.bsdz}}</span>
                </el-form-item>
                <el-form-item label="支付币种">
                    <span>{{jbxx.bzmc}}</span>
                </el-form-item>
                <el-form-item label="支付数量">
                    <span>{{jbxx.sl}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPayCion=false">取 消</el-button>
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
        paySelUser,
        accounSelectUser,
        accounSelectUsers,
        paymentUser,
        voucherList,
        payUser,
        collectCurrencyUser,
        collectionUser,
        cancelUser,
        upImgUser,
        upVideoUser
    } from '@/api'
    import Transfer from '@/components/transfer'
    import VideoPlay from '@/components/video/VideoPlayer'
    import wallet from "@/constants/wallet/wallets"
    export default {
        name: '',
        mixins: [],
        components: {
            VideoPlay,
            Transfer
        },
        props: {},
        data() {
            return {
                networkID: '',
                fileList: [],
                dialogTransfer: false,
                dialogvideos: false,
                dialogimgs: false,
                fullscreenLoading: false,
                formLabelWidth: '120px',
                imgsForm: {
                    tppj: ''
                },
                payForm: {
                    tppj: '',
                    dkr: '',
                },
                videoUrl: '',
                dialogVisible: false,
                dialogPayment: false,
                dialogPayCion: false,
                bsqblb: [],
                yhqblb: [],
                bszffslb: [],
                scpzsj: [{
                        js: 2,
                        tppz: './icon-save/61dfd41699e550a88fe7152377b72fb.png',
                        cjsj: '2023-04-15 16:19:37'
                    },
                    {
                        js: 2,
                        tppz: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        cjsj: '2023-04-15 16:19:37'
                    },
                    {
                        js: 1,
                        tppz: '/imgsave/icon-save/61dfd41699e550a88fe7152377b72fb.png',
                        cjsj: '2023-04-15 16:19:37'
                    },
                    {
                        js: 2,
                        sppz: 'http://localhost/wxhmxt/dynamic-material/6/39/1638259621476.mp4',
                        cjsj: '2023-04-15 16:19:37'
                    },
                    {
                        js: 1,
                        sppz: './icon-save/61dfd41699e550a88fe7152377b72fb.png',
                        cjsj: '2023-04-15 16:19:37'
                    }
                ],
                jbxx: {},
                payList: '/imgsave/icon-save/61dfd41699e550a88fe7152377b72fb.png',
                value: '',
                zffs: '',
                zhid: '',
                lb: '',
                hxz: '',
                zhxx: {},
                image: '',
                ruleForm: {
                    name: '',
                    region: '1',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
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
        computed: {},
        watch: {},
        created() {
            // this.networkID = 1;//ethereum.networkVersion;
            // this.$store.commit("SET_LOADING",true)
            this.getOrderList();
            this.getvoucherList();
            console.log(window.location.href.split("?"))
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
            confirmReceipt() {
                this.fullscreenLoading = true;
                let cs = {
                    ddid: this.jbxx.ddid,
                    ztdm: this.jbxx.zt,
                    yhid: sessionStorage.getItem('userKey')
                };
                collectionUser(cs).then((res) => {
                    if (res.code == 0) {
                        this.fullscreenLoading = false;
                        this.getOrderList()
                    } else {
                        this.$message.error('请重新尝试。');
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                    // loading.close();
                    this.fullscreenLoading = false;
                });
            },
            confirmCion() {
                this.fullscreenLoading = true;
                let cs = {
                    ddid: this.jbxx.ddid,
                    ztdm: this.jbxx.zt,
                    yhid: sessionStorage.getItem('userKey')
                };
                collectCurrencyUser(cs).then((res) => {
                    if (res.code == 0) {
                        this.fullscreenLoading = false;
                        this.getOrderList()
                    } else {
                        this.$message.error('请重新尝试。');
                        this.fullscreenLoading = false;
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                    // loading.close();
                    this.fullscreenLoading = false;
                });
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
                    upVideoUser(formdata).then(res => {
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
            upImgs() {
                this.dialogimgs = true
            },
            upVideos() {
                this.dialogvideos = true
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
                        upImgUser(formdata).then(res => {
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
            cancelOrder() {
                this.fullscreenLoading = true;
                let cs = {
                    ddid: this.jbxx.ddid,
                    yhid: sessionStorage.getItem('userKey')
                };
                cancelUser(cs).then((res) => {
                    if (res.code == 0) {
                        this.fullscreenLoading = false;
                        this.getOrderList()
                    } else {
                        this.$message.error('请重新尝试。');
                    }
                }).catch(err => {
                    this.$message.error('请重新尝试。');
                    // loading.close();
                    this.fullscreenLoading = false;
                });
            },
            async finishPayCion() {
                this.fullscreenLoading = true;
                if (this.zhxx.zflx === 2) {

                    let qrfb = {
                        ddid: this.jbxx.ddid,
                        skzh: this.zhxx.zhid,
                        ztdm: this.jbxx.zt,
                        yhid: sessionStorage.getItem("userKey")
                    }
                    payUser(qrfb).then((res) => {
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
                    let fbcs = {
                        yhzh: sessionStorage.getItem("userKey"),
                        bszh: this.jbxx.bsdz,
                        hydz: this.jbxx.bzhy,
                        bzmc: this.jbxx.bzmc,
                        bzsl: this.jbxx.sl,
                        js: 2
                    }
                    if (this.hxz) {
                        let qrfb = {
                            ddid: this.jbxx.ddid,
                            hxz: this.hxz,
                            skzh: this.zhxx.zhid,
                            ztdm: this.jbxx.zt,
                            yhid: sessionStorage.getItem("userKey")
                        }
                        payUser(qrfb).then((res) => {
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
                        const hxz = await wallet.transferAccounts(fbcs);
                        if (hxz.code === 200) {
                            this.hxz = 'https://etherscan.io/token/' + hxz.hxz;
                            let qrfb = {
                                ddid: this.jbxx.ddid,
                                hxz: this.hxz,
                                skzh: this.zhxx.zhid,
                                ztdm: this.jbxx.zt,
                                yhid: sessionStorage.getItem("userKey")
                            }
                            payUser(qrfb).then((res) => {
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
                    }
                }
            },
            payCion() {
                if (this.networkID === 1) {
                    
                    if (this.jbxx.zt === 1001) {
                        if (this.zhxx.zhid) {
                            this.dialogPayCion = true
                        } else {
                            this.$message.error('请选择收款账号。');
                        }
                    } else {
                        this.$message.error('当前状态不支持该操作。');
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: 'MetaMask当前网络不是主网,不支持当前操作，请切换钱包网络!',
                        type: 'warning'
                    });
                }
            },
            paymentSub() {
                if (this.jbxx.zt === 1001) {
                    if (this.zhxx) {
                        this.dialogPayment = true
                    } else {
                        this.$message.error('请选择打款账号。');
                    }
                } else {
                    this.$message.error('当前状态不支持该操作。');
                }
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
            finishPay(formName) {
                this.fullscreenLoading = true;
                let formdata = new FormData();
                formdata.append("ddid", this.jbxx.ddid)
                formdata.append("skzh", this.zhxx.zhid)
                formdata.append("ztdm", this.jbxx.zt)
                formdata.append("zflx", this.zhxx.zflx)
                formdata.append("yhid", sessionStorage.getItem("userKey"))
                if (this.zhxx.zflx != 2) {
                    formdata.append("dkr", this.payForm.dkr)
                    this.fileList.forEach(file => {
                        formdata.append("imgs", file.raw)
                    })
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        paymentUser(formdata).then(res => {
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
            beforeAvatarUpload(file, fileList) {
                console.log(fileList)
                if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png') {
                    this.payForm.tppj = URL.createObjectURL(fileList[0].raw);
                    this.fileList = fileList;

                } else {
                    this.$message.error('只能上传jpg/png格式!');
                    this.fileList = [];
                    this.imgsForm.tppj = '';
                }
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
            loadVideo(url) {
                this.videoUrl = '/imgsave/voucher-save/' + url
                this.dialogVisible = true
                if (this.$refs.videos != undefined)
                    this.$refs.videos.handle_src(this.videoUrl);
            },

            zhqk(e) {
                this.zhxx = e.item;
                console.log(e)
            },
            zffshs(e) {
                this.lb = e.lb;
                this.getaccounSelectUser(e);
                this.getaccounSelectUsers(e);
            },
            goBack() {
                this.$router.back()
            },
            getOrderList() {
                let id = {
                    id: window.location.href.split("?")[1]
                }
                orderInfo(id).then((res) => {
                    if (res.code == 0) {
                        this.jbxx = res.ddxx;
                        this.zhxx = res.zhxx;
                        if (res.ddxx.zt === 1001) {
                            this.getpaySel(res.ddxx.spid);
                        }
                        console.log(this.dateList, '71')
                    }

                });
            },
            getvoucherList() {
                let id = {
                    ddid: window.location.href.split("?")[1]
                }
                voucherList(id).then((res) => {
                    if (res.code == 0) {
                        this.scpzsj = res.data;
                    }

                });
            },
            getpaySel(e) {
                let id = {
                    spid: e
                }
                paySelUser(id).then((res) => {
                    if (res.code == 0) {
                        this.bszffslb = res.data;
                    }

                });
            },
            getaccounSelectUser(e) {
                let user = sessionStorage.getItem("userKey")
                user = user.substring(user.length - 3)
                user = parseInt(user, 16)
                console.log(user)
                let id = {
                    bsqb: this.jbxx.bsdz,
                    id: e.value,
                    lb: e.lb,
                    pd: user
                }
                accounSelectUsers(id).then((res) => {
                    if (res.code == 0) {
                        this.bsqblb = res.data;
                    }

                });
            },
            getaccounSelectUsers(e) {
                // user = this.jbxx.bsdz.substring(user.length - 3)
                // user = parseInt(user, 16)
                let id = {
                    bsqb: sessionStorage.getItem("userKey"),
                    id: e.value,
                    lb: e.lb,
                    // pd: user
                }
                accounSelectUser(id).then((res) => {
                    if (res.code == 0) {
                        this.yhqblb = res.data;
                    }

                });
            },
            copyDomText(ev) {
                // console.log(ev)
                // console.log(ev.children.length)
                // ev.children[ev.children.length - 1].style.display = "none"
                let val = ev.innerText
                // console.log(val)
                // navigator.clipboard.writeText(val).then(() => {
                //     this.$message.success("复制成功");
                // });

                if (window.clipboardData && window.clipboardData.setData) {
                    // IE-specific code path to prevent textarea being shown while dialog is visible
                    return window.clipboardData.setData("Text", text);

                } else if (document.queryCommandSupported &&
                    document.queryCommandSupported("copy")) {
                    var textarea = document.createElement("textarea");
                    textarea.textContent = val;
                    // Prevent scrolling to bottom of page in MS Edge
                    textarea.style.position = "fixed";
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        // Security exception may be thrown by some browsers
                        this.$message.success("复制成功");
                        return document.execCommand("copy");
                    } catch (ex) {
                        console.warn("复制到剪贴板失败.", ex);
                        return false;
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>
<style scoped lang="less">
    .video-play {
        cursor: pointer;
    }

    .bourse-index {
        box-sizing: border-box;
        padding: 20px;
        color: #333;

        &-warning {
            padding: 8px 16px;
            background-color: #fff6f7;
            border-radius: 4px;
            border-left: 5px solid #fe6c6f;
            margin: 20px 0;
        }

        .breadcrumb {
            color: red;
            padding: 20px 0 10px;
        }

        &-screen {
            background: #bdf1f4;
            // height: 40px;
            line-height: 40px;
            white-space: nowrap;
            margin-top: 60px;
            border-radius: 4px;

            >span {
                float: left;
                width: 80px;
                color: #333;

                &:before {
                    content: '★';
                    color: #ce4745;
                    margin-left: 5px;
                    font-weight: bold;
                }
            }

            >label {
                float: left;
                color: red;
                font-size: 12px;
                margin: 0 10px;
                // width: 180px;
            }

            >div {
                // width: calc(100% - 80px);
                width: calc(100% - 80px - 190px);
            }

            section {
                display: inline-block;
                position: relative;
                // width: calc(100% / 4);
                text-align: center;

                label {
                    position: absolute;
                    top: -40px;
                    font-size: 14px;
                    font-weight: bold;
                    left: 50%;
                    transform: translateX(-50%);
                }

            }
        }

        &-info {
            padding: 20px;
            background: #fff;
            margin-top: 20px;

            >div {
                border: 1px solid #85d9d6;
                padding: 15px;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
            }

            &-let {
                float: left;
                width: calc(50% - 10px);
                margin-right: 20px;


                p {

                    &:nth-child(1) {
                        line-height: 50px;
                        height: 50px;
                        margin-bottom: 35px;

                        img {
                            width: 50px;
                            height: 50px;
                            float: left;
                            margin-right: 15px
                        }

                        label {
                            display: inline-block;
                            margin: auto;
                        }
                    }

                    &:nth-child(2) {
                        position: absolute;
                        bottom: 15px;
                        left: 15px;
                        width: calc(50% - 20px - 0px);
                        border: 1px solid #015659;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }
                }
            }

            &-rit {
                // float: left;
                width: calc(50% - 10px);
                border: 2px solid #015659;
                padding: 10px 15px;
                // height: 118px;
                box-sizing: border-box;
                line-height: 30px;
                font-size: 14px;
                font-weight: bold;
                position: relative;
                border-radius: 4px;
                margin: auto;

                p span {
                    width: 100px;
                    display: inline-block;
                    float: left;
                }

                i {
                    position: absolute;
                    right: 10px;
                    font-size: 12px;
                    color: #b6b2b2;
                    bottom: 5px;
                    line-height: 1;
                }
            }
        }

        &-enquiry {
            padding: 10px 20px;
            background-color: #fff;
            margin: 20px 0;

            p {
                margin-bottom: 20px;
                font-size: 14px;
                // line-height: 30px;
                // height: 30px;
                align-items: center;
                display: flex;

                &:last-child {
                    margin-bottom: 0px;
                }

                img {
                    height: 40px;
                    vertical-align: middle;
                    // margin-left: 10px;
                }

                label {
                    float: left;
                    margin-right: 15px;
                }

                i {
                    font-size: 20px;
                    // margin-left: 10px;
                    cursor: pointer;
                }

                >div {
                    // float: left;
                    // width: 40px;
                    // height: 40px;
                    // margin-top: -6px;
                    // margin-left: 10px;
                }

                &:after {
                    content: '';
                    display: block;
                    clear: both;
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
