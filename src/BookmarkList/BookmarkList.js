import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import "./BookmarkList.css";

class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  static contextType = BookmarksContext;

  render() {
    const { bookmarks } = this.context;
    return (
      <section className="BookmarkList">
        <h2>Your bookmarks</h2>
        <ul className="BookmarkList__list" aria-live="polite">
          {bookmarks.map(bookmark => (
            <BookmarkItem key={bookmark.id} {...bookmark} />
          ))}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;

/*======= Refactor bookmarks app to use context (#4) ===== */
//Now we can use context in the BookmarkList component instead of bookmarks prop
//How to do this:
//Import BookmarksContext
//Add static contextType
//replace props const for context
//BookmarkList.js ===> AddBookmark.js
