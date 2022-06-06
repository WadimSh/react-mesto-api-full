import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isErrore, setIsErrore] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);
  
  React.useEffect(() => {
    avatarRef.current.value = '';
    setIsDisabled(true);
    setIsErrore(false);
    setErrorMessage('');
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  const handleChangeLink = (e) => {
    if(avatarRef.current.checkValidity()) {
      setIsDisabled(false);
      setIsErrore(false);
      setErrorMessage('');
    } else {
      setIsDisabled(true);
      setIsErrore(true);
      setErrorMessage(e.target.validationMessage);
    }
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      buttonTextSubmit={props.buttonTextSubmit}
      name="avatar"
      title="Обновить аватар"
      isDisabled={isDisabled}
    >
      <input
        ref={avatarRef}
        type="url"
        className={`popup__input ${isErrore ? 'popup__input_type_error' : ''}`}
        name="avatar"
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className={`popup__input-error ${isErrore ? 'popup__input-error_activ' : ''}`}>{errorMessage}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
