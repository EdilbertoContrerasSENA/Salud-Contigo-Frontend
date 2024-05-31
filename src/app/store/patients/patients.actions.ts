import { createAction, props } from "@ngrx/store";
import {Patient} from "../../models/patient";

export const loadPatient = createAction('loadPatient', props<{ page: number }>());

export const resetPatient = createAction('resetPatient');
export const findAllPatient = createAction('findAllPatient', props<{ patients: Patient[] }>());
export const findAllPageablePatient = createAction('findAllPageablePatient', props<{ patients: Patient[], paginator: any }>());
export const setPaginatorPatient = createAction('setPaginatorPatient', props<{ paginator: any }>());
export const findPatient = createAction('findPatient', props<{ id: number }>());

export const addPatient = createAction('addPatient', props<{ patientNew: Patient }>());
export const addSuccessPatient = createAction('addSuccessPatient', props<{ patientNew: Patient }>());
export const updatePatient = createAction('updatePatient', props<{ patientUpdated: Patient }>());
export const updateSuccessPatient = createAction('updateSuccessPatient', props<{ patientUpdated: Patient }>());
export const removePatient = createAction('removePatient', props<{ id: number }>());
export const removeSuccessPatient = createAction('removeSuccessPatient', props<{ id: number }>());

export const setErrorsPatient = createAction('setErrorsPatient', props<{ patientForm: Patient, errors: any }>());
