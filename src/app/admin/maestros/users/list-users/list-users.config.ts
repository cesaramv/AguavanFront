import { GridConfiguration } from '../../../../shared/components/grid/grid-configuration';

export class ListUsersConfig {
    gridList: GridConfiguration = new GridConfiguration();

    constructor() {
        this.gridList.columnas = [
            {
                title: 'Usuario',
                field: 'username',
                configCelda: {
                    width: '100px'
                }
            },
            {
                title: 'Nombre completo',
                field: 'nameFull',
                configCelda: {
                    width: '300px'
                }
            },
            {
                title: 'Email',
                field: 'email',
                configCelda: {
                    width: '300px'
                }
            },
            {
                title: 'Patrocinador',
                field: 'levelOneId',
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