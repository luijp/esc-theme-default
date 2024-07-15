<script setup>
import Header from './component/Header/index.vue'
import Footer from './component/Footer/index.vue'
</script>

<template>
<div class="app-container">
  <div class="header">
    <Header />
  </div>
  <div class="content">
    <RouterView />
  </div>
  <div class="footer">
    <Footer />
  </div>
</div>
</template>

<style scoped>
.app-container{
  width: 1000px;
  margin: 0 auto;
}
.content{
  min-height: 75vh;
  margin: 50px;
}
</style>
