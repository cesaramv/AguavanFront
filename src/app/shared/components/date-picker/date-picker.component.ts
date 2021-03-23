import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

export const ES = {
  firstDayOfWeek: 0,
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Je', 'Vi', 'Sa'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ],
  today: 'Hoy',
  clear: 'Limpiar',
  dateFormat: 'dd-mm-yy',
  weekHeader: 'Sm'
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

  @Input() inputId: string;
  /**   
   * @description Fecha minima permitida por el componente.   
  */
  @Input() minDate: any;

  /**   
  * @description Fecha maxima permitida por el componente.   
  */
  @Input() maxDate: any;
  @Input() showButtonBar: boolean = true;
  @Input() disabled: boolean;

  /**   
  * @description Define la cantidad de la selección, los valores válidos son "single", "multiple" and "range"   
  */
  @Input() selectionMode = 'single';
  @Input() readOnlyInput = true;
  @Input() timeOnly = false;
  @Input() showSeconds = false;
  es = ES;

  /**   
   * @description Permite mantener seleccionadas las fechas especificadas en fechasAMantenerSeleccionadas. Falso por defecto.   
  */
  @Input() mantenerFechasSeleccionadas = false;
  /**   
  * @description Fechas a mantener seleccionadas si mantenerFechasSeleccionadas esta habilitado.   
  */
  _fechasAMantenerSeleccionadas: Date[];
  /**   
  * @description Se encarga de detectar cambios en el componente padre y actualizar el   * modelo de mim-date-picket para las fechas seleccionadas.   
  */
  @Input() set fechasAMantenerSeleccionadas(value: Date[]) {
    this._fechasAMantenerSeleccionadas = value;
  }
  @Output()  // tslint:disable-next-line:no-output-on-prefix  
  onChangeValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  private configurarFechasAMantenerSeleccionadas(modelo: any) {
    // Creamos una copia para no modificar la referencia al valor en el componente padre.    
    let modeloCopia = this.crearCopia(modelo);
    // Inicializamos modelo para evitar errores con undefined.    
    modeloCopia = modeloCopia || [];
    modeloCopia.unshift(...this._fechasAMantenerSeleccionadas);
    // Eliminamos nulos o indefinidos.    
    modeloCopia = modeloCopia.filter(item => item !== null && item !== undefined);
    // Eliminamos los repetidos.    
    modeloCopia = modeloCopia.filter((valorActual, indiceActual, arreglo) => {
      return arreglo.findIndex(valorDelArreglo =>
        JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual;
    });
    // Realizamos el ordenamiento de las fechas.    
    modeloCopia.sort((a, b) => a > b);
    // Deshabilitamos la seleccion de fechas antes de la primer fecha del nuevo modelo.    
    if (modeloCopia.length !== 0) {
      this.minDate = modeloCopia[0];
    }
    return modeloCopia;
  }

  private crearCopia(modelo: any): any {
    let modeloCopia: any;
    if (modelo !== null && modelo !== undefined) {
      if (modelo instanceof Array) {
        modeloCopia = Object.assign([], modelo);
        // Eliminamos nulos o indefinidos.        
        modeloCopia = modeloCopia.filter(item => item !== null && item !== undefined);
      } else {
        modeloCopia = modelo;
      }
    }
    return modeloCopia;
  }
}
