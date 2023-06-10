import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/classes/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit,OnDestroy {

  public subscriptions: Subscription[] = [];
  public object: Category = new Category();
  public categories: Category[] = [];
  public carregando: boolean = false;
  public carregandoCategory: boolean = false;
  public dataId?: string;


  constructor(
    private ActivatedRoute: ActivatedRoute,
    private HttpClient: HttpClient,
    private Router: Router,
    private ToastrService:ToastrService
  ) {
    this.dataId = this.ActivatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (this.dataId) {
      this.carreganDados(this.dataId);
    }
  }
  public carreganDados(id: string) {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/category?id=${id}`).subscribe({
        next: (res: any) => {
          this.object = new Category(res.data)
        },
        error: (err: any) => {
          console.error(err);
          this.carregando = false;
        },
        complete: () => {
          this.carregando = false;
        },
      })
    )
  }
  public onSubmit(f: NgForm) {
    this.carregando = true;
    const apiPayLoad = {
      id: this.object.id,
      name: this.object.name,
      description: this.object.description,
    }
    this.subscriptions.push(
      this.HttpClient.request(`${this.dataId ? 'PUT' : 'POST'}`, `http://localhost:8080/category`, { body: apiPayLoad }).subscribe({
        next: (res: any) => {
          if(res.success){
            this.ToastrService.success(res.msg);
            this.Router.navigate(['/category']);
          }else {
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
  public alterStatus() {
    this.carregando = true;
    const apiPayLoad = {
      id: this.object.id,
    }
    this.subscriptions.push(
      this.HttpClient.request(`PUT`, `http://localhost:8080/category/status`, { body: apiPayLoad }).subscribe({
        next: (res: any) => {
          if(res.success){
            this.object.status = this.object.status ? 0 : 1;
            this.ToastrService.success(this.object.status ? 'Categoria ativado com sucesso.' : 'Categoria desativado com sucesso.');
          }else {
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
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

