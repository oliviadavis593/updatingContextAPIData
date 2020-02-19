import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import BookmarksContext from "./BookmarksContext";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    bookmarks: [],
    error: null
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
    });
  };

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  };

  deleteBookmark = bookmarkId => {
    console.log(bookmarkId);
    // todo: remove bookmark with bookmarkId from state
    const newBookmarks = this.state.bookmarks.filter(
      bm => bm.id !== bookmarkId
    );
    this.setState({
      bookmarks: newBookmarks
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }));
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark
    };
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route exact path="/" component={BookmarkList} />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;

/*======= Refactor bookmarks app to use context (#2) ===== */
//Now we swap the state of bookmaks for context
//How to do this:
//Import BookmarksContext
//Add an empty array to bookmarks in state
//Remove const bookmarks & replace contextValue
//Wrap Provider isntance around JSX to return
//What's happening:
//The render method inside App is using the render prop on each Route
//..so props can be specified on the AddBookmark & BookmarkList instances

/*======= Refactor bookmarks app to use context (#3) ===== */
//We can use context inside of these components instead of expecting props
//How to do this:
//Swap the render callback prop for the more simple componenet approach to routing
//What's happening:
//Since App is using state to store the bookmarks & we're populating context from the state
//..we don't need to make anymore changes to App component
//App.js ===> BookmarkList.js
