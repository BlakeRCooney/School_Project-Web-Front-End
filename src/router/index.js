import Vue from 'vue'
import VueRouter from 'vue-router'
//Static Import
import Login from '../views/Login.vue'
import Stage from '../views/Stage.vue'
import Home from '../views/Home.vue'

//Get store (Vuex)
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login",
      requiresLogin: false
    }
  },
  // {
  //       path: '/create',
  //       name: 'create',
  //       component: AccountCreation,
  //       meta: {
  //         title: "Create Account",
  //         requiresLogin: false
  //       }
  //     },
  {
    path: '/',
    name: 'Stage',
    component: Stage,
    meta: {
      title: "Home Page",
      requiresLogin: true
    },
    children: [
      {
        path: '/',
        name: "Home",
        component: Home,
        meta: {
          title: "Home",
          requiresLogin: true
        }
      },
      // Might create a whole order history page, or just load it up in a Modal, not sure yet
      // {
      //   path: '/orderHistory',
      //   name: "Order History",
      //   meta: {
      //     title: "Order History",
      //     requiresLogin: true
      //   }
      // },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: "About",
          requiresLogin: false
        },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      // component: () => {
      //   import('../views/AboutView.vue')
      // }
      },
    ]
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.meta.requiresLogin) {
    // This pages requirs Login
    // Does the vuex state say the user is logged in?
    if (store.state.isLoggedIn) {
      // The store says the user is logged in
      next();
    } else {
      // The store says the user is not logged in
      var redirect = encodeURIComponent(to.fullPath)
      next(`/login?redirect=${redirect}`)
    }    
  } else {
    // This page Does Not require Login
    next(); 
  }
  
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || "Done it"
  })
})
export default router
