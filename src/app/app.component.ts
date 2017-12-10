import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appgabriel0i';
  items = ['gabriel', 'fusca'];

  ngOnInit() {
    const url = 'http://demo2559707.mockable.io/data';
    fetch(url).then(response => response.json()).then(data => {
      this.items = data.items;
      console.log("ITES", this.items);
    });
  }
}
