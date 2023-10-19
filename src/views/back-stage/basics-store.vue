<!-- 店铺信息 -->
<template>
    <div class="store">

        <el-descriptions class="margin-top" title="店铺基本信息" :column="3">
            <template slot="extra">
                <el-button type="primary" size="small" @click="dialogVisible=true">修改</el-button>
            </template>
            <el-descriptions-item label="logo">
                <template>
                    <img :src="img" />
                </template>
            </el-descriptions-item>
            <el-descriptions-item label="简称">{{dateList.jc}}</el-descriptions-item>
            <el-descriptions-item label="全称">{{dateList.qc}}</el-descriptions-item>
            <el-descriptions-item label="状态">
                <el-tag size="small" v-if="dateList.zt==0">冻结中</el-tag>
                <el-tag size="small" v-else-if="ruleForm.yysj[0]<yypd&&yypd<ruleForm.yysj[1]">正常营业</el-tag>
                <el-tag size="small" v-else>休息中</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系方式">{{dateList.lxfs}}</el-descriptions-item>
            <el-descriptions-item label="营业时间">{{yysj}}</el-descriptions-item>
        </el-descriptions>
        <el-dialog title="修改店铺信息" :visible.sync="dialogVisible" width="550px">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('main.bssq.jc')" prop="jc">
                    <el-input v-model="ruleForm.jc"></el-input>
                </el-form-item>
                <el-form-item :label="$t('main.bssq.qc')" prop="qc">
                    <el-input v-model="ruleForm.qc"></el-input>
                </el-form-item>
                <el-form-item :label="$t('main.bssq.szgj')" prop="lxfs">
                    <el-input v-model="ruleForm.lxfs"></el-input>
                </el-form-item>
                <el-form-item :label="$t('main.bssq.gfdz')" prop="yysj">
                    <!-- <el-input v-model="ruleForm.gfdz"></el-input> -->
                    <el-time-picker is-range v-model="ruleForm.yysj" :range-separator="$t('main.tips.zhi')"
                        :start-placeholder="$t('main.tips.kssj')" :end-placeholder="$t('main.tips.jssj')"
                        :placeholder="$t('main.tips.sjfw')" value-format="HH:mm:ss" style="width: 100%;">
                    </el-time-picker>
                </el-form-item>
                <el-form-item :label="$t('main.bssq.mhtb')" prop="mhtb">
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                        :on-change="beforeAvatarUpload" :auto-upload="false">
                        <img v-if="ruleForm.mhtb" :src="ruleForm.mhtb" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-input v-model="ruleForm.mhtb"></el-input> -->
                </el-form-item>
                <div>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('main.bssq.sq')}}</el-button>
                    <el-button @click="resetForm('ruleForm')">{{$t('main.bssq.cz')}}</el-button>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog title="图片裁剪" :visible.sync="cropperDialog" width="550px">
            <VueCropper ref="cropper" :dialogPar="dialogPar" @getImage="getImage" :key="new Date().getTime()">
            </VueCropper>
        </el-dialog>
    </div>
</template>

