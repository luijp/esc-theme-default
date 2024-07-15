<script setup>
import useSettingsStore from '../../store/useSettingsStore.js'
import {onMounted, ref} from "vue";
const settingsRef = ref({global:null,custom:null})
const isLoaded = ref(false);
onMounted(async ()=>{
  settingsRef.value = await useSettingsStore.value
  isLoaded.value = true
})
</script>

<template>
<div class="header-container" v-if="isLoaded">
  <div class="logo">
    <div class="avatar" v-if="settingsRef.custom.hasOwnProperty('avatar')">
      <img :src="settingsRef.custom.avatar" alt="avatar" v-if="settingsRef.custom.avatar" height="50px" width="50px">
    </div>
    <div class="site-title">
      {{ settingsRef.global.hasOwnProperty('siteTitle')? settingsRef.global.siteTitle : ''}}
    </div>
  </div>



  <div class="nav">
    <router-link to="/" class="link-item">
      首页
    </router-link>

    <router-link to="/categories" class="link-item">
      分类
    </router-link>

    <router-link to="/tags" class="link-item">
      标签
    </router-link>
  </div>

</div>
</template>

<style scoped>
.header-container{
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  .logo{
    display: flex;
    align-items: center;
    .site-title{
      font-size: 1.8em;
      margin-left: 30px;
    }
  }
}
.link-item{
  color: #b0b0b0;
  margin-right: 20px;
  &.router-link-active{
  color: #686868;
}

}

</style>