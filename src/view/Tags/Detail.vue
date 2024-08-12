<script setup>
import * as postApi from '../../api/post.js'
import * as tagApi from '../../api/tag.js'
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import {Lock} from "@element-plus/icons-vue";

const route = useRoute()
const router = useRouter()
const pageNumRef = ref(1)
const postListRef = ref()
const isLoaded = ref(false)
const tagsRef = ref(null)
onMounted(async () => {
  tagsRef.value = await tagApi.getTagIdByAlias(route.params.tagAlias);
  if (tagsRef.value == null) {
    await router.push("/tags")
  }
  postListRef.value = await postApi.getPostListByCategoryId(pageNumRef.value, tagsRef.value.id)
  isLoaded.value = true
})

</script>

<template>
  <div class="detail-container">
    <div v-if="isLoaded && !postListRef" class="empty">
      <el-empty :image-size="150" description="该标签下没有文章"/>
    </div>
    <div v-for="postItem in postListRef.postsList" v-if="isLoaded" class="post-item">
      <div class="tag-title">{{ tagsRef.name }}</div>
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
.tag-title {
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