import { Injectable } from '@angular/core';
import { TempModel } from '../models/temp.model';
import { LightIntensityModel } from '../models/light-intensity.model';
import { KidBrightService } from './kid-bright.service';
import { MessageService } from './message.service';
import { RepollGetMessageService } from './repoll-get-message.service';
import { DatetimeModel } from '../models/datetime.model';
import { BotMessage } from '../constants/bot-message';

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
        this.messageService.setMessage('bot', BotMessage.setTemp)
        this.repollGetMessageService.notify()
      }
      else if(chatInput.includes('เปิดไฟ') || chatInput.includes('ปิดไฟ')) {
        if (chatInput.includes('เปิดไฟ') && this.LEDstatus == true) {
          this.messageService.setMessage('bot', BotMessage.LightIsOn, this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
          this.repollGetMessageService.notify()
        }
        else if(chatInput.includes('เปิดไฟ') && this.LEDstatus == false){
          return this.toggleLed(true)
        }
        else if (chatInput.includes('ปิดไฟ') && this.LEDstatus == true) {
          return this.toggleLed(false)
        }
        else{
          this.messageService.setMessage('bot', BotMessage.LightIsOff, this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
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
    this.messageService.setMessage('bot', 'loading')
    this.kidBrightService.getTemp().subscribe(
      (data: TempModel) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', `${data.value} °C`, 'อุณหภูมิขณะนี้')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', BotMessage.getTempFailed)
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }

  toggleLed(setStatus: boolean) {
    const status = (setStatus ? "ON":"OFF" )
    this.messageService.setMessage('bot', 'loading')
    this.kidBrightService.toggleLed(status).subscribe(
      (res) => {
        this.LEDstatus = !this.LEDstatus
        this.messageService.popMessage()
        this.messageService.setMessage('bot', (this.LEDstatus? 'เปิด':'ปิด')+'ไฟเรียบร้อย', this.LEDstatus? 'เปิดไฟ':'ปิดไฟ')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', 'อ๊ะ เกิดข้อผิดพลาดในการ' +(this.LEDstatus? 'เปิด':'ปิด')+ 'ไฟ กรุณาลองใหม่อีกครั้งในภายหลัง')
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }

  getLightIntensity(){
    this.messageService.setMessage('bot', 'loading')
    this.kidBrightService.getLightIntensity().subscribe(
      (data: LightIntensityModel) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', `${data.value} cd`, 'ความเข้มแสงขณะนี้')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', BotMessage.getLightIntensityFailed)
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }

  setTemp(tempInput: number){
    this.messageService.setMessage('bot', 'loading')
    this.kidBrightService.setTemp(tempInput).subscribe(
      (res) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', `ตั้งแจ้งเตือนอุณหภูมิเรียบร้อย : ${tempInput} °C`, 'ตั้งอุณหภูมิ')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', BotMessage.setTempFailed)
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }

  getDateTime(){
    this.messageService.setMessage('bot', 'loading')
    this.kidBrightService.getDatetime().subscribe(
      (data: DatetimeModel) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', `${data.datetime}`, 'วันเวลาขณะนี้')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', BotMessage.getDateTimeFailed)
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }

  setTimer(input: string){
    this.messageService.setMessage('bot', 'loading')
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
        this.messageService.popMessage()
        this.messageService.setMessage('bot', message, 'ตั้งนับเวลาถอยหลัง')
      },
      (err) => {
        this.messageService.popMessage()
        this.messageService.setMessage('bot', BotMessage.setTimerFailed)
      },
      () => {
        this.repollGetMessageService.notify()
      }
    )
  }
}

