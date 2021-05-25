<template>
  <div class="more">
    <!-- <h2>更多</h2> -->
    <div class="login" @click="Tologin" v-if="!IsLogins || !name">
      <div class="photo"></div>
      <h3>登陆 / 注册账号</h3>
      <p>解锁收藏、云端同步功能、</p>
      <p>收藏内容不丢失</p>
    </div>
    <div class="login" v-if="IsLogins &&name">
      <div class="photo"></div>
      {{name}}
    </div>
    <div class="setting">
      <div class="setting-item">
        <div>
          <i class="iconfont">&#xe65a;</i>
          <span>菜谱收藏</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>
      <div class="setting-item">
        <div>
          <i class="iconfont">&#xe79a;</i>
          <span>菜篮子</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>
      <div class="setting-item">
        <div>
          <i class="iconfont">&#xe8ad;</i>
          <span>历史记录</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>
      <div class="setting-item">
        <div>
          <i class="iconfont">&#xe775;</i>
          <span>点赞、好评</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>
      <div class="setting-item">
        <div>
          <i class="iconfont">&#xe613;</i>
          <span>反馈</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>
      <div class="setting-item" @click="Exit">
        <div>
          <i class="iconfont"></i>
          <span >退出登录</span>
        </div>
        <span class="iconfont">&#xe635;</span>
      </div>

      <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
    </div>
  </div>
</template>

<script>
// import QRCode from "qrcodejs2";
import { Toast } from "vant";
// import { mapState } from "vuex";

export default {
  data() {
    return {
      show: false,
      name:""
    };
  },
  created() {
    // console.log(this.user);
    // console.log(localStorage.getItem("用户名" + this.user));
  },
  methods: {
    /*  creatQrCode() {
       new QRCode(this.$refs.qrCodeUrl, {
        text:  'https://www.baidu.com', // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }*/
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
    Tologin() {
      this.$router.push({ name: "Login" });
    },
    Exit(){
          this.$store.commit("exitlogin");
    }
  },
   activated() {
    // this.creatQrCode();
    // var name = localStorage.getItem("用户名" + un);
    // console.log(name);
    // console.log(localStorage.getItem("用户名" + this.user));
    this.name=localStorage.getItem("用户名" + this.user)
    // console.log(this.name);
    
  },
  computed: {
    user() {
      return this.$store.state.un;
    },
    pwd() {
      return this.$store.state.up;
    },
    IsLogins() {
      return this.$store.state.ma.isLogin;
    }
  }
  // computed: mapState(["un"])
};
</script>

<style lang="scss" scoped>
.more {
  padding: 0 5px;
  box-sizing: border-box;
  h2 {
    color: #222222;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  .login {
    color: #b5b5b5;
    text-align: center;

    .photo {
      width: 100px;
      height: 100px;
      background-color: #c2c2c2;
      border-radius: 50%;
      margin: 18px auto;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #a0a0a0;
    }

    & > p {
      font-size: 14px;
    }

    & > p:nth-of-type(2) {
      margin-top: 8px;
    }
  }

  .setting {
    margin-top: 32px;
    color: #5e5e5e;
    i {
      font-size: 26px;
      margin-right: 10px;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      & > div {
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      & > span {
        color: #b5b5b5;
      }
    }
  }
}
</style>