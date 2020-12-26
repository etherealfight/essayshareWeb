<!--
* @FileDescription:页面首部导航栏
-->
<template>
  <div class="container">
    <div class="title"><img src="../../../public/book.png" />四大名著</div>
    <div class="searchbox">
      <el-input
        v-show="isHomepage"
        class="search"
        suffix-icon="el-icon-search"
        placeholder="请输入内容"
        v-model="keyword"
        @keyup.enter.native="search"
      ></el-input>
    </div>
    <div id="mainPageLogin">
      <router-link to="/homepage" class="mainPageLogin">首页</router-link>
      <router-link to="/regist-login/regist" class="mainPageLogin"
        >注册</router-link
      >
      <router-link to="/regist-login/login" class="mainPageLogin" v-if="!$store.state.loginState"
        >登录</router-link
      >
      <router-link :to="{path:'/mypersonalPage'}" class="mainPageLogin" v-if="$store.state.loginState">{{
        $store.state.userName
      }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    isHomepage() {
      return this.$route.path == "/homepage";
    },
  },
  methods: {
    /**
     * 根据关键词搜索文章
     */
    search() {
      if (this.$route.path !== "/homepage") {
        this.$router.push({ path: "/homepage" });
      }
      this.$emit("searchEvent", this.keyword);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  background: white;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
}
@font-face {
  font-family: "fm";
  src: url("../../../public/刻石录钢笔鹤体(I.PenCrane-B).ttf");
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  height: 100px;
  padding-left: 166px;
  padding-right: 166px;
  font-size: 40px;
  font-family: fm;
  white-space: nowrap;
}
.search {
  width: 300px !important;
  height: 45px;
  padding-left: 166px;
  margin-right: -632px
}
.mainPageLogin {
  text-decoration: none;
  padding: 20px;
}
#mainPageLogin {
  margin-left: 632px;
  padding-left: 40px;
  padding-right: 40px;
  white-space: nowrap;
}
.mainPageLogin:hover {
  color: orange;
  border-bottom: orange 1px solid;
}
</style>