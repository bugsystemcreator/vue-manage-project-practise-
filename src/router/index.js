import VueRouter from "vue-router";
import Main from '../views/Main'
import User from '../views/User'
import Home from '../views/Home'
import Mall from '../views/Mall'
import PageOne from '../views/others/PageOne'
import PageTwo from '../views/others/PageTwo'

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
             name:'main',
             component:Main
            , children:[{
                path:'/',
                name:'home',
                component:Home
             } 
             , 
              {
                path:'/user',
                name:'user',    
                component:User
            },
              {
                path:'/mall',
                name:'mall',    
                component:Mall
            },
              {
                path:'/page1',
                name:'page1',    
                component:PageOne
            },
              {
                path:'/page2',
                name:'page2',    
                component:PageTwo
            }
            ]
        }
    ]
})