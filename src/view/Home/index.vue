<script setup>
import * as postApi from '../../api/post.js'
import {onMounted, ref, watchEffect} from "vue";
import {Lock} from "@element-plus/icons-vue";
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageNumRef = ref(Number(route.query.page) || 1)
const postListRef = ref()
const isLoaded = ref(false)

onMounted(async () => {
  isLoaded.value = false
  postListRef.value = await postApi.getPostList(pageNumRef.value)
  isLoaded.value = true
})

watchEffect(async () => {
  await router.push({
    query: {
      ...route.query,
      page: pageNumRef.value,
    }
  })
})

let lastPostYear = 0
const handleYear = (postCreateTime) => {
  const postDate = new Date(postCreateTime)
  if (postDate.getFullYear() === lastPostYear) {
    return false
  } else {
    lastPostYear = postDate.getFullYear()
    return postDate.getFullYear()
  }
}
</script>

<template>
  <div class="home-container">
    <div v-if="isLoaded && !postListRef" class="empty">
      <el-empty :image-size="150" description="暂无文章"/>
    </div>
    <div v-for="postItem in postListRef.postsList" v-if="isLoaded" class="post-item">
      <div v-if="handleYear(postItem.createTime)" class="year">{{ (new Date(postItem.createTime)).getFullYear() }}</div>
      <div class="post">
        <div class="title">
          <ul>
            <li>
              <router-link :to="'/post/' + postItem.id">
                {{ postItem.title }}
              </router-link>
              <el-icon v-if="postItem.encrypt">
                <Lock/>
              </el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <el-pagination v-if="postListRef"
                   v-model:current-page="pageNumRef"
                   :hide-on-single-page="true"
                   :page-count="Math.ceil(postListRef.total/postListRef.size)"
                   layout="prev, pager, next"
    />
  </div>
</template>

<style scoped>
.year {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 50px;
}

.title {
  margin-left: 50px;
  color: #585858;
  font-size: 1.2em;
  text-decoration: underline;
}

.el-pagination {
  justify-content: center;
  margin-top: 50px;
}

</style>