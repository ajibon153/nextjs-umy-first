import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;

  console.log('items', items);

  if (items.lenght === 0) return '';

  return (
    <ul className={classes.comments}>
      {/* Render list of comments   - fetched from API */}
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
