import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book?: Book;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentBook: Book = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentBook = { ...this.book };
  }

  updatePublished(status: boolean): void {
    if (this.currentBook.key) {
      this.bookService.update(this.currentBook.key, { published: status })
      .then(() => {
        this.currentBook.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateBook(): void {
    const data = {
      title: this.currentBook.title,
      description: this.currentBook.description
    };

    if (this.currentBook.key) {
      this.bookService.update(this.currentBook.key, data)
        .then(() => this.message = 'The book was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteBook(): void {
    if (this.currentBook.key) {
      this.bookService.delete(this.currentBook.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The book was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}