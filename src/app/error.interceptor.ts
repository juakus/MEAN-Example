import { MatDialog } from '@angular/material';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageDlgComponent } from './common/messages/message-dlg.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let msg = error.error.message || 'An unknown error occurred';

                this.dialog.open(MessageDlgComponent, {
                    width: '400px',
                    data: {
                        msg: msg,
                        action: 'e'
                    },
                    panelClass: 'custom-dialog-container'
                });
                return throwError(error);
            })
        );
    }
}