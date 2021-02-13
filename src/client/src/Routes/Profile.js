import React, { useState } from 'react';
import Avatar from '../avatar.png';
import HomeList from '../Components/ProfileLists/HomeList';
import GameList from '../Components/ProfileLists/GameList';
import MediaList from '../Components/ProfileLists/MediaList';
import FriendsList from '../Components/ProfileLists/FriendsList';

const desc =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Profile = () => {
  const [skillful, setSkill] = useState(0);
  const [friendly, setFriendly] = useState(0);
  const [knowledgable, setKnowledge] = useState(0);
  const [friend, setFriend] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [tab, setTab] = useState('Home');

  // render short row of tabs
  const renderTabs = () => {
    let home = tab === 'Home' ? 'active tab' : 'tab';
    let games = tab === 'Games' ? 'active tab' : 'tab';
    let media = tab === 'Media' ? 'active tab' : 'tab';
    let frnd = tab === 'Friends' ? 'active tab' : 'tab';
    return (
      <React.Fragment>
        <span className={home} role='button' onClick={() => setTab('Home')}>
          Home
        </span>
        <span className={games} role='button' onClick={() => setTab('Games')}>
          Games
        </span>
        <span className={media} role='button' onClick={() => setTab('Media')}>
          Media
        </span>
        <span className={frnd} role='button' onClick={() => setTab('Friends')}>
          Friends
        </span>
      </React.Fragment>
    );
  };

  // pick type of content to list out
  const renderContentList = () => {
    switch (tab) {
      case 'Home':
        return <HomeList />;
      case 'Games':
        return <GameList />;
      case 'Media':
        return <MediaList />;
      case 'Friends':
        return <FriendsList />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {/* profile row */}
      <div className='row'>
        <div className='col'>
          <div className='card border-purple bg-dark text-white text-center m-5 p-3'>
            <div className='row'>
              <div className='col-12 col-md-4 d-flex flex-column justify-content-between'>
                {/* profile avatar */}
                <img
                  src={Avatar}
                  className='avatar m-auto rounded-circle'
                  alt='Profile Avatar'
                />

                {/* div used here to align user options to bottom of card */}
                <div>
                  <p>@Username</p>
                  <button
                    onClick={() => setFriend(!friend)}
                    className='btn btn-primary long-btn m-1'
                  >
                    {friend ? 'Remove Friend' : 'Add Friend'}
                  </button>
                  <button
                    onClick={() => setBlocked(!blocked)}
                    className='btn btn-danger long-btn m-1'
                  >
                    {blocked ? 'Unblock User' : 'Block User'}
                  </button>
                </div>
              </div>
              <div className='col-12 col-md-8 d-flex flex-column justify-content-between'>
                {/* description */}
                <div className=' border border-lightgray bg-purple rounded m-3 p-5'>
                  {desc}
                </div>

                {/* div used here to align buttons to bottom of card */}
                <div>
                  <h5>Commendations</h5>
                  <button
                    onClick={() => setSkill(skillful + 1)}
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Skillful: {skillful}
                  </button>
                  <button
                    onClick={() => setFriendly(friendly + 1)}
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Friendly: {friendly}
                  </button>
                  <button
                    onClick={() => setKnowledge(knowledgable + 1)}
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Knowledgable: {knowledgable}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* lists row */}
      <div className='row'>
        <div className='col'>
          <div className='card border-purple bg-dark text-center text-white mx-5 p-3'>
            <div className='mb-4'>{renderTabs()}</div>
            {renderContentList()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
