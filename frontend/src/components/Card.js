import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id || props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? "element__delete_active" : ""}`;
  
  const isLiked = props.card.likes.find((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""}`;

  const handleClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onLikeClick(props.card, isLiked);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <li className="element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__photo"
      />
      <div className="element__block">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__box-like">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
    </li>
  );
}

export default Card;
