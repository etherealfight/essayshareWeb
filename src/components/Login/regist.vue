<!--
* @FileDescription:注册组件，用于注册新用户
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
      type="text"
      class="input-box"
      placeholder="请输入昵称"
      v-model="usermessage.nikename"
    />

    <input
      type="password"
      class="input-box"
      placeholder="请输入密码"
      v-model="usermessage.password1"
    />

    <input
      type="password"
      class="input-box"
      :class="{ wrong: !iscorrect }"
      placeholder="请确认输入密码"
      v-model="usermessage.password2"
    />
    <el-button class="regist" @click="regist">注册</el-button>
  </div>
</template>

<script>
import { regist } from "../../api";
export default {
  data() {
    return {
      usermessage: {
        username: "",
        nikename: "",
        password1: "",
        password2: "",
      },
      registstate: false,
    };
  },
  computed: {
    /**
     * 判断两次输入的密码是否一致
     */
    iscorrect() {
      return this.usermessage.password1 === this.usermessage.password2;
    },
  },
  methods: {
    /**
     * 监听注册按钮，发送注册信息给服务器
     */
    async regist() {
      let that = this;
      try {
        const res = await regist(
          that.usermessage.username,
          that.usermessage.password1,
          that.usermessage.nickname
        );
        console.log(res);
        if (res.success == true) {
          this.$message.info("注册成功");
          this.$router.push({ path: "/regist-login/login" });
        } else {
          this.$message.warning("注册失败," + res.msg);
        }
      } catch (error) {
        this.$message.warning("注册失败");
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
input:focus {
  border: lightgray solid 1px;
}
.wrong {
  border: 1px solid red !important;
}
.regist {
  width: 312px;
  height: 42px;
  margin: 10px;
  background:  rgb(247, 177, 48);
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 15px;
  font-weight: inherit;
  border: none;
}
.regist:hover {
  background: orange;
  color: white;
}
.regist:focus {
  background: orange;
  color: white;
}
</style>