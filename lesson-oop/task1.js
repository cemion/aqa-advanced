const Book = require('./Book');
const EBook = require('./EBook');

// 1.
const book1 = new Book('Кобзар', 'Тарас Шевченко', 1840);
const book2 = new Book('Тіні забутих предків', 'Михайло Коцюбинський', 1911);
const book3 = new Book('Лісова пісня', 'Леся Українка', 1912);

book1.printInfo();
book2.printInfo();
book3.printInfo();

// 2.
const ebook1 = new EBook('Енеїда', 'Іван Котляревський', 1798, 'pdf');
ebook1.printInfo();

// 3.
console.log();
console.log();
console.log('--- Геттери та сеттери ---');
console.log(`Назва book3: ${book3.title}`);
book3.title = 'Лісова пісня (нове видання)';
book3.year = 2020;
book3.printInfo();

console.log(`Формат ebook1: ${ebook1.fileFormat}`);
ebook1.fileFormat = 'epub';
ebook1.printInfo();

try {
  book1.year = 3000;
} catch (error) {
  console.log(`Помилка: ${error.message}`);
}

try {
  book1.author = '';
} catch (error) {
  console.log(`Помилка: ${error.message}`);
}

try {
  ebook1.fileFormat = 'docx';
} catch (error) {
  console.log(`Помилка: ${error.message}`);
}

// 4.
console.log();
console.log();
console.log('--- Найдавніша книга ---');
const oldestBook = Book.findOldestBook([book1, book2, book3, ebook1]);
oldestBook.printInfo();

// 5.
console.log();
console.log();
console.log('--- EBook з Book ---');
const ebook2 = EBook.fromBook(book2, 'mobi');
ebook2.printInfo();
