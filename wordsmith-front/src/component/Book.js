import React from "react";

const Book = props => {
  const { book } = props;
  return (
    <div className="table__row">
      <span>{book.name}</span>
      <span>{book.genre}</span>
    </div>
  );
};
export default Book;
