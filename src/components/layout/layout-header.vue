<!-- 页面头菜单组件 -->
<template>
    <div id="layout-header" :class="{ 'fixed': fixed, 'hidden': hidden }" @click.stop="mobileShow = false">
        <div class="site-logo">
            <router-link to="/">
                <img :src="imgLogo" alt="">
                <!-- <p class="site-name">Swap</p> -->
            </router-link>
        </div>
        <div class="menus-btn" @click.stop="mobileShow = !mobileShow">
            <i class="el-icon-view el-icon-more"></i>
        </div>
        <div class="site-menus" :class="{ 'mobileShow': mobileShow }" @click.stop="mobileShow = !mobileShow">
            <div class="menu-items" v-if="category.length">
                <div class="menu-item menu-state" v-for="(item, index) in category" :key="index"
                    :class="{ 'menu-active': nowIndex === item.id }" @click="menuClick(item.id)">
                    <router-link :to="item.href">{{ item.title }}</router-link>
                </div>
            </div>
            <div class="menu-items">
                <template v-if="userKey != null">
                    <el-badge v-if="chainid == 1" is-dot class="item" type="success"><span
                            style="color: #fff;">Ethereum</span></el-badge>
                    <el-tooltip v-else content="MetaMask当前网络不是主网,请切换钱包网络" placement="bottom" effect="light">
                        <el-badge is-dot class="item" type="danger">Ethereum</el-badge>
                    </el-tooltip>
                </template>
                <!-- <div class="menu-item">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, ix) in this.$t('language')" :key="ix" :command="item.id">{{
                                item.name }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div> -->
                <el-button
                  title="刷新"
                  circle
                  plain icon="el-icon-refresh"
                  @click="reloads()"
                >
                </el-button>
                <div v-if="userKey == null" class="menu-item login-button pointer" @click="dkqb">{{ $t("main").dl }}
                </div>
                <div v-else>
                    <el-dropdown class="menu-item login-img">
                        <router-link to="/personal">
                            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="">
                        </router-link>
                        <el-dropdown-menu slot="dropdown">
                            <el-button style="border: 0;width: 100%;border-radius: 0;" @click="dkzh">{{ $t("main").zh }}
                            </el-button>
                            <router-link to="/personal">
                                <el-dropdown-item>{{ $t("main").per }}</el-dropdown-item>
                            </router-link>
                            <router-link to="/htBackStage/home" v-if="jspd == 1">
                                <el-dropdown-item>我的店铺</el-dropdown-item>
                            </router-link>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <div class="menu-item login-img" @click="clickPer">
						<router-link to="/personal">
							<img src="@/assets/site-logo.svg" alt="">
						</router-link>
                					</div> -->
                </div>
            </div>
        </div>

        <!-- 链接钱包组件 -->
        <Wallet ref="kg"></Wallet>
    </div>
</template>

<script>
    import HeaderSearch from '@/components/header-search'
    import Wallet from '@/components/wallet/wallet'
    import mask from '@/constants/wallet/wallets'
    import {
        fetchCategory,webLogo
    } from '@/api'
    export default {
        name: "layout-header",
        props: ['id'],
        inject: ['reload'],
        components: {
            HeaderSearch,
            Wallet
        },
        data() {
            return {
                chainid: '',
                imgLogo: require('@/assets/logo.png'),
                nowIndex: 0,
                lastScrollTop: 0,
                fixed: false,
                hidden: false,
                category: [],
                mobileShow: false,
                userKey: null,
                language: '',
                jspd: this.$store.state.role
            }
        },
        computed: {
            categorys() {
                return this.$route.params.investment
            }
        },
        created() {
            this.getRole();
            this.userKey = sessionStorage.getItem('userKey')
            this.languageSwitching(this.$i18n.locale);
            this.webImg();
        },
        mounted() {
            window.addEventListener('scroll', this.watchScroll)
            this.fetchCategory()
            this.networkVersion()
            mask.addressListen()
            let than = this;
            ethereum.on('networkChanged', function(networkIDstring) {
                than.chainid = networkIDstring
                if (networkIDstring != 1) {
                    // alert("MetaMask当前网络不是主网,请切换钱包网络")
                    than.$message({
                        // duration: 0,
                        showClose: true,
                        message: 'MetaMask当前网络不是主网,请切换钱包网络!',
                        type: 'warning'
                    });
                }
            })
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.watchScroll)
        },
        watch: {
            //监听路由变化
            $route() {
                let geturl = window.location.href
                let getqyinfo = geturl.split('#/')[1]
                if (getqyinfo === '') {
                    getqyinfo = 'home'
                }
                this.menuClick(getqyinfo)
                console.log(getqyinfo, 11)
            }
        },
        methods: {
            reloads(){
                this.reload();
            },
            webImg(){
                webLogo({ fl: 3 }).then(res=>{
                    if (res.code == "0") {
                      if (res.data.list != null) this.imgLogo = "/imgsave/icon-save/" + res.data.list[0].mc;
                    }
                });
            },
            
            async networkVersion() {
                this.chainid = await mask.networkJudge();
            },

            getRole() {
                this.$store.dispatch('getRole').then(data => {
                    console.log(data)
                    this.jspd = data
                })
            },
            sxsjjm() {
                this.userKey = sessionStorage.getItem('userKey')
            },
            dkzh() {
                this.$refs.kg.dkzh();
            },
            dkqb() {
                this.$refs.kg.open();
            },
            watchScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop === 0) {
                    this.fixed = false;
                } else if (scrollTop >= this.lastScrollTop) {
                    this.fixed = false;
                    this.hidden = true;
                } else {
                    this.fixed = true
                    this.hidden = false
                }
                this.lastScrollTop = scrollTop
            },
            fetchCategory() {
                fetchCategory().then(res => {
                    this.category = [{
                            id: "home",
                            title: this.$t('main.menu').home,
                            href: '/'
                        },

                        {
                            id: "investment",
                            title: this.$t('main.menu').investment,
                            href: '/investment',
                            // href: '/investment/investment-details',
                        },

                        {
                            id: "transaction",
                            title: this.$t('main.menu').transaction,
                            href: '/transaction'
                            // href: '/transaction/transaction-details'
                        },
                        {
                            id: "otc",
                            title: this.$t('main.menu').otc,
                            href: '/otc'
                        },
                        {
                            id: "whitePaper",
                            title: this.$t('main.menu').whitePaper,
                            href: '/whitePaper'
                        },
                        {
                            id: "help",
                            title: this.$t('main.menu').help,
                            href: '/help'

                        }
                    ] //res.data
                }).catch(err => {
                    console.log(err)
                })
            },
            menuClick(key) {
                this.nowIndex = key
            },
            handleCommand(command) {
                this.languageSwitching(command);
                this.fetchCategory()
                this.$store.dispatch('setI18nLocale', command)
            },
            languageSwitching(locale) {
                this.$i18n.locale = locale;
                let language = this.$t('language');
                for (let i of language) {
                    // console.log(i,locale)
                    if (i.id === locale) {
                        this.language = i.name
                    }
                }
            },
            clickPer() {
                nowIndex: 0
            }
        }
    }
