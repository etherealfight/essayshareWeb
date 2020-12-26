<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from "./store";

export default {
  name: "App",
  store,
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  max-width: 100vw;
  height: 100vh;
  width: 100vw;
  overflow-x:auto;
  background-image: url("../public/bg.png");
}
</style>
