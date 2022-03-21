import store from '../../store/index'
import { stepArr } from './baseData.js'
export default {
	dealStep(arr){
		let textArr = []
		arr.forEach(e => {
			stepArr.forEach(ele => {
				if (ele.val == e.chuliNodeType) {
					textArr.push({
						title: ele.key,
						desc: e.createTime
					})
				}
			})
		})
		
		return textArr
	},

	byKeyFindVal(key, sameKey, valueKey, arr) {
		console.log('byKeyFindVal', key, sameKey, valueKey, arr)
		if(arr.length === 0) return ''
		try {
			return arr.filter(ele => ele[key] == sameKey)[0][valueKey]
		} catch (e) {
			console.log('byKeyFindVal error', e)
			return ''
		}
	},
	findVal(key, arrKey){ // arrKey: dic一维数组的code, key: 找到一维数组后中的children的某个对象key
		let arr = store.getters.getDicArr(arrKey) || [];
		return this.byKeyFindVal("code", key, "name", arr)
	},
	findObj(sameKey, arrKey) {
		let arr = store.getters.getDicArr(arrKey) || [];
		if(arr.length === 0) return {}
		try {
			console.log('arr.filter(ele => ele.code == sameKey)[0]', arr.filter(ele => ele.code == sameKey)[0])
			return arr.filter(ele => ele.code == sameKey)[0]
		} catch (e) {
			console.log('byKeyFindVal error', e)
			return {}
		}
	},
	setBtnStyles() {
		let role = store.getters.getRole;
		let style = {}
		switch (role) {
			case "c_emp":
				style.background = "#4199FF !important";
				break;
			case "b_user":
				style.background = "#FFD741 !important";
				break;
			case "s_user":
				style.background = "#FE483A !important";
				break;
			default:
				style.background = "#4199FF !important";
				break;
		}
		return style;
	}
}