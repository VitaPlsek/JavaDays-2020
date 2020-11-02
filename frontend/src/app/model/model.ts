
export enum Hole {
  Prima = 'Prima',
  Pyramidy = 'Pyramidy',
  Plosina = 'Plosina',
  Uhel = 'Uhel',
  Looping = 'Looping',
  Pricky = 'Pricky',
  Plozene = 'Plozene',
  Kosoctverec = 'Kosoctverec',
  OknoNaKl = 'OknoNaKl',
  Labyrint = 'Labyrint',
  Diablo = 'Diablo',
  Trubka = 'Trubka',
  V = 'V',
  Okno = 'Okno',
  Blesk = 'Blesk',
  Ledvina = 'Ledvina',
  Salzburg = 'Salzburg'
}

export interface Court {
  name: string;
  holes: Hole[];
}

export interface Player {
  name: string;
  points: (number | null)[];
}

export interface Game {
  court: Court;
  players: Player[];
}
