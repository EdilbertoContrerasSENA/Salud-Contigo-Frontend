import { createAction, props } from "@ngrx/store";
import {Auditoria} from "../../models/auditoria";

export const loadAuditoria = createAction('loadAuditoria', props<{ page: number }>());

export const findAllAuditoria = createAction('findAllAuditoria', props<{ auditorias: Auditoria[] }>());
export const findAllPageableAuditoria = createAction('findAllPageableAuditoria', props<{ auditorias: Auditoria[], paginator: any }>());
export const setPaginatorAuditoria = createAction('setPaginatorAuditoria', props<{ paginator: any }>());

export const setErrorsAuditoria = createAction('setErrorsAuditoria', props<{ auditoriaForm: Auditoria, errors: any }>());
