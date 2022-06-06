import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg'


function Header(props) {
  
  const location = useLocation();

  const [isClicked, setIsClicked] = React.useState(false);
  
  const handleClickMenu = () => {
    setIsClicked(!isClicked);
  }

  React.useEffect(() => {
    if(isClicked === true) {
      setIsClicked(!isClicked);
    } else {
      setIsClicked(isClicked);
    }
  }, [location])
  
  return (
    <header className="header">
      
      <div className={`header__menu ${isClicked ? 'header__menu_show' : ''}`}>
        <p className="header__email">
          {location.pathname === "/" ? props.userEmailOnHeader : ""}
        </p>
        <Link to={location.pathname === "/sign-up" ? "/sign-in" : location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
          className="header__link"
          onClick={location.pathname === "/" ? props.logoutProfile : () => {}}
        >
          {location.pathname === "/sign-up" ? "Войти" : location.pathname === "/sign-in" ? "Регистрация" : "Выйти"}
        </Link>
      </div>
      <div className='header__box'>
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        <div className={isClicked ? 'header__menu-btn_close' : 'header__menu-btn_open'} onClick={handleClickMenu} />
      </div>
        
    </header>
  );
}

export default Header;
