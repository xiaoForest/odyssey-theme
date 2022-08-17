import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import Index from '@/views/index'
import Page from '@/views/page'
import TopicList from '@/views/topicList'
import Details from '@/views/details'
import ArticleDetails from '@/views/articleDetails'
import SearchPage from '@/views/searchPage'
const Router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: {
      keepAlive: true,
      showFooter: true,
    }
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('@/views/page.vue'),
    meta: {
      keepAlive: false,
      showFooter: true,
    }
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/topicList',
    name: 'topicList',
    component: TopicList
  },
  {
    path: '/articleDetails',
    name: 'articleDetails',
    component: ArticleDetails
  },
  {
    path: '/searchPage',
    name: 'searchPage',
    component: SearchPage
  },
  ]
})

export default Router