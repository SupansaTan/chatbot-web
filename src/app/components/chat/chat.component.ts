import { Component, OnInit } from '@angular/core';
import { KidBrightService } from 'src/app/services/kid-bright.service';
import { MessageService } from 'src/app/services/message.service';
import { RepollGetMessageService } from 'src/app/services/repoll-get-message.service';
import { TempModel } from 'src/app/models/temp.model';
import { LightIntensityModel } from 'src/app/models/light-intensity.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private LEDstatus: boolean = false

  constructor(private kidBrightService: KidBrightService,
              private messageService: MessageService,
              private repollGetMessageService: RepollGetMessageService) { }

  ngOnInit(): void {
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

  getLight(){
    this.kidBrightService.getLightIntensity().subscribe(
      (data: LightIntensityModel) => {
        this.messageService.setMessage(`ความเข้มแสงขณะนี้: ${data.value} SI`)
        this.repollGetMessageService.notify()
      }
    )
  }
}
