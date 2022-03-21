import mockJson from './mockJson'
class http {
	constructor() {

	}
	request(method, url, data) {
		return new Promise((resolve, reject) => {
			const res = this.interceptors(url)
			if(!res) return reject()
			resolve(res)
		})
	}
	post(url, data) {
		return this.request('post', url, data)
	}
	get(url, data) {
		return this.request('get', url, data);
	}
	interceptors(url) { // 数据拦截器
		if(!mockJson.hasOwnProperty(url)){
			uni.showToast({
				title: '接口错误',
				icon:"none",
				duration: 1000
			});
			return false;
		}
		return mockJson[url];
	}
}
export default new http()
