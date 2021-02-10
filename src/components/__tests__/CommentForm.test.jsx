import { render, fireEvent } from '@testing-library/react';
import CommentForm from '../CommentForm';

describe('Comment Form', () => {
  test('it hast a disabled button until both comment textbox and "Your Name" field have a value', () => {
    //Arrange
    const comment = 'Never put off until tomorrow what can be done today.';
    const author = 'Sensei Wu';

    //Act
    const { getByLabelText, getByPlaceholderText, getByText } = render(<CommentForm/>);

    //Asert
    const submitButton = getByText('Add Comment');
    expect(submitButton.disabled).toEqual(true);

    const commentTexTFieldNode = getByPlaceholderText('Write something...');
    fireEvent.change(commentTexTFieldNode, { target: { value: comment } });
    expect(submitButton.disabled).toEqual(true);

    const nameFieldNode = getByLabelText('Your Name');
    fireEvent.change(nameFieldNode, { target: { value: author } });
    expect(submitButton.disabled).toEqual(false);
  })
});