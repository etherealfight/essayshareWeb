<!--
* @FileDescription:用户主页组件，用于查看用户主页
-->
<template>
  <div id="personalMain">
    <mainHead></mainHead>
    <div class="personalMiddle">
      <div class="personalIntroduction">
        <div class="personalImg">
          <img :src="userImage" class="personalImg" />
        </div>
        <div class="personalText">
          <span style="font-size: 30px">{{ username }}</span>
          <span class="personalWords">个性签名：{{ sign }}</span>
          <span class="personalWords">个人简介：{{ introduction }}</span>
        </div>
        <el-button
          v-show="showChange"
          class="personalChange"
          @click="personalChange"
          >修改个人资料</el-button
        >
      </div>
      <div class="personalContents">
        <contentList id="personalList" :contentData="datas"></contentList>
        <el-button
          :loading="true"
          class="mainMore"
          v-if="showLoading"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from "../Homepage/main-header";
import contentList from "../Homepage/contentList";
import { searchData1 } from "../../api";
export default {
  components: {
    mainHead: mainHead,
    contentList: contentList,
  },
  data() {
    return {
      datas: [],
      scroll: true, //
      pageNum: 1, //当前展示到的页面
      totalNum: 1, //总共查询到满足条件的页面
      showLoading: false, //是否在加载中标识
      username: this.$route.query.username,
      userImage: this.$route.query.userImage,
      sign: this.$route.query.sign,
      introduction: this.$route.query.introduction,
    };
  },
  async created() {
    let that = this;
    const res = await searchData1(that.username, this.pageNum);
    if ((this.totalNum = 0)) {
      this.$message.warning("没有满足条件的内容");
    }
    this.datas = res.detail;
    this.totalNum = res.pageNumber;
    //console.log(res);
    this.pageNum++;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * 根据查询条件获取文章信息
     */
    async getData() {
      let that = this;
      try {
        const res1 = await searchData1(that.keyword, that.pageNum);
        //console.log(res1);
        this.datas = [...this.datas, ...res1.detail];
        this.pageNum++;
      } catch (error) {
        this.$message.warning(error.message);
      }
    },
    /**
     * 监听屏幕滚动情况，到底时动态加载文章组件
     */
    handleScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.scrollHeight - 1
      ) {
        if (this.pageNum > this.totalNum) {
          this.$message.info("到底啦别拉了");
          this.showLoading = false;
          return;
        } else {
          this.showLoading = true;
          this.getData();
        }
      }
    },
    personalChange() {
      this.$router.push("/profile");
    },
  },
  computed: {
    showChange() {
      //console.log(this.username);
      //console.log(this.$store.state.userName);
      return this.username === this.$store.state.userName;
    },
  },
};
</script>

<style scoped>
.personalMiddle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.personalIntroduction {
  height: 200px;
  width: 840px;
  padding-top: 40px;
  background: url("http://www.shuoshuodaitupian.com/css/userpage_back.jpg")
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.personalImg {
  margin: 0 20px 0 20px;
  width: 120px;
  height: 120px;
  border-radius: 10px;
}
.personalText {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.personalWords {
  font-size: 15px;
  padding-top: 5px;
  width: 600px;
  word-break: break-all;
}
.personalChange {
  margin-left: -130px;
  margin-top: -80px ;
  padding: 10px;
} 
</style>