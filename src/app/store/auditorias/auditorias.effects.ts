import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import {AuditoriaService} from "../../services/auditoria.service";
import { catchError, exhaustMap, map, of} from "rxjs";
import {Auditoria} from "../../models/auditoria";
import {loadAuditoria, findAllPageableAuditoria} from "./auditorias.actions";

@Injectable()
export class AuditoriasEffects {

  loadAuditorias$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadAuditoria),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const auditorias = pageable.content as Auditoria[];
            const paginator = pageable;

            return findAllPageableAuditoria({ auditorias, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: AuditoriaService
  ){}
}
