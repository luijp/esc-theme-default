<script setup>
import * as postApi from '../../api/post.js'
import {useRoute,useRouter} from 'vue-router'
import formatDate from '../../util/formatDate.js'

const route = useRoute()
const router = useRouter()
import {computed, ref, watchEffect} from "vue";
const microListRef = ref()
const currentPageNumRef = ref(Number(route.params.currentPage) || 1)
const isLoaded = ref(false)
watchEffect(async ()=>{
  isLoaded.value = false
  await router.push("/micro/" + currentPageNumRef.value)
  microListRef.value = await postApi.getPostList(currentPageNumRef.value,50,3)
  isLoaded.value = true
})

</script>

<template>
<div class="micro-container" v-if="isLoaded">
  <el-empty description="暂无碎语" v-if="microListRef.total === 0"/>
  <div class="micro-item" v-for="microItem in microListRef.postsList" >
    <div class="meta-info">
      {{ formatDate(microItem.createTime,0) }}
    </div>
    <div class="content">
      {{ microItem.content }}
    </div>
  </div>

  <el-pagination
      layout="prev, pager, next"
      :total="microListRef.total"
      :page-size="50"
      v-model:current-page="currentPageNumRef"
      :hide-on-single-page="true"
  />
</div>
</template>

<style scoped>
.micro-item{
  margin-top: 20px;
  .meta-info{
    font-size: 0.8em;
    color: #585858;
  }
  .content{
    margin-top: 5px;
  }
}
.el-pagination{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>