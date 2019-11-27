import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BeerService } from '../service/beer.service';


@Component({
  selector: 'app-fast-add',
  templateUrl: './fast-add.component.html',
  styleUrls: ['./fast-add.component.css']
})
export class FastAddComponent implements OnInit {

  required: boolean = false;

  @Output()
  beerSubmit: EventEmitter<Object> = new EventEmitter<String>(); // creating an output event

  constructor(private beerService: BeerService) { }

  ngOnInit() {
  }

  // Send short form 
  onSubmit(form){
    if (form.form.value.name !== '' && form.form.value.price !== '') {
      this.required = false;
      this.beerService.addBeer(form.form.value)
        .subscribe(beer => {
          const beerAdded: Object = {key: Object.values(beer)[0], values: form.form.value};
          this.beerSubmit.emit(beerAdded); // emmiting the event.
          form.reset();
        });
    } else {
      this.required = true;
    }
  }
}
