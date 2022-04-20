BEGIN;

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(250),
  comment_author text,
  markdown_title text,
  comment_time text 
);

INSERT INTO comments (comment, comment_author, markdown_title, comment_time) VALUES 
('nice, do you have any resources for this?', 'michel', 'Github-as-CMS', '4/10/2022');

