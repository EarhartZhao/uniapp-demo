// import http from '../utils/http.js'
import http from '../utils/mockhttp.js'
import { IP, IPBase } from './ip.js'
const webUrl = ''
const INDEXPAGE = {
	info(data) {
		return http.post(`${webUrl}/index/info`, data)
	},
	talentInfo(data) {
		return http.post(`${webUrl}/index/talentInfo`, data)
	},
	singUp(data) {
		return http.post(`${webUrl}/index/singUp`, data)
	},
}


export default INDEXPAGE
