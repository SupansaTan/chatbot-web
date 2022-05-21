import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  datetime: string = ''
  today: Date = new Date()
  timeSelect: string = ''
  @Input() ledStatus: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.today = new Date()
    this.datetime = this.convertDate(this.today)
    this.timeSelect = this.today.toTimeString().split(' ')[0]
  }

  convertDate(date: Date) {
    function pad(s: number) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
  }

  setTimeoutToggleLed() {
    const year = this.datetime.substring(2, 4)
    const month = this.datetime.substring(5, 7)
    const day = this.datetime.substring(8)
    const datetime = [day, month, year].join('/') + " " + this.timeSelect
    const ledStatusStr = this.ledStatus ? "ON":"OFF"
    this.chatService.setDatetimeToggleLED(ledStatusStr, datetime)
  }
}
