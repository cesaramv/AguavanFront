import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements ControlValueAccessor {

  /**
   * @description Id del input interno del componente.
   */
  @Input()
  inputId: string;

  /**
   * @description LLave del objeto de seleccion.
   */
  @Input()
  optionKey: string;

  /**
   * @description Opciones del componente de seleccion.
   */
  @Input()
  options: any[];

  /**
   * @description Indica si el componente esta deshabilitado o no.
   */
  @Input()
  disabled: boolean;

  @Output()
  onBlur: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onChangeValue: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @description Modelo del componente.
   */
  modelo: any;

  /**
   * @description Funcion a llamar cuando el modelo cambia.
   */
  onChange = (_: any) => { };

  /**
   * @description Funcion a llamar cuando el componente es tocado.
   */
  onTouched = () => { };

  constructor() { }

  /**
   * @description Permite que Angular actualice el modelo.
   * Actualiza el modelo y aplica cambios necesarios para la vista aqui.
   * @param model Modelo del componente.
   */
  writeValue(modelo: any): void {
    // Actualizamos el modelo.
    this.modelo = modelo || null;
    // Propagamos el cambio.
    this.onChange(this.modelo);
  }

  /**
   * @description Permite a Angular registrar una funcion a llamar cuando el modelo cambia.
   * @param fn Funcion disparada en cambios.
   */
  registerOnChange(fn: (modelo: any) => void): void {
    this.onChange = fn;
  }

  /**
   * @description Permite a Angular registrar la funcion a llamar cuando el input ha sido tocado.
   * @param fn Funcion disparada al tocar el componente.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * @description Marca como deshabilitado el input.
   * @param isDisabled Esta deshabilitado.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value(): any {
    return this.modelo;
  }

  set setValue(modelo: any) {
    if (modelo === this.modelo) {
      this.modelo = modelo;
    }
  }

  _onSelectChange(event: any) {
    const modelo = event;
    this.writeValue(modelo);
    this.onChangeValue.emit(event);
    this.onBlur.emit(event);
  }

  _onBlur(event) {
    this.onBlur.emit(event);
  }

}
