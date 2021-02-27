import { useState, useContext, useEffect } from 'react';
import League from '../../lol.jpg';
import axios from 'axios';
import UserContext from '../../Contexts/UserContext';

const updateRank = async (user, id, game, setEditting, newRank) => {
  // send request to server to update the description
  try {
    let res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/updaterank`,
      data: {
        username: user,
        gameID: id,
        rank: newRank
      },
      withCredentials: true
    });
    if (res) {
      game.rank = newRank;
      setEditting({}); // Clears and causes a refresh of the list which is needed
    }
  } catch (error) {
    console.log(error);
  }
};

const GameList = () => {
  const { user } = useContext(UserContext);
  const [tempRank, setTempRank] = useState('');
  const [games, setGames] = useState([]);
  const [editting, setEditting] = useState({}); // Game
  let idCounter = 0;

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/getgames`,
      data: {},
      withCredentials: true
    })
      .then((res) => setGames(res.data.games))
      .catch((err) => console.log(err));
  }, []); // [] to prevent infinite loop from setGames

  return (
    <div className='row'>
      <div
        className='modal fade'
        id='gameRank'
        tabIndex='-1'
        aria-labelledby='gameRankLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content bg-dark'>
            <div className='modal-header'>
              <h5 className='modal-title' id='gameRankLabel'>
                Change Rank
              </h5>
              <button
                type='button'
                className='btn-close bg-secondary'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>Change your rank below.</p>
              <div className='form-group text-end'>
                <textarea
                  value={tempRank}
                  onChange={(e) => setTempRank(e.target.value)}
                  className='form-control bg-dark border-grey text-white w-100'
                  rows='1'
                  placeholder='Rank'
                ></textarea>
              </div>
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
                data-bs-dismiss='modal'
                onClick={() =>
                  updateRank(
                    user,
                    editting.game,
                    editting,
                    setEditting,
                    tempRank
                  )
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {games.map((game) => (
        <div
          className='col-12 col-sm-6 col-md-4 col-lg-3 p-3'
          key={idCounter++} // need unique key
        >
          <div className='card h-100 bg-purple'>
            <div className='bg-dark video-hover'>
              <a href='/game'>
                <img
                  className='card-img-top img-fluid'
                  src={League}
                  alt='Game'
                />
              </a>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>A Game</h5>
              <p className='card-text'>Rank: {game.rank}</p>
              <p className='card-text'>Hours: {game.hours}</p>

              <button
                type='button'
                className='btn btn-primary long-btn m-1'
                data-bs-toggle='modal'
                data-bs-target='#gameRank'
                onClick={() => {
                  setEditting(game);
                  setTempRank('');
                }}
              >
                Change Rank
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
