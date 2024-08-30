//   Токен: bc87767e-4fd6-4faf-bbe1-2b50fbc9866d
//          b0ff82b903f1b1bd17ff6a6c
//   Идентификатор группы: cohort-magistr-2

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
    "Content-Type": "application/json",
  },
};

export {
  getProfileInfo, getInitialCards,
  getAllInfo,
  pushNewProfile,
  pushNewCard,
  deleteCardApi,
  pushLike,
  deleteLike,
  addNewAvatar,
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const getAllInfo = () => Promise.all([getProfileInfo(), getInitialCards()]);
;

const pushNewProfile = (name, about)=> {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const pushNewCard = (name, url) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      link: url,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => res._id)
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const deleteCardApi = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const pushLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => res.likes.length)
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => res.likes.length)
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};

const addNewAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
};
