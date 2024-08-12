<script setup>
import * as postApi from '../../api/post.js'
import {useRoute, useRouter} from 'vue-router'
import formatDate from '../../util/formatDate.js'
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import {onMounted, ref, watchEffect} from "vue";

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, {language: lang}).value;
      } catch (__) {
      }
    }
    return ''; // use external default escaping
  }
})

const route = useRoute()
const router = useRouter()

const microListRef = ref()
const currentPageNumRef = ref(Number(route.query.page) || 1)
const isLoaded = ref(false)
onMounted(async () => {
  isLoaded.value = false
  microListRef.value = await postApi.getPostList(currentPageNumRef.value, 50, 3)
  isLoaded.value = true
})
watchEffect(async () => {
  await router.push({
    query: {
      ...route.query,
      page: currentPageNumRef.value,
    }
  })
})

</script>

<template>
  <div v-if="isLoaded" class="micro-container">
    <el-empty v-if="microListRef.total === 0" description="暂无碎语"/>
    <div v-for="microItem in microListRef.postsList" class="micro-item">
      <div class="meta-info">
        {{ formatDate(microItem.createTime, 0) }}
      </div>
      <div class="content markdown-body" v-html="md.render(microItem.content)">
      </div>
    </div>

    <el-pagination
        v-model:current-page="currentPageNumRef"
        :hide-on-single-page="true"
        :page-size="50"
        :total="microListRef.total"
        layout="prev, pager, next"
    />
  </div>
</template>

<style scoped>
.micro-item {
  margin-top: 20px;

  .meta-info {
    font-size: 0.8em;
    color: #585858;
  }

  .content {
    margin-top: 5px;
  }
}

.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>