<!-- 首页 -->
<template>
    <div class="home starts">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="layer4"></div>
        <!-- <div class="starts"></div> -->
        <!-- <banner isHome="true"></banner> -->
        <div class="banner banner-dialog">
            <!-- <img src="../assets/img/homebanner.png"/> -->
            <div class="banner-cot">
                <div class="banner-title">
                    <div>
                        <p style="padding-left: 20px;">欢迎来到</p>
                    </div>
                    <div class="banner-nr">
                        <div>更加</div>
                        <template>
                            <div class="carousel" :class="{anim:animate==true}">
                                <p class="carousel-item">{{animates.name}}</p>
                                <!-- <p class="carousel-item">安全的</p>
                                <p class="carousel-item">易用的</p> -->

                                <!-- <el-carousel direction="vertical" :interval="5000" :height="height + 'px'">
                                    <el-carousel-item key="1">
                                        <p class="carousel-item">便捷的</p>
                                    </el-carousel-item>
                                    <el-carousel-item key="2">
                                        <p class="carousel-item">安全的</p>
                                    </el-carousel-item>
                                    <el-carousel-item key="3">
                                        <p class="carousel-item">易用的</p>
                                    </el-carousel-item>
                                </el-carousel> -->
                            </div>
                            <!-- <span style="display: inline-block;"> -->
                            <!-- <el-carousel direction="vertical" :interval="5000" :height="height + 'px'">
                                <el-carousel-item v-for="dataList in dataList" :key="dataList.id">
                                    <img class="" :src="dataList.url">
                                </el-carousel-item>
                            </el-carousel> -->
                            <!-- </span> -->
                        </template>
                        <!-- <img src="../assets/img/bn1.png" /> -->
                    </div>
                    <div style="text-align: right;">
                        <p>去中心化交易所</p>
                    </div>
                </div>
                <div class="banner-but">
                    <!-- <router-link to="/transaction/fast-trading" class="">
                        <span>快捷交易</span>
                    </router-link>
                    <router-link to="/investment/fast-investment" class="">
                        <span>快捷投资</span>
                    </router-link> -->
                    <router-link to="/transaction/transfer-accounts" class="">
                        <span>转账</span>
                    </router-link>
                    <router-link v-if="sfotc==0" to="/CoinDealerApply" class="">
                        <span>{{$t("main.footer.h2.p3.name")}}</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="banner banner-dialog">
            <div class="banner-cot" style="max-width: 62.5rem;">
                <div class="" style="display: flex;">
                    <div style="margin-right: 6rem;">
                        <div style="margin-top: 40px;margin-right: 6rem;height: 175px;">
                            <p style="color: #99f6fa; font-size: 5rem;text-shadow: 0 0 12px #fff;">出入金功能上线</p>
                        </div>
                        <div class="banner-nr" style="font-size: 2.5rem;text-align: right;">
                            <p>币商都已支付保证金</p>
                            <p>确保交易安全</p>
                        </div>
                    </div>
                    <div class="earth"></div>
                </div>
                <div class="banner-but">
                    <router-link to="/otc" class="">
                        <span>快速使用</span>
                    </router-link>
                    <a class="" @click="yssp">
                        <span>演示视频</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="site-content animate banner-dialog">
            <!--通知栏-->
            <!-- <notice></notice> -->
            <!-- <CoinList></CoinList> -->
            <!--加载更多-->
            <!-- <div class="more" v-show="hasNextPage">
				<router-link to="/transaction" :underline="false">查看更多<i class="el-icon-view el-icon-right"></i>
				</router-link>

				<div class="flex-between more">
					<router-link to="/transaction/fast-trading" class="ksjyrk"><el-button>快捷交易</el-button></router-link>
					<router-link to="/investment/fast-investment" class="ksjyrk"><el-button>快捷投资</el-button></router-link>
				</div>
                                                             </div> -->
        </div>
        <swiper-log class="banner-dialog"></swiper-log>
        
        <!-- 视频查看-->
        <el-dialog :visible.sync="dialogVisible" width="500px">
            <VideoPlay style="width:100%" ref="videos" :urls="videoUrl" :showDialog="dialogVisible"></VideoPlay>
        </el-dialog>
    </div>
