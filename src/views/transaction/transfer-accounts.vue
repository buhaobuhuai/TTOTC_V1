<!-- 转账 -->
<template>
    <div class="site-content" style="margin-top: 60px;">

        <div class="tzjyqy" style="margin: 0 25px; background:#ffffff">

            <div class="cion-cont">
                <Transfer :key="new Date().getTime()"></Transfer>
            </div>
        </div>
    </div>
</template>

<script>
    import Transfer from '@/components/transfer'
    export default {
        name: "transfer-accounts",
        components: {
            Transfer
        },
        data() {
            return {
                money: 0,
                balance: 0,
                money1: 0,
                cionName: 'ETH',
                cionNum: '',
                cionName1: 'USDC',
                cionNum1: '',
            }
        },
        mounted() {
            // ethereum.on('networkChanged', function (networkIDstring) {
            // console.log(parseInt("b", 16))
            // console.log(ethereum.networkVersion,1)
            // })
            // ethereum.on('accountsChanged', function (accounts) {
            // console.log(accounts,0)
            // console.log(ethereum.selectedAddress,1)
            // })
        },
    }
</script>

<style>
    .cion-cont {
        padding: 40px;
    }
    .el-input {
        margin-right: 20px;
    }
</style>
