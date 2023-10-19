import request from '@/utils/request'

// const url = "http://localhost:12000";
// const url = "http://121.5.135.52/swapInterface";
// const url="api/swapInterface";
const url=window.VITE_BASE_URL;



/* 预留邮箱 */
export function addEmail(params) {
    return request({
        url: url + '/user/useremail/save',
        method: 'post',
        data: params
    })
}

/* 网站图标 */
export function webLogo(params) {
    return request({
        url: url + '/otc/iconinfo/list',
        method: 'get',
        params: params
    })
}
/* 用户角色判断 */
export function role(params) {
    return request({
        url: url + '/otc/merchant/role',
        method: 'get',
        params: params
    })
}
/* 币商申请 */
export function apply(params) {
    return request({
        url: url + '/otc/coindealerapply/save',
        method: 'post',
        data: params
    })
}
/* 币商申请信息 */
export function info(params) {
    return request({
        url: url + '/otc/coindealerapply/infos',
        method: 'get',
        params: params
    })
}
/* 币商品信息列表 */
export function commodityList(params) {
    return request({
        url: url + '/otc/commodity/merchant/list',
        method: 'get',
        params: params
    })
}
/* 币商新建商品 */
export function commodityCre(params) {
    return request({
        url: url + '/otc/commodity/merchant/save',
        method: 'post',
        data: params
    })
}
/* 币商上架 */
export function commodityGrounding(params) {
    return request({
        url: url + '/otc/commodity/merchant/grounding',
        method: 'post',
        data: params
    })
}
/* 币商下架 */
export function commodityWithdraw(params) {
    return request({
        url: url + '/otc/commodity/merchant/withdraw',
        method: 'post',
        data: params
    })
}
/* 币商删除*/
export function commodityDel(params) {
    return request({
        url: url + '/otc/commodity/merchant/delete',
        method: 'post',
        data: params
    })
}
/* 币商删除*/
export function commoditySav(params) {
    return request({
        url: url + '/otc/commodity/merchant/save',
        method: 'post',
        data: params
    })
}
/* 币商支付方式筛选*/
export function paySel(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/paySel',
        method: 'get',
        params: params
    })
}
/* otc-币商支付方式筛选*/
export function paySelUser(params) {
    return request({
        url: url + '/base/paymentaccount/user/paySel',
        method: 'get',
        params: params
    })
}

/* 店铺信息 */
export function storeInfo(params) {
    return request({
        url: url + '/otc/merchant/info',
        method: 'get',
        params: params
    })
}
/* 店铺信息 修改*/
export function storeUp(params) {
    return request({
        url: url + '/otc/merchant/update',
        method: 'post',
        data: params
    })
}
/* 法币列表 */
export function legalcurrencyList(params) {
    return request({
        url: url + '/otc/legalcurrency/merchant/list',
        method: 'get',
        params: params
    })
}

/* 法币新增*/
export function legalcurrencyAdd(params) {
    return request({
        url: url + '/otc/legalcurrency/merchant/save',
        method: 'post',
        data: params
    })
}
/* 法币删除*/
export function legalcurrencyDel(params) {
    return request({
        url: url + '/otc/legalcurrency/merchant/delete',
        method: 'get',
        params: params
    })
}
/* 法币冻结解冻*/
export function legalcurrencyUp(params) {
    return request({
        url: url + '/otc/legalcurrency/merchant/update',
        method: 'post',
        data: params
    })
}

/* 新增法币选择列表*/
export function legalCurrencySelect(params) {
    return request({
        url: url + '/base/legalcurrency/listSel',
        method: 'get',
        params: params
    })
}

/* 币商新增账户法币选择列表*/
export function legalCurrencyBsLists(params) {
    return request({
        url: url + '/base/legalcurrency/bs/lists',
        method: 'get',
        params: params
    })
}

/* 新增法币账户选择列表*/
export function accounSelect(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/listSel',
        method: 'get',
        params: params
    })
}
/* 新增法币账户选择列表*/
export function accounSelectes(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/one/listSel',
        method: 'get',
        params: params
    })
}

/* 用户选择-币商账户选择列表*/
export function accounSelectUser(params) {
    return request({
        url: url + '/base/paymentaccount/my/listSel',
        method: 'get',
        params: params
    })
}
/* 用户选择-币商账户选择列表*/
export function accounSelectUsers(params) {
    return request({
        url: url + '/base/paymentaccount/user/one/listSel',
        method: 'get',
        params: params
    })
}
/* 新增法币账户选择列表*/
export function accounSelects(params) {
    return request({
        url: url + '/base/paymentaccount/user/listSel',
        method: 'get',
        params: params
    })
}

