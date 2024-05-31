import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PaginatorComponent} from "../paginator/paginator.component";
import {FormsModule} from "@angular/forms";
import {Auditoria} from "../../models/auditoria";
import {Store} from "@ngrx/store";
import {AuditoriaService} from "../../services/auditoria.service";
import {loadAuditoria} from "../../store/auditorias/auditorias.actions";

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent implements OnInit {

  title: string = 'Listado de Auditorias';

  auditorias: Auditoria[] = [];
  paginator: any = {};
  url: string = '/auditorias/page'

  constructor(
    private store: Store<{ auditorias: any }>,
    private service: AuditoriaService,
    private router: Router,
    private route: ActivatedRoute) {

    this.store.select('auditorias').subscribe(state => {
      this.auditorias = state.auditorias;
      this.paginator = state.paginator;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(loadAuditoria({ page: +(params.get('page') || '0') })))
  }

}
