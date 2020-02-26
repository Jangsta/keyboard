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
  products: Object[];
  
  constructor(private apollo: Apollo) { }
  
  ngOnInit() {
    this.apollo.watchQuery<Response>({
      query: gql`
        {
          keysets {
            name
            url
            image_url
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
