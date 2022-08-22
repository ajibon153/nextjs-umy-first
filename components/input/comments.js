import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (showComments) {
        await fetch(`/api/comments/${eventId}`)
          .then((res) => res.json())
          .then((data) => setComments(data.data.comments));
        setIsLoading(false);
      } else {
        setComments([]);
      }
    }
    load();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/` + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (data.data.comments)
          setComments((prevComment) => [...prevComment, data.data.comments]);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <>
          {!IsLoading ? <CommentList items={Comments} /> : <p>Loading....</p>}
        </>
      )}
    </section>
  );
}

export default Comments;
