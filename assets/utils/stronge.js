class storage {
	constructor() {

	}
	set(key, value) {
		uni.setStorageSync(key, value);
	}
	get(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return value
			}
		} catch (e) {
			console.error('storage.get error. 不存在当前key',key)
		}
	}
	remove(key) {
		try {
			uni.removeStorageSync(key);
		} catch (e) {
			console.error('storage.remove error. 不存在当前key',key)
		}
	}
}

export default new storage();
