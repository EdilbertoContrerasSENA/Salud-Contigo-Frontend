import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {PaginatorComponent} from "../paginator/paginator.component";
import {Doctor} from "../../models/doctor";
import {Store} from "@ngrx/store";
import {DoctorService} from "../../services/doctor.service";
import {AuthService} from "../../services/auth.service";
import {loadDoctor, removeDoctor} from "../../store/doctors/doctors.actions";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'doctor',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, FormsModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{

  title: string = 'Listado de Médicos';

  doctors: Doctor[] = [];
  paginator: any = {};
  url: string = '/doctors/page'

  filteredDoctors: Doctor[] = []; // Arreglo filtrado que se muestra en la tabla
  searchText: string = ''; // Variable que almacena el texto de búsqueda

  constructor(
    private store: Store<{ doctors: any }>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.store.select('doctors').subscribe(state => {
      this.doctors = state.doctors;
      this.paginator = state.paginator;
      // Inicializar filteredAdquisiciones con todos los datos al principio
      this.filteredDoctors = this.doctors;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(loadDoctor({ page: +(params.get('page') || '0') })))
  }

  onRemoveDoctor(id: number): void {
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
        this.store.dispatch(removeDoctor({ id }));
      }
    });
  }

  onSelectedDoctor(doctor: Doctor): void {
    this.router.navigate(['/medicos/update', doctor.idmedico]);
  }

  get admin() {
    return this.authService.isAdmin();
  }

  applyFilter() {
    const searchTerm = this.searchText.toLowerCase();

    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.nombres.toLowerCase().includes(searchTerm) ||
      doctor.apellidos.toLowerCase().includes(searchTerm) ||
      doctor.especialidad.toLowerCase().includes(searchTerm)
    );
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
