import request from './request.js'

export async function getPostList(pageNum, pageSize = 10, type = 1) {
    return await request.get(`/posts/list/${pageNum}/${pageSize}/${type}`)
}

export async function getPost(id) {
    return await request.get(`/posts/get/${id}`)
}

export async function getPostListByTagId(pageNum, id) {
    return await request.get(`/posts/list/tags/${pageNum}/50/1/${id}`)
}

export async function getPostListByCategoryId(pageNum, id) {
    return await request.get(`/posts/list/categories/${pageNum}/50/1/${id}`)
}