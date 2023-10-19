<template>
    <div class="home_wrap">
        <div class="pdf-control" :style="{width:pages_width,margin:'0 auto'}">
            <el-button icon="el-icon-arrow-up" size="mini" @click="prev()"></el-button>
            <input type="number" class="page-number-input" v-model="pageNum" min="1" :max="pageCount"
                @blur="queueRenderPage(pageNum)" />
            <span class="page-num"> / {{ pageCount }}</span>
            <el-button icon="el-icon-arrow-down" size="mini" @click="next()"></el-button>
            <el-button icon="el-icon-zoom-in" size="mini" @click="scaleD()"></el-button>
            <el-button icon="el-icon-zoom-out" size="mini" @click="scaleX()"></el-button>
        </div>


        <div :style="{width:pdf_div_width,margin:'0 auto'}">
            <canvas id="pdfCanvas"></canvas>
        </div>
    </div>
</template>
<script>
    const PDFJS = require('pdfjs-dist');
    PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');

    export default {
        name: 'pdf',
        data() {
            return {
                pdf_scale: 1.5, //pdf放大系数
                pdfDoc: null,
                pdf_pages: [],
                pdf_div_width: '',
                pages_width: '',
                pdf_src: null,
                pageNum: 0, // 当前页数
                pageCount: 0, // 总页数
                pageRendering: false, // 当前页面是否在渲染中
                pageNumPending: null,
            }
        },
        props: ['pdfUrl'],
        watch: {
            pdfUrl(newVal) {
                this.showPDF(newVal)
            }
        },
        methods: {
            isMobile() {
                let flag = navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    );
                    if (flag) {
                            return true;
                          }
                          return false;
            },
            scaleD() { //放大
                let max = 4
                // if (window.screen.width > 1440) {
                //     max = 1.4
                // } else {
                //     max = 1.2
                // }
                if (this.pdf_scale >= max) {
                    return
                }
                this.pdf_scale = this.pdf_scale + 0.2
                this.showPDF(this.pdfUrl)
            },
            scaleX() { //缩小
                console.log(this.pdf_scale)
                let min = 0.4
                if (this.pdf_scale <= min) {
                    return
                }
                this.pdf_scale = this.pdf_scale - 0.1
                this.showPDF(this.pdfUrl)
            },
            prev() {
                /**
                 * 上一页
                 */
                if (this.pageNum <= 1) {
                    return;
                }
                this.pageNum--;
                this.queueRenderPage(this.pageNum);
            },
            next() {
                /**
                 * 下一页
                 */
                if (this.pageNum >= this.pageCount) {
                    return;
                }
                this.pageNum++;
                this.queueRenderPage(this.pageNum);
            },
            queueRenderPage(num) {
                /**
                 * 渲染页面队列
                 */
                // if (this.waterInfo.enable) this.createWatermarkTemplate();
                const number = Number(num);
                if (this.pageRendering) {
                    this.pageNumPending = number;
                } else {
                    this.renderPage(number);
                }
            },
            showPDF(url) {
                let _this = this;
                _this.loading = true;
                PDFJS.getDocument(url).promise.then(function(pdf) {
                    _this.pdfDoc = pdf;
                    _this.pageNum = 1;
                    _this.pdf_pages = pdf.numPages;
                    _this.pageCount = pdf.numPages;
                    _this.$nextTick(() => {
                        _this.renderPage(_this.pageNum);
                    });

                });

            },
            renderPage(num) {
                const that = this;
                this.pdfDoc.getPage(num).then(page => {
                    let canvas = document.getElementById("pdfCanvas");
                    let ctx = canvas.getContext("2d");

                    let dpr = window.devicePixelRatio || 1
                    let bsr = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1
                    let ratio = dpr / bsr
                    let viewport = page.getViewport({
                        scale: this.pdf_scale
                    })
                    canvas.width = viewport.width * ratio
                    canvas.height = viewport.height * ratio
                    canvas.style.width = viewport.width + 'px'
                    that.pdf_div_width = viewport.width + 'px'
                    canvas.style.height = viewport.height + 'px'
                   if(this.isMobile()) {}else{
                       this.pages_width=this.pdf_div_width
                   }
                    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
                    let renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    }
                    page.render(renderContext)
                    if (this.pdf_pages > num) {
                        this.pageNum = num
                    }
                })
            },
        },
        async created() {
            this.showPDF(this.pdfUrl);
        },
        mounted() {
            if(this.isMobile()) {
                this.pdf_scale=0.7
            }
        }
    }
</script>
<style lang="less" scoped>
    .home_wrap {
        width: 100%;
        height: 100%;
        text-align: center;

        .pdf-control {
            height: 50px;
            padding: 0px 16px;
            background: rgba(103, 103, 103, 1);
            display: flex;
            align-items: center;
            justify-content: center;

            .page-number-input {
                width: 50px;
                border: none;
                border-radius: 2px;
                padding: 2px 4px;
            }

            .page-num {
                color: white;
                padding-left: 10px;
            }

            button {
                margin: 0 10px;
                cursor: pointer;
            }

            .pdf-choose {
                margin-left: 100px;
                color: white;
            }
        }
    }
</style>
<style>
    .el-button i {
        font-weight: bold;
    }
</style>
