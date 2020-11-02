import { Component, Input, OnInit } from '@angular/core';
import { ScoredGame } from 'frontend-api';


@Component({
  selector: 'vp-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {

  @Input() game: ScoredGame;

  constructor() {
  }

  ngOnInit(): void {
  }
}
