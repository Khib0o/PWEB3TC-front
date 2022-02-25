# Comment tester le prototype ?
Télécharger le ZIP et le décompresser dans un dossier vide.
Ouvrir le terminal à cet emplacement et taper la commande 'npm install'.
Ensuite taper 'npm run start' dans ce même terminal. 
Voir le résultat dans localhost:4200 dans le navigateur.

Lancer le serveur en ouvrant un terminal dans le dossier 'server'
Puis taper 'node server.js'

Le système d'authentification fonctionne (inscription, connexion, déconnexion). L'accès à "partager les fichiers" ne peut se faire que si vous êtes connecté. 


# Contenu ?
Page de connexion et page d'inscription (système d'authentification avec token d'identification)
Aller dans Fonctionnalité > Partager les fichiers (frontend uniquement)

# Design ?
Angular material

# Choses à changer
- Actuellement, on stocke les mots de passes des utilisateurs directement "en clair" dans la base de donnée (chose qui normalement est à éviter). Il faut normalement y stocker le hash du mot de passe.