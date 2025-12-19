import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { App } from './app';
import { MainLayout } from './layouts/user/main-layout/main-layout';
import { AdminLayout } from './layouts/admin/admin-layout/admin-layout';
import { authGuard } from './guards/auth-guard';
import { AuthLayout } from './layouts/auth/auth-layout/auth-layout';
export const routes: Routes = [
    {
        path:'',component:MainLayout,loadChildren:()=>import('./routes/user.route').then(u=>u.userRoute)
    },
    {
        path:'auth',component:AuthLayout,loadChildren:()=>import('./routes/auth.route').then(auth => auth.authRoutes)
    },
    {
        path:'admin',component:AdminLayout, loadChildren:()=>import('./routes/admin.route').then(a=>a.adminRoutes)
    }
];
