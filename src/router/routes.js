const Index = () => import(/* webpackChunkName: "index" */ '@/pages/index.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/pages/about.vue')

export default [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'about',
    path: '/about',
    component: About
  }
]
