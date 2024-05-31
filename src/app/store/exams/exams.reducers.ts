import { createReducer, on } from "@ngrx/store";
import { addSuccessExam, findExam, findAllExam, findAllPageableExam, removeSuccessExam, resetExam, setErrorsExam, setPaginatorExam, updateSuccessExam } from "./exams.actions";
import {Exam} from "../../models/exam";

const exams: Exam[] = [];
const exam: Exam = new Exam();
export const examsReducer = createReducer(
  {
    exams,
    paginator: {},
    exam,
    errors: {}
  },
  on(resetExam, (state) => ({
    exams: state.exams,
    paginator: state.paginator,
    exam: { ...exam },
    errors: {}
  })),
  on(findAllExam, (state, { exams }) => ({
      exams: state.exams,
      paginator: state.paginator,
      exam: state.exam,
      errors: state.errors
    }
  )),
  on(findAllPageableExam, (state, { exams, paginator }) => ({
      exams: [...exams],
      paginator: {... paginator},
      exam: state.exam,
      errors: state.errors
    }
  )),
  on(findExam, (state, { id }) => ({
    exams: state.exams,
    paginator: state.paginator,
    exam: state.exams.find(exam => exam.idexamen == id) || new Exam(),
    errors: state.errors
  })),
  on(setPaginatorExam, (state, { paginator }) => ({
    exams: state.exams,
    paginator: { ...paginator },
    exam: state.exam,
    errors: state.errors
  })),
  on(addSuccessExam, (state, {examNew }) => ({
    exams: [...state.exams, { ...examNew }],
    paginator: state.paginator,
    exam: { ...exam },
    errors: {}
  })),
  on(updateSuccessExam, (state, { examUpdated }) => ({
    exams: state.exams.map(p => (p.idexamen == examUpdated.idexamen) ? { ...examUpdated } : p),
    paginator: state.paginator,
    exam: { ...exam },
    errors: {}
  })),
  on(removeSuccessExam, (state, { id }) => ({
    exams: state.exams.filter(exam => exam.idexamen != id),
    paginator: state.paginator,
    exam: state.exam,
    errors: state.errors
  })),
  on(setErrorsExam, (state, { examForm, errors }) => ({
    exams: state.exams,
    paginator: state.paginator,
    exam: { ...examForm },
    errors: {... errors}
  }))
);
