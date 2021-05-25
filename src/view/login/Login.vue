<template>
  <div class="login">
    <div class="back iconfont" @click="goback">&#xe67c;</div>
    <div class="login-box">
      <div>
        <van-field v-model="uname" clearable label="昵称" left-icon="user-circle-o" placeholder="请输入用户名" />
      </div>

      <div>
        <van-field v-model="upwd" clearable label="密码" type="password" left-icon="more-o" placeholder="请输入密码" />
      </div>

      <button @click="setStateCount">登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      uname: "",
      upwd: "",
      path:""
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);

    next(vm=>{
      vm.path=from.path
    });
  },
  methods: {
    setStateCount() {
      //触发mutation必须使用$store所提供的commit方法提交一次mutation
      //commit方法接收两个参数参数一需要触发mutation的同名字符串参数二载荷
      this.$store.commit("getinfo", { uname: this.uname, upwd: this.upwd });
    },
    test() {
      this.$store.commit("zhuce", { uname: this.uname, upwd: this.upwd });
    },
    goback(){
      if(this.path){
        this.$router.push({path:this.path})
      }else{
        this.$router.push({name:"More"})
      }
      
    }
  },
  computed: {
    ...mapState(["un", "up"])
  }
};
</script>

<style lang="scss" scoped>

</style>