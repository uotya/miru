import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { CreateComponent } from '../create/create/create.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<CreateComponent> {
  canDeactivate(component: CreateComponent): Observable<boolean> | boolean {
    if (
      component.deleted ||
      component.created ||
      component.formElement.form.pristine
    ) {
      return true;
    }

    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
