import db from "./connection";

//returns all comments associated with a certain post based on the markdown_title
export async function getComments(markdown_title) {
  const GET_COMMENTS = `SELECT * from comments WHERE markdown_title = $1`;
  return db.query(GET_COMMENTS, [markdown_title]).then((result) => {
    return result.rows;
  });
}

//adds comment to comments table
export async function addComment(
  comment,
  comment_author,
  markdown_title,
  comment_time
) {
  const ADD_COMMENT = `INSERT INTO comments (comment, comment_author, markdown_title, comment_time) VALUES ($1, $2, $3, $4) RETURNING id`;
  return db
    .query(ADD_COMMENT, [comment, comment_author, markdown_title, comment_time])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error);
    });
}

//deletes comment from comments table, only comment authors can delete their own posts
export async function deleteComment(
  comment,
  comment_author,
  markdown_title,
  comment_time
) {
  const DELETE_COMMENT = `DELETE FROM comments WHERE comment = $1 AND comment_author = $2 AND markdown_title = $3 AND comment_time = $4;`;
  return db
    .query(DELETE_COMMENT, [
      comment,
      comment_author,
      markdown_title,
      comment_time,
    ])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error);
    });
}
