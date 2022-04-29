import { Injectable } from '@angular/core';
import { TempModel } from '../models/temp.model';
import { LightIntensityModel } from '../models/light-intensity.model';
import { KidBrightService } from './kid-bright.service';
import { MessageService } from './message.service';
import { RepollGetMessageService } from './repoll-get-message.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private LEDstatus: boolean = false
  keyword: Array<string> = []

  constructor(private kidBrightService: KidBrightService,
              private messageService: MessageService,
              private repollGetMessageService: RepollGetMessageService) {
    this.keyword = ['ตั้งอุณหภูมิ', 'อุณหภูมิขณะนี้', 'เปิดไฟ', 'ปิดไฟ', 'ความเข้มแสงขณะนี้', 'นับถอยหลัง']
  }

  findKeyword(chatInput: string) {
    this.messageService.setMessage(chatInput)

    if(this.keyword.some(key => chatInput.includes(key))) {
      if(chatInput.includes('อุณหภูมิขณะนี้')) {
        return this.getTemp()
      }
      else if(chatInput.includes('เปิดไฟ') || chatInput.includes('ปิดไฟ')) {
        this.LEDstatus = !this.LEDstatus
        return this.toggleLed()
      }
      else if(chatInput.includes('ความเข้มแสงขณะนี้')) {
        return this.getLightIntensity()
      }
    }
    else {
      this.messageService.setMessage(`คำสั่ง '${chatInput}' ไม่่มีในระบบน้า`)
    }
  }

  getTemp() {
    this.kidBrightService.getTemp().subscribe(
      (data: TempModel) => {
        this.messageService.setMessage(`อุณหภูมิขณะนี้: ${data.value} °C`)
        this.repollGetMessageService.notify()
      }
    )
  }

  toggleLed() {
    const status = (this.LEDstatus ? "ON":"OFF" )

    this.kidBrightService.toggleLed(status).subscribe(
      (res) => {
        console.log(res)
        this.repollGetMessageService.notify()
      }
    )
  }

  getLightIntensity(){
    this.kidBrightService.getLightIntensity().subscribe(
      (data: LightIntensityModel) => {
        this.messageService.setMessage(`ความเข้มแสงขณะนี้: ${data.value} SI`)
        this.repollGetMessageService.notify()
      }
    )
  }
}
