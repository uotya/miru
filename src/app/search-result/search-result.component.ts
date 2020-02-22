import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite/';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  resultParams = {
    hitsPerPage: 6,
    page: 0,
    query: ''
  };

  config = {
    indexName: 'articles',
    searchClient
  };

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('q');
    });
  }

  ngOnInit(): void {}

  nextPage() {
    this.resultParams.page++;
  }
  prevPage() {
    this.resultParams.page--;
  }
}
