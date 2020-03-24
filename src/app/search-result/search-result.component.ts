import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite/';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';

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

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('q');
      this.title.setTitle(`「${this.resultParams.query}」の検索結果 | MIRU`);
      this.meta.updateTag({
        property: 'og:title',
        content: `「${this.resultParams.query}」の検索結果 | MIRU`
      });
      this.meta.updateTag({
        property: 'og:url',
        content: `https://miru-2ac6c.web.app/search?q=${this.resultParams.query}`
      });
    });
  }

  nextPage() {
    this.resultParams.page++;
  }
  prevPage() {
    this.resultParams.page--;
  }
}
