import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-message-dlg',
    templateUrl: './message-dlg.component.html',
    styleUrls: ['./message-dlg.component.css']
})
export class MessageDlgComponent implements OnInit {

    dlgAction = this.data.action;
    dlgMessage = this.data.msg;

    color: string = 'primary';
    title: string = 'Information';
    icon: string = 'info';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        switch (this.dlgAction) {
            case 'w':
                this.color = 'accent';
                this.title = 'Warning';
                this.icon = 'warning';
                break;
            case 'e':
                this.color = 'warn';
                this.title = 'Error';
                this.icon = 'error';
                break;

        }

    }

}
