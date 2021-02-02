<!--
* @FileDescription:单篇文章组件，用于展示文章以及发表者的信息
-->
<template>
  <div class="contentBox">
    <div class="contentTop">
      <el-popover
        placement="top-start"
        :title="nickname"
        width="300"
        trigger="hover"
      >
        <div id="poBox">
          <span>个性签名：</span>
          <span id="userSign" style="padding-left: 5px">{{ sign }}</span>
          <span>个人简介：</span>
          <span id="userIntroduction" style="padding-left: 5px">{{
            introduction
          }}</span>
        </div>
        <img
          :src="fileaddress"
          class="contentImg"
          slot="reference"
          @click="toPersonalPage"
        />
      </el-popover>

      <span id="contentUsername" @click="toPersonalPage">{{ username }}</span>
      <i
        class="el-icon-delete"
        v-if="showDelete"
        style="margin-right: 20px; margin-left: auto"
        @click="del"
      ></i>
    </div>
    <div class="contentText">
      <pre id="preid">{{ contentText }}</pre>
      <span style="margin-right: 20px; margin-left: auto"
        >---------{{ username }} {{ currentData }}</span
      >
    </div>
  </div>
</template>

<script>
import { deleteContent } from "../../api";
import dayjs from "dayjs";
// 或者 CommonJS
// var dayjs = require('dayjs');

export default {
  /**
   * 接受从contentList传来的文章以及用户参数
   */
  props: {
    //文章内容
    contentText: {
      type: String,
      default: "",
    },
    //发布时间
    date: {
      type: String,
      default: "",
    },
    //id
    id: {
      type: Number,
      default: 0,
    },
    //用户名
    username: {
      type: String,
      default: "",
    },
    //用户昵称
    nickname: {
      type: String,
      default: "",
    },
    //用户头像
    fileaddress: {
      type: String,
      default: "",
    },
    //用户签名
    sign: {
      type: String,
      default: "",
    },
    //用户简介
    introduction: {
      type: String,
      default: "",
    },
  },
  methods: {
    toPersonalPage() {
      if (
        this.username == this.$store.state.userName &&
        this.$store.state.loginState == true
      ) {
        this.$router.push({
          path: "/mypersonalPage",
        });
      } else {
        this.$router.push({
          path: "/personalPage",
          query: {
            username: this.username,
            userImage: this.fileaddress,
            sign: this.sign,
            introduction: this.introduction,
          },
        });
      }
    },
    async del() {
      this.$emit("deleteContent", "");
      console.log("zzd");
      let that = this;
      const res = await deleteContent(that.id);
      console.log(res);
    },
  },
  computed: {
    showDelete() {
      return (
        this.$route.path == "/mypersonalPage" &&
        this.username === this.$store.state.userName
      );
    },
    currentData() {
      return dayjs(this.date).format("YYYY年MM月DD日 HH:mm:ss");
    },
  },
};
</script>

<style>
.contentBox {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 5px;
}
.contentTop {
  width: 100%;
  padding: 10px 20px 20px 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid lightgray;
}
.contentImg {
  border-radius: 50%;
  margin-right: 20px;
}
.contentText {
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#poBox {
  display: flex;
  flex-direction: column;
}
#preid {
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-all;
}
</style>