import React from "react";

const BookmarksContext = React.createContext({
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: () => {}
});

export default BookmarksContext;

/*======= Refactor bookmarks app to use context (#1) ===== */
//We're making a context instance to store the bookmarks
//We created the shape for all methods we intend to implement
//As well as an empty array of bookmarks
//We intend to make addBookmark and deleteBookmark
//..so we've put them in as empty function so we have the shape of context
//BookmarksContext.js ===> App.js
