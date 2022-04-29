import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { RepollGetMessageService } from 'src/app/services/repoll-get-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy  {
  private repollSubscription: Subscription = new Subscription;
  msg_list: Array<string> = []

  constructor(private repollGetMessageService: RepollGetMessageService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.repollGetMessageService.obs.subscribe(() => this.fetchMessageList())
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  fetchMessageList() {
    this.msg_list = this.messageService.getMessageList();
  }
}
