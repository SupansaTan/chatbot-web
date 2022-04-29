import { TempModel } from './models/temp.model';
import { LightModel } from './models/light.model';
import { Component } from '@angular/core';
import { KidBrightService } from './services/kid-bright.service';

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

  constructor(private kidBrightService: KidBrightService) {}

  ngOnInit(): void {
    this.openLed = false
  }

  getTemp() {
    this.kidBrightService.getTemp().subscribe(
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
    else {
      this.LEDstatus = "OFF"
    }

    this.kidBrightService.toggleLed(this.LEDstatus).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => console.log(err)
    )
  }

  getLight(){
    this.kidBrightService.getLight().subscribe(
      (data: LightModel) => {
        this.light = data.value
      }
    )
  }
}
