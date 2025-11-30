# API Users - Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. GET /users
Récupère tous les utilisateurs

**Response:**
```json
[
  {
    "id": 1,
    "username": "Mohamed",
    "email": "mohamed@esprit.tn",
    "status": "active"
  }
]
```

---

### 2. GET /users/status?status=active
Récupère un utilisateur par statut (query parameter)

**Response:**
```json
{
  "id": 1,
  "username": "Mohamed",
  "email": "mohamed@esprit.tn",
  "status": "active"
}
```

---

### 3. GET /users/email?email=mohamed@esprit.tn
Récupère un utilisateur par email (query parameter)

**Response:**
```json
{
  "id": 1,
  "username": "Mohamed",
  "email": "mohamed@esprit.tn",
  "status": "active"
}
```

---

### 4. GET /users/active/:status
Récupère tous les utilisateurs par statut (path parameter)

**Example:** `GET /users/active/active`

**Response:**
```json
[
  {
    "id": 1,
    "username": "Mohamed",
    "email": "mohamed@esprit.tn",
    "status": "active"
  }
]
```

---

### 5. GET /users/:id
Récupère un utilisateur par ID

**Example:** `GET /users/1`

**Response:**
```json
{
  "id": 1,
  "username": "Mohamed",
  "email": "mohamed@esprit.tn",
  "status": "active"
}
```

---

### 6. POST /users
Crée un nouvel utilisateur

**Headers:**
```
authorization: Bearer token123
Content-Type: application/json
```

**Body:**
```json
{
  "username": "Ahmed",
  "email": "ahmed@esprit.tn"
}
```

**Response:**
```json
{
  "id": 5,
  "username": "Ahmed",
  "email": "ahmed@esprit.tn",
  "status": "active"
}
```

**Validation:**
- `username`: obligatoire, string
- `email`: obligatoire, format email valide
- `authorization` header: obligatoire

---

### 7. PUT /users/:id
Met à jour un utilisateur existant

**Example:** `PUT /users/1`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "Mohamed Updated",
  "email": "mohamed.updated@esprit.tn"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "Mohamed Updated",
  "email": "mohamed.updated@esprit.tn",
  "status": "active"
}
```

**Validation:**
- `username`: obligatoire, string
- `email`: obligatoire, format email valide

---

## Validation des erreurs

### Email invalide
```json
{
  "message": [
    "L'email doit être une adresse email valide"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Champ manquant
```json
{
  "message": [
    "Le nom d'utilisateur est obligatoire"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Authorization manquante (POST uniquement)
```json
{
  "message": "En-tête Authorization manquant"
}
```

### Utilisateur non trouvé (PUT)
```json
{
  "message": "Utilisateur non trouvé"
}
```

---

## Démarrage

```bash
npm install
npm run start:dev
```
