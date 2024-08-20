//   Токен: bc87767e-4fd6-4faf-bbe1-2b50fbc9866d
//   Идентификатор группы: cohort-magistr-2

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
    "Content-Type": "application/json",
  },
};

export {getAllInfo, pushNewProfile, pushNewCard}

const getProfileInfo = () => {
  return fetch("https://nomoreparties.co/v1/cohort-magistr-2/users/me", {
    headers: {
      authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

const getInitialCards = () => {
  return fetch("https://nomoreparties.co/v1/cohort-magistr-2/cards", {
    headers: {
      authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
    },
  })
  .then(res => res.json())
;
};

const getAllInfo = () => {
 return Promise.all([getProfileInfo, getInitialCards])
}


const pushNewProfile = function(name, about){
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

const pushNewCard = function(name, link){
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    method: 'POST',
    headers: {
      authorization: "bc87767e-4fd6-4faf-bbe1-2b50fbc9866d",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: link
    })
  })
}

