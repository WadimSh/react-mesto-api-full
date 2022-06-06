import React from "react";

function PopupWithForm(props) {
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
    <div onClick={closeClickOverlay} className={props.isOpen ? `popup_opened popup` : `popup`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
        ></button>
        <form
          onSubmit={props.onSubmit}
          className="popup__form popup__form_type_edit"
          name={`${props.name}`}
          noValidate
        >
          <h2 className="popup__title">{`${props.title}`}</h2>
          {props.children}
          <button
            type="submit"
            className="popup__save-button"
            disabled={props.isDisabled}
          >{props.buttonTextSubmit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
