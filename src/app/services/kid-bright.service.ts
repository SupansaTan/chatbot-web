import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TempModel } from '../models/temp.model';
import { ledModel } from '../models/led.model';
import { LightModel } from '../models/light.model';

@Injectable({
  providedIn: 'root'
})

export class KidBrightService {
  apiURL: string = 'http://192.168.1.43'

  constructor(private http: HttpClient) { }

  getTemp(): Observable<TempModel> {
    const url = `${this.apiURL}/temp`
    return this.http.get<TempModel>(url)
  }

  toggleLed(LEDstatus: any) {
    const url = `${this.apiURL}/led`
    let data = { "led": LEDstatus }
    const body = JSON.stringify(data)
    return this.http.post(url, body)
  }

  getLight(): Observable<LightModel> {
    const url = `${this.apiURL}/light`
    return this.http.get<LightModel>(url)
  }
}
