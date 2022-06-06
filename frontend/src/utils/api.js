class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  patchUserInfo(item) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  patchUserAvatar(item) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  postNewCard(item) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addLike(id, isLiked) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
  headers: {
    authorization: "9e805e1a-4ae4-4e34-b6d0-ba7f164bd419",
    "Content-Type": "application/json",
  },
});

export default api;
