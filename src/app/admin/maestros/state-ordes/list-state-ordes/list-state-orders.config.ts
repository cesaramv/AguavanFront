import { GridConfiguration } from '../../../../shared/components/grid/grid-configuration';

export class ListStateOrdersConfig{
    gridList: GridConfiguration = new GridConfiguration();

    constructor() {
        this.gridList.columnas = [
            {
                title: 'Estados de las ordenes',
                field: 'name',
                configCelda: {
                    width: '300px'
                }
            },
            {
                title: 'Activo',
                field: '_state',
                configCelda: {
                    width: '100px'
                }
            },
            {
                title: 'Acciones',
                field: 'acciones',
                configCelda: {
                    width: '100px',
                    type: 'button',
                    celdas: [
                        {
                            title: 'Editar',
                            field: 'editar',
                            typeIcon: 'user-edit',
                            cssIcon: 'text_blue1 fa-1x',
                            cssButton: 'btn btn_icono bg_blue2'
                        },
                        {
                            title: 'Eliminar',
                            field: 'eliminar',
                            typeIcon: 'trash-alt',
                            cssIcon: 'text_red1 fa-1x',
                            cssButton: 'btn btn_icono bg_red2'
                        }
                    ]
                }
            }
        ];

    }
}