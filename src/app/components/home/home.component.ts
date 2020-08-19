import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../Auth/register/register.component';
import { ForgetPasswordComponent } from '../Auth/forget-password/forget-password.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\/])(?=.{8,})/;

  public title1: string = "Ingresa Aquí";
  public title2: string = "Inicio";
  public title3: string = "Bienvenido al Sitema";
  public title4: string = "Ingresa Aquí";
  public title5: string = "Ingresa Aquí";

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passPattern)]]
  });

  openDialog() {
    this.dialog.open(RegisterComponent);
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }

  savelogin() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      const { email, password } = this.formGroup.value;
      this.authService.login(email, password);
      this.alertSuccess();
    } else {
      console.log("No valido");
      this.alertError();
    }
  }
  //////////////////////Swal Alert/////////////////////
  alertSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Acceso Correcto, Bienvenido'
    })
  }

  alertError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Error: '
    })
  }

}
