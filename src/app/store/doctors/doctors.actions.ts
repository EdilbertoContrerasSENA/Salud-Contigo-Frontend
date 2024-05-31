import { createAction, props } from "@ngrx/store";
import {Doctor} from "../../models/doctor";

export const loadDoctor = createAction('loadDoctor', props<{ page: number }>());

export const resetDoctor = createAction('resetDoctor');
export const findAllDoctor = createAction('findAllDoctor', props<{ doctors: Doctor[] }>());
export const findAllPageableDoctor = createAction('findAllPageableDoctor', props<{ doctors: Doctor[], paginator: any }>());
export const setPaginatorDoctor = createAction('setPaginatorDoctor', props<{ paginator: any }>());
export const findDoctor = createAction('findDoctor', props<{ id: number }>());

export const addDoctor = createAction('addDoctor', props<{ doctorNew: Doctor }>());
export const addSuccessDoctor = createAction('addSuccessDoctor', props<{ doctorNew: Doctor }>());
export const updateDoctor = createAction('updateDoctor', props<{ doctorUpdated: Doctor }>());
export const updateSuccessDoctor = createAction('updateSuccessDoctor', props<{ doctorUpdated: Doctor }>());
export const removeDoctor = createAction('removeDoctor', props<{ id: number }>());
export const removeSuccessDoctor = createAction('removeSuccessDoctor', props<{ id: number }>());

export const setErrorsDoctor = createAction('setErrorsDoctor', props<{ doctorForm: Doctor, errors: any }>());
