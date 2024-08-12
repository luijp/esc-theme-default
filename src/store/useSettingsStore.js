import {ref} from "vue";
import * as settingsApi from '../api/settings.js'

export const settingsRef = ref({global: null, custom: null})
export const settingsLoaded = ref(false)
const init = async () => {
    settingsRef.value.global = await settingsApi.getGlobalSettings()
    settingsRef.value.custom = await settingsApi.getCustomSettings()
}
init().then(() => {
    settingsLoaded.value = true
})
