import { Routes } from "@angular/router";
import { Dashboard } from "../pages/dashboard/dashboard";

export const adminRoutes : Routes = [
        {
            path:'',redirectTo:'dashboard',pathMatch:'full'
        },
        {
            path:'dashboard',loadComponent:()=>import('../pages/dashboard/dashboard').then(a=>a.Dashboard),title:'Dashboard'
        },

    ]