<script>
    import {
        storeInfo,
        storeUp
    } from '@/api'
    import VueCropper from '@/components/cropper'
    export default {
        name: '',
        mixins: [],
        components: {
            VueCropper
        },
        props: {},
        data() {
            return {
                dialogPar: {},
                cropperDialog: false,
                dateList: [],
                img: '',
                yysj: '',
                yypd: '',
                image: null,
                dialogVisible: false,
                ruleForm: {
                    bsid: '',
                    jc: '',
                    qc: '',
                    lxfs: '',
                    yysj: '',
                    img: '',
                    dptp: '',
                    mhtb: '',
                },
                rules: {
                    jc: [{
                            required: true,
                            message: this.$t('main.tips.input') + this.$t('main.bssq.jc'),
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 12,
                            message: this.$t('main.tips.character_length', {
                                min: 2,
                                max: 12
                            }),
                            trigger: 'blur'
                        }
                    ],
                    qc: [{
                        required: true,
                        message: this.$t('main.tips.input') + this.$t('main.bssq.qc'),
                        trigger: 'blur'
                    }],
                    lxfs: [{
                        required: true,
                        message: this.$t('main.tips.input') + this.$t('main.bssq.szgj'),
                        trigger: 'blur'
                    }],
                    yysj: [{
                        required: true,
                        message: this.$t('main.tips.input') + this.$t('main.bssq.gfdz'),
                        trigger: 'blur'
                    }],
                    mhtb: [{
                        required: true,
                        message: this.$t('main.tips.select') + this.$t('main.bssq.mhtb'),
                        trigger: 'blur'
                    }]
                },
            }
        },
        mounted() {},
        created() {
            this.getStoreInfo()
        },
        methods: {
            getImage(url, blob) {
                console.log(url,0,blob,1)
                this.image = blob
                this.ruleForm.mhtb = url;
                this.cropperDialog = false
            },
            beforeAvatarUpload(file) {
                // this.image = file.raw;
                // console.log(file, 0)
                // this.ruleForm.mhtb = URL.createObjectURL(file.raw);
                this.dialogPar = {
                    imgUrl: file.raw, // 裁剪组件无法直接访问图片文件信息，故将文件信息转成本地Blob数据地址，让裁剪组件可以直接访问
                    fileInfo: file,
                    option: {
                        img: '', // 裁剪图片的地址
                        info: true, // 裁剪框的大小信息
                        outputSize: 1, // 裁剪生成图片的质量
                        outputType: 'jpeg', // 裁剪生成图片的格式(jpg(jpg 需要传入jpeg))
                        canScale: true, // 图片是否允许滚轮缩放(这个属性貌似没得用，不管设置true，false都可以滚轮缩放)
                        autoCrop: true, // 是否默认生成截图框
                        autoCropWidth: 200, // 默认生成截图框宽度
                        autoCropHeight: 200, // 默认生成截图框高度
                        fixedBox: false, // 固定截图框大小 不允许改变
                        fixed: true, // 是否开启截图框宽高固定比例
                        fixedNumber: [1, 1], // 截图框的宽高比例(这是比例，按两个值的比值大小进行截图框的宽高的设置，[1,1]和[100,100]是一样的)
                        full: true, // 是否输出原图比例的截图
                        canMove: true, // 上传图片是否可以移动
                        canMoveBox: true, // 截图框能否拖动
                        original: false, // 上传图片按照原始比例渲染
                        centerBox: true, // 截图框是否被限制在图片里面
                        // mode:'cover',
                        limitMinSize: [80, 80],
                        maxImgSize: 500,
                        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                    }
                }
                this.cropperDialog = true
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
            getStoreInfo() {
                storeInfo({
                    bsid: sessionStorage.getItem('userKey')
                }).then(({
                    data
                }) => {
                    this.dateList = data;
                    this.img = "/imgsave/icon-save/" + data.dptp;
                    this.ruleForm.mhtb = "/imgsave/icon-save/" + data.dptp;
                    this.yysj = data.yysj.replace(',', '-');
                    this.ruleForm.jc = data.jc;
                    this.ruleForm.qc = data.qc;
                    this.ruleForm.lxfs = data.lxfs;
                    this.ruleForm.yysj = data.yysj.split(",");
                    let date = new Date();
                    this.yypd = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                    console.log(this.ruleForm.yysj[0] < this.yypd && this.yypd < this.ruleForm.yysj[1])

                });
            },

            async submitForm(formName) {
                let formdata = new FormData();
                formdata.append("jc", this.ruleForm.jc)
                formdata.append("qc", this.ruleForm.qc)
                formdata.append("lxfs", this.ruleForm.lxfs)
                formdata.append("yysj", this.ruleForm.yysj)
                formdata.append("bsid", this.dateList.bsid)
                formdata.append("bsqb", sessionStorage.getItem('userKey'))
                if (this.image != null) {
                    formdata.append("img", this.image)
                    formdata.append("dptp", this.dateList.dptp)
                }
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            // if (this.image != null) {
                            storeUp(formdata).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '恭喜你，信息修改成功',
                                        type: 'success'
                                    });
                                    this.getStoreInfo()
                                    this.dialogVisible = false;
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            });
                            // }
                            // this.$router.replace({
                            //     path: '/personal'
                            // })
                        } catch (e) {
                            console.error(error);
                            return false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                // }
            },
            resetForm(formName) {
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            },

        }
    }
</script>

<style scoped lang='less'>
    .store {
        padding: 30px;

        img {
            width: 80px;
            height: 80px;
            border: #d7d2d2 1px solid;
            border-radius: 10px;
        }
    }
</style>
<style>
    .el-button--primary {
        background-color: #0d5959;
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
