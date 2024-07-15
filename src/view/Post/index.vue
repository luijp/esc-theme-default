<script setup>
import 'github-markdown-css'
import {onMounted, ref, watchEffect} from "vue";
import * as postApi from '../../api/post.js'
import * as tagApi from '../../api/tag.js'
import * as categoryApi from '../../api/category.js'
import markdownit from 'markdown-it'
import setTitle from '../../util/setTitle.js'
import formatDate from '../../util/formatDate.js'
import {useRoute, useRouter} from 'vue-router'
import {Clock, EditPen, Timer} from "@element-plus/icons-vue";
const postDataRef = ref()
const isLoaded = ref(false)
const tagsRef = ref()
const categoriesRef = ref()
const route = useRoute()
const router = useRouter()
const postId = ref(route.params.postId)
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
})
watchEffect(async ()=>{
  postDataRef.value = await postApi.getPost(postId.value)
  tagsRef.value = await tagApi.getTagsByPostId(postId.value)
  categoriesRef.value = await categoryApi.getCategoriesByPostId(postId.value)
  if(!postDataRef.value){
    await router.push("/")
  }
  setTitle.routeTitle.value = postDataRef.value.title
  isLoaded.value = true
})
</script>

<template>
<div class="post-container" v-if="isLoaded">
  <div class="title-header">
    <div class="title">
      {{ postDataRef.title }}
    </div>

    <div class="meta">
      <div class="c-u-time">
        <div v-if="postDataRef.createTime">
          <el-icon><Clock /></el-icon>
          {{ formatDate(postDataRef.createTime)}}
        </div>
        <div v-if="postDataRef.updateTime">
          <el-icon><EditPen /></el-icon>
          {{ formatDate(postDataRef.updateTime)}}
        </div>
      </div>

      <div class="cate-tag">
        <span v-if="categoriesRef" v-for="category in categoriesRef">
          <router-link :to="'/categories/' + category.categoryAlias">
            {{category.categoryName}}
          </router-link>
        </span>
        <span style="margin-right: 5px;"></span>
        <span v-if="tagsRef" v-for="tag in tagsRef">
          <router-link :to="'/tags/' + tag.tagAlias">
            #{{tag.tagName}}
          </router-link>
        </span>
      </div>
    </div>
  </div>


  <div class="cover" v-if="postDataRef.cover">
    <img :src="postDataRef.cover" />
    {{ postDataRef.cover}}
  </div>

  <div class="content markdown-body" v-html="md.render(postDataRef.content)">
  </div>
</div>
</template>

<style scoped>
.title-header{
  display: flex;
  justify-content: space-between;
  .title{
    font-size: 1.8em;
  }
  .meta{
    .c-u-time{
      display: flex;
      color: #686868;
      font-size: 0.8em;
      div{
        margin-left: 10px;
      }
    }
    .cate-tag{
      margin-top: 5px;
      text-align: right;
      margin-left: 5px;
      color: #414141;
      font-size: 0.9em;
    }

  }
}
.content{
  margin-top: 30px;
}
</style>