</script>

<style scoped lang="less">
    .item {
        // margin-top: 10px;
        margin-right: 20px;
    }

    #layout-header {
        // position: fixed;
        top: 0;
        z-index: 9;
        width: 100%;
        height: 60px;
        padding: 0 60px;
        background: #0FCDD5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .3s all ease;
        -webkit-transition: .3s all ease;
        -moz-transition: .3s all linear;
        -o-transition: .3s all ease;
        -ms-transition: .3s all ease;

        &.hidden {
            top: -100px;
        }

        &.fixed {
            background-color: #0FCDD5;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }

    .el-dropdown-link {
        color: #000 !important;
    }

    .site-logo {
        text-align: center;

        img {
            width: 60px;
            height: 60px;
        }

        p.site-name {
            font-size: 15px;
            font-weight: bold;
            position: relative;
            top: -10px;
        }
    }

    .menus-btn {
        display: none;
        visibility: hidden;
    }

    .site-menus {
        display: flex;
        align-items: center;
        width: 90%;
        justify-content: space-between;

        .menu-items {
            display: flex;
            align-items: center;

            .menu-state {
                &:hover {
                    border-bottom: 2px solid #FFFFFF;
                }
            }

            .menu-item {
                min-width: 60px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                position: relative;

                a {
                    padding: 12px 10px;
                    color: #545454;
                    font-weight: normal;
                    font-size: 20px;

                    &:hover {
                        // color: #ff6d6d;
                    }
                }

                &:not(:last-child) {
                    margin-right: 15px;
                }

                &.hasChild:hover .childMenu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(-5px);
                }
            }

            .login-button {
                background: #ffffff;
                padding: 5px 15px;
                height: auto;
                line-height: normal;
                font-size: 15px;
                border-radius: 5px;
            }

            .login-img {
                a {
                    img {
                        border-radius: 50%;
                        height: 100%;
                        background: #ffffff;
                    }
                }
            }
        }

        .menu-active {
            border-bottom: 2px solid #FFFFFF;
        }

        .childMenu {
            width: 130px;
            background-color: #FDFDFD;
            border-radius: 3px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 55px;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: .7s all ease;
            -webkit-transition: .6s all ease;
            -moz-transition: .6s all linear;
            -o-transition: .6s all ease;
            -ms-transition: .6s all ease;

            &:before,
            &:after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid white;
                top: -8px;
                left: 20px;
            }

            &:before {
                top: -9px;
                border-bottom: 8px solid #ddd;
            }

            .sub-menu {
                height: 40px;
                line-height: 40px;
                position: relative;

                &:not(:last-child):after {
                    /*position: absolute;*/
                    content: '';
                    width: 50%;
                    height: 1px;
                    color: #ff6d6d;
                    bottom: 0;
                    left: 25%;
                    z-index: 99;
                }
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    @media (max-width: 960px) {
        #layout-header {
            padding: 0 20px;
        }
    }

    @media (max-width: 900px) {
        #layout-header {
            padding: 0 10px;
        }

        .menus-btn {
            display: block;
            visibility: visible;
            width: 100%;
            text-align: end;
        }

        .site-menus {
            position: absolute;
            display: none;
            visibility: hidden;
            background-color: #F9F9F9;
            width: 100%;
            left: 0;
            top: 60px;
            z-index: -9;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            .menu-items {
                display: block;
                float: inherit !important;

                .menu-item {
                    position: relative;
                    height: unset;

                    &:not(:last-child) {
                        margin-right: 0;
                    }

                    a {
                        display: block;
                    }
                }

                .login-button {
                    padding: 12px 10px;
                }

                .login-img {
                    padding-top: 10px;
                    width: 100%;

                    a {
                        img {
                            border-radius: 50%;
                            height: 40px;
                            width: auto;
                            background: #ffffff;
                        }
                    }
                }
            }

            .childMenu {
                position: relative;
                width: 100%;
                top: 0;
                background-color: #F3F3F3;
                opacity: 1;
                visibility: visible;
                border: none;
                box-shadow: none;

                &:before,
                &:after {
                    content: '';
                    position: relative;
                    width: 0;
                    height: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 0;
                }
            }
        }

        .site-menus.mobileShow {
            display: inline-block;
            visibility: visible;
            z-index: 99;
        }
    }
</style>
