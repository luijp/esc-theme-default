import request from './request.js'

export async function getAttachView(uuid) {
    return await request.get(`/attach/image/${uuid}`)
}

export async function getAttachDownload(uuid) {
    return await request.get(`/attach/download/${uuid}`)
}

export function getAttachUrl(uuid, type = 1) {
    if (type === 1) {
        return request.defaults.baseURL + `/attach/download/${uuid}`
    } else {
        return request.defaults.baseURL + `/attach/image/${uuid}`
    }
}