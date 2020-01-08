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
import { CreateComponent } from 'src/app/create/create/create.component';

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
  linkFormGroup = this.fb.group({
    link: ['', [Validators.required, Validators.maxLength(600)]],
    comment: ['', [Validators.maxLength(300)]]
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private createComponent: CreateComponent
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
  get linkControl() {
    return this.linkFormGroup.get('link') as FormControl;
  }
  get commentControl() {
    return this.linkFormGroup.get('comment') as FormControl;
  }

  addLink(index?: number) {
    if (!index) {
      this.links.push(this.linkFormGroup);
    } else {
      this.links.insert(index + 1, this.linkFormGroup);
      if (matchMedia('(max-width: 559px)').matches) {
        scrollBy({ top: 288, behavior: 'smooth' });
      } else if (matchMedia('(max-width: 959px)').matches) {
        scrollBy({ top: 303, behavior: 'smooth' });
      } else {
        scrollBy({ top: 318, behavior: 'smooth' });
      }
    }
    console.log(this.links);
    console.log(index);
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
    const sendData: Article = {
      userId: this.authService.uid,
      title: formData.title,
      links: this.form.get('links').valid ? formData.links : [],
      description: formData.description,
      thumbURL:
        'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
      favorite: 0
    };
    this.articleService.createArticle(sendData);
    this.createComponent.created = true;
  }
}
