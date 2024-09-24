import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private dbPath = '/books';

  booksRef: AngularFireList<Book>;

  constructor(private db: AngularFireDatabase) {
    this.booksRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Book> {
    return this.booksRef;
  }

  create(book: Book): any {
    return this.booksRef.push(book);
  }

  update(key: string, value: any): Promise<void> {
    return this.booksRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.booksRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.booksRef.remove();
  }
}