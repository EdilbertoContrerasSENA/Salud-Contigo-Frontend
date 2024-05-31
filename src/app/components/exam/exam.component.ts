import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PaginatorComponent} from "../paginator/paginator.component";
import {FormsModule} from "@angular/forms";
import {Exam} from "../../models/exam";
import {Store} from "@ngrx/store";
import {AuthService} from "../../services/auth.service";
import {loadExam, removeExam} from "../../store/exams/exams.actions";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import Swal from "sweetalert2";

@Component({
  selector: 'exam',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {

  title: string = 'Listado de Examenes';

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];
  exams: Exam[] = [];
  paginator: any = {};
  url: string = '/exams/page'

  username: string = '';
  userId: number | null = null;
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  filteredExams: Exam[] = []; // Arreglo filtrado que se muestra en la tabla
  searchText: string = ''; // Variable que almacena el texto de búsqueda

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{ exams: any }>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.store.select('exams').subscribe(state => {
      this.exams = state.exams;
      this.paginator = state.paginator;
      this.filteredExams = this.exams;
    });

  }

  ngOnInit(): void {
    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient

    this.route.paramMap.subscribe(params => {
      this.store.dispatch(loadExam({ page: +(params.get('page') || '0') }))
    });

    this.pacienteService.findAll().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.determineUserId();
      this.filteredExams = this.applyFilter();
    });

    this.medicoService.findAll().subscribe(medicos => {
      this.medicos = medicos;
      this.determineUserId();
      this.filteredExams = this.applyFilter();
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

  applyFilter(): Exam[] {
    const searchTerm = this.searchText.toLowerCase();
    let filteredExams: Exam[] = [];

    if (this.isAdmin) {
      filteredExams = this.exams.filter(exam =>
        exam.tipoExamen.toLowerCase().includes(searchTerm) ||
        exam.lugarExamen.toLowerCase().includes(searchTerm) ||
        exam.estadoExamen.toLowerCase().includes(searchTerm)
      );
    }

    if (this.isDoctor && this.userId !== null) {
      filteredExams = this.exams.filter(exam =>
        exam.medicosIdmedico === this.userId
      );
    }

    if (this.isPatient && this.userId !== null) {
      filteredExams = this.exams.filter(exam =>
        exam.pacientesIdpaciente === this.userId
      );
    }

    return filteredExams;
  }

  onRemoveExam(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado el examen sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeExam({ id }));
      }
    });
  }

  onSelectedExam(exam: Exam): void {
    this.router.navigate(['/examenes/update', exam.idexamen]);
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
