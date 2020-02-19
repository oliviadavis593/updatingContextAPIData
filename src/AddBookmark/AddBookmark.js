import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import config from "../config";
import "./AddBookmark.css";

const Required = () => <span className="AddBookmark__required">*</span>;

class AddBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    // get the form fields from the event
    const { title, url, description, rating } = e.target;
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value
    };
    this.setState({ error: null });
    fetch(config.API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        title.value = "";
        url.value = "";
        description.value = "";
        rating.value = "";
        this.context.addBookmark(data);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="AddBookmark">
        <h2>Create a bookmark</h2>
        <form className="AddBookmark__form" onSubmit={this.handleSubmit}>
          <div className="AddBookmark__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="title">
              Title <Required />
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
              required
            />
          </div>
          <div>
            <label htmlFor="url">
              URL <Required />
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://www.great-website.com/"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" />
          </div>
          <div>
            <label htmlFor="rating">
              Rating <Required />
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              defaultValue="1"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="AddBookmark__buttons">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddBookmark;

/*======= Refactor bookmarks app to use context (#5) ===== */
//More complicated changes:
/*
- We dont need withRouter anymore because the AddBookmark is passed to the component prop of Route which gives it history as a prop
- We'll swap props.onAddBookmark for context.addBookmark
- We'll implement the cancel button directly inside this component instead of accepting onClickCancel as a prop
*/
//How to do this:
//Remove withRouter & import BookmarksContext
//Remove static defaultProps (no use for it anymore)
//Add static contextType
//Remove props.onAddBookmark(data) & add context instead
//Add callback function
//Remove onClickCancel const props
//Remove onClickCancel handler
//Add new handler that inside AddBookmark function

//What's happening now:
//That's it for refactoring
//We've swapped the prop-drilling for context to provide the data from the API response
//AddBookmark.js ===> BookmarkItem.js
