import { GridConfiguration } from '../../../../shared/components/grid/grid-configuration';

export class ListProductsConfig{
    gridList: GridConfiguration = new GridConfiguration();

    constructor() {
        this.gridList.columnas = [
            {
                title: 'Categoria',
                field: 'category.descripcion',
                configCelda: {
                    width: '160px'
                }
            },
            {
                title: 'Impuesto',
                field: 'tax.description',
                configCelda: {
                    width: '90px'
                }
            },
            {
                title: 'Producto',
                field: 'description',
                configCelda: {
                    width: '200px'
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
                title: 'Precio',
                field: 'price',
                configCelda: {
                    width: '100px',
                    type: 'currency'
                }
            },
            {
                title: 'Costo',
                field: 'cost',
                configCelda: {
                    width: '100px',
                    type: 'currency'
                }
            },
            {
                title: 'Activo',
                field: '_state',
                configCelda: {
                    width: '70px'
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