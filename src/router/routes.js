const Index = () => import(/* webpackChunkName: "index" */ '@/pages/index.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/pages/about.vue')
const FooMsg = () =>
  import(/* webpackChunkName: "foo-msg" */ '@/pages/foo/_msg.vue')

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
  },
  {
    name: 'foo-msg',
    path: '/foo/:msg?',
    component: FooMsg
  }
]
