<!--
* @FileDescription:个人信息组件，用于用户修改个人信息
-->
<template>
  <div class="profileMain">
    <main-header></main-header>

    <div class="box">
      <div class="profileHeader">
        <img :src="$store.state.userImage" id="profileImg" />
        <el-upload
          class="upload-demo"
          action="http://192.168.1.104:8080/uploadfile"
          :show-file-list="false"
          :on-error="showError"
          :on-success="showSuccess"
        >
          <el-button size="small" type="primary" id="changePhoto"
            >点击上传头像</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <span id="profileUsername">{{ $store.state.userName }}</span>
      </div>

      <div id="profileTitle">账户设置</div>

      <div class="profileMiddle">
        <div class="item">
          性别：
          <input
            type="radio"
            v-model="$store.state.sex"
            value="1"
            style="margin-left: 3px; margin-right: 3px"
          />男
          <input
            type="radio"
            v-model="$store.state.sex"
            value="2"
            style="margin-left: 3px; margin-right: 3px"
          />女
          <input
            type="radio"
            v-model="$store.state.sex"
            value="0"
            style="margin-left: 3px; margin-right: 3px"
          />其他
        </div>
        <div class="item">
          <label for="nickNameBox">昵称：</label>
          <input
            type="text"
            placeholder="请输入昵称"
            class="profileInputbox"
            v-model="$store.state.nickName"
            style="padding-left: 5px"
          />
        </div>
        <div class="item">
          <label for="nickNameBox">签名：</label>
          <input
            type="text"
            placeholder="请输入签名"
            class="profileInputbox"
            v-model="$store.state.sign"
            style="padding-left: 5px"
          />
        </div>
        <div class="profileIntroduction">
          <label for="nickNameBox">简介：</label>
          <textarea
            name="简介"
            id="introduction"
            v-model="$store.state.introduction"
            cols="30"
            rows="10"
            style="resize: none; padding: 5px"
          ></textarea>
        </div>
        <!-- <input
          type="file"
          id="fildData"
          @change="previewFiles"
          accept="image/png, image/jpg"
        /> -->
      </div>

      <div class="profileFooter">
        <el-button class="profileSubmit" @click="update">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import main_header from "../Homepage/main-header";
import { update, uploadImg } from "../../api";
export default {
  data() {
    return {
      userImg: this.$store.state.userImage,
    };
  },
  components: {
    "main-header": main_header,
  },
  methods: {
    // async previewFiles(event) {
    //   console.log(event.target.files[0]);
    //   const res = await uploadImg(event.target.files[0]);
    //   console.log(res);
    // },
    showError(err, file, fileList) {
      console.log(err);
    },
    async showSuccess(response, file, fileList) {
      console.log(response.detail);
      this.$store.commit("changeUserImage", { userImage: response.detail });
      let that = this;
      const res = await update(
        that.$store.state.userName,
        that.$store.state.nickName,
        that.$store.state.sex,
        that.$store.state.sign,
        that.$store.state.introduction,
        that.$store.state.userImage,
      );
      console.log(res)
    },
    /**
     * 监听修改按钮，发送修改后的用户信息
     */
    async update() {
      let that = this;
      const res = await update(
        that.$store.state.userName,
        that.$store.state.nickName,
        that.$store.state.sex,
        that.$store.state.sign,
        that.$store.state.introduction,
        that.$store.state.userImage,
      );
      this.$store.commit("changeStates", {
        sex: that.$store.state.sex,
        nickname: that.$store.state.nickName,
        sign: that.$store.state.sign,
        introduction: that.$store.state.introduction,
      });
      console.log(res);
      this.$message.info("修改成功");
    },
  },

};
</script>

<style>
.profileHeader {
  height: 250px;
  width: 610px;
  background: url("http://www.shuoshuodaitupian.com/css/userpage_back.jpg")
    no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px lightgray solid;
}
#profileImg {
  border-radius: 50%;
  width: 75px;
  height: 75px;
}
#profileUsername {
  font-size: 30px;
  font-family: "宋体";
  padding-top: 10px;
}
.upload-demo {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}
#changePhoto {
  background: rgb(247, 177, 48);
  border: 1px solid rgb(247, 177, 48);
}

.profileMain {
  display: flex;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 5px;
}
@font-face {
  font-family: "fm";
  src: url("../../../public/刻石录钢笔鹤体(I.PenCrane-B).ttf");
}
#profileTitle {
  display: flex;
  align-items: center;
  height: 60px;
  width: 600px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 1px lightgray solid;
}
.profileMiddle {
  display: flex;
  width: 610px;
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: column;
  align-items: flex-start;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 40px;
  padding-left: 50px;
  white-space: nowrap;
}
.profileInputbox {
  border: lightgray solid 1px;
  width: 200px;
  height: 30px;
}
.profileSubmit {
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
.profileSubmit:hover {
  background: orange;
  color: white;
}
.profileSubmit:focus {
  background: orange;
  color: white;
}
.profileIntroduction {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
  padding-left: 50px;
  white-space: nowrap;
}
</style>