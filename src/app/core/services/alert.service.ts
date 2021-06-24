import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { promise } from 'protractor';

@Injectable()
export class AlertService {

  constructor() { }

  private configBase() {
    const options: SweetAlertOptions = {
      customClass: {
        container: 'z-index-99999',
        header: 'bar-model'
      },
      showCloseButton: false,
      buttonsStyling: false,
      confirmButtonText: 'Aceptar'
    };
    return options;
  }

  private alert(text: string,
    icon: SweetAlertIcon = null,
    swalConfig) {
    return swalConfig.fire({
      text: text ? text : null,
      type: icon,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  success(text = 'Proceso realizado con éxito.'): Promise<any> {
    const option = this.configBase();
    option.icon = 'success';
    option.customClass['closeButton'] =
      'btn btn--circle float-right p-0 btn-color-close';
    option.customClass['confirmButton'] =
      'btn btn-md btn-success btn-min-with';
    option.html = `<h2 class="h5 text-center">${text}</h2>`;
    const swalConfig = Swal.mixin(option);
    return this.alert(text, null, swalConfig);
  }

  info(text: string): Promise<any> {
    const option = this.configBase();
    option.icon = 'info';
    option.customClass['closeButton'] =
      'btn btn--circle float-right p-0 btn-color-close';
    option.customClass['confirmButton'] =
      'btn btn-md btn-primary btn-min-with';
    option.html = `<h2 class="h5 text-center">${text}</h2>`;
    const swalConfig = Swal.mixin(option);
    return this.alert(text, null, swalConfig);
  }

  warning(text: string): Promise<any> {
    const option = this.configBase();
    option.icon = 'warning';
    option.customClass['closeButton'] =
      'btn btn--circle float-right p-0 btn-color-close';
    option.customClass['confirmButton'] =
      'btn btn-md btn-warning btn-min-with';
    option.confirmButtonText = 'Aceptar';
    option.html = `<h2 class="h5 text-center">${text}</h2>`;
    const swalConfig = Swal.mixin(option);
    return this.alert(text, null, swalConfig);
  }

  error(text = 'Error en el proceso.', detail?: string): Promise<any> {
    const option = this.configBase();
    option.icon = 'error';
    option.customClass['closeButton'] =
      'btn btn-circle float-right p-0 btn-color-close';
    option.customClass['confirmButton'] = 'btn btn-md btn-danger btn-min-with';

    option.html = `<h2 class="h5 text-center">${text}</h2>`;

    if (detail) {
      option.html += `
      <div class="accordion" id="errorDetail" >
      <div>
      <div class="d-flex justify-content-center" id="detailError">
      <h5 class="mb-0">
      <button class="btn btn--gray2 collapsed" type="button" data-toggle="collapse" data-target="#collapseDetailError"
      aria-expanded="false" aria-controls="collapseDetailError">
      Ver más detalle
      </button>
      </h5>
      </div>
      <div id="collapseDetailError" class="p-3 collapse" aria-labelledby="detailError" data-parent="#errorDetail">
      <div class="text-left text--400wt text--gray1 text--10pts mb-3">
      ${detail}
      </div>
      </div>
      </div>
      </div>`;
    }
    const swalConfig = Swal.mixin(option);
    return this.alert(text, null, swalConfig);
  }

  confirm(text: string, type: string = 'info' || 'warning' || 'danger'): Promise<any> {
    let color: string;
    let icon: SweetAlertIcon;
    switch (type) {
      case 'warning':
        color = 'warning';
        icon = 'warning';
        break;
      case 'danger':
        color = 'danger';
        icon = 'error';
        break;
      default:
        color = 'primary';
        icon = 'info';
        break;
    }

    const option = this.configBase();
    option.icon = icon;
    option.customClass['closeButton'] =
      'btn btn--circle float-right p-0 btn-color-close';
    option.customClass['confirmButton'] =
      `btn btn-md btn-${color} btn-min-with mx-2`;
    option.customClass['cancelButton'] =
      'btn btn-md btn-grey btn-min-with mx-2';
    option.html = `<h2 class="h5 text-center">${text}</h2>`;

    const swalConfig = Swal.mixin(option);
    return Promise.resolve(
      swalConfig.fire({
        text: text,
        showCancelButton: true,
        cancelButtonText:
          'Cancelar',
        confirmButtonText:
          'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false
      } as any).then(result => {
        return result.value;
      })
    );
  }

  close() {
    Swal.close();
  }
}
