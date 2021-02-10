import { useState, useEffect } from "react";
import axios from 'axios';

const initialState = {
  comment: '',
  author: ''
}

function CommentForm({ addComment }){
  const [ formValues, setFormValues ] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(null);

  const handleOnChange = ({target: { name, value }}) => setFormValues((_prevState) => ({
    ..._prevState,
    [name]: value
  }));

  const clearForm = () => {
    setFormValues(initialState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = formValues;
    createComment(newComment);
  }

  const createComment = newComment => {
    axios.post('/api/comments', { newComment })
      .then(comment => {
        addComment(comment)
        clearForm();
      })
      .catch(console.error)
  }

  useEffect(()=>{
    if(formValues.comment.trim() !== '' && formValues.author.trim() !== ''){
      setIsDisabled(true);
    }
  }, [formValues.author, formValues.comment])

  return(
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <textarea
          style={styles.commentBox}
          onChange={handleOnChange}
          placeholder="Write something..."
          name="comment"
          value={formValues.comment}
        />
      </div>
      <div>
        <label htmlFor="author" aria-labelledby="author">Your Name</label>
        <input
          style={styles.inputField}
          onChange={handleOnChange}
          id="author"
          type="text"
          name="author"
          value={formValues.author}
        />
      </div>
      <button style={styles.button} disabled={!isDisabled}>
        Add Comment
      </button>

    </form>
  )
}

const styles = {
  form: {
    margin: 'auto',
    padding: '0px',
    width: '500px'
  },
  commentBox: {
    width: '494px',
    height: '80px',
    marginBottom: '12px'
  },
  inputField: {
    width: '360px',
    float: 'right',
  },
  button: {
    marginTop: '12px',
    width: '500px',
    color: '#ffffff',
    backgroundColor: '#767676',
    padding: '6px',
    borderRadius: '8px'
  }
}

export default CommentForm;