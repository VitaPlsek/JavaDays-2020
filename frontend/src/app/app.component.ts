import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './model/model';

@Component({
  selector: 'vp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  game$ = this.http.get<Game>('http://localhost:8080/game/0');

  constructor(private http: HttpClient) {

  }
}
