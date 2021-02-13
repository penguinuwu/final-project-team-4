import React from 'react';

const Comment = (props) => {
  const details = props.details;
  return (
    <div className='row border-grey rounded bg-dark mx-auto mb-4 p-3'>
      <a href='/user'>
        <p className='m-0'>{details.user}</p>
      </a>
      <p className='my-2'>{details.content}</p>
      <p className='text-muted m-0'>{details.time}</p>
    </div>
  );
};

export default Comment;
