import store from '../../store/index.js'
class router {
	constructor() {

	}
	concatObj(obj) {
		let _this = this
		return Object.assign(obj, {
			complete: function (e) {
				// _this.setNavBackgroundColor()
			}
		})
	}
	navigateTo(obj) {
		uni.navigateTo(this.concatObj(obj))
	}
	redirectTo(obj) {
		uni.redirectTo(this.concatObj(obj))
	}
	reLaunch(obj) {
		uni.reLaunch(this.concatObj(obj))
	}
	switchTab(obj) {
		uni.switchTab(this.concatObj(obj))
	}
	navigateBack(obj) {
		uni.navigateBack(this.concatObj(obj))
	}
	setNavBackgroundColor() {
	}
}

export default new router();
