import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepollGetMessageService {
  subject: ReplaySubject<number> = new ReplaySubject();
  obs: Observable<number> = this.subject.asObservable();

  constructor() { }

  notify = () => {
    this.subject.next(1)
  }
}
