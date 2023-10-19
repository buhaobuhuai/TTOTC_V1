<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-03-23 16:38:24
 * @LastEditTime: 2023-03-26 10:08:07
 * @LastEditors: wen5013493 5013493@qq.com
 * @FilePath     : \lightAppd:\workHand\hope\ttswap\src\components\swiper\index.vue
-->
<template>
    <div class="index">
        <ol>
            <li>
                <div>代币经济</div>

                <div>

                    <p>
                        <span>
                            经济体系完善<br />定期回收治理代币

                        </span>
                        <span>
                            弥补早期用户 投资者的无常损失<br />交易用户的滑点提供补贴<br />社区推动者的奖励
                        </span>

                    </p>
                </div>
            </li>
            <li>
                <div>AMM</div>
                <div>
                    <p>
                        <span>
                            通过智能合约技术<br />实现自动做市商

                        </span>
                        <span>
                            流动性更强 市场更有活力<br />交易记录可查 公开透明公正<br />无中心账户与人为干预<br />降低交易成本与风险<br />避免攻击保障资金安全
                        </span>

                    </p>
                </div>
            </li>
            <li>
                <div>角色分佣</div>
                <div>
                    <p>
                        <span>
                            人人参与<br />人人皆有

                        </span>
                        <span>
                            更公平的模式<br />激励参与者推动交易完成<br />反映市场需求提高交易效率
                        </span>

                    </p>
                </div>
            </li>
            <li>
                <div>安全管理</div>
                <div>
                    <p>
                        <span>
                            多个维度<br />保障用户资金安全

                        </span>
                        <span>
                            参与交易币商质押等额保证金<br />全链追溯 多重审核<br />严控项目 币商资质
                        </span>

                    </p>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: '',
        mixins: [],
        components: {},
        props: {},
        data() {
            return {}
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        destroyed() {},
        methods: {},
    }
</script>
<style scoped lang="less">
    @font-face {
        font-family: 'Smiley Sans';
        src: url('../../assets/font/SmileySans-Oblique.ttf.woff2') format('woff2');
    }

    .index {
        text-align: center;
        font-family: 'Smiley Sans';
        padding: 80px 0;

        >ol {
            position: relative;

            li {
                display: inline-block;
                width: 250px;
                height: 350px;
                transition: all .3s;
                position: relative;
                // float: left;
                margin: 30px;
                cursor: pointer;

                div {
                    color: #0d5959;

                    &:nth-child(1) {
                        transition: all .3s;
                        margin: auto;
                        width: 70%;
                        // height: 40px;
                        border: 2px solid #e36a84;
                        background-color: #fff;
                        border-radius: 10px;
                        z-index: 1;
                        position: relative;
                        color: #0d5959;
                        font-weight: bold;
                        line-height: 40px;
                        font-size: 26px;

                    }

                    &:nth-child(2) {
                        width: 100%;
                        height: calc(100% - 30px);
                        background: #fff;
                        margin-top: -20px;
                        padding-top: 20px;
                        border: 2px solid #0FCDD5;
                        border-radius: 6px;
                        transition: all .1s;

                        span {
                            // font-size: 14px;
                            display: block;
                            line-height: 1.5;
                            margin: 32px 0;
                            transition: all .1s;
                            font-weight: bold;
                            position: absolute;
                            margin: auto;
                            left: 0;
                            right: 0;

                            &:nth-child(1) {
                                top: 20%;
                            }

                            &:nth-child(2) {
                                bottom: 20%;
                            }
                        }
                    }
                }

                &:hover {
                    // width: 200px;
                    // height: 333px;
                    transform: scale(1.2);

                    div {
                        &:nth-child(1) {
                            margin: auto;
                            height: 40px;
                            background: #e36a84;
                            border-radius: 10px;
                            z-index: 1;
                            position: relative;
                            color: #e5e5e5;
                            text-shadow: 0 0 #333, 1.5px 0 #088787;
                            transform: skewX(1deg);
                            box-shadow: 0 0px 1px #852338;
                        }

                        &:nth-child(2) {
                            // width: 100%;
                            // height: calc(100% - 30px);
                            border: 0px solid #fff;
                            // background: #0fccd5;
                            // color: #fff;
                            border-radius: 10px;
                            padding: 3px;
                            background-image: repeating-linear-gradient(140deg, #999, #999 1px, #fff 0, #fff 4px);

                        }

                        p {
                            width: 100%;
                            height: 100%;
                            background: #0fccd5;
                            color: #fff;
                            border-radius: 10px;
                            text-shadow: 0 1px #18bcbc;
                        }
                    }

                }
            }


        }
    }
</style>
