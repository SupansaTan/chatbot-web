import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ChatService } from 'src/app/services/chat.service';
import { RepollGetMessageService } from 'src/app/services/repoll-get-message.service';
import { MessageModel } from '../../models/message.model';
import { CommandModel, Commands } from 'src/app/constants/command';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy  {
  private repollSubscription: Subscription = new Subscription;
  commands: Array<CommandModel> = Commands;
  msg_list: Array<MessageModel> = []

  constructor(private repollGetMessageService: RepollGetMessageService,
              private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.fetchMessageList()
    this.repollGetMessageService.obs.subscribe(() => this.fetchMessageList())
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  fetchMessageList() {
    this.msg_list = this.messageService.getMessageList();
  }

  commandBtn(cmd: string) {
    this.chatService.findKeyword(cmd);
  }
}
