# SAE 501 · site de présentation d'une formation

Projet d'équipe de BUT MMI (3e année) : un site Angular qui présente une formation (organisation, projets, parcours, insertion, échanges), avec quiz, sondage, statistiques, espace d'administration et visite virtuelle 3D. Le back-end est une API PHP (PDO, MySQL) documentée ci-dessous.

Ce dépôt contient la version finale du projet.

## Ma partie : la visite virtuelle

- Modélisation d'une salle de l'école (salle 317, projecteur 3D compris) sous Unity
- Export WebGL (`sae501/src/assets/Build/`) et intégration dans la page Angular `visite-virtuelle`

## Lancer

- Front : `cd sae501 && npm install && npx ng serve`
- API : importer la base MySQL `sae_501`, servir le dossier `api/` avec PHP, renseigner `api/class/Database.php`

Stack : Angular, TypeScript, PHP, MySQL, Unity WebGL.

---

# SAE 501

## Sections

- [Informations](#informations)
- [Inscription](#inscription)
- [Connexion](#connexion)
- [Quiz](#quiz)
  - [Ajout d'une réponse](#quiz_ajout)
  - [Récupérer une réponse](#quiz_get)
  - [Récupération des réponses](#quiz_stats)
- [Projets](#projet)
  - [Ajout d'un projet](#projet_ajout)
  - [Récupération de tout les projets](#quiz_all)
  - [Récupération d'un projet](#quiz_get)
  - [Suppression d'un projet](#quiz_delete)
  
- [Contact](#contact)
  - [Ajout d'un contact](#createContact)
  - [Récupérer tous les contacts](#getAllContacts)
  - [Récupérer un seul contact](#getContact)
  - [Supprimer un contact](#deleteContact)
  - [Modifier un contact](#updateContact)
-[Parcours](#parcours)
  - [Ajout d'un parcours](#createParcours)

## Informations <a name = "informations"></a>

> [!IMPORTANT]
> Les requêtes doivent être envoyées avec un header `Content-Type: application/json`.

# Inscription <a name = "inscription"></a>

Requêtes accessibles liées à l'inscription.

## Inscription utilisateur

- Type : `POST`
- URL : `/api/registration.php`
- Champs JSON :
  - mail : `Mail`
  - lastName : `Texte`
  - firstName : `Texte`
  - phone : `Nombre avec 10 chiffres`
  - password : `Mot de passe`

#### Exemple :

    {
      "mail": "lorem@ipsum.com",
      "lastName": "Lorem",
      "firstName": "Ipsum",
      "phone": "0652153245",
      "password": "LoremIpsumPassword"
    }

### Réponse positive

- Statut : `201 Created`
- Contenu : `Aucun`

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `["Message d'erreur"]`

# Connexion <a name = "connexion"></a>

Requêtes accessibles liées à la connexion.

## Connexion utilisateur

- Type : `POST`
- URL : `/api/login.php`
- Champs JSON :
  - mail : `Mail`
  - password : `Mot de passe`

#### Exemple :

    {
      "mail": "lorem@ipsum.com",
      "password": "LoremIpsumPassword"
    }

### Réponse positive

- Statut : `200 OK`
- Contenu :

```
  {
    token: string,
    first_name: string,
    status: "visitor" | "admin"
  }
```

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `["Message d'erreur"]`

## Vérification du token

- Type : `GET`
- URL : `api/is_token_valid.php?mail=:mail&token=:token`

#### Exemple :

`api/is_token_valid.php?mail=lorem@ipsum.com&token=65674c783567f`

### Réponse positive

- Statut : `200 OK`
- Contenu :

```
{
  token: true | false
}
```

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `["Message d'erreur"]`

# Quiz <a name = "quiz"></a>

Requêtes accessibles liées au quiz.

## Ajout d'une réponse au sondage <a name = "quiz_ajout"></a>

- Type : `POST`
- URL : `/api/quiz/add.php`
- Champs JSON :
  - mail : `Mail d'utilisateur existant`
  - transport_type\* : `pied | velo_trotinette | train | voiture | bus`
  - transport_time : `<30 | 30-45 | 45-90 | >90 `
  - bac : `general | technologique | professionnel`
  - decouverte : `bouche_a_oreille | affiches | reseaux_sociaux | recherches_personnelles | autre`
  - favorite_domain\* : ` developpement_web | creation_jeux_video | design | graphisme | audiovisuel`
  - age : `nombre entre 1 et 100`
  - satisfaction : `chiffre entre 1 et 5`
  - schools : `Texte`
  - code_postal : `nombre à 5 chiffres`
  - etablissement : `Texte`

> [!NOTE] > \* : Possibilité de réponses multiples à l'aide d'un ";".

#### Exemple :

    {
      "mail": "lorem@ipsum.com",
      "transport_type": "pied;train",
      "transport_time": "30-45",
      "bac": "professionnel",
      "decouverte": "affiches",
      "favorite_domain": "developpement_web;creation_jeux_video",
      "age": "19",
      "satisfaction": "3",
      "schools": "Chelles, ESGI, Iut de Meaux, Sorbonne",
      "code_postal": "77500",
      "etablissement": "Iut de Meaux"
    }

> [!WARNING]
> Si des données sont déjà présentes pour l'utilisateur, elles seront remplacées par les nouvelles données reçues et renverra une réponse positive `201 Created`.

### Réponse positive

- Statut : `201 Created`
- Contenu : `Aucun`

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
{
  "error" : "Message d'erreur"
}`

## Récupérer les réponses d'un utilisateur <a name = "quiz_get"></a>
- Type : `GET`
- URL : `/api/quiz/get.php`
- Champs URL :
  - mail : `Mail d'utilisateur existant`

#### Exemple :
  `api/quiz/get.php?mail=test@ipsum.com`

### Réponse positive

- Statut : `200 OK`
- Contenu : `JSON`

#### Exemples : 
    {
      "user":"test@ipsum.com",
      "etablissement":"Lycée Random Perdu dans la France",
      "code_postal":"01234",
      "schools":"Sorbonne, Iut de Meaux, ESGI, Chelles",
      "first_name":"Lorem",
      "last_name":"Ipsum"
    }

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
    {
      "error" : "Message d'erreur"
    }`


## Récupérer les statistiques des réponses <a name = "quiz_stats"></a>

- Type : `GET`
- URL : `/api/quiz/stats.php`
- Champs URL :
  - type : `age | bac | satisfaction | transport_time | transport_type | decouverte | favorite_domain | total`

#### Exemples :

N°1

  `api/quiz/stats.php?type=bac`


N°2

  `api/quiz/stats.php?type=age`


### Réponse positive

- Statut : `20O OK`
- Contenu : `JSON`

#### Exemples :

N°1

    {
      "general":1,
      "technologique":0,
      "professionnel":1,
      "total":2
    }

> [!TIP]
> Pour une liste des réponses possibles, veuillez vous référer à la section [Champs JSON](#quiz_ajout).

N°2

    {
      "moyenne":726,
      "mediane":726,
      "max":821,
      "min":631,
      "total":2
    }

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
{
  "error" : "Message d'erreur"
}`

# Contact <a name = "contact"></a>

Requêtes accessibles liées aux contacts des visiteurs.

## Créer un contact <a name = "createContact"></a>

> [!NOTE]
> Lors d'une inscription, les contacts de la personne venant de s'inscrire sont ajoutés automatiquement dans la table contact.

- Type : `POST`
- URL : `/api/contact/create.php`
- Champs JSON :
  - mail : `Mail`
  - lastName : `string`
  - firstName : `string`
  - phone : `number avec 10 chiffres`

#### Exemple :

    {
      "error" : "Message d'erreur"
    }`

# Projets <a name = "projet"></a>

Requêtes accessibles liées aux projets.

## Ajout d'un projet <a name = "projet_ajout"></a>
- Type : `POST`
- URL : `/api/projects/add.php`
- Champs JSON :
  - title : `Titre du projet`
  - description : `Description du projet`
  - link : `URL`
  - author : `Nom Prénom de l'auteur`
  - study_year : `1 | 2 | 3 `
  - date : `YYYY-MM-DD`

  - image : `Fichier image .png | .jpg`

> [!IMPORTANT]
> Le fichier image doit être envoyé en tant que `multipart/form-data`. En gros, je sais pas comment ça se gère avec Angular, mais je récupère comme ça : `$_FILES['image']`. Comme si c'était un formulaire classique.

### Exemple :
    {
      "title": "Lorem Ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetu
      "link": "https://www.google.com",
      "author": "Lorem Ipsum",
      "study_year": "1",
      "date": "2021-01-01",
      "image": "FICHIER IMAGE"
    }

### Réponse positive

- Statut : `201 Created`
- Contenu : `Aucun`

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
    {
      "error" : "Message d'erreur"
    }`

## Récupérer un projet <a name = "projet_get"></a>
- Type : `POST`
- URL : `/api/projects/get.php`
- Champs JSON :
  - id : `ID du projet`

### Réponse positive
- Statut : `200 OK`
- Contenu : 
```
[
  {
    id: number,
    title: string,
    description: string,
    link: string,
    author: string,
    study_year: number,
    date: string,
    image: string
  }
]
```

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
    {
      "error" : "Message d'erreur"
    }`

## Récupérer tout les projets <a name = "projet_all"></a>
- Type : `GET ou POST`
- URL : `/api/projects/getAll.php`

### Réponse positive
- Statut : `200 OK`
- Contenu : 
```
[
  {
    id: number,
    title: string,
    description: string,
    link: string,
    author: string,
    study_year: number,
    date: string,
    image: string
  },
  ...
]
```

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
    {
      "error" : "Message d'erreur"
    }`

## Modification d'un projet <a name = "edit"></a>
- Type : `POST`
- URL : `/api/projects/edit.php`
- Champs JSON :
  - id : `Id du projet`
  - title : `Titre du projet`
  - description : `Description du projet`
  - link : `URL`
  - author : `Nom Prénom de l'auteur`
  - study_year : `1 | 2 | 3 `
  - date : `YYYY-MM-DD`

  - image : `Fichier image .png | .jpg`

> [!IMPORTANT]
> Le fichier image doit être envoyé en tant que `multipart/form-data`. En gros, je sais pas comment ça se gère avec Angular, mais je récupère comme ça : `$_FILES['image']`. Comme si c'était un formulaire classique.

### Exemple :
    {
      "id": "17",
      "title": "Lorem Ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetu
      "link": "https://www.google.com",
      "author": "Lorem Ipsum",
      "study_year": "1",
      "date": "2021-01-01",
      "image": "FICHIER IMAGE"
    }

### Réponse positive

- Statut : `200 OK`
- Contenu : `Aucun`

### Réponses négatives :

- Statut : `400 Bad Request`
- Contenu : `
    {
      "error" : "Message d'erreur"
    }`


## Supprimer un projet <a name = "projet_delete"></a>
- Type : `POST`
- URL : `/api/projects/delete.php`
- Champs JSON :
  - id : `ID du projet`

### Réponse positive
- Statut : `200 OK`
- Contenu : `Aucun`

# Contact <a name = "contact"></a>
Requêtes accessibles liées aux contacts des visiteurs.

## Créer un contact
> [!NOTE]
> Lors d'une inscription, les contacts de la personne venant de s'inscrire sont ajoutés automatiquement dans la table contact.
- Type : `POST`
- URL : `/api/contact/create.php`
- Champs JSON :
  - mail : `Mail`
  - lastName : `string`
  - firstName : `string`
  - phone : `number avec 10 chiffres`

#### Exemple :
    {
      "mail": "lorem@ipsum.com",
      "lastName": "Lorem",
      "firstName": "Ipsum",
      "phone": "0651155132"
    }

### Réponse positive

- Statut : `201 Created`

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

## Récupérer tous les contacts <a name = "getAllContacts"></a>

- Type : `GET`
- URL : `/api/contact/get_all.php`

### Réponse positive

- Statut : `200 OK`
- Contenu :

```
[
  {
    "id": number,
    "mail": string,
    "last_name": string,
    "first_name": string,
    "phone": string
  }
]
```

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

## Récupérer un contact <a name = "getContact"></a>

- Type : `GET`
- URL : `/api/contact/get_one.php?id=:id`

### Réponse positive

- Statut: `200 OK`
- Contenu :

```
{
  "id": number,
  "mail": string,
  "last_name": string,
  "first_name": string,
  "phone": string
}
```

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

## Supprimer un contact <a name = "deleteContact"></a>

- Type : `GET`
- URL : `/api/contact/delete.php?id=:id`

### Réponse positive

- Statut: `200 OK`

### Réponse négative

- Statut `[{messages d'erreur}]`

## Modifier un contact <a name = "updateContact"></a>

- Type : `POST`
- URL : `/api/contact/update.php`
- Exemple :

```
  {
    "id": 2,
    "mail": "lorem@ipsum.com",
    "lastName": "Lorem",
    "firstName": "Ipsum",
    "phone": "0651155132"
  }
```

### Réponse positive

- Statut: `200 OK`

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `[{messages d'erreur}]`

# Parcours <a name = "parcours"></a>

Requêtes accessibles liées aux parcours des visiteurs.

## Créer un parcours <a name = "createParcours"></a>

- Type : `POST`
- URL : `/api/parcours/create.php`
- Champs JSON :
  - user : `Mail`
  - 133 ?: `number`
  - 212 ?: `number`
  - 311 ?: `number`
  - 317 ?: `number`
  - studio ?: `number`

> [!NOTE] > Les champs avec un ? ne sont pas obligatoires

#### Exemple :

    {
      "user": "lorem@ipsum.com",
      "133": "1",
      "212": "3",
      "317": "2"
    }

### Réponse positive

- Statut : `201 Created`

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`


## Récupérer un parcours <a name = "getParcours"></a>

- Type : `GET`
- URL : `/api/parcours/get_one.php?user=:user`

### Réponse positive

- Statut : `200 OK`
- Contenu : 
```
[
  {
    "user":"lor10@ipsum.com",
    "salle_133":"1",
    "salle_212":"2",
    "salle_311":null,
    "salle_317":"4",
    "studio":"5"
    }
]
```

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

## Supprimer un parcours <a name = "deleteParcours"></a>

- Type : `GET`
- URL : `/api/parcours/delete.php?user=:user`

### Réponse positive

- Statut : `200 OK`

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

## Modifier un parcours <a name = "updateParcours"></a>

- Type : `POST`
- URL : `/api/parcours/update.php`
- Champs JSON :
  - user : `Mail`
  - 133 ?: `number`
  - 212 ?: `number`
  - 311 ?: `number`
  - 317 ?: `number`
  - studio ?: `number`

> [!NOTE]
> Les champs avec un ? ne sont pas obligatoires.

#### Exemple :

    {
      "user": "lorem@ipsum.com",
      "133": "1",
      "212": "3",
      "317": "2"
    }

### Réponse positive

- Statut : `200 OK`

### Réponse négative

- Statut : `400 Bad Request`
- Contenu : `{[messages d'erreur]}`

### Informations de connexion

> [!NOTE]
> **Connexion en tant qu'administrateur :**
> - login : `admin@gmail.com`
> - Mot de passe : `admin`

### Accès au site hébergé
> - Lien : https://sae501-salle317.alwaysdata.net

### Créer le projet en local
> [!NOTE]
> **Pour créer le projet en local vous devez :**
> 1. Déziper le projet 
> 2. Ouvrir le projet depuis VS Code
> 3. Ouvrir un nouveau terminal dans VS Code et vous déplacez à la racine du projet à l'aide de la commande suivante : `cd .\SAE-501\sae501\`
> 4. Installer les dépendances du projet avec la commande suivante : `npm i`
> 5. Démarrer le serveur de développement local avec la commande suivante : `ng serve`

Le serveur est à présent démarré et vous pouvez accéder au site via l'URL suivante : `http://localhost:4200/`
