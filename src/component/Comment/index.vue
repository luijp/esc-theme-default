<script setup>
import * as commentApi from '../../api/conment.js'
import {computed, ref, watchEffect} from "vue";
import {Avatar} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import CryptoJS from 'crypto-js'

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
})
const isLoaded = ref(false)
const commentRef = ref(null)
const pageNumRef = ref(1)
const pageSizeRef = ref(20)

const refreshCommentList = async () => {
  commentRef.value = await commentApi.getComment(props.postId, pageNumRef.value, pageSizeRef.value)
  isLoaded.value = true
}

watchEffect(async () => {
  await refreshCommentList()
})

const addCommentUsernameRef = ref('')
const addCommentMailRef = ref('')
const addCommentContentRef = ref('')

const handleAddComment = async () => {
  let commentData = {
    postId: props.postId,
    username: addCommentUsernameRef.value,
    email: addCommentMailRef.value,
    content: addCommentContentRef.value,
    visible: 0,
  }
  const commentId = await commentApi.addComment(commentData)
  if (commentId === null) {
    ElMessage.error('评论失败')
  } else {
    ElMessage({
      message: '评论成功',
      type: 'success'
    })
    addCommentContentRef.value = ''
    addCommentMailRef.value = ''
    addCommentUsernameRef.value = ''
    await refreshCommentList()
  }
}

const gAvatar = computed(() => {
  return (email) => 'https://cn.gravatar.com/avatar/' + CryptoJS.SHA256(email) + '?d=123'
})
</script>

<template>
  <div v-if="isLoaded" class="comment-container">
    <el-divider border-style="dotted"/>
    <h3>添加评论</h3>
    <div class="add-comment">

      <div class="header-container">
        <div class="avatar">
          <el-icon color="gray" size="50">
            <Avatar/>
          </el-icon>
        </div>
        <div class="info">
          <el-input v-model="addCommentUsernameRef" placeholder="用户名"/>
          <el-input v-model="addCommentMailRef" placeholder="邮箱"/>
        </div>
      </div>
      <div class="content">
        <el-input
            v-model="addCommentContentRef"
            :rows="5"
            placeholder="输入你的评论"
            type="textarea"
        />
        <el-button type="primary" @click="handleAddComment">评论</el-button>
      </div>
    </div>
    <el-divider border-style="dotted"/>
    <h3>评论</h3>

    <div v-if="!commentRef.commentList" class="empty">
      <el-empty :image-size="100" description="暂无评论"/>
    </div>
    <el-empty v-if="commentRef.total === 0" description="暂无评论"/>
    <div v-for="comment in commentRef.commentList" v-if="commentRef.commentList" class="comment-list">
      <div class="user-info">
        <div class="avatar">
          <el-image :fit='"cover"' :src="gAvatar(comment.email)" lazy>
            <template #error>
              <div class="image-slot">
                <el-icon color="gray" size="25">
                  <Avatar/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="username">
          {{ comment.username }}
        </div>
      </div>

      <div class="content">
        {{ comment.content }}
      </div>
      <el-divider border-style="dashed"/>
    </div>
    <div class="example-pagination-block">
      <el-pagination v-model:current-page="pageNumRef"
                     :hide-on-single-page="true"
                     :page-count="Math.ceil(commentRef.total/commentRef.pageSize)"
                     layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  h3 {
    margin-top: 50px;
    margin-bottom: 20px;
  }
}

.add-comment {
  .header-container {
    display: flex;
    align-items: center;

    .avatar {
      flex: 0;
    }

    .info {
      min-width: 100px;

      .el-input {
        margin-left: 50px;
        margin-top: 10px;
        max-width: 300px;
      }
    }
  }

  .content {
    .el-textarea {
      margin-top: 10px;
      width: 400px;
    }

    .el-button {
      margin-left: 10px;
    }
  }

}

.comment-list {
  .user-info {
    display: flex;
    align-items: center;

    .avatar {
      flex: 0;

      .el-image {
        width: 25px;
        height: 25px;
      }
    }

    .username {
      flex: 1;
      font-size: 1em;
      font-weight: bold;
      margin-left: 30px;
    }
  }

  .content {
    margin-top: 5px;
    margin-left: 55px;
  }
}

</style>