import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public title: string = "Recupera Contraseña"

  constructor(public dialogRef: MatDialogRef<ForgetPasswordComponent>, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }
  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
  });

  get email() {
    return this.formGroup.get('email') as FormGroup;
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  saveEmail() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      const { email } = this.formGroup.value;
      this.authService.resetPassword(email);
      this.alertSuccess();
      this.closeDialog();
    } else {
      console.log("No valido");
      this.alertError();
      this.closeDialog();
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
      title: 'Correo Enviado'
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
