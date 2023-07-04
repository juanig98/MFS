import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, catchError, map, mergeMap } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Injectable()
export class ProductEffects {

    loadProducts$ = createEffect(
        () => this.actions$.pipe(
            ofType('[Product List] Load Products'),
            mergeMap(() => this.productService.getAll()
                .pipe(
                    map(products => ({ type: '[Product List] Loaded Products', items: products })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService,
    ) { }
}