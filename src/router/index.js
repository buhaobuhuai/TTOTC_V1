import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/investment',
        name: 'investment',
        component: () => import('../views/developing.vue'),
        // component: () => import('../views/investment/investment.vue'),
        meta: { title: '投资' }
    },
    {
        path: '/investment/investment-details',
        name: 'investment-details',
        component: () => import('../views/investment/investment-details.vue'),
        meta: { title: '投资详情' }
    },
    {
        path: '/investment/fast-investment',
        name: 'fast-investment',
        component: () => import('../views/investment/fast-investment.vue'),
        meta: { title: '快捷投资' }
    },
    {
        path: '/otc',
        name: 'otc',
        component: () => import('../views/otc'),
        meta: { title: 'OTC' }
    },
    {
        path: '/transaction',
        name: 'transaction',
        component: () => import('../views/developing.vue'),
        // component: () => import('../views/transaction/transaction.vue'),
        meta: { title: '交易' }
    },
    {
        path: '/transaction/transaction-details',
        name: 'transaction-details',
        component: () => import('../views/transaction/transaction-details.vue'),
        meta: { title: '交易详情' }
    },
    {
        path: '/transaction/transfer-accounts',
        name: 'transfer-accounts',
        component: () => import('../views/transaction/transfer-accounts.vue'),
        meta: { title: '转账' }
    },
    {
        path: '/transaction/fast-trading',
        name: 'fast-trading',
        component: () => import('../views/transaction/fast-trading.vue'),
        meta: { title: '快捷交易' }
    },
    {
        path: '/whitePaper',
        name: 'whitePaper',
        component: () => import('../views/whitePaper.vue'),
        meta: { title: '白皮书' }
    },
    {
        path: '/developing',
        name: 'developing',
        component: () => import('../views/developing.vue'),
        meta: { title: '开发中' }
    },
    {
        path: '/Help',
        name: 'Help',
        component: () => import('../views/Help.vue'),
        meta: { title: '帮助' }
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('../views/personal.vue'),
        meta: { title: '个人中心' }
    },
    {
        path: '/my',
        name: 'my',
        component: () => import('../views/my.vue'),
        meta: { title: '我的' }
    },
    {
        path: '/bourse',
        name: 'bourse',
        component: () => import('@/components/bourse'),
        meta: { title: '订单详情' }
    },
    {
        path: '/CoinDealerApply',
        name: 'CoinDealerApply',
        component: () => import('../views/otc/CoinDealerApply'),
        meta: { title: '币商申请' }
    },
    {
        path: '/seting/myAccount',
        name: 'myAccount',
        component: () => import('../views/my-account'),
        meta: { title: '币商申请' }
    },
    {
        path: '/htBackStage',
        name: 'htBackStage',
        component: () => import('@/components/backStage'),
        children: [{
            path: '/htBackStage/home',
            name: 'htBackStageHome',
            component: () => import('@/views/back-stage/home'),
            meta: { title: 'home' },
        }, {
            path: '/htBackStage/shop',
            name: 'htBackStageShop',
            component: () => import('@/views/back-stage/shop'),
            meta: { title: '店铺管理' },
        }, {
            path: '/htBackStage/shop/popProduct',
            name: 'htBackStagePopProduct',
            component: () => import('@/views/back-stage/shop-popProduct'),
            meta: { title: '上架商品' },
        }, {
            path: '/htBackStage/orderForm',
            name: 'htBackStageOrderForm',
            component: () => import('@/views/back-stage/orderForm'),
            meta: { title: '订单管理' },
        }, {
            path: '/htBackStage/orderForm/detail',
            name: 'htBackStageDetail',
            component: () => import('@/views/back-stage/orderForm-detail'),
            meta: { title: '订单管理详情' },
        }, {
            path: '/htBackStage/basics/store',
            name: 'htBackStageStore',
            component: () => import('@/views/back-stage/basics-store'),
            meta: { title: '店铺信息' },
        }, {
            path: '/htBackStage/basics/legal',
            name: 'htBackStagelegal',
            component: () => import('@/views/back-stage/basics-legal'),
            meta: { title: '法币' },
        }, {
            path: '/htBackStage/basics/pledge',
            name: 'htBackStagepledge',
            component: () => import('@/views/back-stage/basics-pledge'),
            meta: { title: '保证金' },
        },{
                path: '/htBackStage/basics/pledge/record',
                name: 'htBackStagepledgere',
                component: () => import('@/views/back-stage/basics-record'),
                meta: { title: '保证金记录' },
            }, {
            path: '/htBackStage/basics/apply',
            name: 'htBackStageApply',
            component: () => import('@/views/back-stage/basics-apply'),
            meta: { title: '申请结果' },
        }]
    },

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    // base: '/',
    routes,
  scrollBehavior(to, from, savePosition) {
    // return 期望滚动到哪个的位置
    return {
      y: 0,
    };
  },
})
router.beforeEach((to, from, next) => {
    let title = ''
    if (to.meta.params) {
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    } else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }
    next();
})
router.afterEach((to, from) => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.dispatch('setLoading', false);
    }, 1500)
})
export default router
