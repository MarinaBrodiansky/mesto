export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }
//запрос к серверу 
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

//получаем информацию о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
          })
            .then((res) => this._checkResponse(res))
    }

//отправляем данные о пльзователе на сервер    
    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({name, about})
        })
        .then((res) => this._checkResponse(res))
      }
        
//получаем карточки
    getInitialCards() {
        return fetch(`${this._url}/cards `, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }

//добавляем карточки
    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
        .then((res) => this._checkResponse(res))
    }

//удаляем карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
            })
            .then((res) => this._checkResponse(res))
    }

//лайк    
    likeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }

//анлайк          
    unlikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }

//редактировать аватар
    editAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({avatar})
        })
          .then(res => this._checkResponse(res))
      }
}