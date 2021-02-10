import { useEffect, useState } from "react";
import axios from 'axios';
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

function Comments() {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios.get('/api/comments')
      .then(comments => setComments(comments))
      .catch(console.error);
  }, []);

  const addComment = (comment) => setComments((_prevState) => (_prevState?.comments?.concat(comment)))

  return(
    <div>
      <CommentForm addComment={addComment} />
      {
        comments && comments.length ? <CommentList comments={comments} />: null
      }
    </div>
  );
}

export default Comments;