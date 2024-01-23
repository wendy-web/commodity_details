import {
	bill2023Api,
} from '@/api/billApi.js';
const state = {
	billInfo: {
		shopReport:null
	}, //用户信息
	posterSetting:{
		ljshouyi_eye: "",
		ljexc_eye: "",
		ljcoupon_eye: "",
		ljfanhuo_eye: "",
		cgorder_eye: "",
		cggood_eye: "",
		ljpay_eye: "",
		eye_ljshouyi: true, // 累计收益的显示隐藏
		eye_ljexc: true, // 累计兑奖的显示隐藏
		eye_ljcoupon: true, // 累计卡券的显示隐藏
		eye_ljfanhuo: true, // 累计返货的显示隐藏
		eye_cgorder: true, // 采购订单的显示隐藏
		eye_cggood: true, // 采购商品的显示隐藏
		eye_ljpay: true, // 累计支付的显示隐藏
	},// 海报显示隐藏的配置
};

const mutations = {
	setBillInfo(state, billInfo) { //账单信息
		state.billInfo = billInfo;
	},
	setPosterSetting(state, posterSetting) { //海报显示隐藏信息
		console.log('海报显示隐藏信息:',posterSetting)
		state.posterSetting = posterSetting;
	},
	
};

const actions = {
	
	//获取账单信息
	getBillInfo({
		commit
	}) {
		bill2023Api().then(res => {
			if (res.code == 1) {
				commit('setBillInfo', res.data);
			}
		}).catch(err=>{
			console.log('getBillInfo catch',err)
		});
	},
	
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};