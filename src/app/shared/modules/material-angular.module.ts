import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { LangPaginatorService } from '../services/lang-paginator.service';

const modules: any[] = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
  DragDropModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [{ provide: MatPaginatorIntl, useClass: LangPaginatorService }]
})
export class MaterialAngularModule { }
