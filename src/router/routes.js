
const routes = [
  {
    path: '/',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/about',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/About.vue') }
    ]
  },
  {
    path: '/products',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Products.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/orders',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Orders.vue') }
    ]
  },
  {
    path: '/board',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Board.vue') }
    ]
  },
  {
    path: '/logout',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Logout.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
