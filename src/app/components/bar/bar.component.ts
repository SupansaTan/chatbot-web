import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  title: string = 'KidBright Bot'

  constructor() { }

  ngOnInit(): void {
  }

}
