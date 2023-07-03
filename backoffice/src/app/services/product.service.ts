import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`/products`);
  }
}
