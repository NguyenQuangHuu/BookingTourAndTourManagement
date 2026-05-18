import {Routes} from '@angular/router'
export const authRoutes : Routes = [{
    path:'',redirectTo:'user',pathMatch:'full'
},
{
    path:'user',loadComponent:()=>import('../pages/user/user-login/user-login').then(auth=>auth.UserLogin)
},{
    path:'admin', loadComponent:()=>import('../pages/admin/admin-login/admin-login').then(auth=>auth.AdminLogin)
}
]