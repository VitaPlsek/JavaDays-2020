import { Pipe, PipeTransform } from '@angular/core';
import { CourtHoles } from 'frontend-api';

const translation = new Map<CourtHoles, string>()
  .set(CourtHoles.Prima, 'Přímá')
  .set(CourtHoles.Pyramidy, 'Pyramidy')
  .set(CourtHoles.Plosina, 'Plošina')
  .set(CourtHoles.Uhel, 'Úhel')
  .set(CourtHoles.Looping, 'Looping')
  .set(CourtHoles.Pricky, 'Příčky')
  .set(CourtHoles.Plozene, 'Pložené')
  .set(CourtHoles.Kosoctverec, 'Kosočtverec')
  .set(CourtHoles.OknoNaKl, 'Okno nakloněné')
  .set(CourtHoles.Labyrint, 'Labyrint')
  .set(CourtHoles.Diablo, 'Diablo')
  .set(CourtHoles.Trubka, 'Trubka')
  .set(CourtHoles.V, 'V')
  .set(CourtHoles.Okno, 'Okno')
  .set(CourtHoles.Blesk, 'Blesk')
  .set(CourtHoles.Ledvina, 'Ledvina')
  .set(CourtHoles.Salzburg, 'Salzburské V');

@Pipe({
  name: 'holeName'
})
export class HoleNamePipe implements PipeTransform {

  transform(hole: CourtHoles): string | undefined {
    return translation.get(hole);
  }

}
