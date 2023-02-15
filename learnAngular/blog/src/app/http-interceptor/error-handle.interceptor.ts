import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Article } from '../model/Article.mode';
import { MessageType } from '../model/message-type';
import { MyResponse } from '../model/MyResponse';
import { MsgService } from '../services/msg.service';

@Injectable()
export class ErrorHandleService implements HttpInterceptor {

  constructor(private msg:MsgService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          this.msg.createMassage(MessageType.error,"未授权")
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  // map((response:HttpResponse<MyResponse<Article[]>>)=>{
  //   if(response.body?.code === 200){
  //     return response.body.data
  //   }else{
  //     return response.body
  //   }
  // })
}
