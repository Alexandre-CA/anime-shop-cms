import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Login, Register } from 'src/app/classes/auth';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy{
  public subscriptions: Subscription[] = [];

  public object: Register = {} as Register
  public carregando: boolean = false;
  public validPass: any = { hasUpperCase: false, hasLowerCase: false, hasNumber: false, has8Characters: false, match2: false, hasSpecialCharacter: false };
  public enableResendCode: boolean = false;
  public helperPassword: boolean = false;
  public validatePwd: boolean = false;
  
  constructor(
    private HttpClient: HttpClient,
    private ToastrService: ToastrService,
    private Router:Router
  ) {
  }
  public onSubmit(f: NgForm) {
    if(f.valid && this.validatePwd){

      this.carregando = true;
      const apiPayLoad = {
        name: this.object.name,
        email: this.object.email,
        password: this.object.password,
      }
      this.subscriptions.push(
        this.HttpClient.request(`POST`, `http://localhost:8080/user`, { body: apiPayLoad }).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.Router.navigate(['/auth/login']);
              this.ToastrService.success("Usuário registrado com sucesso.");
              this
            } else {
              this.ToastrService.error(res.msg);
            }
          },
          error: (err: any) => {
            console.error(err);
            this.ToastrService.error("Ocorre um erro.");
            this.carregando = false;
          },
          complete: () => {
            this.carregando = false;
          },
        })
      )
    }
  }
  public verifyNewPwd(): void {
    this.helperPassword = true;
    if (this.object.password !== undefined) {
      const reLowerCase = /([a-z])/g;
      const reUpperCase = /([A-Z])/g;
      const reNumber = /\d/g;
      const reSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
      this.validPass.hasLowerCase = (reLowerCase.test(this.object.password));
      this.validPass.hasUpperCase = (reUpperCase.test(this.object.password));
      this.validPass.hasNumber = (reNumber.test(this.object.password));
      this.validPass.hasSpecialCharacter = (reSpecialCharacters.test(this.object.password));
      this.validPass.has8Characters = (this.object.password?.length >= 8);
    }
    this.validPass.match2 = (this.object.password !== undefined && this.object.password === this.object.confirmPassword);
    this.validatePwd = true;
    for (const key in this.validPass) {
      if (Object.prototype.hasOwnProperty.call(this.validPass, key)) {
        if (!Object(this.validPass)[key]) {
          this.validatePwd = false;
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
