import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

type Keyset = {
  name: String,
  id: String,
  manufacturer: String,
  keyset_id: String,
  material: String,
  profile: String,
  kits: String,
  tags: String,
  vendor: String[]
  url: String,
  image_url: String,
  description: String,
  price: Number,
  quantity: Number,
  available: Boolean
};

type Response = {
  keysets: Keyset[]
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  keysets: any[];
  loading = true;
  error: any;
  products: Object[] = [{name: 'GMK Laser', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Red Samurai', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Godspeed', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Nautilus', vendor: 'drop', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}, {name: 'GMK Olivia', vendor: 'novelkeys', url: 'https://drop.com/buy/massdrop-x-mito-gmk-laser-custom-keycap-set', image_url: 'https://massdrop-s3.imgix.net/img_thread/BZ27br1TIOyV6GfQvgZg_TKL%208.png?auto=format&fm=jpg&fit=min&w=796&dpr=2&q=35'}];
  
  constructor(private apollo: Apollo) { }
  
  ngOnInit() {
    this.apollo.watchQuery<Response>({
      query: gql`
        {
          keysets {
            name
            vendor {
              name
            }
          }
        }`
    }).valueChanges.subscribe((result) => {
      console.log(result);
      this.products = result.data && result.data.keysets;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

}
