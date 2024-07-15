<script setup>
import useSettingsStore from '../../store/useSettingsStore.js'
import {onMounted, ref} from "vue";
import settingsRef from "../../store/useSettingsStore.js";
const isLoaded = ref(false)
onMounted(async ()=>{
  settingsRef.value = await useSettingsStore.value
  isLoaded.value = true
})
let hostname = window.location.hostname;
</script>

<template>
<div class="footer-container" v-if="isLoaded">
  <p>
    <span>Copyright &copy; 2024 {{ hostname }}</span>
    <span><a href="https://beian.miit.gov.cn/" target="_blank">{{ settingsRef.global.icp }}</a></span>
  </p>
  <p>
    <span>Powered by ESC</span>
    <span>Theme Esc-theme-default</span>
  </p>


</div>
</template>

<style scoped>
.footer-container {
  text-align: center;
  font-size: 12px;
  color: #808080;
  margin: 20px;
  p{
    margin-top: 10px;
  }
  span{
    margin-right: 10px;
  }
}
</style>