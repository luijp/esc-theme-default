<script setup>

import {onMounted, ref} from "vue";
import * as categoryApi from "../../api/category.js";

const props = defineProps({
  categories: {
    type: Array,
  },
  isRoot: {
    type: Boolean,
    default: true
  }
})

const isLoaded = ref(false)
const categoriesRef = ref()
onMounted(async () => {
  if (props.isRoot) {
    categoriesRef.value = await categoryApi.getAllCategories()
  } else {
    categoriesRef.value = props.categories
  }
  isLoaded.value = true
})

</script>

<template>
  <div v-if="isLoaded" class="list-container">
    <div v-if="!categoriesRef" class="empty">
      <el-empty :image-size="150" description="暂无分类"/>
    </div>
    <div v-for="category in categoriesRef" v-if="categoriesRef" class="category-item">
      <router-link :to="'/categories/' + category.alias">
        {{ category.name }}
      </router-link>
      <Categories v-if="category.children.length >0" :categories="category" :is-root="false"/>
    </div>
  </div>

</template>

<style scoped>
.category-item {
  font-size: 1.5em;
  margin-top: 20px;
}

.list-container {
  margin-left: 10px;
}
</style>