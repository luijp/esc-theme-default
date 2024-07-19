import request from './request.js'

export async function getComment(id,pageNum=1,pageSize=10){
    return await request.get(`/comment/list/${id}/${pageNum}/${pageSize}`)
}

export async function addComment(comment){
    return await request.post('/comment/add',comment)
}