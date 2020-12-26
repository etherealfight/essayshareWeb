<!--
* @FileDescription:发布组件，用于用户发表新文章
-->
<template>
  <div class="publishBox">
    <mainHeader></mainHeader>
    <div class="publishMain">
      <textarea
        name="发布"
        id="publish"
        v-model="publishText"
        cols="50"
        rows="15"
        style="resize: none; padding: 5px"
        placeholder="请输入发布内容"
      ></textarea>
      <el-button round id="publishButton" @click="publish">发布</el-button>
    </div>
  </div>
</template>

<script>
import mainHeader from "../Homepage/main-header";
import { publish } from "../../api";

export default {
  data() {
    return {
      publishText: "",
    };
  },
  methods: {
    /**
     * 发布文章
     */
    async publish() {
      let that = this;
      if (this.$store.state.userName == "") this.$message.warning("请先登录");
      else if (that.publishText == "")
        this.$message.warning("发布内容不可为空");
      else {
        console.log(this.publishText)
        const res = await publish(this.$store.state.userName, that.publishText);
        this.$router.push({ path: "/homepage" });
        this.$message.info(res.msg);
        console.log(res)
      }
    },
  },
  components: {
    mainHeader: mainHeader,
  },
};
</script>

<style>
.publishBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.publishMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  padding: 50px;
  margin-top: 10px;
  background: white;
}
#publish {
  padding: 20px;
  font-family: "宋体";
  font-size: 20px;
}
#publishButton {
  margin-top: 20px;
  width: 150px;
  color: white !important;
  background: rgba(241, 187, 85, 0.973) !important;
  border: rgb(250, 206, 125) 1px solid !important;
}
#publishButton:hover {
  color: white !important;
  background: rgba(240, 169, 37, 0.973) !important;
  border: orange 1px solid !important;
}
#publishButton:focus {
  color: white !important;
  background: rgba(247, 176, 45, 0.973) !important;
  border: orange 1px solid !important;
}
</style>