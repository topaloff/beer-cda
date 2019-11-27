import { Beer } from './../beer';
import { Component, OnInit } from '@angular/core';
import { BeerService } from '../service/beer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  beers;
  message: string;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.getBeers();
  }


  // Add beer in table without refresh
  beerSubmit = function(beer) {
    const newKey:any = Object.values(beer)[0];
    const values = Object.values(beer)[1];
    this.beers[newKey] = values;
  };


  //Get beers from service
  getBeers() {
    this.beerService.getBeers()
     .subscribe(data => {
       this.beers = data;
     });
   }

   deleteBeer(key) {
     this.beerService.deleteBeer(key).subscribe();
    delete this.beers[key]; // Hide object in table
  }
}
