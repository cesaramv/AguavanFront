import { DatePipe } from '@angular/common';
import { GENERALES } from './constantes/generales';

export class DateUtil {

  public static calcularEdad(fechaNacimiento: Date, fechaActual: Date = new Date()): number {
    const timeDiff = Math.abs(<any>fechaActual - <any>fechaNacimiento);
    return Math.trunc(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  public static stringToDate(fecha: string) {
    if (!fecha) {
      return undefined;
    }

    const res: any = fecha.indexOf('-') !== -1 ? fecha.split('-') : fecha.split('/');
    const dia: number = res[0];
    const mes: number = res[1] - 1;
    const anio: number = res[2].includes('T') ? res[2].split('T')[0] : res[2];

    return new Date(anio, mes, dia);
  }

  public static dateToString(fecha: Date, format: string = GENERALES.FECHA_PATTERN) {
    if(fecha === null || fecha === undefined) {
      return null;
    }
    const pipe = new DatePipe('es-CO');
    return pipe.transform(fecha, format);
  }

  public static obtenerDiasEntre({ fechaInicio, fechaFin }: { fechaInicio: Date; fechaFin: Date; }) {
    return ((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

}
