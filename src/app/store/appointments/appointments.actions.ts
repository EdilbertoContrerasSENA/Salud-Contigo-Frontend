import { createAction, props } from "@ngrx/store";
import {Appointment} from "../../models/appointment";

export const loadAppointment = createAction('loadAppointment', props<{ page: number }>());

export const resetAppointment = createAction('resetAppointment');
export const findAllAppointment = createAction('findAllAppointment', props<{ appointments: Appointment[] }>());
export const findAllPageableAppointment = createAction('findAllPageableAppointment', props<{ appointments: Appointment[], paginator: any }>());
export const setPaginatorAppointment = createAction('setPaginatorAppointment', props<{ paginator: any }>());
export const findAppointment = createAction('findAppointment', props<{ id: number }>());

export const addAppointment = createAction('addAppointment', props<{ appointmentNew: Appointment }>());
export const addSuccessAppointment = createAction('addSuccessAppointment', props<{ appointmentNew: Appointment }>());
export const updateAppointment = createAction('updateAppointment', props<{ appointmentUpdated: Appointment }>());
export const updateSuccessAppointment = createAction('updateSuccessAppointment', props<{ appointmentUpdated: Appointment }>());
export const removeAppointment = createAction('removeAppointment', props<{ id: number }>());
export const removeSuccessAppointment = createAction('removeSuccessAppointment', props<{ id: number }>());

export const setErrorsAppointment = createAction('setErrorsAppointment', props<{ appointmentForm: Appointment, errors: any }>());
