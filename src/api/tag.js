import request from './request.js'

export async function getTagsByPostId(postId) {
    return await request.get('/tags/get/' + postId)
}

export async function getTags() {
    return await request.get('/tags/')
}

export async function getTagIdByAlias(alias) {
    return await request.get('/tags/alias/' + alias)
}