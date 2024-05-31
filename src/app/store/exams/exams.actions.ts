import { createAction, props } from "@ngrx/store";
import {Exam} from "../../models/exam";

export const loadExam = createAction('loadExam', props<{ page: number }>());

export const resetExam = createAction('resetExam');
export const findAllExam = createAction('findAllExam', props<{ exams: Exam[] }>());
export const findAllPageableExam = createAction('findAllPageableExam', props<{ exams: Exam[], paginator: any }>());
export const setPaginatorExam = createAction('setPaginatorExam', props<{ paginator: any }>());
export const findExam = createAction('findExam', props<{ id: number }>());

export const addExam = createAction('addExam', props<{ examNew: Exam }>());
export const addSuccessExam = createAction('addSuccessExam', props<{ examNew: Exam }>());
export const updateExam = createAction('updateExam', props<{ examUpdated: Exam }>());
export const updateSuccessExam = createAction('updateSuccessExam', props<{ examUpdated: Exam }>());
export const removeExam = createAction('removeExam', props<{ id: number }>());
export const removeSuccessExam = createAction('removeSuccessExam', props<{ id: number }>());

export const setErrorsExam = createAction('setErrorsExam', props<{ examForm: Exam, errors: any }>());
