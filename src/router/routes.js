const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'buy', component: () => import('src/pages/BuyPage.vue') },
      { path: 'examination', component: () => import('src/pages/ExaminationPage.vue') },
      { path: 'activate', component: () => import('pages/ActivatePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
