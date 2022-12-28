Voici un site web de réseau d'entreprise.

Technologies utilisées :
    Angular, NodeJS, MongoDB, Express

Pour commencer, cloner le repo.

Effectuer les commandes suivantes afin d'installer toutes les dépendances.

BACKEND
    - Ouvrez le terminal à la racine du dossier, et tapez : cd backend
    - Ensuite : npm install Cela installera tout le nécessaire au bon fonctionnement du site web.
    - Afin de démarrer le backend, tapez : nodemon
Le serveur se lance sur : http://localhost:3000/

FRONTEND
    - Ouvrez le terminal à la racine du dossier, et tapez : cd frontend
    - Comme pour le backend, tapez : npm install
    - Enfin : ng serve Cela vous permettra de faire afficher le frontend.

L'identifiant de l'admin est :
    identifiant : admin
    password : admin
L'adresse du site s'ouvre sur : http://localhost:4200/

Créer un fichier .env à la racine du dossier avec ce qui suit en contenu :
    ADRESSE_MONGO_DB="mongodb+srv://Geoffray:EbChQYmAmVlxQN4N@cluster0.sa5oa8o.mongodb.net/?retryWrites=true&w=majority"