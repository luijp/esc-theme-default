import Home from './view/Home/index.vue'
import Categories from './view/Categories/index.vue'
import CategoriesItem from './view/Categories/Categories.vue'
import CategoriesDetail from './view/Categories/Detail.vue'
import Tags from './view/Tags/index.vue'
import TagsItem from './view/Tags/Tags.vue'
import TagsDetail from './view/Tags/Detail.vue'
import Post from './view/Post/index.vue'
import Micro from './view/Micro/index.vue'
import GalleryDetail from './view/Gallery/Detail.vue'
import GalleryList from './view/Gallery/List.vue'

const routes = [
    {path: '/', component: Home, meta: {title: '主页'}},
    {path: '/micro', component: Micro, meta: {title: '碎语'}},
    {
        path: '/gallery',
        children: [
            {path: '/gallery', component: GalleryList, meta: {title: '相册'}},
            {path: '/gallery/:galleryId', component: GalleryDetail, meta: {title: '相册'}}
        ]
    },
    {
        path: '/categories', component: Categories,
        meta: {title: '分类'},
        children: [
            {path: '/categories/:categoryAlias', component: CategoriesDetail, meta: {title: '分类'}},
            {path: '/categories', component: CategoriesItem, meta: {title: '分类'}},
        ]
    },
    {
        path: '/tags', component: Tags,
        meta: {title: '标签'},
        children: [
            {path: '/tags/:tagAlias', component: TagsDetail, meta: {title: '标签'}},
            {path: '/tags', component: TagsItem, meta: {title: '标签'}},
        ]
    },
    {path: '/post/:postId', component: Post, meta: {title: '文章'}},
]

export default routes