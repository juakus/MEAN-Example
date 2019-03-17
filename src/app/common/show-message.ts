import { MessageService } from './message.service';
import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageDlgComponent } from './messages/message-dlg.component';

@Injectable()
export class ShowMessage {
    message: any = { text: '', type: 'i' };

    constructor(
        private dialog: MatDialog,
        private msgService: MessageService
    ) { }

    showDlg() {
        this.msgService.currentMessage.subscribe(message => {
            this.message = message;
        });

        this.dialog.open(MessageDlgComponent, {
            width: '400px',
            data: {
                msg: this.message.text,
                action: this.message.type
            },
            panelClass: 'custom-dialog-container'
        });
    }


}