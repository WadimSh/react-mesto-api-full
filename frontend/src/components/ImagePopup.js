import React from "react";

function ImagePopup(props) {
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
    <div
      onClick={closeClickOverlay}
      className={`popup popup_type_photo ${props.card.link && "popup_opened"}`}
    >
      <div className="popup__container popup__container-photo">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__photo"
        />
        <h2 className="popup__photo-caption">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