</template>

<script>
    import backgroundImage from '@/assets/img/homebanner.png'
    import Banner from '@/components/banner'
    import Notice from '@/components/notice'
    import swiperLog from '@/components/swiper'
    import CoinList from '@/components/coin-list'
    import VideoPlay from '@/components/video/VideoPlayer'

    export default {
        name: 'Home',
        // props: ['cate', 'words'],
        data() {
            return {
                dialogVisible: false,
                videoUrl: null,
                sfotc: this.$store.state.role,
                dataList: [],
                height: 174,
                dataImg: [{
                        id: 1,
                        name: 'bn1.png',
                        url: require('../assets/img/bn1.png')
                    },
                    {
                        id: 2,
                        name: 'bn2.png',
                        url: require('../assets/img/bn2.png')
                    },
                    {
                        id: 3,
                        name: 'bn3.png',
                        url: require('../assets/img/bn3.png')
                    }
                ],
                interval: null,
                animate: false,
                animates: {
                    name: '易用的'
                },
                scroll_lists: [{
                    name: '便捷的'
                }, {
                    name: '安全的'
                }, {
                    name: '易用的'
                }],
                postList: [],
                jspd: 0,
                currPage: 1,
                hasNextPage: true
            }
        },
        beforeDestroy() {
            if(this.interval){
                clearInterval(this.interval)
            }
        },
        components: {
            Banner,
            Notice,
            CoinList,
            swiperLog,VideoPlay
        },
        computed: {
            // pageWidth() {
            //     return window.innerWidth;
            // },
            // searchWords() {
            //     return this.$route.params.words
            // },
            // category() {
            //     return this.$route.params.cate
            // },
            // hideSlogan() {
            //     return this.category || this.searchWords
            // },
            // notice() {
            //     return this.$store.getters.notice
            // }
        },
        created() {

        },
        mounted() {
            this.bjtd()
            this.interval = setInterval(this.scroll, 6000)

            this.getDataList(this.dataImg)
            // this.fetchFocus();
            // this.fetchList();

            // window.addEventListener('resize', (a) => {
            //     let sk=window.innerWidth
            //     // if()
            // // this.bjtd()
            // console.log(a)

            // });
            
        },
        methods: {
            yssp() {
                    this.videoUrl = '/imgsave/voucher-save/'
                    this.dialogVisible = true
                    if (this.$refs.videos != undefined)
                        this.$refs.videos.handle_src(this.videoUrl);
            },
            bjtd() {
                // console.log(window.innerWidth,100)
                let sk = window.innerWidth
                let name = this.animates.name
                document.querySelector(".carousel-item").innerHTML = name.split('').map((c, i) =>
                        `<p class="animate__animated animate__fadeInUp ${(sk <1000) ? 'letter' : ''} animate__delay-${i}s">${c.trim() ? c : '$nbsp;'}</p>`
                    )
                    .join('')
            },
            scroll() {
                let s = this.scroll_lists.length
                this.animate = true
                if (this.jspd >= 3) {
                    this.jspd = 0
                }
                this.animates = this.scroll_lists[this.jspd]
                this.bjtd()
                this.jspd++
            },
            backgroundImages() {
                return {
                    background: 'url(' + backgroundImage + ') no-repeat '
                }
            },
            getDataList(data) {
                this.dataList = data
            },

            // loadMore() {
            //     fetchList({
            //         page: this.currPage + 1
            //     }).then(res => {
            //         this.postList = this.postList.concat(res.data.items || [])
            //         this.currPage = res.data.page
            //         this.hasNextPage = res.data.hasNextPage
            //     })
            // }
        },
    }
</script>
<style>
    /* 创建一个地球的div */
    /* CSS代码 */
    .earth {
        width: 350px;
        height: 350px;
        border-radius: 50%;
        background-image: url('@/assets/img/earth.png');
        background-size: cover;
        position: relative;
        /* -webkit-animation: movepoint 1s linear infinite;
        animation: movepoint 1s linear infinite;
        transition: all 0.3s ease-in-out; */
    }

    .earth:hover {
        transform: scale(1.2);
    }

    @keyframes movepoint {
        25% {
            top: 2px
        }

        50% {
            top: 2px
        }

        100% {
            top: 2px
        }

    }
