import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumetsRoutingModule } from './documets-routing.module';
import { DocumetsComponent } from './documets.component';
import { ListDocumentsComponent } from './list-documents/list-documents.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewDocumetsComponent } from './new-documets/new-documets.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DocumetsComponent, ListDocumentsComponent, NewDocumetsComponent],
  imports: [
    CommonModule,
    DocumetsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DocumetsModule { }
