const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "d214c210-90f6-44d6-aff0-19161a961de5",
    "Content-Type": "application/json",
  },
};

const HttpClient = (config) => {
  const { baseUrl, headers } = config

  const request = (method, path, body) => fetch(
    `${baseUrl}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`, response.json());
  })

  return {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    patch: (path, body) => request("PATCH", path, body),
    put: (path, body) => request("PUT", path, body),
    delete: (path) => request("DELETE", path)
  };
};

const httpClient = HttpClient(config);

// Чтобы получить список карточек, отправьте GET-запрос:
const initialCards = () => {
  return httpClient.get("/cards");
};

// Чтобы получить данные профиля, отправьте GET-запрос:
const fetchProfile = () => {
  return httpClient.get("/users/me")
}

// Чтобы обновить карточку, отправьте PATCH-запрос:
const editProfile = (body) => {
  return httpClient.patch("/users/me", body);
};

// Чтобы удалить карточку, отправьте DELETE-запрос:
const deleteCard = (cardId) => {
  return httpClient.delete(`/cards/${cardId}`)
}

// Чтобы лайкнуть карточку, отправьте PUT-запрос:
const likeCard = (cardId, body) => {
  return httpClient.put(`/cards/likes/${cardId}`, body)
}

// Чтобы убрать лайк с карточки, отправьте DELETE-запрос:
const dislikeCard = (cardId, body) => {
  return httpClient.delete(`/cards/likes/${cardId}`, body)
}

// Чтобы добавить на сервер новую карточку, отправьте POST-запрос:
const addNewCard = (body) => {
  return httpClient.post("/cards", body)
}

// Чтобы сменить аватар отправьте запрос
const updateAvatar = (body) => {
  return httpClient.patch("/users/me/avatar", body);
}

// объект api в котором есть все методы
export const api = {  
  initialCards,
  editProfile,
  deleteCard,
  likeCard,
  dislikeCard,
  addNewCard,
  updateAvatar,
  fetchProfile,
};