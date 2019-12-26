import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(200)]],
    link: ['', [Validators.maxLength(600)]],
    text: ['', [Validators.maxLength(300)]]
  });

  card: Card = {
    avatarURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/bdrArtwork.jpg',
    userName: 'しばいぬ',
    title:
      '初めて犬を飼うときに役に立つリンクをまとめました初めて犬を飼うときに役に立つリンクをまとめました',
    thumbURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
    favorite: 100
  };

  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  get descriptionControl() {
    return this.form.get('description') as FormControl;
  }
  get linkControl() {
    return this.form.get('link') as FormControl;
  }
  get textControl() {
    return this.form.get('text') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  create() {
    console.log(this.form.value);
  }
}
