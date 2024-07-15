import {onMounted, ref} from "vue";
import * as settingsApi from '../api/settings.js'

const settingsRef = ref({global:null,custom:null})
settingsRef.value.global = await settingsApi.getGlobalSettings()
settingsRef.value.custom = await settingsApi.getCustomSettings()
export default settingsRef