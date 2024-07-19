import request from './request.js'

export async function getAttachView(uuid){
    return await request.get(`/attach/image/${uuid}`)
}

export async function getAttachDownload(uuid){
    return await request.get(`/attach/download/${uuid}`)
}