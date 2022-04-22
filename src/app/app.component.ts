import { TempModel } from './temp.model';
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
    this.appService.toggleLed(this.openLed).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => console.log(err)
    )
  }
}
