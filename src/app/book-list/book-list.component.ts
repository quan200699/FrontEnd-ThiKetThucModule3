import {Component, OnInit} from '@angular/core';
import {Book} from '../interface/book';
import {BookService} from '../service/book.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
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

  addBook() {
    const name = this.bookForm.value.name;
    const nameNotEmpty = name.trim() !== '';
    if (nameNotEmpty) {
      const book: Book = {
        id: this.bookForm.value.id,
        name: this.bookForm.value.name,
        read: false
      };
      this.bookService.createBook(book).subscribe(() => {
        this.successMessage = 'Tạo mới thành công';
        this.bookList.push(book);
        this.bookForm.reset();

      }, () => {
        this.failMessage = 'Tạo mới thất bại';
      });
    }
  }

  updateStatus() {
    const name = this.bookForm.value.name;
    const nameNotEmpty = name.trim() !== '';
    if (nameNotEmpty) {
      this.book.read = true;
      this.bookService.editBook(this.book, this.book.id).subscribe(() => {
        this.successMessage = 'Cập nhật thành công';
        this.bookForm.reset();
      }, () => {
        this.failMessage = 'Cập nhật thất bại';
      });
    }
  }
}
