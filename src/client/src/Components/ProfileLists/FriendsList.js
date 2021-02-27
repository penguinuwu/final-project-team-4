import React from 'react';
import User from '../../avatar.png';

const Friends = [
  {
    username: 'Someguy',
    description: 'Pro gamer with 20,000 hours in League of Legends...',
    common_games: ['League of Legends', 'CS:GO']
  },
  {
    username: 'xxxLegendxxx',
    description: 'Looking for friends to play games with',
    common_games: ['Fallguys', 'AmongUs', 'GTA5']
  }
];

const FriendsList = () => {
  return (
    <div className='pt-3 mx-0 px-0 mx-md-2 px-md-1 mx-lg-5 px-lg-5'>
      {Friends.map((friend) => (
        <div className='card mx-5 mb-4 p-3 bg-purple' key={friend.username}>
          <div className='row'>
            <div className='col-12 col-md-4 col-lg-3 video-hover my-auto'>
              <a href='/user'>
                <img
                  className='card-img-top img-fluid mw-100 h-auto'
                  src={User}
                  alt='Friend'
                />
              </a>
            </div>
            <div className='col-12 col-md-8 col-lg-9'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <a href='/user'>{friend.username}</a>
                </h5>
                <p className='card-text'>{friend.description}</p>
                {/* <p className='card-text'> */}
                Common Games:{' '}
                <ul className='list-inline'>
                  {friend.common_games.map((game) => (
                    <li
                      className='list-inline-item btn-info btn-sm'
                      key={game}
                    >
                      {game}
                    </li>
                  ))}
                </ul>
                {/* </p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
