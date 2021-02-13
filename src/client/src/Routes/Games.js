import React from 'react';
import { games } from '../tmpGames/GamesList.js';
const Games = () => {
  const display = (objs) => {
    return (
      <div className='row'>
        {objs.map((obj) => (
          <div
            className='col-12 col-sm-6 col-md-4 col-lg-3 p-1'
            key={JSON.stringify(obj)}
          >
            {/* card header */}
            <div className='card h-100 bg-dark'>
              <a href='/games'>
                {obj.video ? (
                  <iframe
                    className='responsive-iframe card-img-top img-fluid'
                    src={`${obj.image}`}
                  ></iframe>
                ) : (
                  <img
                    src={`${obj.image}`}
                    className='card-img-top img-fluid'
                    alt={obj.title}
                  />
                )}
              </a>
              {/* card body */}
              <div className='card-body'>
                <h5 className='card-text text-truncate'>
                  <a href='/games'>{obj.game}</a>
                </h5>
                <div className='d-flex justify-content-end'></div>
                <ul className='list-inline'>
                  {obj.tags.map((tag) => (
                    <li
                      className='list-inline-item btn-info btn-sm'
                      key={JSON.stringify(tag)}
                    >
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
      <div className='row'>
        <h2>Games</h2>
        <div className='col d-flex'>
          <div className='me-auto'>
            <div className='form-outline'>
              <form className='input-group'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Filter by'
                />
                <button className='btn btn-outline-success' type='button'>
                  <i className='fas fa-search'></i>
                </button>
              </form>
            </div>
          </div>
          <div className='ms-auto'>
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
      </div>

      {/* Clips */}
      <div className='my-5'>{display(games, 1)}</div>
    </React.Fragment>
  );
};

export default Games;
