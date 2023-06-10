import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{

  @Input() config!:Product
  @Input() disabled?:boolean = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
