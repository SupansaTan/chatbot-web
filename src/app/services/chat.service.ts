import { Injectable } from '@angular/core';
import { TempModel } from '../models/temp.model';
import { LightIntensityModel } from '../models/light-intensity.model';
import { KidBrightService } from './kid-bright.service';
import { MessageService } from './message.service';
import { RepollGetMessageService } from './repoll-get-message.service';
import { DatetimeModel } from '../models/datetime.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private LEDstatus: boolean = false
  TempToSet: number = 34
  keyword: Array<string> = []

  constructor(private kidBrightService: KidBrightService,
              private messageService: MessageService,
              private repollGetMessageService: RepollGetMessageService) {
    this.keyword = ['คำสั่ง','ตั้งอุณหภูมิ', 'อุณหภูมิขณะนี้', 'เปิดไฟ', 'ปิดไฟ', 'ความเข้มแสงขณะนี้', 'นับถอยหลัง', 'เวลา']
  }

  findKeyword(chatInput: string) {
    this.messageService.setMessage(chatInput)

    if(this.keyword.some(key => chatInput.includes(key))) {
      if(chatInput.includes('คำสั่ง')) {
        this.messageService.setMessage("ตั้งอุณหภูมิ อุณหภูมิขณะนี้ เปิดไฟ ปิดไฟ ความเข้มแสงขณะนี้ นับถอยหลัง เวลา")
        this.repollGetMessageService.notify()
      }
      else if(chatInput.includes('อุณหภูมิขณะนี้')) {
        return this.getTemp()
      }
      else if(chatInput.includes('ตั้งอุณหภูมิ')) {
        return this.setTemp(chatInput)
      }
      else if(chatInput.includes('เปิดไฟ') || chatInput.includes('ปิดไฟ')) {
        this.LEDstatus = (chatInput.includes('เปิดไฟ') ? true:false )
        return this.toggleLed()
      }
      else if(chatInput.includes('ความเข้มแสงขณะนี้')) {
        return this.getLightIntensity()
      }
      else if(chatInput.includes('นับถอยหลัง')) {
        return this.setTimer()
      }
      else if(chatInput.includes('เวลา')) {
        return this.getDateTime()
      }
    }
    else {
      this.messageService.setMessage(`คำสั่ง '${chatInput}' ไม่มีในระบบน้า`)
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

  setTemp(chatInput: string){
    console.log('alarm temp');
    // เหลือเซ็ต this.TempToSet = เลขใน chatInput
    this.kidBrightService.setTemp(this.TempToSet).subscribe(
      (res) => {
        console.log(res)
        this.messageService.setMessage(`ตั้งแจ้งเตือนอุณหภูมิเรียบร้อย`)
        this.repollGetMessageService.notify()
      }
    )
  }

  getDateTime(){
    console.log('get date time');
    this.kidBrightService.getDatetime().subscribe(
      (data: DatetimeModel) => {
        this.messageService.setMessage(`วันเวลาขณะนี้: ${data.datetime}`)
        this.repollGetMessageService.notify()
      }
    )
  }

  setTimer(){
    console.log('time stop');
    
  }
}

