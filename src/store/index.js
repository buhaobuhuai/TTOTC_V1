import Vue from 'vue'
import Vuex from 'vuex'
import {
    getTimeInterval
} from '../utils/index'
import {
    role,
    fetchSocial,
    fetchSiteInfo
} from '@/api'
import i18n from '@/i18n/';

Vue.use(Vuex)

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    user:'',
    loading: false,
    role:'',
    i18nLocale: i18n.locale,
    runTimeInterval: '',
    socials: '',
    yPrice: '',
    websiteInfo: ''
}
const mutations = {
    SET_USER: (state, v) => {
        state.user = v;
    },
    SET_ROLE: (state, v) => {
        state.role = v;
    },
    SET_I18: (state, v) => {
        state.i18nLocale = v;
    },
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) => {
        state.websiteInfo = v;
    },
    upPrice: (state, date) => {
        state.yPrice = date;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                    state.runTimeInterval = getTimeInterval(runAt);
                },
                1000
            );
        }
    }
}
const actions = {
    setUser: ({
        commit
    }, v) => {
        commit('SET_USER', v);
    },
    setI18nLocale: ({
        commit
    }, v) => {
        commit('SET_I18', v);
    },
    setLoading: ({
        commit
    }, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({
        commit
    }) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    priceAction: ({
        commit
    }, date) => {
        commit('upPrice', date)
    },
    getRole: ({
        commit,
        state
    }) => {
        return new Promise(resolve => {
            if (state.role) {
                resolve(state.role)
            } else {
               role({qbdz:sessionStorage.getItem('userKey')}).then(res => {
                    
                    let data = res.data
                        console.log("---"+data)
                    commit('SET_ROLE', data);
                    resolve(data);
                }).
                catch(err => {
                        console.log("---"+err)
                    resolve({});
                })
            }
        })
    },
    getSiteInfo: ({
        commit,
        state
    }) => {
        return new Promise(resolve => {
            if (state.websiteInfo) {
                resolve(state.websiteInfo)
            } else {
                fetchSiteInfo().then(res => {
                        console.log("---"+res)
                    let data = res.data || {}
                    commit('SET_SITE_INFO', data);
                    resolve(data);
                }).
                catch(err => {
                    resolve({});
                })
            }
        })
    },
    getSocials: ({
        commit,
        state
    }) => {
        return new Promise((resolve => {
            if (state.socials) {
                resolve(state.socials)
            } else {
                fetchSocial().then(res => {
                    let data = res.data || []
                    commit('SET_SOCIALS', data);
                    resolve(data);
                }).
                catch(err => {
                    resolve([]);
                })
            }
        }))
    }
}
const getters = {
    i18nLocale: state => state.i18nLocale,
    role: state => state.role,
    user: state => state.user,
    loading: state =>
        state.loading,
    runTimeInterval: state =>
        state.runTimeInterval,
    notice: state =>
        state.websiteInfo ? state.websiteInfo.notice : ''
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
