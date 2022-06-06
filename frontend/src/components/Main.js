import React from "react";
import Card from "./Card.js";
import Spinner from "./Spinner.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import mainAvatar from "../images/image.jpg";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    
    <main className="content">
    {props.onSpinner ? <Spinner /> : <>
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          type="button"
          className="profile__edit-avatar"
        >
          <img
            src={currentUser.avatar || mainAvatar}
            alt="Фотография для аватарки"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__prof">{currentUser.about}</p>
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__edit-button"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onLikeClick={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section> </>}
    </main>
  );
}

export default Main;
