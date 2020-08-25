import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\/])(?=.{8,})/;
  matcher = new MyErrorStateMatcher();

  public title: string = "Registrate";

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private formBuilder: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void { }

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passPattern)]]
  });

  get email() {
    return this.formGroup.get('email') as FormGroup;
  }

  get password() {
    return this.formGroup.get('password') as FormGroup;
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  saveRegister() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      const {email,password}=this.formGroup.value;
      this.authService.register(email,password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("No valido",errorCode,errorMessage);
        this.alertError();
        this.closeDialog();
      });
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
      title: 'Resgistro fue Exitoso'
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
