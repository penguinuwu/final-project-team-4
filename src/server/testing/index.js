const test = (req, res) => {
  const API_URL = process.env.API_URL;

  let signup = `
    <div>
      <h2>Sign Up</h2>
      <form action='${API_URL}/signup' method='POST'>
        <div>
          <label for='email'>Email (optional): </label>
          <input type='email' id='email' name='email'>
        </div>
        <div>
          <label for='username'>Username: </label>
          <input type='text' id='username' name='username' required>
        </div>
        <div>
          <label for='password'>Password: </label>
          <input type='password' id='password' name='password' required>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  `;

  let signin = `
    <div>
      <h2>Sign In</h2>
      <form action='${API_URL}/signin' method='POST'>
        <div>
          <label for='email'>Email (optional): </label>
          <input type='email' id='email' name='email'>
        </div>
        <div>
          <label for='username'>Username: </label>
          <input type='text' id='username' name='username' required>
        </div>
        <div>
          <label for='password'>Password: </label>
          <input type='password' id='password' name='password' required>
        </div>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  `;

  let signout = `
    <div>
      <h2>Sign Out</h2>
      <form action='${API_URL}/signout' method='POST'>
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  `;

  let getQueue = `
    <div>
      <h2>Get Queue</h2>
      <form action='${API_URL}/getqueue' method='POST'>
        <label>Game ID: </label>
        <input type='text' name='gameID'>
        <button type='submit'>Get Queue</button>
      </form>
    </div>
  `;

  let joinQueue = `
    <div>
      <h2>Join Queue</h2>
      <form action='${API_URL}/joinqueue' method='POST'>
        <label>Game ID: </label>
        <input type='text' name='gameID'>
        <button type='submit'>Join Queue</button>
      </form>
    </div>
  `;

  let leaveQueue = `
    <div>
      <h2>Leave Queue</h2>
      <form action='${API_URL}/leavequeue' method='POST'>
        <button type='submit'>Leave Queue</button>
      </form>
    </div>
  `;

  return res.status(200).send(`
    <h1>Testing Page</h1>
    <p>Hello ${JSON.stringify(req.user)}</p>
    ${signup}
    ${signin}
    ${signout}
    ${getQueue}
    ${joinQueue}
    ${leaveQueue}
  `);
};

module.exports = test;
