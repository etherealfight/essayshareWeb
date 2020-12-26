<!--
* @FileDescription:文章列表组件，用于动态加载文章组件
-->
<template>
  <div class="contentListBox">
    <contents
      class="listItem"
      v-for="(item, index) in contentData"
      :key="item.id"
      :fileaddress="item.fileaddress"
      :id="item.id"
      :username="item.username"
      :nickname="item.nickname"
      :introduction="item.introductory"
      :sign="item.signature"
      :contentText="item.production"
      :date="item.date"
      @deleteContent="handleDelete(index)"
    ></contents>
  </div>
</template>

<script>
import Contents from "./content";

export default {
  components: {
    contents: Contents,
  },
  methods: {
    handleDelete(index) {
      this.contentData.splice(index, 1);
    },
  },
  /**
   *  接受从homepage组件传来的文章参数
   */
  props: {
    contentData: {
      type: Array,
      default: [
        {
          id: 1,
          username: "quan",
          nickname: "qq",
          sign: ".........",
          introduction: "6666666666",
          contentText: "2333333333",
        },
        {
          id: 2,
          username: "quan",
          nickname: "qq",
          sign: ".........",
          introduction: "6666666666",
          contentText: "2333333333",
        },
      ],
    },
  },
 
};
</script>

<style>
</style>