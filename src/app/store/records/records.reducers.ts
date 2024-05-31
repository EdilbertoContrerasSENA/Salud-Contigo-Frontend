import { createReducer, on } from "@ngrx/store";
import { addSuccessRecord, findRecord, findAllRecord, findAllPageableRecord, removeSuccessRecord, resetRecord, setErrorsRecord, setPaginatorRecord, updateSuccessRecord } from "./records.actions";
import {Record} from "../../models/record";

const records: Record[] = [];
const record: Record = new Record();
export const recordsReducer = createReducer(
  {
    records,
    paginator: {},
    record,
    errors: {}
  },
  on(resetRecord, (state) => ({
    records: state.records,
    paginator: state.paginator,
    record: { ...record },
    errors: {}
  })),
  on(findAllRecord, (state, { records }) => ({
      records: state.records,
      paginator: state.paginator,
      record: state.record,
      errors: state.errors
    }
  )),
  on(findAllPageableRecord, (state, { records, paginator }) => ({
      records: [...records],
      paginator: {... paginator},
      record: state.record,
      errors: state.errors
    }
  )),
  on(findRecord, (state, { id }) => ({
    records: state.records,
    paginator: state.paginator,
    record: state.records.find(record => record.idhistoria == id) || new Record(),
    errors: state.errors
  })),
  on(setPaginatorRecord, (state, { paginator }) => ({
    records: state.records,
    paginator: { ...paginator },
    record: state.record,
    errors: state.errors
  })),
  on(addSuccessRecord, (state, { recordNew }) => ({
    records: [...state.records, { ...recordNew }],
    paginator: state.paginator,
    record: { ...record },
    errors: {}
  })),
  on(updateSuccessRecord, (state, { recordUpdated }) => ({
    records: state.records.map(p => (p.idhistoria == recordUpdated.idhistoria) ? { ...recordUpdated } : p),
    paginator: state.paginator,
    record: {... record},
    errors: {}
  })),
  on(removeSuccessRecord, (state, { id }) => ({
    records: state.records.filter(record => record.idhistoria != id),
    paginator: state.paginator,
    record: state.record,
    errors: state.errors
  })),
  on(setErrorsRecord, (state, { recordForm, errors }) => ({
    records: state.records,
    paginator: state.paginator,
    record: { ...recordForm },
    errors: {... errors}
  }))
);
