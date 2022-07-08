import { DepartmentsState } from './../reducers/departments.reducer';
import { AppState } from './../app.reducer';
import { UserState } from './../reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const getState = createFeatureSelector<UserState>(
    'user'
);

export const getPaymentMethodsList = createSelector(
    getState,
    ({ //documentsType, departments, statesUsers,
        loaded, user: itemUser
      }) => {  if(loaded){ // documentsType, departments, statesUsers, 
          return ( { user: itemUser})
      } }
  );