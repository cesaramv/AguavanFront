export class MenuModel {
    children: MenuModel[];
    id: string;
    name: string;
    icono: string;
    url: string;
    parentMenuId: string;
    mainMenu: boolean;
}