const Book = require('./Book');

const ALLOWED_FORMATS = ['PDF', 'EPUB', 'MOBI', 'FB2', 'TXT'];

class EBook extends Book {
  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this.fileFormat = fileFormat;
  }

  get fileFormat() {
    return this._fileFormat;
  }

  set fileFormat(value) {
    if (typeof value !== 'string' || !ALLOWED_FORMATS.includes(value.trim().toUpperCase())) {
      throw new Error(`Формат файлу має бути одним із: ${ALLOWED_FORMATS.join(', ')}`);
    }
    this._fileFormat = value.trim().toUpperCase();
  }

  printInfo() {
    console.log(
      `Електронна книга: "${this.title}", автор: ${this.author}, рік видання: ${this.year}, формат файлу: ${this.fileFormat}`
    );
  }

  static fromBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new Error('Перший аргумент має бути екземпляром класу Book');
    }
    return new EBook(book.title, book.author, book.year, fileFormat);
  }
}

module.exports = EBook;
