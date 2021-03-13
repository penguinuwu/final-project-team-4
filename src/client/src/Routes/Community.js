import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

const Community = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [videos, setVideos] = useState([]);
  const [textPosts, setTextPosts] = useState([]);
  const user = useContext(UserContext);

  // horrible practice but quick fix
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/getAllPosts`,
      withCredentials: true
    })
      .then((res) => {
        setScreenshots(res.data.screenshots);
        setVideos(res.data.videos);
        setTextPosts(res.data.texts);
      })
      .catch((err) => console.log(err));
  }, []);

  // Janky, needs fixing
  const like = async (index, type) => {
    // send update likes request
    if (type === 'screenshot') {
      let res = await updateLikes(screenshots[index].id);
      if (res) {
        screenshots[index].hasLiked = res.data.hasLiked;
        screenshots[index].likes = res.data.likes;
        forceUpdate();
      }
    } else if (type === 'video') {
      let res = await updateLikes(videos[index].id);
      if (res) {
        videos[index].hasLiked = res.data.hasLiked;
        videos[index].likes = res.data.likes;
        forceUpdate();
      }
    } else if (type === 'text') {
      let res = await updateLikes(textPosts[index].id);
      if (res) {
        textPosts[index].hasLiked = res.data.hasLiked;
        textPosts[index].likes = res.data.likes;
        forceUpdate();
      }
    }
  };

  const updateLikes = async (id) => {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/updateLikes`,
        data: {
          postID: id
        },
        withCredentials: true
      });
      return res;
    } catch (error) {
      return false;
    }
  };

  const display = (objs, type) => {
    // liked is a list
    return (
      <div className='row'>
        {objs.map((obj, index) => (
          <div
            className='col-12 col-sm-6 col-md-4 col-lg-3 p-1'
            key={JSON.stringify(obj)} // unique key, temporary for now
          >
            {/* card header */}
            <div className='card h-100 bg-dark'>
              {
                type === 'video' ? (
                  <iframe
                    title={obj.title}
                    className='responsive-iframe card-img-top img-fluid'
                    src={obj.video}
                    allowFullScreen
                  ></iframe>
                ) : type === 'screenshot' ? (
                  <a href={`/media/${obj.id}`}>
                    <img
                      src={obj.screenshot}
                      className='card-img-top img-fluid'
                      alt={obj.title}
                    />
                  </a>
                ) : null // Text post don't need images
              }

              {/* card body */}
              <div className='card-body'>
                <div className='d-flex p-0 mb-1'>
                  <div className='me-auto text-truncate pe-2'>
                    <h4 className='card-title text-truncate'>
                      <a href={`/media/${obj.id}`}>{obj.title}</a>
                    </h4>
                  </div>
                  <div className='ps-2 ms-auto'>
                    {user.user ? (
                      <button
                        className='btn-primary d-inline rounded'
                        onClick={() => like(index, type)}
                      >
                        {!obj.hasLiked ? (
                          <i className='far fa-heart d-inline pe-1' />
                        ) : (
                          <i className='fas fa-heart d-inline pe-1' />
                        )}
                        {obj.likes}
                      </button>
                    ) : (
                      <button
                        className='btn-secondary d-inline rounded'
                        disabled
                      >
                        <i className='far fa-heart d-inline pe-1' />
                        {obj.likes}
                      </button>
                    )}
                  </div>
                </div>
                <h5 className='card-text text-truncate'>
                  <a href={`/game/${obj.gameID}`}>{obj.gameName}</a>
                </h5>
                <p className='card-text text-truncate'>
                  Uploaded by{' '}
                  <a href={`/profile/${obj.authorID}`}>@{obj.authorName}</a>
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
        <div className='d-flex me-auto bd-highlight'>
          <div className='input-group flex-nowrap'>
            <input
              type='text'
              className='form-control'
              placeholder='Filter by'
            />
            <button className='btn btn-outline-success' type='button'>
              <i className='fas fa-search'></i>
            </button>
          </div>
          <button
            className='ms-3 btn btn-success'
            disabled={user ? false : true}
          >
            <a href='/upload'>Upload</a>
          </button>
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
        {display(videos, 'video')}
      </div>

      {/* Screenshots */}
      <div className='my-5'>
        <h3>Screenshots</h3>
        {display(screenshots, 'screenshot')}
      </div>

      {/* Text */}
      <div className='my-5'>
        <h3>Text Posts</h3>
        {display(textPosts, 'text')}
      </div>
    </React.Fragment>
  );
};

export default Community;
