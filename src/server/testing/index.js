const test = (req, res) => {
  const API_URL = process.env.API_URL;

  let signupTest = `
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

  let signinTest = `
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

  let signoutTest = `
    <div>
      <h2>Sign Out</h2>
      <form action='${API_URL}/signout' method='POST'>
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  `;

  return res.status(200).send(`
    <h1>Testing Page</h1>
    <p>Hello ${JSON.stringify(req.user)}</p>
    ${signupTest}
    ${signinTest}
    ${signoutTest}
  `);
};

module.exports = test;
