import { DatetimeModel } from './../models/datetime.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TempModel } from '../models/temp.model';
import { LightIntensityModel } from '../models/light-intensity.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class KidBrightService {

  constructor(private http: HttpClient) { }

  getTemp(): Observable<TempModel> {
    const url = `${environment.kidBrightApi}/temp`
    return this.http.get<TempModel>(url)
  }

  setTemp(temp: number) {
    const url = `${environment.kidBrightApi}/temp`
    const body = { "temp": temp }
    return this.http.post(url, JSON.stringify(body))
  }

  toggleLed(LEDstatus: String) {
    const url = `${environment.kidBrightApi}/led`
    const body = { "led": LEDstatus }
    return this.http.post(url, JSON.stringify(body))
  }

  getLightIntensity(): Observable<LightIntensityModel> {
    const url = `${environment.kidBrightApi}/light`
    return this.http.get<LightIntensityModel>(url)
  }

  getDatetime(): Observable<DatetimeModel> {
    const url = `${environment.kidBrightApi}/datetime`
    return this.http.get<DatetimeModel>(url)
  }

  setDatetime(datetime: Date) {
    const url = `${environment.kidBrightApi}/datetime`
    const body = { "datetime": datetime }
    return this.http.post(url, JSON.stringify(body))
  }

  setTimer(second: number) {
    const url = `${environment.kidBrightApi}/timer`
    const body = { "time": second }
    return this.http.post(url, JSON.stringify(body))
  }
}
