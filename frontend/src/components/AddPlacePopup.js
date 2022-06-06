import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  const [errorMessageName, setErrorMessageName] = React.useState('');
  const [isErroreName, setIsErroreName] = React.useState(true);
  const [errorMessageLink, setErrorMessageLink] = React.useState('');
  const [isErroreLink, setIsErroreLink] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);
  
  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
    setIsDisabled(true);
    setIsErroreName(false);
    setErrorMessageName('');
    setIsErroreLink(false);
    setErrorMessageLink('');
  }, [props.isOpen]);

  const handelNameChange = (e) => {
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

  const handelLinkChange = (e) => {
    if(linkRef.current.checkValidity()) {
      handleClick();
      setIsErroreLink(false);
      setErrorMessageLink('');
    } else {
      handleClick();
      setIsErroreLink(true);
      setErrorMessageLink(e.target.validationMessage);
    }
  };

  const handleClick = () => {
    if(nameRef.current.checkValidity() && linkRef.current.checkValidity()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTextSubmit={props.buttonTextSubmit}
      isDisabled={isDisabled}
    >
      <input
        type="text"
        className={`popup__input ${isErroreName ? 'popup__input_type_error' : ''}`}
        name="title"
        ref={nameRef}
        onChange={handelNameChange}
        placeholder="Название картинки"
        autoComplete="off"
        minLength="2"
        maxLength="30"
        required
      />
      <span className={`popup__input-error ${isErroreName ? 'popup__input-error_activ' : ''}`}>{errorMessageName}</span>
      <input
        type="url"
        className={`popup__input ${isErroreLink ? 'popup__input_type_error' : ''}`}
        name="photo"
        ref={linkRef}
        onChange={handelLinkChange}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className={`popup__input-error ${isErroreLink ? 'popup__input-error_activ' : ''}`}>{errorMessageLink}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
