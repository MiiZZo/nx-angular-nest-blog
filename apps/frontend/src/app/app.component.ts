import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'trombonix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog';

  constructor(private http: HttpClient) {
    this.http.get('/api').subscribe((data: any) => console.log(data))
  }
}
