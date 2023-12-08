import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../dto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productListSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  private oneProductSubject: BehaviorSubject<Producto> = new BehaviorSubject<Producto>({codigo: '', descripcion: '', precio: 0});

productList: Producto[] = [    {
  codigo: '1',
  descripcion: 'papas',
  precio: 10.55,
},
{
  codigo: '2',
  descripcion: 'manzanas',
  precio: 12.1,
},
{
  codigo: '3',
  descripcion: 'melon',
  precio: 52.3,
},
{
  codigo: '4',
  descripcion: 'cebollas',
  precio: 17,
},
{
  codigo: '5',
  descripcion: 'calabaza',
  precio: 20,
  },
];


  productList$: Observable<Producto[]> = this.productListSubject.asObservable();
  product$: Observable<Producto> = this.oneProductSubject.asObservable();

  constructor() {
    this.productListSubject.next(this.productList);
  }

  addProduct(product: Producto): void {
    this.productList.push(product);
    this.notifyChange();
  }

  editProduct(product: Producto): void {
    this.oneProductSubject.next(product);
  }

  deleteProduct(cod: string): void {
    this.productList = this.productList.filter(product => product.codigo !== cod);
    this.notifyChange();
  }

  getAllProducts(): Producto[] {
    return this.productList;
  }

  notifyChange(): void {
    this.productListSubject.next([...this.productList]);
  }
}




