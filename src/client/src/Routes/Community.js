import React from 'react';
import { clips, images } from '../tmp/Globals.js';

const Community = () => {
  // Janky, needs fixing
  const like = (e) => {
    if (!e.target.childNodes[0]) return;

    if (e.target.childNodes[0].classList.contains('far')) {
      e.target.childNodes[0].classList.remove('far');
      e.target.childNodes[0].classList.add('fas');
    } else {
      e.target.childNodes[0].classList.remove('fas');
      e.target.childNodes[0].classList.add('far');
    }
  };

  const display = (objs, isClip) => {
    return (
      <div className='row'>
        {objs.map((obj) => (
          <div
            className='col-12 col-sm-6 col-md-4 col-lg-3 p-1'
            key={JSON.stringify(obj)} // unique key, temporary for now
          >
            {/* card header */}
            <div className='card h-100 bg-dark'>
              {isClip ? (
                <div className='video-hover'>
                  <a href='/media/1'>
                    <img
                      src={obj.image}
                      className='card-img-top img-fluid'
                      alt={obj.title}
                    />
                    <i className='fas fa-play'></i>
                  </a>
                </div>
              ) : (
                <a href='/media/1'>
                  <img
                    src={`${obj.image}`}
                    className='card-img-top img-fluid'
                    alt={obj.title}
                  />
                </a>
              )}

              {/* card body */}
              <div className='card-body'>
                <div className='d-flex p-0 mb-1'>
                  <div className='me-auto text-truncate pe-2'>
                    <h4 className='card-title text-truncate'>
                      <a href='/media/1'>{obj.title}</a>
                    </h4>
                  </div>
                  <div className='ps-2 ms-auto'>
                    <button className='btn-dark d-inline' onClick={like}>
                      <i className='far fa-heart d-inline pe-1' />
                      {obj.likes}
                    </button>
                  </div>
                </div>
                <h5 className='card-text text-truncate'>
                  <a href='/media/1'>{obj.game}</a>
                </h5>
                <p className='card-text text-truncate'>
                  Uploaded by <a href='/media/1'>{obj.user}</a>
                </p>
                <div className='d-flex justify-content-end'></div>
                <ul className='list-inline'>
                  {obj.tags.map((tag) => (
                    <li className='list-inline-item btn-info btn-sm' key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      {/* Title */}
      <h2>Community</h2>

      <div className='d-flex'>
        {/* Filter bar */}
        <div className='me-auto bd-highlight'>
          <form className='input-group flex-nowrap'>
            <input
              type='text'
              className='form-control'
              placeholder='Filter by'
            />
            <button className='btn btn-outline-success' type='button'>
              <i className='fas fa-search'></i>
            </button>
          </form>
        </div>

        {/* Sort dropdown */}
        <div className='bd-highlight'>
          <button
            className='btn btn-secondary dropdown-toggle'
            type='button'
            id='dropdownMenuButton'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Sort by Name
          </button>
          <ul
            className='dropdown-menu bg-secondary'
            aria-labelledby='dropdownMenuButton'
          >
            <li className='dropdown-item'>
              <i className='fas fa-sort-alpha-up' /> Sort by Name: A-Z
            </li>
            <li className='dropdown-item'>
              <i className='fas fa-sort-alpha-down' /> Sort by Name: Z-A
            </li>
            <li className='dropdown-item'>
              <i className='fas fa-sort-amount-down-alt' /> Sort by Rating
            </li>
          </ul>
        </div>
      </div>

      {/* Clips */}
      <div className='my-5'>
        <h3>Video Clips</h3>
        {display(clips, 1)}
      </div>

      {/* Images */}
      <div className='my-5'>
        <h3>Images</h3>
        {display(images, 0)}
      </div>
    </React.Fragment>
  );
};

export default Community;
