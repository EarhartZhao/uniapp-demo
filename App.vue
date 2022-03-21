<script>
import weChat from './assets/utils/weChat.js'
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    // weChat.intoPage()
  },
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import '@/uni_modules/uview-ui/theme.scss';
</style>
