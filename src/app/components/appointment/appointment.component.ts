import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PaginatorComponent} from "../paginator/paginator.component";
import {FormsModule} from "@angular/forms";
import {Appointment} from "../../models/appointment";
import {Store} from "@ngrx/store";
import {AuthService} from "../../services/auth.service";
import {loadAppointment, removeAppointment} from "../../store/appointments/appointments.actions";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import Swal from "sweetalert2";

@Component({
  selector: 'appointment',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  title: string = 'Listado de Citas';

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];
  appointments: Appointment[] = [];
  paginator: any = {};
  url: string = '/appointments/page'

  username: string = '';
  userId: number | null = null;
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  filteredAppointments: Appointment[] = []; // Arreglo filtrado que se muestra en la tabla
  searchText: string = ''; // Variable que almacena el texto de búsqueda

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{ appointments: any }>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.store.select('appointments').subscribe(state => {
      this.appointments = state.appointments;
      this.paginator = state.paginator;
      this.filteredAppointments = this.applyFilter();
    });

  }

  ngOnInit(): void {
    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient

    this.route.paramMap.subscribe(params => {
      this.store.dispatch(loadAppointment({ page: +(params.get('page') || '0') }))
    });

    this.pacienteService.findAll().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.determineUserId();
      this.filteredAppointments = this.applyFilter();
    });

    this.medicoService.findAll().subscribe(medicos => {
      this.medicos = medicos;
      this.determineUserId();
      this.filteredAppointments = this.applyFilter();
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

  applyFilter(): Appointment[] {
    const searchTerm = this.searchText.toLowerCase();
    let filteredAppointments: Appointment[] = [];

    if (this.isAdmin) {
      filteredAppointments = this.appointments.filter(appointment =>
        appointment.tipoCita.toLowerCase().includes(searchTerm) ||
        appointment.lugarCita.toLowerCase().includes(searchTerm) ||
        appointment.estadoCita.toLowerCase().includes(searchTerm)
      );
    }

    if (this.isDoctor && this.userId !== null) {
      filteredAppointments = this.appointments.filter(appointment =>
        appointment.medicosIdmedico === this.userId
      );
    }

    if (this.isPatient && this.userId !== null) {
      filteredAppointments = this.appointments.filter(appointment =>
        appointment.pacientesIdpaciente === this.userId
      );
    }

    return filteredAppointments;
  }

  onRemoveAppointment(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado la cita sera eliminada del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeAppointment({ id }));
      }
    });
  }

  onSelectedAppointment(appointmennt: Appointment): void {
    this.router.navigate(['/citas/update', appointmennt.idcita]);
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
