<!--
 * @Author       : wenquan
 * @desc         : 组件描述
 * @Date         : 2023-04-01 09:27:02
 * @LastEditTime : 2023-04-02 10:26:43
 * @LastEditors  : wenquan
 * @FilePath     : \MultiplePaged:\workHand\hope\ttswap\src\components\backStage\index.vue
-->
<template>
    <div class='index'>
        <side-bar>
            <router-view #default></router-view>
        </side-bar>
    </div>
</template>

<script>
import sideBar from "./components/sideBar";
export default {
    name: '',
    mixins: [],
    components: {
        sideBar,

    },
    props: {

    },
    data () {
        return {

        }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {

    },
    destroyed () {

    },
    methods: {

    }
}
</script>
<style scoped lang='less'>
.index {
    max-width: 1200px;
    margin: auto;
}
</style>
