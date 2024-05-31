import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'home',
  standalone: true,
  imports: [ NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title: string = "Bienvenido a SALUD Contigo"

  username: string = '';
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  constructor(private authService: AuthService){  }
  ngOnInit(): void {
    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient
  }

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

}
