import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  public data: IProduct[] = []
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<IProduct[]>(`http://localhost:8080/api/v1/products`).subscribe({
      next: res => { this.data = res }
    })
  }


}
