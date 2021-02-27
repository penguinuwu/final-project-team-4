import React, { useState, useContext, useEffect } from 'react';
import Avatar from '../avatar.png';
import HomeList from '../Components/ProfileLists/HomeList';
import GameList from '../Components/ProfileLists/GameList';
import MediaList from '../Components/ProfileLists/MediaList';
import FriendsList from '../Components/ProfileLists/FriendsList';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [skillful, setSkill] = useState(0); // Set these to the actual commend amounts later when context gets more info added to it
  const [friendly, setFriendly] = useState(0);
  const [knowledgeable, setKnowledge] = useState(0);
  const [friend, setFriend] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [tab, setTab] = useState('Home');
  const [desc, setDesc] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [tempUsername, setTempUsername] = useState(user);
  const [profilePic, setProfilePic] = useState('None');
  const [tempProfilePic, setTempProfilePic] = useState('None');

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/getUserDetails`,
      data: {},
      withCredentials: true
    })
      .then((res) => {
        // Don't need to set the username here as its initially the context and context is set when username changes
        setDesc(res.data.description);
        setTempDesc(res.data.description);
        setSkill(res.data.commendations.skillful);
        setFriendly(res.data.commendations.friendly);
        setKnowledge(res.data.commendations.knowledgeable);
      })
      .catch((err) => console.log(err));
  }, []); // [] to prevent infinite loop

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

  const updateDescription = async (newDesc) => {
    // send request to server to update the description
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/updateDescription`,
        data: {
          username: user,
          description: newDesc
        },
        withCredentials: true
      });
      if (res) setDesc(newDesc);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/updateUsername`,
        data: {
          username: newUsername
        },
        withCredentials: true
      });
      if (res) setUser(newUsername);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCommends = async (
    newSkillful,
    newFriendly,
    newKnowledgeable
  ) => {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/updateCommends`,
        data: {
          skillful: newSkillful,
          friendly: newFriendly,
          knowledgeable: newKnowledgeable
        },
        withCredentials: true
      });
      if (res) {
        setSkill(newSkillful);
        setFriendly(newFriendly);
        setKnowledge(newKnowledgeable);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (newImage) => {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/updateImage`,
        data: newImage,
        headers: {
          'Content-Type': 'image/jpg'
        },
        withCredentials: true
      });
      if (res) {
        setProfilePic(newImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async (newUsername, newDesc, image) => {
    if (newUsername !== user) {
      updateUsername(newUsername);
    }
    if (newDesc !== desc) {
      updateDescription(newDesc);
    }
    if (image !== 'None' && image !== profilePic) {
      updateImage(image);
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
                  <p>@{user}</p>
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

                  <button
                    type='button'
                    className='btn btn-secondary long-btn m-1'
                    data-bs-toggle='modal'
                    data-bs-target='#profileSettings'
                  >
                    Settings
                  </button>

                  <div
                    className='modal fade'
                    id='profileSettings'
                    tabIndex='-1'
                    aria-labelledby='profileSettingsLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content bg-dark'>
                        <div className='modal-header'>
                          <h5
                            className='modal-title'
                            id='profileSettingsLabel'
                          >
                            Profile Settings
                          </h5>
                          <button
                            type='button'
                            className='btn-close bg-secondary'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>
                          <p>Username:</p>
                          <div className='form-group text-end'>
                            <input
                              className='form-control bg-dark text-white border-grey'
                              value={tempUsername}
                              placeholder='Username'
                              onChange={(e) => setTempUsername(e.target.value)}
                            ></input>
                          </div>

                          <p className='mt-3'>Description:</p>
                          <div className='form-group text-end'>
                            <textarea
                              value={tempDesc}
                              onChange={(e) => setTempDesc(e.target.value)}
                              className='form-control bg-dark border-grey text-white w-100'
                              rows='6'
                              placeholder='Description'
                            ></textarea>
                          </div>

                          <p className='mt-3'>Upload Profile Picture:</p>
                          <input
                            type='file'
                            name='Upload'
                            onChange={(e) =>
                              setTempProfilePic(e.target.files[0])
                            }
                          />
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                          >
                            Close
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() =>
                              saveChanges(
                                tempUsername,
                                tempDesc,
                                tempProfilePic
                              )
                            }
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    onClick={() =>
                      updateCommends(skillful + 1, friendly, knowledgeable)
                    }
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Skillful: {skillful}
                  </button>
                  <button
                    onClick={() =>
                      updateCommends(skillful, friendly + 1, knowledgeable)
                    }
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Friendly: {friendly}
                  </button>
                  <button
                    onClick={() =>
                      updateCommends(skillful, friendly, knowledgeable + 1)
                    }
                    data-toggle='button'
                    className='btn btn-secondary long-btn m-1'
                  >
                    Knowledgeable: {knowledgeable}
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
