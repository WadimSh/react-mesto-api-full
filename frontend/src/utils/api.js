class Api {
  constructor({ baseUrl }) {
    this.url = baseUrl;
    
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
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
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  patchUserInfo(item) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  patchUserAvatar(item) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  postNewCard(item) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(id, isLiked) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.vadim.nomoredomains.xyz",
});

export default api;
