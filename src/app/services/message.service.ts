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
    this.msg_list.push({
      author: 'bot',
      message: "คำสั่ง"
    })
  }

  getMessageList(): Array<MessageModel> {
    return this.msg_list
  }

  getLength(): number {
    return this.msg_list.length
  }

  setMessage(author: string, value: string, command?: string) {
    if(command) {
      this.msg_list.push({
        author: author,
        message: value,
        type: command
      })
    }
    else {
      this.msg_list.push({
        author: author,
        message: value
      })
    }
  }

  popMessage(index?: number) {
    if(index && index > -1) {
      this.msg_list.splice(index, 1)
    }
    else {
      this.msg_list.pop()
    }
  }
}
