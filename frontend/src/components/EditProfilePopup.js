import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const nameRef = React.useRef();
  const aboutRef = React.useRef();

  const [errorMessageName, setErrorMessageName] = React.useState('');
  const [isErroreName, setIsErroreName] = React.useState(true);
  const [errorMessageAbout, setErrorMessageAbout] = React.useState('');
  const [isErroreAbout, setIsErroreAbout] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);

  //const [name, setName] = React.useState("");
  //const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    nameRef.current.value = currentUser.name;
    aboutRef.current.value = currentUser.about;
    setIsDisabled(true);
    setIsErroreName(false);
    setErrorMessageName('');
    setIsErroreAbout(false);
    setErrorMessageAbout('');
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: nameRef.current.value,
      about: aboutRef.current.value,
    });
  };

  const handleChangeUserName = (e) => {
    if(nameRef.current.checkValidity()) {
      handleClick();
      setIsErroreName(false);
      setErrorMessageName('');
    } else {
      handleClick();
      setIsErroreName(true);
      setErrorMessageName(e.target.validationMessage);
    }
  };

  const handleChangeUserDescription = (e) => {
    if(aboutRef.current.checkValidity()) {
      handleClick();
      setIsErroreAbout(false);
      setErrorMessageAbout('');
    } else {
      handleClick();
      setIsErroreAbout(true);
      setErrorMessageAbout(e.target.validationMessage);
    }
  };

  const handleClick = () => {
    if(nameRef.current.checkValidity() && aboutRef.current.checkValidity()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      buttonTextSubmit={props.buttonTextSubmit}
      name="profile"
      title="Редактировать профиль"
      isDisabled={isDisabled}
    >
      <input
        ref={nameRef}
        onChange={handleChangeUserName}
        type="text"
        className={`popup__input ${isErroreName ? 'popup__input_type_error' : ''}`}
        name="name"
        placeholder="Ваше имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={`popup__input-error ${isErroreName ? 'popup__input-error_activ' : ''}`}>{errorMessageName}</span>
      <input
        ref={aboutRef}
        onChange={handleChangeUserDescription}
        type="text"
        className={`popup__input ${isErroreAbout ? 'popup__input_type_error' : ''}`}
        name="profile"
        placeholder="Ваш род занятий"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
      />
      <span className={`popup__input-error ${isErroreAbout ? 'popup__input-error_activ' : ''}`}>{errorMessageAbout}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
