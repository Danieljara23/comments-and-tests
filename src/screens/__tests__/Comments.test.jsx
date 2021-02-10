import { cleanup, fireEvent, waitFor } from "@testing-library/react"
import axios from 'axios';
import { render } from '@testing-library/react';
import Comments from "../Comments";
//Arrange
const comment1 = {
  id: 1,
  comment: 'I do love writing tests',
  author: 'The Notester'
};

const comment2 = {
  id: 2,
  comment: 'Nothing is better than a good comment app',
  author: 'Comment Hater'
};

const newComment = {
  id: 3,
  comment: 'Brave new world of testing',
  author: 'Spongebob'
};

const comments = [ comment1, comment2 ]

describe('Comments Screen', () => {
  afterEach(cleanup);

  beforeEach(() => {
    axios.get = jest.fn(() => Promise.resolve(comments));
    axios.post = jest.fn(() => Promise.resolve(newComment));
  });

  test('It fetches comments an renders them to the page', async () => {
      //Act
      const { getByText } = render(<Comments />);

      await waitFor(() => getByText(comment1.comment));
      
      //Assert
    const firstCommentNode = getByText(comment1.comment);
    const firstAuthorTagNode = getByText(`- ${comment1.author}`);
    const secondCommentNode = getByText(comment2.comment);
    const secondAuthorTagNode = getByText(`- ${comment2.author}`);

    expect(firstCommentNode).toBeDefined();
    expect(firstAuthorTagNode).toBeDefined();
    expect(secondCommentNode).toBeDefined();
    expect(secondAuthorTagNode).toBeDefined();
  });

  test('it creates a new commment, renders it and clears out form upon submission', async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<Comments/>);

    await waitFor(() => getByText(comment1.comment));

    const submitButton = getByText('Add Comment');
    const commentTexTFieldNode = getByPlaceholderText('Write something...');
    const nameFieldNode = getByLabelText('Your Name');

    fireEvent.change(commentTexTFieldNode, { target: { value: newComment.comment } });
    fireEvent.change(nameFieldNode, { target: { value: newComment.author } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(commentTexTFieldNode.value).toEqual('')
    });
    expect(nameFieldNode.value).toEqual('');
  });
})