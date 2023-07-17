import { ResolveFn } from '@angular/router';

export const preloadResolver: ResolveFn<string> = (route, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('我处理完数据了');
    }, 2000);
  });
};