/* 用户收款账户列表 */
export function paymentaccountListUser(params) {
    return request({
        url: url + '/base/paymentaccount/user/list',
        method: 'get',
        params: params
    })
}

/* 用户收款账户新增*/
export function paymentaccountAddUser(params) {
    return request({
        url: url + '/base/paymentaccount/user/save',
        method: 'post',
        data: params
    })
}
/* 用户收款账户删除*/
export function paymentaccountDelUser(params) {
    return request({
        url: url + '/base/paymentaccount/user/delete',
        method: 'post',
        data: params
    })
}
/* 收款账户列表 */
export function paymentaccountList(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/list',
        method: 'get',
        params: params
    })
}

/* 收款账户新增*/
export function paymentaccountAdd(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/save',
        method: 'post',
        data: params
    })
}
/* 收款账户冻结解东*/
export function paymentaccountUp(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/status',
        method: 'post',
        data: params
    })
}
/* 收款账户删除*/
export function paymentaccountDel(params) {
    return request({
        url: url + '/base/paymentaccount/merchant/delete',
        method: 'post',
        data: params
    })
}
/* 支付方式筛选列 */
export function paymentmethodList(params) {
    return request({
        url: url + '/base/paymentmethod/merchant/selectList',
        method: 'get',
        params: params
    })
}

/* 支付方式筛选列 */
export function paymentmethodSel(params) {
    return request({
        url: url + '/base/paymentmethod/user/selectList',
        method: 'get',
        params: params
    })
}
/* 保证金列表 */
export function depositList(params) {
    return request({
        url: url + '/otc/deposit/merchant/list',
        method: 'get',
        params: params
    })
}
/* 保证金历史记录列表 */
export function depositRecord(params) {
    return request({
        url: url + '/otc/deposit/merchant/record',
        method: 'get',
        params: params
    })
}

/* 保证金删除*/
export function depositDel(params) {
    return request({
        url: url + '/otc/deposit/merchant/delete',
        method: 'post',
        data: params
    })
}
/* 保证金冻结解冻*/
export function depositUp(params) {
    return request({
        url: url + '/otc/deposit/merchant/update',
        method: 'post',
        data: params
    })
}
/* 保证金续费*/
export function depositRenew(params) {
    return request({
        url: url + '/otc/deposit/merchant/renew',
        method: 'post',
        data: params
    })
}
/* 保证金冻退费*/
export function depositRefund(params) {
    return request({
        url: url + '/otc/deposit/merchant/refund',
        method: 'post',
        data: params
    })
}

/* 申请结果列表 */
export function applyList(params) {
    return request({
        url: url + '/otc/coindealerapply/merchant/list',
        method: 'get',
        params: params
    })
}

/* 币商法币筛选 */
export function legalcurrencySel(params) {
    return request({
        url: url + '/otc/legalcurrency/merchant/listSel',
        method: 'get',
        params: params
    })
}
/* 币商虚拟币筛选 */
export function cionSel(params) {
    return request({
        url: url + '/otc/coinorder/merchant/listSel',
        method: 'get',
        params: params
    })
}

/* 币商订单列表 */
export function orderList(params) {
    return request({
        url: url + '/otc/order/merchant/list',
        method: 'get',
        params: params
    })
}

/* 订单详情 */
export function orderInfo(params) {
    return request({
        url: url + '/otc/order/merchant/info',
        method: 'get',
        params: params
    })
}

/* 币商确认收款 */
export function collectionMer(params) {
    return request({
        url: url + '/otc/order/merchant/collection',
        method: 'post',
        data: params
    })
}
/* 币商确认收币完成付款 */
export function collectCurrencyMer(params) {
    return request({
        url: url + '/otc/order/merchant/collectCurrency',
        method: 'post',
        data: params
    })
}
/* 币商确认未收币 */
export function uncolulectedCionMer(params) {
    return request({
        url: url + '/otc/order/merchant/uncolulectedCion',
        method: 'post',
        data: params
    })
}
/* 币商确认未收款 */
export function uncolulectedMer(params) {
    return request({
        url: url + '/otc/order/merchant/uncolulected',
        method: 'post',
        data: params
    })
}
/* 币商上传图片凭证 */
export function upImgMer(params) {
    return request({
        url: url + '/otc/order/merchant/upImg',
        method: 'post',
        data: params
    })
}
/* 币商上传视频凭证 */
export function upVideoMer(params) {
    return request({
        url: url + '/otc/order/merchant/upVideo',
        method: 'post',
        data: params
    })
}


