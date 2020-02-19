import React from "react";
import Rating from "../Rating/Rating";
import BookmarksContext from "../BookmarksContext";
import config from "../config";
import "./BookmarkItem.css";

function deleteBookmarkRequest(bookmarkId, cb) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: "DELETE",
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
      console.log({ data });
      cb(bookmarkId);
    })
    .catch(error => {
      console.log(error);
    });
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {context => (
        <li className="BookmarkItem">
          <div className="BookmarkItem__row">
            <h3 className="BookmarkItem__title">
              <a href={props.url} target="_blank" rel="noopener noreferrer">
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className="BookmarkItem__description">{props.description}</p>
          <div className="BookmarkItem__buttons">
            <button
              className="BookmarkItem__description"
              onClick={() => {
                deleteBookmarkRequest(props.id, context.deleteBookmark);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  );
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {}
};

/* =========== Implementing the delete button (#1) ======= */
//Now that refactorings done - we can implement the delete button
//..inside BookmarkItem which owns the button
//We'll use a seperate function that accepts a callback if request is successful
//1st: we write the fetch logic for the DELETE request
//How to do this:
//Import config.js
//add function DELETE function for BookmarkRequest

/* =========== Implementing the delete button (#2) ======= */
//Now we can use this function when the button is clicked
//We need to supply the deleteBookmark button in context
//How to do this:
//Import BookmarksContext
//Wrap context around JSX you want to return
//Remove onClickDelete & replace it with the new onClick with the deleteBookmarkRequest