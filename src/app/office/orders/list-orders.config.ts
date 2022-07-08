import { GridConfiguration } from '../../shared/components/grid/grid-configuration';

export class ListOrdersConfig{
    gridList: GridConfiguration = new GridConfiguration();

    constructor() {
        this.gridList.columnas = [
            {
                title: 'Fecha',
                field: '_createdAt',
                configCelda: {
                    width: '90px'
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
                title: 'Estado orden',
                field: 'stateOrder.name',
                configCelda: {
                    width: '110px'
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
                        }
                    ]
                }
            }
        ];

    }
}