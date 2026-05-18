import {Routes} from '@angular/router'
import { LandingPage } from '../pages/landing-page/landing-page'
import { MainLayout } from '../layouts/user/main-layout/main-layout'
export const userRoute : Routes = [{
    path:'',component:LandingPage,title:'Landing page'
},{
    path:'login',loadComponent:()=>import('../pages/user/user-login/user-login').then(u=>u.UserLogin)
},{
    path:'chat-bot',loadComponent:()=>import('../pages/chat-bot/chat-bot').then(c=>c.ChatBot),
}
]