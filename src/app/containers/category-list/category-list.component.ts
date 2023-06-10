import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/classes/product';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public carregando: boolean = false;
  public objects: Category[] = [];
  public page: number = 1;
  public take: number = 5;
  public searchWord: string = "";
  constructor(
    private HttpClient: HttpClient
  ) { }

  public getObject() {
    this.carregando = true;
    this.subscriptions.push(
      this.HttpClient.get(`http://localhost:8080/category`).subscribe({
        next: (res: any) => {
          this.objects = res.data.map((ct:any)=>new Category(ct))
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
  public pageChange(ev: number) {
    this.getObject();
  }
  public searchWordChange(ev: string) {

    const wordSearch: string = this.searchWord;
    setTimeout(() => {
      if (wordSearch === this.searchWord && wordSearch.length > 3) {
        this.page = 1;
        this.getObject();
      }
    }, 600);
  }
  ngOnInit(): void {
    this.getObject();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
