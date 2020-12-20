

1. Installation
  1. Aller dans un Terminal et lancer la commande suivante : 
  gi clone https://github.com/dialloDioulde/Angualr_Todo_List.git
 
  2. Placer vous dans le répertoire du projet et lancer les commandes suivantes : 
  
    1. npm install
    2. npm install firebase popper.js jquery bootstrap
    3. npm start
    4. Ouvrer un navigateur et taper :  http://localhost:4200
    
 2. Fonctionnalités 
  1. Main : 
    Après le clone du projet vous êtes dans la branche Main qui contient que la structure initial du projet.
    
  3. removeAll : 
    pour accéder aux données de la branche removeAll lancer la commande : 
    
    git pull origin removeAll:removeAll
    
    Dans cette fonctionnalité il y'a toutes les questions du TP3 plus la fonctionnalité Supprimer Tout (Éffacer).
    
  3. LocalStorage : 
     pour accéder aux données de la branche localStorage lancer la commande : 
    
     git pull origin localStorage:localStorage
    
     Dans cette fonctionnalité il y'a l'enregistrement des données en Local sur le Navigateur. 
    
  4. Account : 
     pour accéder aux données de la branche account lancer la commande : 
    
     git pull origin account:account
    
     Dans cette fonctionnalité il y'a la possibilité de se Créer un Compte ou de Se Connecter avec Firebase. 
    
    Pour tester : 
    
     email : angular@angular.fr
     mot de passe : testtest
    
  
3. Problèmes : 
   Vous allez peut être certainement rencontrer un problème avec git lorsque vous allez essayer de changer de branche 
   pour faire git pull nomBranche:nomBranche en étant dans la branche Main.
  
   Pour résoudre ce problème j'ai tout essayé et ça ne marche pas, la solution que je vous propose est la suivante : 
   Je viens de faire un ZIP de mon projet en Local que je garde avec la bonne Date et Heure que je pourrai 
   vous fournir en cas de problème de test de   mon projet parce que tout marche bien en LOCAL. 
    
    
 
    
