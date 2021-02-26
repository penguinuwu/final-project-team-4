import React from 'react';
import League from '../../lol.jpg';

const Games = [
  { title: 'League of Legends', rank: 'Diamond', hours: 50 },
  { title: 'League of Legends', rank: 'Diamond', hours: 50 },
  { title: 'CS:GO', rank: 'Global Elite', hours: 300 },
  { title: 'Rocket League', rank: 'Idk', hours: 10 },
  { title: 'Rust', rank: 'N/A', hours: 80 }
];

const GameList = () => {
  let idCounter = 0;
  return (
    <div className='row'>
      {Games.map((game) => (
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
              <h5 className='card-title'>{game.title}</h5>
              <p className='card-text'>Rank: {game.rank}</p>
              <p className='card-text'>Hours: {game.hours}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
