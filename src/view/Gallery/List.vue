<script setup>
import * as postApi from '../../api/post.js'
import {onMounted, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const isLoaded = ref(false)
const galleryListRef = ref()
const pageNumRef = ref(1)
onMounted(async () => {
  isLoaded.value = false
  galleryListRef.value = await postApi.getPostList(pageNumRef.value, 10, 4)
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
const handleYear = (galleryCreateTime) => {
  const galleryDate = new Date(galleryCreateTime)
  if (galleryDate.getFullYear() === lastPostYear) {
    return false
  } else {
    lastPostYear = galleryDate.getFullYear()
    return galleryDate.getFullYear()
  }
}
</script>

<template>
  <div v-if="isLoaded" class="gallery-container">
    <div v-if="!galleryListRef" class="empty">
      <el-empty :image-size="150" description="暂无相册"/>
    </div>
    <div v-for="galleryItem in galleryListRef.postsList" class="post-item">
      <div v-if="handleYear(galleryItem.createTime)" class="year">{{
          (new Date(galleryItem.createTime)).getFullYear()
        }}
      </div>
      <div class="post">
        <div class="title">
          <ul>
            <li>
              <router-link :to="'/gallery/' + galleryItem.id">
                {{ galleryItem.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <el-pagination
        v-model:current-page="pageNumRef"
        :hide-on-single-page="true"
        :page-size="50"
        :total="galleryListRef.total"
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