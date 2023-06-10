import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/classes/auth';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public subscriptions: Subscription[] = [];
  public object: Login = {} as Login;
  public carregando: boolean = false;
  constructor(
    private HttpClient: HttpClient,
    private ToastrService: ToastrService,
    private Router:Router
  ) {
  }

  public onSubmit(f: NgForm) {
    if(f.valid){

      this.carregando = true;
      const apiPayLoad = {
        email: this.object.email,
        password: this.object.password,
      }
      this.subscriptions.push(
        this.HttpClient.request(`POST`, `http://localhost:8080/auth/user/login`, { body: apiPayLoad }).subscribe({
          next: (res: any) => {
            if (res.success) {
              sessionStorage.setItem('isLogged', 'true');
              this.ToastrService.success("Usuário logado com sucesso.");
              this.Router.navigate(['/product']);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
