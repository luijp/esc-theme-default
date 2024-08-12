<script setup>
import {settingsLoaded, settingsRef} from '../../store/useSettingsStore.js'

let hostname = window.location.hostname;
</script>

<template>
  <div v-if="settingsLoaded" class="footer-container">
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

  p {
    margin-top: 10px;
  }

  span {
    margin-right: 10px;
  }
}
</style>