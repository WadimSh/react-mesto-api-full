import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Вход</h3>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange} value={email} required />
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange} value={password} required />
      <button className="form__button" type="submit">Войти</button>
    </form>
  )
}

export default Login;