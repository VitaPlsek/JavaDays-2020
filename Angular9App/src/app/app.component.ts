import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MinigolfControllerService } from 'frontend-api';

@Component({
  selector: 'vp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  game$ = this.minigolf.getGameUsingGET(0);

  constructor(private minigolf: MinigolfControllerService) {

  }
}
