<script setup>
import 'lightbox2/dist/css/lightbox.min.css'
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js'
import * as postApi from '../../api/post.js'
import * as attachApi from '../../api/attach.js'
import {onMounted, ref} from "vue";
import {useRouter,useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter();
const route = useRoute();
const galleryRef = ref()

const isLoaded = ref(false)

onMounted(async ()=>{
  isLoaded.value = false
  galleryRef.value = await postApi.getPost(route.params.galleryId)
  if(galleryRef.value.type !== 4){
    ElMessage.error("gallery id valid")
    await router.push("/gallery")
  }
  galleryRef.value.content = JSON.parse(galleryRef.value.content)
  isLoaded.value = true
})
</script>

<template>
<div class="gallery-detail-container" v-if="isLoaded">
  <a :href="attachApi.getAttachUrl(item,2)"
     v-for="item in Object.keys(galleryRef.content)"
     :data-lightbox="galleryRef.id"
     :data-title="galleryRef.content[item].description"
  >
    <img class="img-thumb" :src="attachApi.getAttachUrl(item,2)"/>
  </a>
</div>
</template>

<style scoped>
.img-thumb{
  max-width: 14rem;
  max-height: 14rem;
  margin-left: 10px;
}
</style>