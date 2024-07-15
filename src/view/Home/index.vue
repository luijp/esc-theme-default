<script setup>
import * as postApi from '../../api/post.js'
import {onMounted, ref, watchEffect} from "vue";
import {Lock} from "@element-plus/icons-vue";
const pageNumRef = ref(1)
const postListRef = ref()
const isLoaded = ref(false)
const refreshPostList = async () => {
  postListRef.value = await postApi.getPostList(pageNumRef.value)
  isLoaded.value = true
}
watchEffect(async ()=>{
  await refreshPostList()
})

let lastPostYear = 0
const handleYear = (postCreateTime)=>{
  const postDate = new Date(postCreateTime)
  if(postDate.getFullYear() === lastPostYear){
    return false
  }else{
    lastPostYear = postDate.getFullYear()
    return postDate.getFullYear()
  }
}
</script>

<template>
<div class="home-container">
  <div class="post-item" v-if="isLoaded" v-for="postItem in postListRef.postsList">
    <div class="year" v-if="handleYear(postItem.createTime)">{{ (new Date(postItem.createTime)).getFullYear() }}</div>
    <div class="post">
        <div class="title">
          <ul>
            <li>
              <router-link :to="'/post/' + postItem.id">
                {{postItem.title}}
              </router-link>
              <el-icon v-if="postItem.encrypt"><Lock /></el-icon>
            </li>
          </ul>
        </div>
    </div>
  </div>

  <el-pagination layout="prev, pager, next"
                 :hide-on-single-page="true"
                 v-if="postListRef"
                 :page-count="Math.ceil(postListRef.total/postListRef.size)"
                 v-model:current-page="pageNumRef"
  />
</div>
</template>

<style scoped>
.year
{
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 50px;
}
.title{
  margin-left: 50px;
  color: #585858;
  font-size: 1.2em;
  text-decoration: underline;
}
.el-pagination{
  justify-content: center;
  margin-top: 50px;
}

</style>