import { TempModel } from './temp.model';
import { LightModel } from './light.model';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'chat-bot';
  openLed: boolean = false
  temp: string = ''
  light: string = ''
  LEDstatus: string = ''

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.openLed = false
  }

  getTemp() {
    this.appService.getTemp().subscribe(
      (data: TempModel) => {
        this.temp = data.value
      }
    )
  }

  toggleLed() {
    this.openLed = !this.openLed
    if (this.openLed == true) {
      this.LEDstatus = "ON"
    }
    else { this.LEDstatus = "OFF"}
    this.appService.toggleLed(this.LEDstatus).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => console.log(err)
    )
  }

  getLight(){
    this.appService.getLight().subscribe(
      (data: LightModel) => {
        this.light = data.value
      }
    )
  }
}
