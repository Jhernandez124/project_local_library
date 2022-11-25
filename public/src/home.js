function getTotalBooksCount(books) {
 return books.length;
}

function getTotalAccountsCount(accounts) {
 return accounts.length;
}

function getBooksBorrowedCount(books) {
 let booksCheckedOut = books.filter(
  (book) =>
   book.borrows.filter((record) => record.returned === false).length > 0
 );
 return booksCheckedOut.length;
}

function getMostCommonGenres(books) {
 let map = {};
 books.forEach((num) => {
  if (map[num.genre]) {
   map[num.genre]++;
  } else {
   map[num.genre] = 1;
  }
 });
 return Object.entries(map)
  .map(([name, count]) => {
   return {
    name,
    count
   };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}

function getMostPopularBooks(books) {
 return books
  .map((book) => {
   return { name: book.title, count: book.borrows.length };
  })
  .sort((a, b) => (a.count < b.count ? 1 : -1))
  .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
 let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

// HELPER FUNCTIONS

// a function to list all genres in a given array of books
// parameters:
  // an array of book objects
// return:
  // a list of all the genres included in the parameter array
  function getAllGenres (books) {
    const genres = [];
    books.forEach(book => {
      // test for a genre being listed multiple times
      if (!genres.includes(book.genre)) genres.push(book.genre);
    });
    return genres;
  }
  
  // takes an array of descriptors and makes an array of objects in this format
  // [{name: descriptop, count: 0}]
  // parameters:
    // an array of names, and an array of counts (these should correspond by index)
  // returns:
    // an array of objects
  function makeNameAndCountArray (nameList, countList) {
    const result = nameList.reduce((acc, desc, index) => {
      acc.push({name: desc, count: countList[index]});
      return acc;
    }, []);
    return result;
  }
  
  // puts an array of name / count objects into order from highest to lowest count
  // parameters:
    // an array of name / count objects
  // returns:
    // the sorted parameter array
  function orderByCount (nameCount) {
    return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
  }
  
  // a function to shorten a list to 5 or less items
  // parameters:
    // an array
  // return:
    // an array that is 5 or less items long
  function topFive (list) {
    while (list.length > 5) {
      list.pop();
    }
    return list;
  }
  
  // a function to create the formatted return for all the top 5 lists here
  // parameters:
    //  an array of names, and an array of counts (these should correspond by index)
  // return:
    // an array of objects similar to {name: foo, count: number}, sorted largest to smallest, at most 5 objects long
  function makeSortedTopFiveNameCountArray (nameList, countList)
  {
    const result = makeNameAndCountArray(nameList, countList);
    orderByCount(result);
    return topFive(result);
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
