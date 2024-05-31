import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PaginatorComponent} from "../paginator/paginator.component";
import {FormsModule} from "@angular/forms";
import {Record} from "../../models/record";
import {Store} from "@ngrx/store";
import {AuthService} from "../../services/auth.service";
import {loadRecord, removeRecord} from "../../store/records/records.actions";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import Swal from "sweetalert2";

@Component({
  selector: 'record',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {

  title: string = 'Listado de Historias Clinicas';

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];
  records: Record[] = [];
  paginator: any = {};
  url: string = '/records/page'

  username: string = '';
  userId: number | null = null;
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  filteredRecords: Record[] = []; // Arreglo filtrado que se muestra en la tabla
  searchText: string = ''; // Variable que almacena el texto de búsqueda

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{ records: any }>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.store.select('records').subscribe(state => {
      this.records = state.records;
      this.paginator = state.paginator;
      this.filteredRecords = this.records;
    });

  }

  ngOnInit(): void {
    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient

    this.route.paramMap.subscribe(params => {
      this.store.dispatch(loadRecord({ page: +(params.get('page') || '0') }))
    });

    this.pacienteService.findAll().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.determineUserId();
      this.filteredRecords = this.applyFilter();
    });

    this.medicoService.findAll().subscribe(medicos => {
      this.medicos = medicos;
      this.determineUserId();
      this.filteredRecords = this.applyFilter();
    });
  }

  determineUserId(): void {
    if (this.isDoctor) {
      const doctor = this.medicos.find(d => d.numeroDocumento === this.username);
      this.userId = doctor ? doctor.idmedico : null;
    } else if (this.isPatient) {
      const patient = this.pacientes.find(p => p.numeroDocumento === this.username);
      this.userId = patient ? patient.idpaciente : null;
    }
  }

  applyFilter(): Record[] {
    const searchTerm = this.searchText.toLowerCase();
    let filteredRecords: Record[] = [];

    if (this.isAdmin) {
      filteredRecords = this.records.filter(record =>
        record.antecedentesHistoria.toLowerCase().includes(searchTerm) ||
        record.examenesHistoria.toLowerCase().includes(searchTerm) ||
        record.diagnosticoHistoria.toLowerCase().includes(searchTerm) ||
        record.tratamientoHistoria.toLowerCase().includes(searchTerm)
      );
    }

    if (this.isDoctor && this.userId !== null) {
      filteredRecords = this.records.filter(record =>
        record.medicosIdmedico === this.userId &&
        ( record.antecedentesHistoria.toLowerCase().includes(searchTerm) ||
          record.examenesHistoria.toLowerCase().includes(searchTerm) ||
          record.diagnosticoHistoria.toLowerCase().includes(searchTerm) ||
          record.tratamientoHistoria.toLowerCase().includes(searchTerm))
      );
    }

    if (this.isPatient && this.userId !== null) {
      filteredRecords = this.records.filter(record =>
        record.pacientesIdpaciente === this.userId &&
        (record.antecedentesHistoria.toLowerCase().includes(searchTerm) ||
          record.examenesHistoria.toLowerCase().includes(searchTerm) ||
          record.diagnosticoHistoria.toLowerCase().includes(searchTerm) ||
          record.tratamientoHistoria.toLowerCase().includes(searchTerm))
      );
    }

    return filteredRecords;
  }

  onRemoveRecord(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado la historia sera eliminada del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeRecord({ id }));
      }
    });
  }

  onSelectedRecord(record: Record): void {
    this.router.navigate(['/hitorias/update', record.idhistoria]);
  }

  get admin() {
    return this.authService.isAdmin();
  }

  getPacienteNombre(idpaciente: number): string {
    const paciente = this.pacientes.find(p => p.idpaciente === idpaciente);
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Desconocido';
  }

  getMedicoNombre(idmedico: number): string {
    const medico = this.medicos.find(m => m.idmedico === idmedico);
    return medico ? `${medico.nombres} ${medico.apellidos}` : 'Desconocido';
  }

}