@keyframes rotate {
from {
transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
to {
transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
}
}

    /* 创建一个自转的动画 */
    @keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    /* 兼容性代码 */
    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }


    #layout-footer {
        background-color: rgba(0, 0, 0, 0.5) !important;
        color: #fff !important;
    }

    #layout-footer .footer-main .footer-title {
        color: #fff !important;
    }

    /* .anim {
    	transition: all 1s;
    } */
    .banner-dialog {
        background-color: #333;
    }

    .carousel {}


    .carousel-item {}

    .carousel-item p {
        display: inline-block;
        font-size: 12rem;
        text-align: center;
        color: #99f6fa;
        line-height: 11.5rem;
        text-shadow: -1px 1px #fff, 1px 1px #828282, 2px 2px #828282, 3px 3px #828282, 4px 4px #828282;
    }

    .letter {
        font-size: 20vw !important;
        line-height: 1 !important;
    }

    @keyframes move {
        from {
            opacity: 0;
            transform: translateY(300%);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
<style scoped lang="scss">
    @font-face {
        font-family: 'Smiley Sans';
        src: url('../assets/font/SmileySans-Oblique.ttf.woff2') format('woff2');
    }



    //首先定义背景
    .starts {
        background-color: rgba(0, 0, 0, 0.8509803922);
        // height: 100vh;
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
            $size:#{$i}px;
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

    .banner {
        background-size: 100% 785px !important;
        padding: 150px 0;
        margin-bottom: 50px;
        font-family: 'Smiley Sans';

        .banner-cot {
            // padding: 50px;
            margin: 0px auto;
            max-width: 900px;
            color: #fff;
        }

        .banner-title {
            .banner-nr {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                font-size: 2.5rem;
            }

            &>div {
                padding: 5px 0;

                p {
                    font-size: 5rem;
                }

                span {
                    font-size: 2.5rem;
                    padding-right: 10px;
                }

            }
        }

        .banner-but {
            text-align: center;
            margin-top: 90px;

            span {
                font-size: 20px;
                color: #0D5959;
                margin: 0 30px;
                padding: 5px 40px;
                background-color: #fff;
                border-radius: 10px;
                border: #fff 2px solid;
            }

            span:hover,
            span:active {
                border: #0D5959 2px solid;
            }
        }
    }

    .ksjyrk {
        width: 30%;

        button {
            width: 100%;
        }
    }

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;

            &>div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;

        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more {
        margin-bottom: 50px;
        padding: 20px;
        background-color: #FFFFFF;
        text-align: center;
    }



    /******/
    @media (max-width: 1400px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    @media (max-width: 950px) {

        .banner {
            background-size: 100% 345px !important;
            padding: 60px 0;

            .banner-title {
                &>div {
                    padding: 5px 0;

                    p {
                        font-size: 30px;
                    }

                    &>div {
                        font-size: 18px;
                        padding-right: 10px;
                    }
                }
            }

            .banner-but {
                text-align: center;
                margin-top: 40px;

                span {
                    font-size: 15px;
                    color: #0D5959;
                    margin: 0 10px;
                    padding: 5px 20px;
                    background-color: #fff;
                    border-radius: 10px;
                }
            }
        }

        .ksjyrk {
            width: 45%;

            button {
                width: 100%;
            }
        }
    }

    /******/
</style>
<style>
    .el-carousel__arrow {
        display: none;
    }

    .el-carousel__indicators,
    .el-carousel__indicators--horizontal {
        display: none;
    }

    .el-carousel,
    .el-carousel--horizontal {
        width: 431px;
    }

    /* .el-carousel, .el-carousel--horizontal, img{
        width: 100%;
    } */
    @media (max-width: 800px) {

        .el-carousel,
        .el-carousel--horizontal {
            width: 180px;
            height: 75.2px;
        }

        .el-carousel__container {
            height: 100% !important;
        }

        .el-carousel__container,
        img {
            width: 100%;
        }
    }
</style>
