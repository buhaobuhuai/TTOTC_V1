<template>
    <div class="">
        <div class="cropper-w">
            <div class="cropper text-align-c">
                <VueCropper ref="cropper" v-bind="dialogPar.option"></VueCropper>
            </div>
            <div style="margin: 5px;">
                <el-button type="primary" @click="rotateRight">向右边旋转</el-button>
                <el-button type="primary" @click="rotateLeft">向左边旋转</el-button>
                <el-button type="primary" @click="tpcj">裁剪</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        VueCropper
    } from 'vue-cropper'
    export default {
        name: "cropper",
        components: {
            VueCropper
        },
        props: {
            dialogPar: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            },
        },
        data() {
            return {
            };
        },
        mounted() {
            console.log(this.dialogPar, 1)
            this.imageToBase64(this.dialogPar.imgUrl, '');
            this.getType(this.dialogPar.fileInfo.raw.type)
        },
        methods: {
            rotateRight() {
                this.$refs.cropper.rotateRight() //向右边旋转90度
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft() //向左边旋转90度
            },
            imageToBase64(file, a) {
                console.log(a)
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    // console.log('file 转 base64结果：' + reader.result)
                    if (a === 0) {
                        this.$emit('getImage', reader.result, file);
                        // console.log(11)
                    } else {
                        this.dialogPar.option.img = reader.result
                    }
                }
                reader.onerror = function(error) {
                    console.log('Error: ', error)
                }
            },
            getType(type) {
                let a = type.split("/");
                this.dialogPar.option.outputType = a[1];
            },
            tpcj() {
                this.$refs.cropper.getCropBlob(data => {
                    // do something
                    const file = new window.File([data], this.dialogPar.fileInfo.name, {
                        type: data.type
                    })
                    this.imageToBase64(file, 0)
                })

            },
        },
    }
</script>

<style scoped lang="less">
    /*配套样式*/
    .cropper-w {
        .cropper {
            width: auto;
            height: 50vh;
        }
    }

    .btn-w {
        margin-top: 20px;
    }
</style>
