import request from './request.js'

export async function getGlobalSettings(){
    return await request.get('/settings/global')
}

export async function getCustomSettings(){
    return await request.get('/settings/custom')
}