import { GridConfiguration } from '../../../../shared/components/grid/grid-configuration';

export class ListOrdersConfig{
    gridList: GridConfiguration = new GridConfiguration();

    constructor() {
        this.gridList.columnas = [
            {
                title: '# Factura',
                field: 'orderId',
                configCelda: {
                    width: '80px'
                }
            },
            {
                title: 'Fecha',
                field: 'registerDate',
                configCelda: {
                    width: '90px'
                }
            },
            {
                title: 'Puntos',
                field: 'points',
                configCelda: {
                    width: '70px',
                    type: 'number'
                }
            },
            {
                title: 'Costo',
                field: 'costo',
                configCelda: {
                    width: '80px',
                    type: 'currency'
                }
            },
            {
                title: 'Valor',
                field: 'subValor',
                configCelda: {
                    width: '90px',
                    type: 'currency'
                }
            },
            {
                title: 'Ganancia',
                field: 'costo',
                configCelda: {
                    width: '100px',
                    type: 'currency'
                }
            },
            {
                title: 'Estado orden',
                field: 'stateOrder.name',
                configCelda: {
                    width: '110px'
                }
            },
            {
                title: 'Usuario',
                field: 'users.username',
                configCelda: {
                    width: '80px'
                }
            },
            {
                title: 'Acciones',
                field: 'acciones',
                configCelda: {
                    width: '120px',
                    type: 'button',
                    celdas: [
                        {
                            title: 'Detalle',
                            field: 'detalle',
                            typeIcon: 'clipboard-list',
                            cssIcon: 'text_gray1 fa-1x',
                            cssButton: 'btn btn_icono bg_gray4'
                        },
                        {
                            title: 'Editar',
                            field: 'editar',
                            typeIcon: 'edit',
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