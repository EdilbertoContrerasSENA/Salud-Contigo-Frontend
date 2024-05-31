import {Injectable} from "@angular/core";
import { RecordService } from "../../services/record.service";
import {Record} from "../../models/record";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { addRecord, addSuccessRecord, findAllRecord, findAllPageableRecord, loadRecord, removeRecord, removeSuccessRecord, setErrorsRecord, setPaginatorRecord, updateRecord, updateSuccessRecord } from "./records.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class RecordsEffects {

  loadRecords$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadRecord),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const records = pageable.content as Record[];
            const paginator = pageable;

            return findAllPageableRecord({ records, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addRecord$ = createEffect(
    () => this.actions$.pipe(
      ofType(addRecord),
      exhaustMap(action => this.service.create(action.recordNew)
        .pipe(
          map(recordNew => addSuccessRecord({ recordNew })),
          catchError(error => (error.status == 400) ? of(setErrorsRecord({ recordForm: action.recordNew, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  updateRecord$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateRecord),
      exhaustMap(action => this.service.update(action.recordUpdated)
        .pipe(
          map(recordUpdated => updateSuccessRecord({ recordUpdated })),
          catchError(error => (error.status == 400) ? of(setErrorsRecord({ recordForm: action.recordUpdated, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  removeRecord$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeRecord),
      exhaustMap(action => this.service.remove(action.id)
        .pipe(
          map(() => removeSuccessRecord({ id: action.id }))
        )
      )
    )
  );

  addSuccessRecord$ = createEffect(() => this.actions$.pipe(
    ofType(addSuccessRecord),
    tap(() => {
      this.router.navigate(['/records']);

      Swal.fire({
        title: "Creado nueva historia!",
        text: "Historia creada con exito!",
        icon: "success"
      });
    })
  ), { dispatch: false })

  updateSuccessRecord$ = createEffect(() => this.actions$.pipe(
    ofType(updateSuccessRecord),
    tap(() => {
      this.router.navigate(['/records']);

      Swal.fire({
        title: "Actualizada!",
        text: "Historia editada con exito!",
        icon: "success"
      });
    })
  ), {dispatch: false})

  removeSuccessRecord$ = createEffect(() => this.actions$.pipe(
    ofType(removeSuccessRecord),
    tap(() => {
      this.router.navigate(['/records']);

      Swal.fire({
        title: "Eliminada!",
        text: "Historia eliminada con exito.",
        icon: "success"
      });
    })
  ), { dispatch: false })

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: RecordService
  ){}
}
