import { render } from '@testing-library/react';
import CommentCard from '../CommentCard';

describe('Comment Card', () => {
  test('it renders the comment and the author', () => {
    
    //Arrange
    const props = {
      comment: 'React Testing Library is great',
      author: 'Daniel Jara'
    };

    //Act
    const { getByText }  = render(<CommentCard  {...props}/>);
    

    //Assert
    const commentNode = getByText(props.comment);
    const authorTagNode = getByText(`- ${props.author}`);

    expect(commentNode).toBeDefined();
    expect(authorTagNode).toBeDefined();
  });
});