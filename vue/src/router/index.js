import { createRouter as createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Import components
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import RegisterView from '../views/RegisterView.vue';
import NotFoundView from "../views/NotFoundView.vue";





import PermitCreateView from "../views/PermitCreateView.vue";
import PermitSearchView from "../views/PermitSearchView.vue";
import PermitCustomerView from "../views/PermitCustomerView.vue";
import PermitInspectionCreateView from "../views/PermitInspectionCreateView.vue";
import PermitInspectionResultsView from "../views/PermitInspectionResultsView.vue"
import PermitApproveRejectView from "../views/PermitApproveRejectView.vue"
import PermitUploadFileView from "../views/PermitUploadFileView.vue"



import InspectionEmployeeView from "../views/InspectionEmployeeView.vue";
import InspectionEditView from "../views/InspectionEditView.vue";
import InspectionUploadFileView from "../views/InspectionUploadFileView.vue";



import EmployeeHomeView from "../views/EmployeeHomeView.vue";
import CustomerHomeView from "../views/CustomerHomeView.vue";

import PermitStatisticsView from "../views/PermitStatisticsView.vue";
import ArchiveView from "../views/ArchiveView.vue"

//ADDED
import CustomerPermitEditView from "../views/CustomerPermitEditView.vue"
//ADDED end
/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: "notFound",
    component: NotFoundView,
  },

  

  // {
  //   path: '/permit',
  //   name: "permit",
  //   component: PermitView,
  // },

  {
    path: '/inspection',
    name: "inspectionRequests",
    component: InspectionEmployeeView,
    meta: {
      requiresAuth: true,
      requiresEmployeeAuth: true
    }
  },

  {
    path: '/inspection/:inspectionId/upload',
    name: "inspectionUploadFile",
    component: InspectionUploadFileView,
    meta: {
      requiresAuth: true,
    }
  },

  //  {
  //    path: '/inspection/:inspectionId',
  //    name: "inspectionEdit",
  //    component: InspectionEditView,
  //    meta: {
  //      requiresAuth: true,
  //      requiresEmployeeAuth: true,
  //    }
  //  },
  {
    path: '/inspection/:inspectionId/:dateVariable',
    name: "inspectionEdit",
    component: InspectionEditView,
    meta: {
      requiresAuth: true,
      requiresEmployeeAuth: true,
    }
  },


  {
    path: '/permit/create',
    name: "createPermit",
    component: PermitCreateView,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/permit/search',
    name: "searchPermit",
    component: PermitSearchView,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/permit/user/:userId',
    name: "customerPermits",
    component: PermitCustomerView,
    meta: {
      requiresAuth: true,
      requiresCustomerAuth: true
    }
  },

  {
    path: '/permit/:permitId/inspection',
    name: "permitCreateInspection",
    component: PermitInspectionCreateView,
    meta: {
      requiresAuth: true,
      requiresCustomerAuth: true
    }
  },

  {
    path: '/permit/:permitId/inspection/results',
    name: "permitInspectionResults",
    component: PermitInspectionResultsView,
    meta: {
      requiresAuth: true,
      requiresCustomerAuth: true,
    }
  },


  {
    path: '/permit/:permitId/approve-reject',
    name: "permitApproveReject",
    component: PermitApproveRejectView,
    meta: {
      requiresAuth: true,
      requiresEmployeeAuth: true,
    }
  },

  {
    path: '/permit/:permitId/upload',
    name: "permitUploadFile",
    component: PermitUploadFileView,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/employee',
    name: "employee",
    component: EmployeeHomeView,
    meta: {
      requiresAuth: true,
      requiresEmployeeAuth: true
    }
  },

  {
    path: '/customer',
    name: "customer",
    component: CustomerHomeView,
    meta: {
      requiresAuth: true,
      requiresCustomerAuth: true
    }
  },
  {
    path: "/reports",
    name: "reports",
    component: PermitStatisticsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/customer/archive",
    name: "archive",
    component: ArchiveView,
    meta: {
      requiresAuth: true
    }
  },
  //ADDED-----------------
  {
    path: "/edit-permit/:permitId",
    name: "customerEditPermit",
    component: CustomerPermitEditView,
    meta: {
      requiresAuth: true
    }
  },
  //End ADDED
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {

  // Get the Vuex store
  const store = useStore();

  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  
  // Determine if the route requires Employee Authentication
  const requiresEmployeeAuth = to.matched.some(x => x.meta.requiresEmployeeAuth);

    // Determine if the route requires Customer Authentication
  const requiresCustomerAuth = to.matched.some(x => x.meta.requiresCustomerAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (store.state.user.role != 'admin' && requiresEmployeeAuth) {
    console.log("Not signed in as employee. Redirected to login view.")
    return {name: "login"};
  }
  if (store.state.user.role != 'user' && requiresCustomerAuth) {
    console.log("Not signed in as customer. Redirected to login view.")
    return {name: "login"};
  }
  if (requiresAuth && store.state.token === '') {
    console.log("Not logged in. Redirected to login view.")
    return {name: "login"};
  }
  // Otherwise, do nothing and they'll go to their next destination
});

export default router;
