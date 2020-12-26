<!--
* @FileDescription:登录注册组件
-->
<template>
  <div class="rlmain">
    <main-header></main-header>
    <div class="rlbox">
      <div class="title"><img src="../../../public/book.png" />四大名著</div>
      <div class="rlmiddle">
        <router-link to="/regist-login/regist" class="middleitem1"
          >注册</router-link
        >
        <router-link to="/regist-login/login" class="middleitem2"
          >登录</router-link
        >
      </div>
      <div class="rlbutton">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import main_header from "../Homepage/main-header";
export default {
  components: {
    "main-header": main_header,
  },
};
</script>

<style>
.rlmain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rlbox {
  margin-top: 10px;
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
.rltitle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 150px;
  width: 570px;
  font-size: 40px;
  font-family: fm;
  border-bottom: 1px lightgray solid;
}
img {
  height: 50px;
  width: 50px;
}
.rlmiddle {
  display: flex;
  height: 70px;
  width: 570px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
}
.middleitem1,
.middleitem2 {
  color: gray;
  text-decoration: none;
}
.middleitem1:hover {
  color: orange;
  border-bottom: 1px solid orange;
}
.middleitem2:hover {
  color: orange;
  border-bottom: 1px solid orange;
}
.router-link-active {
  color: orange;
  border-bottom: 1px solid orange;
}
</style>