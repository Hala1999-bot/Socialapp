import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  //check token send header
  if (localStorage.getItem('token')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!,
      },
    });
  }

  return next(req);
};
