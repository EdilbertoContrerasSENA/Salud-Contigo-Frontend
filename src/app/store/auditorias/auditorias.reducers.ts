import { createReducer, on } from "@ngrx/store";
import { findAllAuditoria, findAllPageableAuditoria, setErrorsAuditoria, setPaginatorAuditoria} from "./auditorias.actions";
import {Auditoria} from "../../models/auditoria";

const auditorias: Auditoria[] = [];
const auditoria: Auditoria = new Auditoria();

export const auditoriasReducer = createReducer(
  {
    auditorias,
    paginator: {},
    auditoria,
    errors: {}
  },
  on(findAllAuditoria, (state, { auditorias }) => ({
      auditorias: state.auditorias,
      paginator: state.paginator,
      auditoria: state.auditoria,
      errors: state.errors
    }
  )),
  on(findAllPageableAuditoria, (state, { auditorias , paginator }) => ({
      auditorias: [...auditorias],
      paginator: {... paginator},
      auditoria: state.auditoria,
      errors: state.errors
    }
  )),
  on(setPaginatorAuditoria, (state, { paginator }) => ({
    auditorias: state.auditorias,
    paginator: { ...paginator },
    auditoria: state.auditoria,
    errors: state.errors
  })),
  on(setErrorsAuditoria, (state, { auditoriaForm, errors }) => ({
    auditorias: state.auditorias,
    paginator: state.paginator,
    auditoria: { ...auditoriaForm },
    errors: {... errors}
  }))
);
