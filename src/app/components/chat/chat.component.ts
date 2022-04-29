import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat_form = new FormGroup({
    text: new FormControl('')
  })

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.chat_form = new FormGroup({
      text: new FormControl('')
    })
  }

  scanKeyword() {
    this.chatService.findKeyword(this.chat_form.controls['text'].value)
    this.initForm()
  }
}
