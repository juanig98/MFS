import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogConfig } from 'src/app/models/interfaces/DialogConfig';
import { IProduct } from 'src/app/models/interfaces/IProduct';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {

  @Input() config: DialogConfig<IProduct> = { open: false };

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
    priceCost: new FormControl('', [Validators.required, Validators.min(1)]),
    pricePublic: new FormControl('', [Validators.required, Validators.min(1)]),
    observations: new FormControl(''),
  });

  constructor() { }

  onSubmit(): void {
    console.log(this.form.value)
  }
}
