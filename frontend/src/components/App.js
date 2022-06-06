import React from "react";
import { Route, Switch, Redirect, useHistory, } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePopupCard from './DeletePopupCard.js';
import ImagePopup from "./ImagePopup.js";

import api from "../utils/api.js";
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isPlaceDeletePopupOpen, setIsPlaceDeletePopupOpen] = React.useState(false);
  
  const [submitTextUserPopup, setSubmitTextUserPopup] = React.useState('Сохранить');
  const [submitTextAddPlacePopup, setSubmitTextAddPlacePopup] = React.useState('Сохранить');
  const [submitTextDeletePlacePopup, setSubmitTextDeletePlacePopup] = React.useState('Да');
  
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
  });
  const [deletCard, setDeleteCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [userEmailOnHeader, setUserEmailOnHeader] = React.useState('');
  const history = useHistory();

  const [isPageLoaded, setIsPageLoaded] = React.useState(false);

  React.useEffect(() => {
    checkToken();
    setIsPageLoaded(true);
    if (loggedIn) {
      history.push('/');
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user,cards]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPageLoaded(false);
      });}
  }, [loggedIn]);

  

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    setSubmitTextDeletePlacePopup('Удаление...');
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitTextDeletePlacePopup('Да');
      });;
  };

  const handleAddPlaceSubmit = (data) => {
    setSubmitTextAddPlacePopup('Создание...');
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitTextAddPlacePopup('Создать');
      });
  };

  const handleUpdateUser = (data) => {
    setSubmitTextUserPopup('Сохранение...');
    api
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitTextUserPopup('Сохранить');
      });
  };

  const handleUpdateAvatar = (data) => {
    setSubmitTextUserPopup('Сохранение...');
    api
      .patchUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitTextUserPopup('Сохранить');
      });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handlePlaceDeletePopupOpen = (card) => {
    setIsPlaceDeletePopupOpen(true);
    setDeleteCard(card);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsPlaceDeletePopupOpen(false);
    setSelectedCard({ link: "", name: "" });
    setDeleteCard({});
    setIsInfoTooltipOpen(false);
  };

  const onRegister = (email, password) => {
    auth
      .register(password, email)
      .then((res) => {        
        if(res) {
          setMessage(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setMessage(false);        
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  const onLogin = (email, password) => {
    auth
      .authorization(password, email)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmailOnHeader(email);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if(token) {
      setLoggedIn(true);
    auth
      .validityToken(token)
      .then((res) => {
        if(res) {
          setUserEmailOnHeader(res.data.email)
        };
        
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const logoutProfile = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          userEmailOnHeader={userEmailOnHeader}
          logoutProfile={logoutProfile}
        />

        <Switch>

          <ProtectedRoute
            onSpinner={isPageLoaded}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handlePlaceDeletePopupOpen}
            cards={cards}
            component={Main}
            exact path="/"
            loggedIn={loggedIn}
          />

          <Route path="/sign-in">
            <Login 
              onLogin={onLogin}
            />            
          </Route>

          <Route path="/sign-up">
            <Register 
              onRegister={onRegister}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up"/>}
          </Route>

        </Switch>
    
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={message}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonTextSubmit={submitTextUserPopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonTextSubmit={submitTextUserPopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonTextSubmit={submitTextAddPlacePopup}
        />

        <DeletePopupCard
          card={deletCard}
          isOpen={isPlaceDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          buttonTextSubmit={submitTextDeletePlacePopup}
        /> 
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
