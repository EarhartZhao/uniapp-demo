import {
	LOGIN
} from '../../assets/api/index.js'
import storage from '../../assets/utils/stronge.js'
import router from '../../assets/utils/router.js'
import * as MAP from './map'


const user = {
	state: {
		role: storage.get(MAP.role),
		token: storage.get(MAP.token),
		userInfo: storage.get(MAP.userInfo),
		dicArr: storage.get(MAP.dicArr),
	},

	mutations: {
		['SET_' + MAP.role]: (state, role) => {
			state.role = role;
			!role ? storage.remove(MAP.role) : storage.set(MAP.role, role)
		},
		['SET_' + MAP.token]: (state, token) => {
			state.token = token;
			!token ? storage.remove(MAP.token) : storage.set(MAP.token, token)
		},
		['SET_' + MAP.userInfo]: (state, userInfo) => {
			state.userInfo = userInfo;
			!userInfo ? storage.remove(MAP.userInfo) : storage.set(MAP.userInfo,
				userInfo)
		},
		['SET_' + MAP.dicArr]: (state, dicArr) => {
			state.dicArr = dicArr;
			!dicArr ? storage.remove(MAP.dicArr) : storage.set(MAP.dicArr,
				dicArr)
		},
	},

	actions: {
		// 用户名登录
		async login({
			dispatch,
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				LOGIN.login(data).then(res => {
					commit('SET_' + MAP.token, res || '')
					dispatch('getUserInfo').then((re) => {
						resolve(re)
					})

				}).catch(err => {
					reject(err)
				})
			})


		},
		getUserInfo({
			commit,
			dispatch,
			state
		}) {
			return new Promise((resolve, reject) => {
				LOGIN.getUserInfo().then(res => { //获取用户信息
					// console.log('获取用户信息', res)
					dispatch('getDicArr')
					commit('SET_' + MAP.userInfo, res || {})
					resolve(res)
				}).catch(err => {
					reject(err)
				})

			})
		},
		getDicArr({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				LOGIN.getType().then(res => { //获取字典数组
					commit('SET_' + MAP.dicArr, res || [])
					resolve()
				}).catch(err => {
					reject(err)
				})

			})
		},

		LogOut({
			dispatch,
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				commit('SET_' + MAP.role, '')
				commit('SET_' + MAP.token, '')
				commit('SET_' + MAP.userInfo, {})
				// uni.setStorageSync('account',null);
				// uni.setStorageSync('password',null);
				uni.setStorageSync('isLogin',null);
				router.redirectTo({
					url: '/pages/layout/login'
				})
				resolve('退出成功')

			})

		},
	},

	getters: {
		getRole: state => state.role,
		getUserInfo: state => state.userInfo,
		getToken: state => state.token,
		getOrgId: state => state.userInfo.loginEmpInfo.orgId || '',
		getDic: state => state.dicArr || [],
		getDicArr: (state) => (code) => {
			if (state.dicArr && state.dicArr.length > 0) {
				return state.dicArr.filter(ele => ele.code === code)[0].children
			} else {
				return []
			}
		},
	}
}

export default user



/*
* 登录流程


* */
