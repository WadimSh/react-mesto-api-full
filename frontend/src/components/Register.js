import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return(
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Регистрация</h3>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange} value={email} required />
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange} value={password} required/>
      <button className="form__button" type="submit">Зарегистрироваться</button>
      <p className="form__caption">
        Уже зарегистрированы? 
        <Link to="/sign-in" className="form__link"> Войти</Link>
      </p>
    </form>
  )
}

export default Register;