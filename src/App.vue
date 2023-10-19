<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-02-19 13:38:22
 * @LastEditTime : 2023-04-01 20:32:20
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\App.vue
-->
<template>
    <div id="app" v-cloak>
        <!-- 避免闪屏 -->
        <template>
            <!-- <loading></loading> -->
            <layout-header></layout-header>
            <layout-body v-if="isReload"></layout-body>
            <layout-footer v-if="isName"></layout-footer>
        </template>
        <!-- 后台管理 -->
        <!-- <template v-if="isPath">
            <router-view></router-view>
        </template> -->
    </div>
</template>
<script>
import layoutHeader from '@/components/layout/layout-header'
import layoutBody from '@/components/layout/layout-body'
import layoutFooter from '@/components/layout/layout-footer'
import Loading from '@/components/loading'
import { log } from 'console'
export default {
    name: "app",
    provide(){
      return { reload: this.reload}  
    },
    components: {
        layoutHeader,
        layoutBody,
        layoutFooter,
        Loading
    },
    data() {
        return {isReload: true}
    },
    computed: {
        isPath () {
            return this.$route.path && this.$route.path.includes('htBackStage')
        },
        isName () {
            return this.$route.name && !this.isPath
        }
    },
    methods: {
        reload() {
            this.isReload = false
            this.$nextTick(() => {
                this.isReload = true
            })
        }
    }
}
</script>
<style lang="less">
#app {
    font-size: 17px;
    color: #6f6f6f;
}
</style>
