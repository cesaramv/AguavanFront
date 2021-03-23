import { GridComponent } from './grid.component';

export class GridConfiguration {
    component?: GridComponent;
    columnas: ColumnasConfiguracion[] = [];
    datos?: object[] = [];
}

export class ColumnasConfiguracion {
    field? = ''; 
    title? = '';
    configCelda?: ConfigCelda;
}

export class ConfigCelda {
    type?: string;
    width?: string;
    celdas?: Celda[] = [];
}

export class Celda {
    title?: string;
    field?: string;
    typeIcon?: string;
    cssIcon?: string;
    cssButton?: string;
}
