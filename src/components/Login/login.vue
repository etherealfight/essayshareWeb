<!--
* @FileDescription:登录组件，用于用户进行登录操作
-->
<template>
  <div class="app">
    <input
      type="text"
      class="input-box"
      placeholder="请输入用户名"
      v-model="usermessage.username"
    />

    <input
      type="password"
      class="input-box"
      placeholder="请输入密码"
      v-model="usermessage.password"
    />

    <el-button class="login" @click="login">登录</el-button>
  </div>
</template>

<script>
import { login } from "../../api";
export default {
  data() {
    return {
      usermessage: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    /**
     * 监听登录按钮发送登录请求
     */
    async login() {
      let that = this;
      try {
        const res = await login(
          that.usermessage.username,
          that.usermessage.password
        );
        //console.log(res);
        if (res.success == true) {
          this.$store.commit("initialData", {
            username: res.detail.username,
            sex: res.detail.gender,
            nickname: res.detail.nickname,
            sign: res.detail.signature,
            introduction: res.detail.introductory,
            userImage:res.detail.fileaddress
          });
          this.$message.info("登录成功");
          this.$router.push({ path: "/homepage" });
        } else {
          this.$message.warning("登录失败," + res.msg);
        }
      } catch (error) {
        this.$message.warning("登录失败");
      }
    },
  },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}
.input-box {
  border: lightgray solid 1px;
  width: 300px;
  height: 40px;
  margin: 10px;
  padding-left: 10px;
}
.login {
  width: 312px;
  height: 42px;
  margin: 10px;
  background: rgb(247, 177, 48);
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 15px;
  font-weight: inherit;
  border: none;
}
.login:hover {
  background: orange;
  color: white;
}
.login:focus {
  background: orange;
  color: white;
}
</style>