import store from '../../store/index'
const callbackFun = () => { };
export default {
  login: (callback) => {
    uni.login({
      provider: 'weixin',
      success: function (loginRes) {
        callback(loginRes)
      }
    });
  },
  getUerInfo: (callback) => {
    uni.getUserInfo({
      provider: 'weixin',
      success: (res) => {
        console.log('getUserInfo', res);
        store.commit('SET_USERINFO', res.userInfo)
        callback(res)
      },
      fail: () => {
        uni.showToast({
          title: '获取失败',
          icon: 'error',
          mask: true,
        });
      },
      complete: () => {
        // 隐藏loading
        uni.hideLoading();
      },
    });
  },
  intoPage() {
    return new Promise((reslove, reject) => {
      uni.showLoading({
        title: '加载中',
      });
      this.getUerInfo((res) => {
        this.login(e => {
          // console.log('登录获取code', e.code);
          if (e.errMsg == 'login:ok') {
            // 调用登录API
            reslove()
          }
        })
      })
    })

  },

}
