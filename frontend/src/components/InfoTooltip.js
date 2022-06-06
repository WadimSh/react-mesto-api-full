import React from 'react';
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';


function InfoTooltip(props) {

  const closeClickOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
      props.onClose()
    }
  }

  React.useEffect(() => {
    const closeClickEsc = (e) => {
      if (e.key === "Escape") {
        props.onClose()
      }
    }
    document.addEventListener('keyup', closeClickEsc);
    return () => {
      document.removeEventListener('keyup', closeClickEsc);
    }
  }, []);

  return (
    <div className={`popup popup_type_open ${props.isOpen ? 'popup_opened' : ''}`} onClick={closeClickOverlay}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <img className="popup__image" src={props.status ? successIcon : failIcon} />
        <p className="popup__text">
          {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        
      </div>
    </div>
  )
}

export default InfoTooltip;