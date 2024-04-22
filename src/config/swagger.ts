import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    "openapi": "3.0.0",
    "info": {
      "version": "1.0.0",
      "title": "AltynShygis API",
      "description": "API для работы с курсами AltynShygis"
    },
    "servers": [],
    "paths": {
      "/api/register": {
        "post": {
          "summary": "Регистрация пользователя",
          "description": "Создает нового пользователя",
          "tags": ["Пользователь"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserRegistration"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Пользователь успешно зарегистрирован",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Пользователь успешно зарегистрирован",
                    "token": "jwt.token.string"
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить имя пользователя, полное имя, email и пароль"
                  }
                }
              }
            }
          }
        }
      },
      "/api/login": {
        "post": {
          "summary": "Аутентификация пользователя",
          "description": "Аутентификация пользователя по логину и паролю",
          "tags": ["Пользователь"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLogin"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Успешная аутентификация",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Успешная аутентификация",
                    "token": "jwt.token.string"
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить имя пользователя и пароль"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAll": {
        "get": {
          "summary": "Получение всех пользователей",
          "description": "Получает всех пользователей из базы данных",
          "tags": ["Пользователь"],
          "responses": {
            "200": {
              "description": "Список пользователей успешно получен",
              "content": {
                "application/json": {
                  "example": [
                    {
                      "id": 1,
                      "username": "example_user",
                      "full_name": "John Doe",
                      "email": "example@example.com",
                      "image": "http://example.com/image.jpg",
                      "role_id": 2,
                      "created_at": "2024-04-04T00:00:00Z",
                      "updated_at": "2024-04-04T00:00:00Z"
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Ошибка при получении пользователей",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при получении пользователей"
                  }
                }
              }
            }
          }
        }
      },
      "/api/updateUser/{userID}": {
        "patch": {
          "summary": "Изменение пользователя",
          "description": "Изменяет данные пользователя по его идентификатору",
          "tags": ["Пользователь"],
          "parameters": [
            {
              "name": "userID",
              "in": "path",
              "description": "Идентификатор пользователя",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "role": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "full_name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Пользователь успешно изменен"
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить идентификатор пользователя и данные для обновления"
                  }
                }
              }
            },
            "404": {
              "description": "Пользователь не найден",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Пользователь не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при изменении пользователя"
                  }
                }
              }
            }
          }
        }
      },      
      "/api/deleteUser/{userId}": {
        "delete": {
          "summary": "Удаление пользователя",
          "description": "Удаляет пользователя по его ID",
          "tags": ["Пользователь"],
          "parameters": [
            {
              "name": "userId",
              "in": "path",
              "description": "ID пользователя",
              "required": true,
              "schema": {
                "type": "string",
                "format": "uuid"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Пользователь успешно удален",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Пользователь успешно удален"
                  }
                }
              }
            },
            "404": {
              "description": "Пользователь не найден",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Пользователь не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка при удалении пользователя",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при удалении пользователя"
                  }
                }
              }
            }
          }
        }
      },      
      "/api/createRole": {
        "post": {
          "summary": "Создание роли",
          "description": "Создает новую роль",
          "tags": ["Роли"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Role"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Роль успешно создана",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Роль успешно создана",
                    "role": {
                      "id": 1,
                      "name": "Admin",
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить имя и описание роли"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAllRoles": {
        "get": {
          "summary": "Получение всех ролей",
          "description": "Получает все роли",
          "tags": ["Роли"],
          "responses": {
            "200": {
              "description": "Список ролей успешно получен",
              "content": {
                "application/json": {
                  "example": [
                    {
                      "id": 1,
                      "name": "Admin"
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Ошибка при получении ролей",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при получении ролей"
                  }
                }
              }
            }
          }
        }
      },      
      "/api/deleteRole": {
        "delete": {
          "summary": "Удаление роли",
          "description": "Удаляет роль",
          "tags": ["Роли"],
          "parameters": [
            {
              "name": "roleId",
              "in": "query",
              "description": "ID роли",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Роль успешно удалена",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Роль успешно удалена"
                  }
                }
              }
            },
            "404": {
              "description": "Роль не найдена",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Роль не найдена"
                  }
                }
              }
            },
            "500": {
              "description": "Произошла ошибка при удалении роли",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при удалении роли"
                  }
                }
              }
            }
          }
        }
      },      
      "/api/createOpenQuestionTest": {
        "post": {
          "summary": "Создание открытого вопроса",
          "description": "Создает новый открытый вопрос",
          "tags": ["Тест с открытыми вопросами"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OpenQuestionsTest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Вопрос успешно создан",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Вопрос успешно создан",
                    "question": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                          "name": "string",
                          "description": "string",
                          "test": [
                            {
                              "id": 0,
                              "questionText": "string",
                              "correctAnswer": "string"
                            }
                          ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить текст вопроса"
                  }
                }
              }
            }
          }
        }
      },
      "/api/deleteOpenQuestionTest/{questionId}": {
        "delete": {
          "summary": "Удаление открытого вопроса",
          "description": "Удаляет открытый вопрос по его идентификатору",
          "tags": ["Тест с открытыми вопросами"],
          "parameters": [
            {
              "name": "questionId",
              "in": "path",
              "description": "Идентификатор вопроса для удаления",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Вопрос успешно удален"
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при удалении открытого вопроса"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAllOpenQuestionTest": {
        "get": {
          "summary": "Получение всех открытых вопросов",
          "description": "Получает все открытые вопросы из базы данных",
          "tags": ["Тест с открытыми вопросами"],
          "responses": {
            "200": {
              "description": "Список открытых вопросов успешно получен",
              "content": {
                "application/json": {
                  "example": [
                    {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "name": "string",
                      "description": "string",
                      "test": [
                        {
                          "id": 0,
                          "questionText": "string",
                          "correctAnswer": "string"
                        }
                      ]
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при получении открытых вопросов"
                  }
                }
              }
            }
          }
        }
      },      
      "/getOpenQuestionTestById/{questionId}": {
        "get": {
          "summary": "Получить тест с открытыми вопросами по идентификатору",
          "tags": ["Тест с открытыми вопросами"],
          "parameters": [
            {
              "name": "questionId",
              "in": "path",
              "description": "Идентификатор теста с открытыми вопросами",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Успешный ответ. Возвращает информацию о тесте с открытыми вопросами",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OpenQuestionTest"
                  }
                }
              }
            },
            "404": {
              "description": "Тест с открытыми вопросами не найден",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Внутренняя ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/createClosedQuestionTest": {
        "post": {
          "summary": "Создание закрытого вопроса",
          "description": "Создает новый закрытый вопрос",
          "tags": ["Тест с закрытыми вопросами"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClosedQuestionTest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Вопрос успешно создан",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Вопрос успешно создан",
                    "question": {
                      "name": "string",
                      "description": "string",
                      "test": [
                        {
                          "questionText": "string",
                          "options": [
                            {
                              "text": "string",
                              "isCorrect": true
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Необходимо предоставить текст вопроса и варианты ответов"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAllClosedQuestionsTest": {
        "get": {
          "summary": "Получение всех закрытых вопросов",
          "description": "Получает все закрытые вопросы из базы данных",
          "tags": ["Тест с закрытыми вопросами"],
          "responses": {
            "200": {
              "description": "Список закрытых вопросов успешно получен",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ClosedQuestionTest"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при получении закрытых вопросов"
                  }
                }
              }
            }
          }
        }
      },
      "/api/deleteClosedQuestionTest/{questionId}": {
        "delete": {
          "summary": "Удаление закрытого вопроса",
          "description": "Удаляет закрытый вопрос по его идентификатору",
          "tags": ["Тест с закрытыми вопросами"],
          "parameters": [
            {
              "name": "questionId",
              "in": "path",
              "description": "Идентификатор вопроса для удаления",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Вопрос успешно удален"
            },
            "404": {
              "description": "Вопрос не найден",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Вопрос не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при удалении закрытого вопроса"
                  }
                }
              }
            }
          }
        }
      },      
      "/getClosedQuestionTestById/{questionId}": {
        "get": {
          "summary": "Получить тест с закрытыми вопросами по идентификатору",
          "tags": ["Тест с закрытыми вопросами"],
          "parameters": [
            {
              "name": "questionId",
              "in": "path",
              "description": "Идентификатор теста с закрытыми вопросами",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Успешный ответ. Возвращает информацию о тесте с закрытыми вопросами",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClosedQuestionTest"
                  }
                }
              }
            },
            "404": {
              "description": "Тест с закрытыми вопросами не найден",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Внутренняя ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/createCourse": {
        "post": {
          "summary": "Создание курса",
          "description": "Создает новый курс",
          "tags": ["Курсы"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Course"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Курс успешно создан",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Course"
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Необходимо указать название курса и подразделы"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при создании курса"
                  }
                }
              }
            }
          }
        }
      },
      "/api/updateCourse/{courseId}": {
        "patch": {
          "summary": "Обновление курса",
          "description": "Обновляет информацию о курсе",
          "tags": ["Курсы"],
          "parameters": [
            {
              "name": "courseId",
              "in": "path",
              "description": "Идентификатор курса для обновления",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Course"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Курс успешно обновлен",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Course"
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Необходимо указать название курса и подразделы"
                  }
                }
              }
            },
            "404": {
              "description": "Курс не найден",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Курс не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при обновлении курса"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAllCourses": {
        "get": {
          "summary": "Получение всех курсов",
          "description": "Получает все курсы из базы данных",
          "tags": ["Курсы"],
          "responses": {
            "200": {
              "description": "Список курсов успешно получен",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Course"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при получении всех курсов"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getCourseById/{courseId}": {
        "get": {
          "summary": "Получение курса по ID",
          "description": "Получает курс из базы данных по его уникальному идентификатору",
          "tags": ["Курсы"],
          "parameters": [
            {
              "name": "courseId",
              "in": "path",
              "description": "Уникальный идентификатор курса",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Курс успешно найден",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Course"
                  }
                }
              }
            },
            "404": {
              "description": "Курс не найден",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Курс не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при получении курса"
                  }
                }
              }
            }
          }
        }
      },
      "/api/deleteCourse/{courseId}": {
        "delete": {
          "summary": "Удаление курса",
          "description": "Удаляет курс по его идентификатору",
          "tags": ["Курсы"],
          "parameters": [
            {
              "name": "courseId",
              "in": "path",
              "description": "Идентификатор курса для удаления",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Курс успешно удален"
            },
            "404": {
              "description": "Курс не найден",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Курс не найден"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "error": "Произошла ошибка при удалении курса"
                  }
                }
              }
            }
          }
        }
      }, 
      "/api/news": {
        "post": {
          "summary": "Создание новости",
          "description": "Создает новую новость.",
          "tags": ["Новости"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {"type": "string", "description": "Название новости"},
                    "image": {"type": "string", "description": "URL изображения новости (необязательно)"},
                    "text": {"type": "string", "description": "Текст новости"},
                    "type": {"type": "string", "description": "Тип новости"}
                  },
                  "required": ["name", "text", "type"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Новость успешно создана",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Новость успешно создана",
                    "news": {
                      "id": "1",
                      "name": "Название новости",
                      "image": "http://example.com/image.jpg",
                      "text": "Текст новости",
                      "type": "Тип новости"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Некорректный запрос",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Все поля (name, text, type) обязательны для создания новости"
                  }
                }
              }
            },
            "500": {
              "description": "Внутренняя ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при создании новости"
                  }
                }
              }
            }
          }
        }
      },
      "/api/deleteNews/{id}": {
        "delete": {
          "summary": "Удаление новости",
          "description": "Удаляет новость по ее идентификатору.",
          "tags": ["Новости"],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Идентификатор новости для удаления",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Новость успешно удалена",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Новость успешно удалена"
                  }
                }
              }
            },
            "404": {
              "description": "Новость не найдена",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Новость не найдена"
                  }
                }
              }
            },
            "500": {
              "description": "Внутренняя ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при удалении новости"
                  }
                }
              }
            }
          }
        }
      },
      "/api/getAllNews": {
        "get": {
          "summary": "Получение всех новостей",
          "description": "Получает все новости из базы данных.",
          "tags": ["Новости"],
          "responses": {
            "200": {
              "description": "Список всех новостей успешно получен",
              "content": {
                "application/json": {
                  "example": [
                    {
                      "id": "1",
                      "name": "Название новости 1",
                      "image": "http://example.com/image1.jpg",
                      "text": "Текст новости 1",
                      "type": "Тип новости 1"
                    },
                    {
                      "id": "2",
                      "name": "Название новости 2",
                      "image": "http://example.com/image2.jpg",
                      "text": "Текст новости 2",
                      "type": "Тип новости 2"
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Внутренняя ошибка сервера",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Произошла ошибка при получении всех новостей"
                  }
                }
              }
            }
          }
        },
        "/api/analytics": {
          "post": {
            "summary": "Создание записи аналитики",
            "description": "Создает новую запись аналитики.",
            "tags": ["Аналитика"],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Тип аналитики"
                      },
                      "userId": {
                        "type": "string",
                        "description": "Идентификатор пользователя"
                      }
                    },
                    "required": ["type", "userId"]
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Запись аналитики успешно создана",
                "content": {
                  "application/json": {
                    "example": {
                      "id": "1",
                      "type": "some_type",
                      "userId": "user_id"
                    }
                  }
                }
              },
              "400": {
                "description": "Некорректный запрос",
                "content": {
                  "application/json": {
                    "example": {
                      "error": "Необходимо указать тип и идентификатор пользователя"
                    }
                  }
                }
              },
              "500": {
                "description": "Внутренняя ошибка сервера",
                "content": {
                  "application/json": {
                    "example": {
                      "error": "Произошла ошибка при создании записи аналитики"
                    }
                  }
                }
              }
            }
          }
        },

      },
    },
    "components": {
      "schemas": {
        "News": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Заголовок новости"
            },
            "image": {
              "type": "string",
              "example": "https://example.com/image.jpg"
            },
            "text": {
              "type": "string",
              "example": "Текст новости"
            },
            "type": {
              "type": "string",
              "example": "Общая новость"
            }
          },
          "required": ["name", "text", "type"]
        },
        "UserRegistration": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "full_name": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "password": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
          },
          "required": ["username", "full_name", "email", "password"]
        },
        "UserLogin": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": ["username", "password"]
        },
        "Role": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
          },
          "required": ["name"]
        },
        "OpenQuestion": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "questionText": {
              "type": "string"
            },
            "correctAnswer": {
              "type": "string"
            }
          },
          "required": ["questionText", "correctAnswer"]
        },
        "OpenQuestionsTest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "time": {
              "type": "number"
            },
            "test": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OpenQuestion"
              }
            }
          },
          "required": ["id", "name", "description", "test"]
        },               
        "Option": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "isCorrect": {
              "type": "boolean"
            }
          },
          "required": ["text", "isCorrect"]
        },
        "ClosedQuestionTest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "time": {
              "type": "number"
            },
            "test": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "questionText": {
                    "type": "string"
                  },
                  "options": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Option"
                    }
                  }
                },
                "required": ["questionText", "options"]
              }
            }
          },
          "required": ["name", "description", "test"]
        },
        "Course": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
            "subSections": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SubSection"
              }
            }
          },
          "required": ["title", "description", "image", "subSections"]
        },
        "SubSection": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "name": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
            "text": {
              "type": "string"
            }
          },
          "required": ["id", "name", "image", "text"]
        }
      },
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      },
      "parameters": {
        "AuthorizationHeader": {
          "name": "Authorization",
          "in": "header",
          "description": "Bearer token",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      },

    },
    "security": [
      {
        "bearerAuth": []
      }
    ]
  },
  apis: ['../routes/*.ts'],
};

const specs = swaggerJSDoc(options);

export default specs;
