import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/model';

@Component({
  selector: 'vp-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {

  @Input() game: Game = {} as Game;

  constructor() {
  }

  ngOnInit(): void {
  }
}
