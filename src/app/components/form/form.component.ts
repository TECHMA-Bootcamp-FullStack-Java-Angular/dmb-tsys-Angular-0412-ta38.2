import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto} from '../../dto/producto';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  product: Producto = {
    codigo: '',
    descripcion: '',
    precio: 0,
  };

  listProducts: Producto[] = [];

  constructor( private productsService : ProductsService ) { }

  form: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    descripcion: new FormControl(),
    precio: new FormControl(''),
  })


  ngOnInit(): void {
    this.productsService.product$.subscribe((product) => {
      this.product = product;
      this.updateForm(this.product);
    });

    this.productsService.productList$.subscribe((productList) => {
      this.listProducts = productList;
    }
    );

  }

  addProduct() {
    const product: Producto = this.form.value;
    this.productsService.addProduct(product);
      this.form.reset();
  }

  updateArray(): void {

    const product = {
     codigo  : this.form.get("codigo")?.value,
     descripcion  : this.form.get("descripcion")?.value,
     precio : this.form.get("precio")?.value,
    }

    console.log(product);

    const index = this.findObjectIndex(this.productsService.productList, product)
    this.productsService.productList[index] = product;
    this.productsService.notifyChange();
  }


  updateForm(product: Producto) {
    this.form.setValue(product);
  }

  private findObjectIndex(array: Producto[], product: Producto) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].codigo === product.codigo) {
        return i;
      }
    }
    return -1;
  }

}
