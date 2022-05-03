import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ChatService } from 'src/app/services/chat.service';
import { RepollGetMessageService } from 'src/app/services/repoll-get-message.service';
import { MessageModel } from '../../models/message.model';
import { CommandModel, Commands } from 'src/app/constants/command';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy  {
  private repollSubscription: Subscription = new Subscription;
  commands: Array<CommandModel> = Commands;
  msg_list: Array<MessageModel> = []
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  @ViewChild('messageContainer') private MessageContainer!: ElementRef;
  @ViewChildren("messageWrapper") messageWrapper!: QueryList<ElementRef>;

  constructor(private repollGetMessageService: RepollGetMessageService,
              private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.fetchMessageList()
    this.repollGetMessageService.obs.subscribe(() => this.fetchMessageList())
  }

  ngAfterViewInit() {
    this.messageWrapper.changes.subscribe(() => {
      this.scrollToBottom()
    });
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

  scrollToBottom() {
    this.MessageContainer.nativeElement.scrollTop = this.MessageContainer.nativeElement.scrollHeight;
  }

  setTimer() {
    const hour = this.time.hour<10 ? '0'+this.time.hour:this.time.hour
    const minute = this.time.minute<10 ? '0'+this.time.minute:this.time.minute
    const second = this.time.second<10 ? '0'+this.time.second:this.time.second
    this.chatService.findKeyword(`${hour}:${minute}:${second}`);
  }
}
