import React, { useState } from 'react';
import Comment from '../Components/Comment';

const Content = {
  title: 'First Game of Valorant',
  type: 'screenshot',
  game: 'Valorant',
  poster: '@Someguy',
  date: 'Feb 8, 2021 7:00pm EST',
  likes: 5,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const Comments = [
  {
    user: '@L33TProGamer',
    content: 'Great game!',
    time: 'Feb 10, 2021 1:22 pm EST'
  },
  {
    user: '@xxxKiritoxxx',
    content: 'You should add me. We can queue together.',
    time: 'Feb 10, 2021 1:30 pm EST'
  },
  {
    user: '@Normalguy',
    content: 'Valorant is a really fun game.',
    time: 'Feb 11, 2021 11:01 am EST'
  }
];

const MediaContent = () => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [refresh, setRefresh] = useState(false); // Causes a refresh so new comments appear

  const updateLikes = () => {
    if (liked) {
      Content.likes -= 1;
    } else {
      Content.likes += 1;
    }
    setLiked(!liked);
  };

  const addComment = () => {
    Comments.push({
      user: '@Currentuser',
      content: comment,
      time: 'Feb 11, 5:00 pm EST'
    });
    setComment('');
    setRefresh(!refresh);
  };

  const renderContent = () => {
    switch (Content.type) {
      case 'screenshot':
        return (
          <img
            className='bg-dark text-center'
            src='https://i.ytimg.com/vi/Wrdh5HrOCMc/maxresdefault.jpg'
            alt='Media'
          />
        );
      case 'video':
        return (
          <div className='ratio ratio-16x9'>
            <iframe
              src='https://www.youtube.com/embed/tgbNymZ7vqY'
              title='Pog'
              allowFullScreen
            ></iframe>
          </div>
        );
      case 'text':
        return <p className='p-3'>{Content.content}</p>;
      default:
        return null;
    }
  };

  return (
    <div className='row d-flex'>
      <div className='col-12 col-md-10 mx-auto'>
        <h2 className='text-center'>{Content.title}</h2>
        <div className='card border-grey bg-dark mx-auto p-3'>
          {renderContent()}
          <div className='card-body'>
            <div className='row rounded border-grey p-3 text-center'>
              <div className='col'>
                <p className='m-0'>
                  Posted By: <a href='/user'>{Content.poster}</a>
                </p>
              </div>
              <div className='col'>
                <p className='m-0'>Posted: {Content.date}</p>
              </div>
              <div className='col'>
                <p className='m-0'>
                  Game: <a href='/game'>{Content.game}</a>
                </p>
              </div>
              <div className='col'>
                <button
                  className='btn-primary d-inline rounded'
                  onClick={() => updateLikes()}
                >
                  {!liked ? (
                    <i className='far fa-heart d-inline pe-1' />
                  ) : (
                    <i className='fas fa-heart d-inline pe-1' />
                  )}
                  {Content.likes}
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className='text-center mt-5'>Comments</h2>
        <div className='row border-grey rounded bg-dark mx-auto mb-4 p-3'>
          <div className='form-group text-end'>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='form-control bg-dark border-grey text-white w-100'
              rows='2'
              placeholder='Add a comment'
            ></textarea>
            <button
              type='submit'
              onClick={() => addComment('Test')}
              className='btn btn-primary mt-1'
            >
              Comment
            </button>
          </div>
        </div>
        {Comments.map((comment) => (
          <Comment
            details={comment}
            key={JSON.stringify(comment)} // unique key, temporary for now
          />
        ))}
      </div>
    </div>
  );
};

export default MediaContent;
