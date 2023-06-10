import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/classes/product';
import { ToastrService } from 'ngx-toastr';	

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit,OnDestroy {

  public subscriptions: Subscription[] = [];
  public object: Product = new Product();
  public categories: Category[] = [];
  public carregando: boolean = false;
  public carregandoCategory: boolean = false;
  public dataId?: string;
  public promotions: any[] = [
    {
      promotion: '10%',
      value: '0.1'
    },
    {
      promotion: '20%',
      value: '0.2'
    },
    {
      promotion: '30%',
      value: '0.3'
    },
    {
      promotion: '40%',
      value: '0.4'
    },
    {
      promotion: '50%',
      value: '0.5'
    },
    {
      promotion: '60%',
      value: '0.6'
    },
    {
      promotion: '70%',
      value: '0.7'
    },
    {
      promotion: '80%',
      value: '0.8'
    },
    {
      promotion: '90%',
      value: '0.9'
    },
    {
      promotion: '100%',
      value: '1'
    },
  ]

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
    this.getCategories();
  }
  public carreganDados(id: string) {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/product?id=${id}`).subscribe({
        next: (res: any) => {
          this.object = new Product(res.data)
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
    if(f.valid){

      this.carregando = true;
      const apiPayLoad = {
        id: this.object.id,
        name: this.object.name,
        description: this.object.description,
        image: this.object.image,
        price: this.object.price,
        categories: this.object.categories,
        promotion: Number(this.object.promotion ?? 0),
      }
      this.subscriptions.push(
        this.HttpClient.request(`${this.dataId ? 'PUT' : 'POST'}`, `http://localhost:8080/product`, { body: apiPayLoad }).subscribe({
          next: (res: any) => {
            if(res.success){
              this.ToastrService.success(res.msg);
              this.Router.navigate(['/product']);
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
  }
  public alterStatus() {
    this.carregando = true;
    const apiPayLoad = {
      id: this.object.id,
    }
    this.subscriptions.push(
      this.HttpClient.request(`PUT`, `http://localhost:8080/product/status`, { body: apiPayLoad }).subscribe({
        next: (res: any) => {
          if(res.success){
            this.object.status = this.object.status ? 0 : 1;
            this.ToastrService.success(this.object.status ? 'Produto ativado com sucesso.' : 'Produto desativado com sucesso.');
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
  private getCategories() {
    this.carregandoCategory = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/category`).subscribe({
        next: (res: any) => {
          this.categories = res.data.map((rs: any) => new Category(rs))
        },
        error: (err: any) => {
          console.error(err);
          this.carregandoCategory = false;
        },
        complete: () => {
          this.carregandoCategory = false;
        },
      })
    )
  }
  public onBlurPrice(value: string) {
    const decimalFormatter: any = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
    if (value) {
      const n: number = Number(value.replace('.', '').replace(',', '.'));
      this.object.price = n;
      this.object.strPrice = (!isNaN(n)) ? decimalFormatter.format(n) : '';
    }
    else {
      this.object.price = undefined;
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
