import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { Producto } from '../../dto/producto';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  constructor( private productsService : ProductsService ) { }

  productList: Producto[] = [];

  ngOnInit(): void {
    this.productsService.productList$.subscribe((productList) => {
      this.productList = productList;
    });
  }

  deleteProduct(cod: string): void {
    this.productsService.deleteProduct(cod);
  }

  editProduct(product: Producto ): void {
    this.productsService.editProduct(product);
  }

}
