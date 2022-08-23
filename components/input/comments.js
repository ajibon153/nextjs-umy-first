import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/context/notofication-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([]);
  const [IsFetching, setIsFetching] = useState(true);

  const NotificationCtx = useContext(NotificationContext);

  useEffect(() => {
    async function load() {
      NotificationCtx.hideNotification();
      if (showComments) {
        await fetch(`/api/comments/${eventId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) return setComments(data.data.comments);
            throw new Error(data.message || 'Something went wrong!');
          })
          .catch((error) => {
            NotificationCtx.showNotification({
              title: 'Error!',
              message: error.message || 'Something went wrong',
              status: 'error',
            });
          });
        setIsFetching(false);
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
    NotificationCtx.hideNotification();
    // send data to API

    NotificationCtx.showNotification({
      title: 'Sending data...',
      message: 'Sending commentar to server',
      status: 'pending',
    });
    fetch(`/api/comments/` + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success)
          if (data.data.comments) {
            NotificationCtx.showNotification({
              title: 'Success!',
              message: 'Add new comment Success!',
              status: 'success',
            });
            return setComments((prevComment) => [
              ...prevComment,
              data.data.comments,
            ]);
          }
        throw new Error(data.message || 'Something went wrong!');
      })
      .catch((error) => {
        NotificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
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
          {!IsFetching ? (
            <CommentList items={Comments} />
          ) : (
            <p>Get comment list....</p>
          )}
        </>
      )}
    </section>
  );
}

export default Comments;
