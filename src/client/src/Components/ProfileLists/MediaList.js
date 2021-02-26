import React from 'react';
import SampleMedia from '../../red.png';

const Media = [
  { title: 'Epic carry', author: '@L33TGamer', time: 'Jan 3, 2021 1:30pm' },
  { title: 'Insane clutch', author: '@L33TGamer', time: 'Feb 1, 2021 9:30pm' }
];

const MediaList = () => {
  let idCounter = 0;
  return (
    <div className='row'>
      {Media.map((media) => (
        <div
          className='col-12 col-sm-6 col-md-4 col-lg-3 p-3'
          key={idCounter++} // need unique key
        >
          <div className='card h-100 bg-purple'>
            <div className='bg-dark video-hover'>
              <a href='/media'>
                <img
                  className='card-img-top img-fluid'
                  src={SampleMedia}
                  alt='media'
                />
              </a>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>{media.title}</h5>
              <p className='card-text'>Posted By: {media.author}</p>
              <p className='card-text'>{media.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaList;
