import request from './request.js'

export async function getCategoriesByPostId(postId) {
    return await request.get('/categories/get/' + postId)
}

export async function getAllCategories() {
    return await request.get('/categories/')
}

export async function getCategoriesList() {
    return await request.get('/categories/list')
}

export async function getCategoryIdByAlias(alias) {
    return await request.get('/categories/alias/' + alias)
}