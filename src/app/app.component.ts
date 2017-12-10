import { Component, OnInit, Pipe, Injectable, PipeTransform } from '@angular/core';


@Pipe({
  name: 'myFilter'
})

@Injectable()
export class MyFilter implements PipeTransform {
  transform(items: any[], arg: string): any {
    if (!items)
      return []
    return items.filter( item => item.title.indexOf(arg) >= 0);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'appgabriel0i';
  items = [];
  searchText = '';
  myFilter: MyFilter;

  ngOnInit() {
    const url = 'http://demo2559707.mockable.io/data';
    fetch(url).then(response => response.json()).then(data => {
      this.items = data.items;
      console.log("ITES", this.items);
    });
  }

  onSearchClick(event) {
    console.log("CLICKED", event);
  }

  onSearchChange(value) {
    this.searchText = value;
  } 

  get filter() { return this.searchText; }
}
