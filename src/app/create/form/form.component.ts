import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/interfaces/article';
import { OGP } from 'src/app/interfaces/ogp';
import { CreateComponent } from 'src/app/create/create/create.component';
import { HttpClient } from '@angular/common/http';

const API = 'https://ogp-api.appspot.com/?url=';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(200)]],
    links: this.fb.array([])
  });

  ogp: OGP;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private createComponent: CreateComponent,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.addLink();
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  get descriptionControl() {
    return this.form.get('description') as FormControl;
  }
  get links(): FormArray {
    return this.form.get('links') as FormArray;
  }

  addLink(index?: number) {
    const linkFormGroup = this.fb.group({
      link: ['', [Validators.required, Validators.maxLength(600)]],
      comment: ['', [Validators.maxLength(300)]]
    });
    if (!index) {
      this.links.push(linkFormGroup);
    } else {
      this.links.insert(index + 1, linkFormGroup);
      if (matchMedia('(max-width: 559px)').matches) {
        scrollBy({ top: 288, behavior: 'smooth' });
      } else if (matchMedia('(max-width: 959px)').matches) {
        scrollBy({ top: 303, behavior: 'smooth' });
      } else {
        scrollBy({ top: 318, behavior: 'smooth' });
      }
    }
  }

  removeLink(index: number) {
    this.links.removeAt(index);

    if (matchMedia('(max-width: 559px)').matches) {
      scrollBy({ top: -288, behavior: 'smooth' });
    } else if (matchMedia('(max-width: 959px)').matches) {
      scrollBy({ top: -303, behavior: 'smooth' });
    } else {
      scrollBy({ top: -318, behavior: 'smooth' });
    }
  }

  create() {
    const formData = this.form.value;
    this.createComponent.created = true;
    scrollTo({ top: 0, behavior: 'smooth' });

    const sendData: Omit<Article, 'articleId' | 'createdAt'> = {
      authorId: this.authService.user.uid,
      title: formData.title,
      links: this.form.get('links').valid ? formData.links : [],
      description: formData.description,
      favorite: 0
    };

    for (let i = 0; formData.links[i]; i++) {
      const link = formData.links[i].link;
      if (link.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)) {
        this.http.get(API + link).subscribe(ogp => {
          this.ogp = ogp as OGP;
          if (this.ogp.ogImage.url) {
            sendData.thumbnailURL = this.ogp.ogImage.url;
            this.articleService.createArticle(sendData);
          }
        });
      } else {
        this.articleService.createArticle(sendData);
      }
    }
  }
}
