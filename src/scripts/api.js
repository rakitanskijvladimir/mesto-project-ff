const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "a9ef450b-94b1-4a4f-8bad-6859832fd472",
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

// Чтобы обновить аватар, отправьте PATCH-запрос:
const updateAvatar = (body) => {
  return httpClient.patch("/users/me/avatar", body)
}

export const api = {
  initialCards,
  editProfile,
  deleteCard,
  likeCard,
  dislikeCard,
  addNewCard,
  updateAvatar
}