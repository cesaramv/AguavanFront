import { ProductCategoriesEffects } from './product-categories.effects';
import { AuthEffects } from './auth.effects';
import { CitiesByDepartmentEffects } from './cities-by-department.effects';
import { CitiesEffects } from './cities.effects';
import { DepartmentsEffects } from './departments.effects';
import { DocumentsTypeEffects } from "./documents-type.effects";
import { MenusEffects } from './menus.effects';
import { OrdersEffects } from './orders.effects';
import { OrderStatesEffects } from './order-states.effects';
import { PatrocinadorEffects } from './patrocinador.effects';
import { ProductsEffects } from './products.effects';
import { ProductsSelectedEffects } from './products-selected.effects';
import { TaxesEffects } from './taxes.effects';
import { UsersEffects } from "./users.effects";
import { UserStatesEffects } from './user-states.effects';
import { UserEffects } from "./user.effects";

export const EffectsArray: any[] = [ 
    AuthEffects,
    CitiesByDepartmentEffects,
    CitiesEffects,
    DepartmentsEffects,
    DocumentsTypeEffects, 
    MenusEffects,
    OrderStatesEffects,
    OrdersEffects,
    PatrocinadorEffects,
    ProductCategoriesEffects,
    ProductsEffects,
    ProductsSelectedEffects,
    TaxesEffects,
    UserStatesEffects,
    UserEffects,
    UsersEffects, 
]