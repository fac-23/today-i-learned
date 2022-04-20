import { deleteComment } from "../../database/model";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

//receives POST request from deletecomment form submission
//only authenticated users can make request
//matching comment deleted from postgres database
export default withApiAuthRequired(async function removeComment(req, res) {
  const { comment, markdown_title, comment_author, comment_time } = req.body;

  await deleteComment(comment, comment_author, markdown_title, comment_time);

  res.redirect(303, `/discussion?markdownTitle=${markdown_title}`);
});