/* 用户订单列表 */
export function userOrderList(params) {
    return request({
        url: url + '/otc/order/user/list',
        method: 'get',
        params: params
    })
}
/* 用户下单 */
export function orderSave(params) {
    return request({
        url: url + '/otc/order/user/save',
        method: 'post',
        data: params
    })
}
/* 用户完成付款 */
export function paymentUser(params) {
    return request({
        url: url + '/otc/order/user/payment',
        method: 'post',
        data: params
    })
}
/* 用户确认收币 */
export function collectCurrencyUser(params) {
    return request({
        url: url + '/otc/order/user/collectCurrency',
        method: 'post',
        data: params
    })
}
/* 用户确认收款 */
export function collectionUser(params) {
    return request({
        url: url + '/otc/order/user/collection',
        method: 'post',
        data: params
    })
}
/* 用户完成付币 */
export function payUser(params) {
    return request({
        url: url + '/otc/order/user/pay',
        method: 'post',
        data: params
    })
}

/* 用户取消订单 */
export function cancelUser(params) {
    return request({
        url: url + '/otc/order/user/cancel',
        method: 'post',
        data: params
    })
}
/* 用户上传图片凭证 */
export function upImgUser(params) {
    return request({
        url: url + '/otc/order/user/upImg',
        method: 'post',
        data: params
    })
}
/* 用户上传视频凭证 */
export function upVideoUser(params) {
    return request({
        url: url + '/otc/order/user/upVideo',
        method: 'post',
        data: params
    })
}
/* otc列表 */
export function otcList(params) {
    return request({
        url: url + '/otc/commodity/list',
        method: 'get',
        params: params
    })
}
/* 法币选择列表*/
export function legalCurrencySel(params) {
    return request({
        url: url + '/base/legalcurrency/list',
        method: 'get',
        params: params
    })
}

/* otc凭证列表 */
export function voucherList(params) {
    return request({
        url: url + '/otc/voucher/user/list',
        method: 'get',
        params: params
    })
}


export function fetchFocus() {
    return request({
        url: '/focus/list',
        method: 'get',
        params: {}
    })
}

export function fetchCategory() {
    return request({
        url: '/category',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/social',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}

//请求mock的数据
export function getMinute_k() {
    return request({
        url: "/kline/minute_k",
        method: "post",
        params: {}
    })
    // return new Promise((resolve,reject)=>{
    //     instance({
    //         url: "/kline/minute_k",
    //         method: "post"
    //     }).then(response=>{
    //         resolve(response.data)
    //     }).catch(err=>{
    //         reject(err)
    //     })
    // })
}

//默认数据
export function getMarket() {
    return request({
        url: "/kline/market",
        method: "post",
        params: {}
    })
    // return new Promise((resolve,reject)=>{
    //     instance({
    //         url: "/kline/market",
    //         method: "post"
    //     }).then(response=>{
    //         resolve(response.data)
    //     }).catch(err=>{
    //         reject(err)
    //     })
    // })
}

//日k
export function getDay_k() {
    return request({
        url: "/kline/day_k",
        method: "get",
        params: {}
    })
    // return new Promise((resolve,reject)=>{
    //     instance({
    //         url: "/kline/day_k",
    //         method: "get"
    //     }).then(response=>{
    //         resolve(response.data)
    //     }).catch(err=>{
    //         reject(err)
    //     })
    // })
}

//周k
export function getWeek_k() {
    return request({
        url: "/kline/week_k",
        method: "get",
        params: {}
    })
    // return new Promise((resolve,reject)=>{
    //     instance({
    //         url: "/kline/week_k",
    //         method: "get"
    //     }).then(response=>{
    //         resolve(response.data)
    //     }).catch(err=>{
    //         reject(err)
    //     })
    // })
}

//月k
export function getMonth_k() {
    return request({
        url: "/kline/month_k",
        method: "get",
        params: {}
    })
    // return new Promise((resolve,reject)=>{
    //     instance({
    //         url: "/kline/month_k",
    //         method: "get"
    //     }).then(response=>{
    //         resolve(response.data)
    //     }).catch(err=>{
    //         reject(err)
    //     })
    // })
}
