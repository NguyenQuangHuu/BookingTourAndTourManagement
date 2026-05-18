import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core'
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const IsAdmin = false;
  if(IsAdmin){
    return true;
  }else{
    router.navigate(['admin/login'])
    return false
  }
};
