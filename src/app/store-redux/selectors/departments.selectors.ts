import { DepartmentsState } from './../reducers/departments.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<DepartmentsState>('departments');

export const getDepartmentById = createSelector(
    getState,
    ({ departments }, id: number) => departments.find(x => x.uid === id)
);