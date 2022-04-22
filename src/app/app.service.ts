import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TempModel } from './temp.model';
import { ledModel } from './led.model';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  apiURL: string = 'http://192.168.1.43'

  constructor(private http: HttpClient) { }

  getTemp(): Observable<TempModel> {
    const url = `${this.apiURL}/temp`
    return this.http.get<TempModel>(url)
  }

  toggleLed(status: boolean) {
    const url = `${this.apiURL}/led`
    let data = { "led": status.toString() }
    return this.http.post(url, data)
  }
}
