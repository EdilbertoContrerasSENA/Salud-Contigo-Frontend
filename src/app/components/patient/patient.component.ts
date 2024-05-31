import {Component, OnInit} from '@angular/core';
import {Patient} from "../../models/patient";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import { PaginatorComponent } from '../paginator/paginator.component';
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {loadPatient, removePatient} from "../../store/patients/patients.actions";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'patient',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit{

  title: string = 'Listado de Pacientes';

  patients: Patient[] = [];
  paginator: any = {};
  url: string = '/patients/page'

  filteredPatients: Patient[] = []; // Arreglo filtrado que se muestra en la tabla
  searchText: string = ''; // Variable que almacena el texto de búsqueda

  constructor(
    private store: Store<{ patients: any }>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.store.select('patients').subscribe(state => {
      this.patients = state.patients;
      this.paginator = state.paginator;
      // Inicializar filteredAdquisiciones con todos los datos al principio
      this.filteredPatients = this.patients;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(loadPatient({ page: +(params.get('page') || '0') })))
  }

  onRemovePatient(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado el usuario sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removePatient({ id }));
      }
    });
  }

  onSelectedPatient(patient: Patient): void {
    this.router.navigate(['/pacientes/update', patient.idpaciente]);
  }

  get admin() {
    return this.authService.isAdmin();
  }

  applyFilter() {
    const searchTerm = this.searchText.toLowerCase();

    this.filteredPatients = this.patients.filter(patient =>
      patient.nombres.toLowerCase().includes(searchTerm) ||
      patient.apellidos.toLowerCase().includes(searchTerm) ||
      patient.numeroDocumento.toLowerCase().includes(searchTerm)
    );
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
