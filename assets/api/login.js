// import http from '../utils/http.js'
import http from '../utils/mockhttp.js'
import { IP, IPBase } from './ip.js'
const webUrl = ''
const LOGIN = {
	login(data) {  //account  password
		return http.post(`${webUrl}/login`, data)
	},
}


export default LOGIN
