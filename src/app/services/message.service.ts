import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private msg_list: Array<string> = []

  constructor() {
    this.msg_list.push('สวัสดีค้าบบ มีอะไรให้เราช่วยเหลือไหม?')
  }

  getMessageList(): Array<string> {
    return this.msg_list
  }

  setMessage(value: string) {
    this.msg_list.push(value)
  }
}
