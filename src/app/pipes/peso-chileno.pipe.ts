import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesoChileno'
})
export class PesoChilenoPipe implements PipeTransform {

  transform(valor: number): string {
    if (valor === null) {
      return '';
    }
    return valor.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
  }

}
