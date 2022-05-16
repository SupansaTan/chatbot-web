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
  keyword: Array<string> = []

  constructor(private kidBrightService: KidBrightService,
              private messageService: MessageService,
              private repollGetMessageService: RepollGetMessageService) {
    this.keyword = ['คำสั่ง','ตั้งอุณหภูมิ', 'อุณหภูมิขณะนี้', 'เปิดไฟ', 'ปิดไฟ', 'ความเข้มแสงขณะนี้', 'นับถอยหลัง', 'เวลาขณะนี้']
  }

  findKeyword(chatInput: string) {
    this.messageService.setMessage('user', chatInput)

    if(this.keyword.some(key => chatInput.includes(key))) {
      if(chatInput.includes('คำสั่ง')) {
        this.messageService.setMessage('bot', "คำสั่ง")
        this.repollGetMessageService.notify()
      }
      else if(chatInput.includes('อุณหภูมิขณะนี้')) {
        return this.getTemp()
      }
      else if(chatInput.includes('ตั้งอุณหภูมิ')) {
        this.messageService.setMessage('bot', "ใส่อุณหภูมิที่ต้องการได้เลย")
        this.repollGetMessageService.notify()
      }
      else if(chatInput.includes('เปิดไฟ') || chatInput.includes('ปิดไฟ')) {
        if (chatInput.includes('เปิดไฟ') && this.LEDstatus == true) {
          this.messageService.setMessage('bot', 'ไฟเปิดอยู่แล้ว', this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
          this.repollGetMessageService.notify()
        } 
        else if(chatInput.includes('เปิดไฟ') && this.LEDstatus == false){
          this.LEDstatus = (chatInput.includes('เปิดไฟ') ? true:false )
          return this.toggleLed()
        }
        else if (chatInput.includes('ปิดไฟ') && this.LEDstatus == true) {
          this.LEDstatus = (chatInput.includes('เปิดไฟ') ? true:false )
          return this.toggleLed()
        } 
        else{
          this.messageService.setMessage('bot', 'ไฟปิดอยู่แล้ว', this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
          this.repollGetMessageService.notify()
        }
        
      }
      else if(chatInput.includes('ความเข้มแสงขณะนี้')) {
        return this.getLightIntensity()
      }
      else if(chatInput.includes('นับถอยหลัง')) {
        this.messageService.setMessage('bot', "นับถอยหลัง")
      }
      else if(chatInput.includes('เวลาขณะนี้')) {
        return this.getDateTime()
      }
    }
    else if(!isNaN(Number(chatInput))) {
      // set temperature
      return this.setTemp(Number(chatInput))
    }
    else if(chatInput.includes(':')) {
      return this.setTimer(chatInput)
    }
    else {
      this.messageService.setMessage('bot', `คำสั่ง '${chatInput}' ไม่มีในระบบน้า`)
    }
  }

  getTemp() {
    this.kidBrightService.getTemp().subscribe(
      (data: TempModel) => {
        this.messageService.setMessage('bot', `${data.value} °C`, 'อุณหภูมิขณะนี้')
        this.repollGetMessageService.notify()
      }
    )
  }

  toggleLed() {
    const status = (this.LEDstatus ? "ON":"OFF" )
    this.kidBrightService.toggleLed(status).subscribe(
      (res) => {
        this.messageService.setMessage('bot', (this.LEDstatus? 'เปิด':'ปิด')+'ไฟเรียบร้อย', this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
        this.repollGetMessageService.notify()
      }
    )
  }

  getLightIntensity(){
    this.kidBrightService.getLightIntensity().subscribe(
      (data: LightIntensityModel) => {
        this.messageService.setMessage('bot', `${data.value} cd`, 'ความเข้มแสงขณะนี้')
        this.repollGetMessageService.notify()
      }
    )
  }

  setTemp(tempInput: number){
    this.kidBrightService.setTemp(tempInput).subscribe(
      (res) => {
        console.log(res)
        this.messageService.setMessage('bot', `ตั้งแจ้งเตือนอุณหภูมิเรียบร้อย : ${tempInput} °C`, 'ตั้งอุณหภูมิ')
        this.repollGetMessageService.notify()
      }
    )
  }

  getDateTime(){
    this.kidBrightService.getDatetime().subscribe(
      (data: DatetimeModel) => {
        this.messageService.setMessage('bot', `${data.datetime}`, 'วันเวลาขณะนี้')
        this.repollGetMessageService.notify()
      }
    )
  }

  setTimer(input: string){
    console.log('timer')
    let hour,min,sec,time: number = 0
    let message: string
    hour = Number(input.substring(0, 2))
    min = Number(input.substring(3, 5))
    sec = Number(input.substring(6, 8))
    if(hour == 0 && min == 0) {
      // seconds only
      time = sec
      message = `${sec} วินาที`
    }
    else if(hour == 0) {
      // have minutes and seconds (mm:ss)
      time = (min*60) + sec 
      message = `${min} นาที ${sec} วินาที`
    }
    else {
      // HH:mm:ss
      time = (hour*3600) + (min*60) + sec 
      message = `${hour} ชั่วโมง ${min} นาที ${sec} วินาที`
    }
    this.kidBrightService.setTimer(time).subscribe(
      (res) => {
        console.log(res)
        this.messageService.setMessage('bot', message, 'ตั้งนับเวลาถอยหลัง')
        this.repollGetMessageService.notify()
      }
    )
  }
}

