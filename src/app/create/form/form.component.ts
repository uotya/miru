import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from '@interfaces/article';
import { OGP } from '@interfaces/ogp';
import { CreateComponent } from 'src/app/create/create/create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { take, catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/create/delete-dialog/delete-dialog.component';
import { combineLatest, of } from 'rxjs';
import { OgpService } from 'src/app/services/ogp.service';
import { HttpResponse } from '@angular/common/http';
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
  id: string;
  creating: boolean;
  editing: boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '';
    }
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private createComponent: CreateComponent,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private ogpService: OgpService
  ) {}

  ngOnInit() {
    this.patchDefaultValue();
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

  addLink(index?: number, defaultValue?: { link: string; comment: string }) {
    const linkFormGroup = this.fb.group({
      link: [
        defaultValue && defaultValue.link,
        [Validators.required, Validators.maxLength(600)]
      ],
      comment: [
        defaultValue && defaultValue.comment,
        [Validators.maxLength(300)]
      ]
    });
    if (!index) {
      this.links.push(linkFormGroup);
    } else {
      this.links.insert(index, linkFormGroup);
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

  createArticle() {
    this.creating = true;
    const formData = this.form.value;
    const sendData: Omit<Article, 'articleId' | 'createdAt' | 'updatedAt'> = {
      authorId: this.authService.user.uid,
      title: formData.title,
      links: this.form.get('links').valid ? formData.links : [],
      description: formData.description,
      favorite: 0
    };

    const create = () => {
      const articleId = this.articleService.createArticle(sendData);
      this.createComponent.created = true;
      this.router.navigate(['article/created'], {
        queryParams: { id: articleId }
      });
      scrollTo({ top: 0, behavior: 'smooth' });
      this.creating = false;
    };

    const observables = [];
    for (let i = 0; formData.links[i]; i++) {
      const link = formData.links[i].link;
      if (link.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)) {
        observables.push(
          this.ogpService.getOGP(link).pipe(
            catchError(() => {
              this.creating = false;
              return of(null);
            })
          )
        );
      }
    }

    if (!observables.length) {
      create();
    }

    combineLatest(observables).subscribe(result => {
      const isThumbnail = result.some((ogp: HttpResponse<OGP>) => {
        this.ogp = ogp.body as OGP;
        if (this.ogp.ogImage?.url) {
          sendData.thumbnailURL = this.ogp.ogImage.url;
          create();
          return true;
        }
      });
      if (!isThumbnail) {
        create();
      }
    });
  }

  updataArticle() {
    const formData = this.form.value;
    const sendData: Pick<
      Article,
      'articleId' | 'title' | 'links' | 'description'
    > = {
      articleId: this.id,
      title: formData.title,
      links: this.form.get('links').valid ? formData.links : [],
      description: formData.description
    };
    this.articleService.updateArticle(sendData).then(() => {
      this.createComponent.created = true;
      this.router.navigateByUrl('/mylist');
    });
  }

  deleteArticle() {
    this.dialog
      .open(DeleteDialogComponent, { restoreFocus: false })
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.articleService.deleteArticle(this.id).then(() => {
            this.createComponent.deleted = true;
          });
        }
      });
  }

  patchDefaultValue() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.editing = true;
        this.articleService
          .getDiscreteArticle(this.id)
          .pipe(take(1))
          .subscribe(article => {
            this.form.patchValue({
              title: article.title,
              description: article.description
            });
            article.links.forEach((link, index) => {
              this.addLink(index, link);
            });
            scrollTo({ top: 0, behavior: 'smooth' });
          });
      } else {
        this.addLink();
      }
    });
  }
}
