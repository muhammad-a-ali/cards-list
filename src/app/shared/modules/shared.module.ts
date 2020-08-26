import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAngularModule } from './material-angular.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ChildTranslationModule } from './translation/child-translation.module';
import { LanguageSelectComponent } from '../components/language-select/language-select.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';

const components: any[] = [SpinnerComponent, LanguageSelectComponent, PageNotFoundComponent, PaginatorComponent];
const modules: any[] = [CommonModule, FormsModule, ChildTranslationModule, MaterialAngularModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules]
})
export class SharedModule { }
