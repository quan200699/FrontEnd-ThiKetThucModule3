import {Component, OnInit} from '@angular/core';
import {Book} from '../interface/book';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../service/book.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-book-list-read',
  templateUrl: './book-list-read.component.html',
  styleUrls: ['./book-list-read.component.css']
})
export class BookListReadComponent implements OnInit {
  bookList: Book[] = [];
  successMessage: string;
  failMessage: string;
  sub: Subscription;
  book: Book;
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.bookService.getAll().subscribe(result => {
      this.bookList = result;
    });
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.bookService.detailBook(id).subscribe(next => {
        this.book = next;
      }, error => {
        this.failMessage = error;
      });
    });
  }
  updateStatus() {
    const name = this.bookForm.value.name;
    const nameNotEmpty = name.trim() !== '';
    if (nameNotEmpty) {
      this.book.read = false;
      this.bookService.editBook(this.book, this.book.id).subscribe(() => {
        this.successMessage = 'Cập nhật thành công';
        this.bookForm.reset();
      }, () => {
        this.failMessage = 'Cập nhật thất bại';
      });
    }
  }
}
