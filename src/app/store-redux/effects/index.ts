import { ProductsEffects } from './products.effects';
import { PatrocinadorEffects } from './patrocinador.effects';
import { CitiesByDepartmentEffects } from './cities-by-department.effects';
import { CitiesEffects } from './cities.effects';
import { UsersEffects } from "./users.effects";
import { UserEffects } from "./user.effects";
import { DocumentsTypeEffects } from "./documents-type.effects";
import { DepartmentsEffects } from './departments.effects';

export const EffectsArray: any[] = [ 
    UsersEffects, 
    UserEffects,
    DocumentsTypeEffects, 
    DepartmentsEffects,
    CitiesEffects,
    CitiesByDepartmentEffects,
    PatrocinadorEffects,
    ProductsEffects
]