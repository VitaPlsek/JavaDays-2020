import { Component, Input, OnInit } from '@angular/core';
import { Game, Hole } from '../model/model';

@Component({
  selector: 'vp-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {

  game: Game = {
    court: {
      name: 'Brno Kr.pole - Hala',
      holes: [
        Hole.Prima,
        Hole.Pyramidy,
        Hole.Plosina,
        Hole.Uhel,
        Hole.Looping,
        Hole.Pricky,
        Hole.Plozene,
        Hole.Kosoctverec,
        Hole.OknoNaKl,
        Hole.Labyrint,
        Hole.Diablo,
        Hole.Trubka,
        Hole.V,
        Hole.Okno,
        Hole.Blesk,
        Hole.Ledvina,
        Hole.Salzburg
      ]
    },
    players: [
      {name: 'VP', points: [1, 1, 2, 2, 3, 2, 4, 1, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1]},
      {name: 'TJ', points: [2, 1, 2, 3, 1, 2, 3, 3, 2, 1, 2, 2, 1, 1, 3, 1, 2, 3]}
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
