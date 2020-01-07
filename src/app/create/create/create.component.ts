import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  linkFormGroup = this.fb.group({
    link: ['', [Validators.maxLength(600)]],
    comment: ['', [Validators.maxLength(300)]]
  });
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(200)]],
    links: this.fb.array([this.linkFormGroup])
  });

  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  get descriptionControl() {
    return this.form.get('description') as FormControl;
  }
  get linkControl() {
    return this.linkFormGroup.get('link') as FormControl;
  }
  get commentControl() {
    return this.linkFormGroup.get('comment') as FormControl;
  }
  get links(): FormArray {
    return this.form.get('links') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  addLink(index: number) {
    const linkFormGroup = this.fb.group({
      link: ['', [Validators.maxLength(600)]],
      comment: ['', [Validators.maxLength(300)]]
    });

    this.links.insert(index + 1, linkFormGroup);

    if (matchMedia('(max-width: 559px)').matches) {
      scrollBy({ top: 288, behavior: 'smooth' });
    } else if (matchMedia('(max-width: 959px)').matches) {
      scrollBy({ top: 303, behavior: 'smooth' });
    } else {
      scrollBy({ top: 318, behavior: 'smooth' });
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

  ngOnInit() {}

  create() {
    const formData = this.form.value;
    const user = this.authService.afUser$.subscribe();
    this.articleService.createArticle({
      avatarURL: this.authService.avatarUrl,
      userName: this.authService.userName,
      userId: this.authService.uid,
      title: formData.title,
      description: formData.description,
      link: formData.link,
      comment: formData.comment,
      thumbURL:
        'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
      favorite: 0
    });
  }
}
