<script setup>
import * as tagsApi from '../../api/tag.js'
import {onMounted, ref} from "vue";

const tagsRef = ref()
const isLoaded = ref(false)
onMounted(async () => {
  tagsRef.value = await tagsApi.getTags()
  isLoaded.value = true
})
</script>

<template>
  <div v-if="isLoaded && !tagsRef" class="empty">
    <el-empty :image-size="150" description="暂无标签"/>
  </div>
  <div v-for="tag in tagsRef" v-if="isLoaded && tagsRef" class="tag-item">
    <router-link :to="'/tags/' + tag.alias">
      {{ tag.name }}
    </router-link>
  </div>
</template>

<style scoped>
.tag-item {
  font-size: 1.5em;
  margin-top: 20px;

}
</style>