import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {

    private messageSource = new BehaviorSubject({ text: 'default message', type: 'i' });
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: any) {
        this.messageSource.next(message)
    }

}