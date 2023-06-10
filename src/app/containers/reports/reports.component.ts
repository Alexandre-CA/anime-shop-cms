import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnDestroy{

  public carregando: boolean = false;
  public subscriptions: Subscription[] = [];
  constructor(
    private HttpClient:HttpClient,
    private ToastrService:ToastrService
  ){}

  public getReportProduct() {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/product/report/all`).subscribe({
        next: (res: any) => {
          this.ToastrService.success(res.msg);
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
  public getReportCategory() {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/category/report/all`).subscribe({
        next: (res: any) => {
          this.ToastrService.success(res.msg);
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
  public getReportUser() {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/user/report/all`).subscribe({
        next: (res: any) => {
          this.ToastrService.success(res.msg);
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
  public getReportCustomer() {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/customer/report/all`).subscribe({
        next: (res: any) => {
          this.ToastrService.success(res.msg);
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
  ngOnDestroy(): void {
      
  }
}
