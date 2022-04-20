import { addComment } from "../../database/model";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

//receives POST request from add comment form submission
//only authenticated users can make request
//comment added to postgres database
export default withApiAuthRequired(async function storeComment(req, res) {
  const { user } = getSession(req, res);
  const comment_author = user.name ? user.name : "anon";
  const { comment, markdown_title } = req.body;
  const comment_time = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    hour: "numeric",
  });

  await addComment(comment, comment_author, markdown_title, comment_time);

  res.redirect(303, `/discussion?markdownTitle=${markdown_title}`);
});
