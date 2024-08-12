<script setup>
import {settingsRef,settingsLoaded} from '../../store/useSettingsStore.js'
</script>

<template>
<div class="header-container" v-if="settingsLoaded">
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

    <router-link to="/micro" exact class="link-item">
      碎语
    </router-link>

    <router-link to="/gallery" exact class="link-item">
      相册
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
      font-weight: bold;
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