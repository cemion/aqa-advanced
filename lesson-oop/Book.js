const requireString = (value, field) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} має бути непорожнім рядком`);
  }
  return value.trim();
};

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = requireString(value, 'Назва');
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = requireString(value, 'Автор');
  }

  get year() {
    return this._year;
  }

  set year(value) {
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(value) || value < 0 || value > currentYear) {
      throw new Error(`Рік видання має бути цілим числом від 0 до ${currentYear}`);
    }
    this._year = value;
  }

  printInfo() {
    console.log(`Книга: "${this.title}", автор: ${this.author}, рік видання: ${this.year}`);
  }

  static findOldestBook(books) {
    if (!Array.isArray(books)) {
      throw new Error('Потрібно передати масив книг');
    }
    const validBooks = books.filter((book) => book instanceof Book);
    if (validBooks.length === 0) {
      return null;
    }
    return validBooks.reduce((oldest, book) => (book.year < oldest.year ? book : oldest));
  }
}

module.exports = Book;
