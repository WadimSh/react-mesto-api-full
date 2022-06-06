import React from 'react'
import PopupWithForm from "./PopupWithForm";

function DeletePopupCard(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
      <PopupWithForm
        name="delete"
        title="Вы уверены"
        buttonTextSubmit={props.buttonTextSubmit}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      />
     
  )
}

export default DeletePopupCard