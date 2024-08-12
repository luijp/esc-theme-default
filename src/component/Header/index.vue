<script setup>
import {settingsLoaded, settingsRef} from '../../store/useSettingsStore.js'
</script>

<template>
  <div v-if="settingsLoaded" class="header-container">
    <div class="logo">
      <div v-if="settingsRef.custom.hasOwnProperty('avatar')" class="avatar">
        <img v-if="settingsRef.custom.avatar" :src="settingsRef.custom.avatar" alt="avatar" height="50px" width="50px">
      </div>
      <div class="site-title">
        {{ settingsRef.global.hasOwnProperty('siteTitle') ? settingsRef.global.siteTitle : '' }}
      </div>
    </div>


    <div class="nav">
      <router-link class="link-item" to="/">
        首页
      </router-link>

      <router-link class="link-item" exact to="/micro">
        碎语
      </router-link>

      <router-link class="link-item" exact to="/gallery">
        相册
      </router-link>

      <router-link class="link-item" to="/categories">
        分类
      </router-link>

      <router-link class="link-item" to="/tags">
        标签
      </router-link>
    </div>

  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  .logo {
    display: flex;
    align-items: center;

    .site-title {
      font-size: 1.8em;
      margin-left: 30px;
      font-weight: bold;
    }
  }
}

.link-item {
  color: #b0b0b0;
  margin-right: 20px;

  &.router-link-active {
    color: #686868;
  }

}

</style>