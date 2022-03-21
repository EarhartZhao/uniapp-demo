import storage from "./stronge.js"
import store from '../../store/index.js'
import router from './router.js'

class http {
	constructor() {

	}
	request(method, url, data) {
		const token = storage.get('TOKEN') || ''
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				method,
				data,
				header: {
					'Authorization': token ? 'Bearer ' + token : ''
				},
				success: (res) => {
					let r = this.interceptors(res,url,data,method)
					if(r === 'false'){
						reject(r)
					} else{
						console.info(r)
						resolve(r)
					}
					
				},
				fail: (err) => {
					console.log('network error', err)
					uni.showToast({
						title: err.errMsg,
						icon:"none"
					});
					reject(this.interceptors(err,url,data,method))
				}
			});
		})

	}
	post(url, data) {
		return this.request('post', url, data)
	}
	get(url, data) {
		return this.request('get', url, data);
	}
	interceptors(res,url,data,method) { // 数据拦截器
		let code = res.data.code
		if (!res.hasOwnProperty("data") && !!res.errMsg) {
			uni.showToast({
				title: res.errMsg,
				icon:"none"
			});
			return 'false'
		}
		
		if (!res.data.success) {
			console.info(code)
			if(code === 500){
				let message = JSON.parse(res.data.message);
				uni.showToast({
					title: message.message,
					icon:"none",
					duration: 3000
				});
			}else{
				uni.showToast({
					title: res.data.message,
					icon:"none",
					duration: 3000
				});
			}
			return 'false';
		}
		
		
		return res.data.data || '';
	}
}
export default new http()
