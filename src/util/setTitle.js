import {ref, watchEffect} from "vue";

const siteTitle = ref('ESC Default')
const routeTitle = ref('')

watchEffect(()=>{
    document.title = `${routeTitle.value} - ${siteTitle.value}`
})

export default {siteTitle,routeTitle};