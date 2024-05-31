import { createAction, props } from "@ngrx/store";
import {Record} from "../../models/record";

export const loadRecord = createAction('loadRecord', props<{ page: number }>());

export const resetRecord = createAction('resetRecord');
export const findAllRecord = createAction('findAllRecord', props<{ records: Record[] }>());
export const findAllPageableRecord = createAction('findAllPageableRecord', props<{ records: Record[], paginator: any }>());
export const setPaginatorRecord = createAction('setPaginatorRecord', props<{ paginator: any }>());
export const findRecord = createAction('findRecord', props<{ id: number }>());

export const addRecord = createAction('addRecord', props<{ recordNew: Record }>());
export const addSuccessRecord = createAction('addSuccessRecord', props<{ recordNew: Record }>());
export const updateRecord = createAction('updateRecord', props<{ recordUpdated: Record }>());
export const updateSuccessRecord = createAction('updateSuccessRecord', props<{ recordUpdated: Record }>());
export const removeRecord = createAction('removeRecord', props<{ id: number }>());
export const removeSuccessRecord = createAction('removeSuccessRecord', props<{ id: number }>());

export const setErrorsRecord = createAction('setErrorsRecord', props<{ recordForm: Record, errors: any }>());
