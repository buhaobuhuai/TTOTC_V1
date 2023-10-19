<!--  -->
<template>
    <div class="starts">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="layer4"></div>
        <div style="width: 65rem;margin: auto;">
            <div @click="dkyl"
                style="padding: 300px 0;text-align: center;color: #fff;font-size: 2.5rem;font-family: 'Smiley Sans';cursor: pointer;">
                <p>功能开发中 敬请预留邮箱 抢先体验</p>
            </div>
        </div>
        <el-dialog title="预留邮箱" :visible.sync="dialogVisible" width="500px">
            <el-form :model="form" ref="dynamicValidateForm" label-width="60px" class="demo-dynamic">
                <el-form-item prop="mail" label="邮箱" :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model="form.mail"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

import {
    addEmail,
} from '@/api'
export default {

    data() {
        return {
            dialogVisible: false,
            form: {
                mail: ''
            }
        }
    },

    methods: {
        dkyl() {
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addEmail(this.form).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message: '预留成功',
                                type: 'success'
                            })
                            this.dialogVisible = false
                        } else {
                            this.$message.error('请重新尝试。');
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Smiley Sans';
    src: url('../assets/font/SmileySans-Oblique.ttf.woff2') format('woff2');
}



//首先定义背景
.starts {
    background-color: rgba(0, 0, 0, 0.8509803922);
    height: 100vh;
    width: 100%;
    padding-bottom: 60px;
}

//定义星空背景用shadow来循环生成
@function getShadows($n) {
    $Shadows :'#{random(100)}vw #{random(100)}vh #fff';

    @for $i from 2 to $n {
        $Shadows :'#{$Shadows}, #{random(100)}vw #{random(100)}vh #fff';
    }

    @return unquote($Shadows)
}

$duration :1500s; //滚动时间
$count :1000; //星空的数量

//循环生成星空，layer1到layer4
@for $i from 1 to 5 {
    $duration: floor($duration/2);
    $count: floor($count/2);

    .layer#{$i} {
        $size: #{$i}px;
        position: fixed;
        width: $size;
        height: $size;
        background-color: rgba(0, 0, 0, 0.032);
        border-radius: 50%;
        top: 0;
        left: 0;
        box-shadow: getShadows($count);
        animation: moveUp $duration linear infinite;

        &::after {
            content: '';
            position: fixed;
            left: 0;
            top: 100vh;
            border-radius: inherit;
            box-shadow: inherit;
            width: $size;
            height: $size;
        }
    }
}

//滚动的动画，无限像Y轴滚动，
@keyframes moveUp {
    100% {
        transform: translateY(-100vh);
    }
}
</style>