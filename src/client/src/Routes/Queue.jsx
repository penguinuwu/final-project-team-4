import React, { Component } from 'react';
import axios from 'axios';

class Queue extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      gameID: '',
      gameIDs: [],
      inQueue: false,
      queues: []
    };

    this.setQueueState = this.setQueueState.bind(this);
    this.setGameID = this.setGameID.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }

  setQueueState(data = { inQueue: false, queues: [] }) {
    // only setstate if component is mounted
    if (!this._isMounted) return;
    this.setState({
      alert: this.state.alert,
      gameID: this.state.gameID,
      gameIDs: this.state.gameIDs,
      inQueue: data.inQueue,
      queues: data.queues
    });
  }

  setGameID(id) {
    // only setstate if component is mounted
    if (!this._isMounted) return;
    this.setState({
      alert: this.state.alert,
      gameID: id,
      gameIDs: this.state.gameIDs,
      inQueue: this.state.inQueue,
      queues: this.state.queues
    });
  }

  setGameIDs(ids) {
    // only setstate if component is mounted
    if (!this._isMounted) return;
    this.setState({
      alert: this.state.alert,
      gameID: this.state.gameID,
      gameIDs: ids,
      inQueue: this.state.inQueue,
      queues: this.state.queues
    });
  }

  setAlert(alert) {
    // only setstate if component is mounted
    if (!this._isMounted) return;
    this.setState({
      alert: alert,
      gameID: this.state.gameID,
      gameIDs: this.state.gameIDs,
      inQueue: this.state.inQueue,
      queues: this.state.queues
    });
  }

  async getQueue(id = null) {
    let data = id ? { gameID: id } : {};
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/getqueue`,
        data: data,
        withCredentials: true
      });
      this.setQueueState(res.data);
    } catch (err) {
      this.setQueueState();
    }
  }

  async joinQueue() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/joinqueue`,
        data: { gameID: this.state.gameID },
        withCredentials: true
      });
      this.setAlert(res.data);
      this.getQueue();
    } catch (err) {
      if (err.response && err.response.data) this.setAlert(err.response.data);
    }
  }

  async leaveQueue() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/leavequeue`,
        withCredentials: true
      });
      this.setAlert(res.data);
      this.getQueue();
    } catch (err) {
      if (err.response && err.response.data) this.setAlert(err.response.data);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/getgames`,
      withCredentials: true
    })
      .then((obj) => this.setGameIDs(obj.data.games))
      .catch((err) => this.setGameIDs([]));

    // get queue every second
    this.interval = setInterval(() => this.getQueue(), 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.interval);
  }

  // TODO: use api instead of hardcode
  renderGameName(id) {
    switch (id) {
      case '313233343536373839303132':
        return 'osu!';
      case '313233343536373839303134':
        return 'Melee';
      case '313233343536373839303133':
        return 'POE';
      case '313233343536373839303136':
        return 'CS:GO';
      case '313233343536373839303138':
        return 'LoL';
      default:
        return 'Choose a game';
    }
  }

  renderJoinLeaveButton() {
    if (this.state.inQueue) {
      return (
        <button className='btn btn-success' onClick={(e) => this.leaveQueue()}>
          Leave Queue
        </button>
      );
    } else {
      return (
        <React.Fragment>
          <div className='dropdown'>
            <button
              className='btn btn-light dropdown-toggle'
              data-bs-toggle='dropdown'
            >
              {this.renderGameName(this.state.gameID)}
            </button>
            <ul className='dropdown-menu'>
              {this.state.gameIDs.map((game) => (
                <li
                  key={game.game}
                  role='button'
                  className='dropdown-item'
                  onClick={(e) => this.setGameID(game.game)}
                >
                  {this.renderGameName(game.game)}
                </li>
              ))}
            </ul>
          </div>
          <button
            className='btn btn-success'
            onClick={(e) => this.joinQueue()}
          >
            Join Queue
          </button>
        </React.Fragment>
      );
    }
  }

  renderAlert() {
    if (!this.state.alert) return;
    return (
      <div
        className='alert alert-warning alert-dismissible fade show mt-2 mb-0'
        role='alert'
      >
        {this.state.alert}
        <button
          className='btn-close'
          data-bs-dismiss='alert'
          aria-label='Close'
        ></button>
      </div>
    );
  }

  renderRows() {
    return (
      <React.Fragment>
        {this.state.queues.map((row) => (
          <tr key={row.id}>
            <th className='fw-normal'>{this.renderGameName(row.game)}</th>
            <th className='fw-normal'>{row.user}</th>
            <th className='fw-normal'>{row.rank}</th>
          </tr>
        ))}
      </React.Fragment>
    );
  }

  renderQueue() {
    if (this.state.queues.length === 0)
      return (
        <tbody>
          <tr>
            <th>No queues found! Start your own queue?</th>
          </tr>
        </tbody>
      );

    return (
      <React.Fragment>
        <thead>
          <tr className='text-decoration-underline'>
            <th scope='col'>Game</th>
            <th scope='col'>User</th>
            <th scope='col'>Rank</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {/* Title */}
        <h2>Queue</h2>

        {/* Header */}
        <div className='d-flex'>
          {/* Join or leave queue */}
          <div className='me-auto'>
            <div className='input-group flex-nowrap'>
              {this.renderJoinLeaveButton()}
            </div>
          </div>

          {/* Sort dropdown */}
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

        {/* Refresh button */}
        <div className='d-flex mt-1'>
          <div className='ms-auto'>
            <button
              className='btn btn-primary me-1'
              onClick={(e) => this.getQueue()}
            >
              Refresh <i className='fas fa-sync-alt'></i>
            </button>
          </div>
        </div>

        {/* Error display */}
        {this.renderAlert()}

        {/* Rows */}
        <div className='row mt-2'>
          <div className='col'>
            <table className='table table-success table-striped table-hover'>
              {this.renderQueue()}
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Queue;
