import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookListReadComponent} from './book-list-read/book-list-read.component';


const routes: Routes = [{
  path: 'list-book',
  component: BookListComponent
}, {
  path: 'list-book-read',
  component: BookListReadComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
