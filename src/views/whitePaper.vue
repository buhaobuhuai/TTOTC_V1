<!--  -->
<template>
    <div class="scrollBox">
        <!-- <preview-pdf :pdfUrl="pdfSrc" ref="previewPdfh5"></preview-pdf> -->
        <pdf :pdfUrl='pdfSrc' v-if='pdfSrc'></pdf>
        <!-- <canvas v-for="page in pages" :id="'canvas' + page" :key="page"></canvas> -->
        <!-- <iframe :src="pdfSrc"></iframe> -->
    </div>
</template>
 
<script>
    // import pdf from 'vue-pdf'
    import pdf from "@/components/pdf/v-pdf"
    // import PreviewPdf from "@/components/PreviewpdfH5"
    // PDF.disableWorker = true
    export default {
        components: {
            pdf,
            // PreviewPdf,
        },
        data() {
            return {
                pdfSrc: "./bps-zh.pdf",
                // pdfDoc: null,
                // pages: 0,
            }
        },
        // computed: {
        //     listenList() {
        //         return this.$store.state.i18nLocale //拷贝vuex里的数组
        //     }
        // },
        watch: {
            "$store.state.i18nLocale": {
                deep: true,
                handler: function(newVal, oldVal) {
                    // console.log(newVal,oldVal);
                    if (newVal != oldVal) {
                        this.pdfSrc = "./bps-" + newVal + ".pdf"
                    }
                }
            }
        },
        mounted() {
            console.log(this.$store.state.i18nLocale)
            // this.$refs.previewPdfh5.openPdf(this.pdfSrc)
        },
        methods: {
            
        },
    }
</script>

<style lang="less" scoped>
    .scrollBox {
        margin: 20px auto;
        max-width: 85%;

    }

    @media (max-width: 800px) {
        .scrollBox {
            max-width: 100%;
        }
    }
</style>
