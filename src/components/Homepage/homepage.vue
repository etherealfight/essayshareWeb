<!--
* @FileDescription:首页组件，用于展示查询的信息
-->
<template>
  <div class="mainPage">
    <main-header @searchEvent="changeKeyword"></main-header>
    <div class="mainMiddle">
      <contentList id="mainList" :contentData="datas"> </contentList>
      <el-button
        :loading="true"
        class="mainMore"
        v-if="showLoading"
      ></el-button>
      <el-button
        round
        icon="el-icon-plus"
        class="mainAdd"
        @click="publish"
      ></el-button>
    </div>
  </div>
</template>

<script>
import main_header from "./main-header";
import ContentList from "./contentList";
import { searchData, searchData1, searchData2 } from "../../api";

export default {
  components: {
    "main-header": main_header,
    contentList: ContentList,
  },
  data() {
    return {
      scroll: true, //
      pageNum: 1, //当前展示到的页面
      totalNum: 1, //总共查询到满足条件的页面
      datas: [], //满足条件的文章数组
      keyword: "", //查询的关键字
      initState: true, //判断是否为初始页面
      pageNum1: 1, //符合用户名的文章页数
      showLoading: false, //是否在加载中标识
    };
  },
  /**
   * 初始化首页
   */
  async created() {
    let that = this;
    const res = await searchData(that.pageNum);
    this.datas = res.detail;
    this.totalNum = res.pageNumber;
    this.pageNum++;
  },
  /**
   * 监听页面滚动
   */
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * 监听发布按钮的点击动作
     */
    publish() {
      this.$router.push({ path: "/publish" });
    },
    /**
     * 监听main-header中查询关键词的动作
     */
    changeKeyword(data) {
      this.datas = [];
      this.pageNum = 1;
      this.keyword = data;
      this.pageNum = 1;
      this.initState = true;
      this.getData();
    },
    /**
     * 根据查询条件获取文章信息
     */
    async getData() {
      let that = this;
      try {
        if (this.keyword == "") {
          const res = await searchData(that.pageNum);
          this.datas = [...this.datas, ...res.detail];
          console.log(res);
          console.log("chushihua");
        } else {
          if (this.initState) {
            const res1 = await searchData1(that.keyword, that.pageNum);
            const res2 = await searchData2(that.keyword, that.pageNum);
            this.totalNum = res1.pageNumber + res2.pageNumber;
            this.pageNum1 = res1.pageNumber;
            this.initState = false;
            console.log(res1);
            console.log(res2);
          }
          console.log(this.pageNum, this.pageNum1);
          if (this.pageNum <= this.pageNum1) {
            const res1 = await searchData1(that.keyword, that.pageNum);
            console.log(res1);
            if (this.pageNum === 1) {
              this.datas = res1.detail;
            } else {
              this.datas = [...this.datas, ...res1.detail];
            }
          } else if (
            this.totalNum >= this.pageNum &&
            this.pageNum > this.pageNum1
          ) {
            const res2 = await searchData2(
              that.keyword,
              that.pageNum - that.pageNum1
            );
            console.log(res2);
            if (this.pageNum - this.pageNum1 === this.pageNum) {
              this.datas = res2.detail;
            } else {
              this.datas = [...this.datas, ...res2.detail];
            }
          }

          if (this.pageNum <= this.pageNum1) {
            const res1 = await searchData1(that.keyword, that.pageNum);
            if (res1.detail.length < 20 && this.pageNum == 1) {
              const res2 = await searchData2(that.keyword, that.pageNum);
              this.datas = [...this.datas, ...res2.detail];
              this.pageNum++;
              console.log(this.pageNum);
            }
          }

          if (this.totalNum === 0) {
            this.$message.warning("没有满足条件的内容");
          }
        }

        this.pageNum++;
        console.log(this.pageNum)
      } catch (error) {
        this.$message.warning(error.message);
      }
    },
    /**
     * 监听屏幕滚动情况，到底时动态加载文章组件
     */
    async handleScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
          document.body.scrollHeight - 1 &&
        document.documentElement.scrollTop > 10
      ) {
        if (this.pageNum > this.totalNum) {
          this.$message.info("到底啦别拉了");
          this.showLoading = false;
          return;
        } else {
          let num=1;
          this.showLoading = true;
          console.log("获取前")
          await this.getData(); 
          console.log("获取完")
        }
      }
    },
  },
};
</script>

<style>
.mainPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mainAdd {
  height: 70px !important;
  width: 70px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  font-size: 40px !important;
  color: lightgray;
}
.mainAdd {
  position: fixed;
  bottom: 10%;
  right: 10%;
}
.mainAdd:hover {
  color: white !important;
  background: rgba(240, 169, 37, 0.973) !important;
  border: orange 1px solid !important;
}
.mainAdd:focus {
  color: white !important;
  background: rgba(247, 176, 45, 0.973) !important;
  border: orange 1px solid !important;
}
.mainMiddle {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainMore {
  height: 1px;
  width: 1px;
  font-size: 50px;
  padding: 0px !important;
}
.el-button.is-loading {
  font-size: 60px !important;
}
</style>