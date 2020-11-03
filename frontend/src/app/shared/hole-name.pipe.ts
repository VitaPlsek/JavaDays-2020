import { Pipe, PipeTransform } from '@angular/core';
import { Hole } from 'frontend-api';

const translation = new Map<Hole, string>()
  .set(Hole.Prima, 'Přímá')
  .set(Hole.Pyramidy, 'Pyramidy')
  .set(Hole.Plosina, 'Plošina')
  .set(Hole.Uhel, 'Úhel')
  .set(Hole.Looping, 'Looping')
  .set(Hole.Pricky, 'Příčky')
  .set(Hole.Plozene, 'Pložené')
  .set(Hole.Kosoctverec, 'Kosočtverec')
  .set(Hole.OknoNaKl, 'Okno nakloněné')
  .set(Hole.Labyrint, 'Labyrint')
  .set(Hole.Diablo, 'Diablo')
  .set(Hole.Trubka, 'Trubka')
  .set(Hole.V, 'V')
  .set(Hole.Okno, 'Okno')
  .set(Hole.Blesk, 'Blesk')
  .set(Hole.Ledvina, 'Ledvina')
  .set(Hole.Salzburg, 'Salzburské V');

@Pipe({
  name: 'holeName'
})
export class HoleNamePipe implements PipeTransform {

  transform(hole: Hole): string | undefined {
    return translation.get(hole);
  }

}
