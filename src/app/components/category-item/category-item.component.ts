import { Component, Input } from '@angular/core';
import { Category } from 'src/app/classes/product';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent {
  @Input() config!:Category
  @Input() disabled?:boolean = false;
}
