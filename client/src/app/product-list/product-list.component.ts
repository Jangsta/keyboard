import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  products = [{name: 'GMK Laser', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Red Samurai', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Godspeed', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Nautilus', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Olivia', vendor: 'novelkeys', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}];

  ngOnInit() {
  }

}
