import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private msg_list: Array<MessageModel> = []

  constructor() {
    this.msg_list.push({
      author: 'bot',
      message: 'สวัสดีค้าบบ มีอะไรให้เราช่วยเหลือไหม?'
    })
    this.msg_list.push({
      author: 'bot',
      message: "พิมพ์ 'คำสั่ง' เพื่อดูคำสั่งทั้งหมด"
    })
  }

  getMessageList(): Array<MessageModel> {
    return this.msg_list
  }

  setMessage(author: string, value: string) {
    this.msg_list.push({
      author: author,
      message: value
    })
  }
}
