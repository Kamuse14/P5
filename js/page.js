class Page{
  /**
   * Le constructeur de la classe
   * @constructor
   * @param  {HTMLelement} target       l'endroit où sera injecté le composant
   * @param  {string}      pageActuelle forme de l'affichage
   * @return {Page}             
   */
  constructor(target, pageActuelle){
    window.mvp.page  = this;
    this.dom          = document.createElement("section");
    this.idProduit    = null;
    this.definePage(pageActuelle);
    target.appendChild(this.dom);
    this.createTitle();
    this.render();
  }

 /**
  * Définit this.pageActuelle en fonction de son nom (chaîne de caractère)
  * @param  {string} newPage nom de la page 
  * @return {void}         
  */
 definePage(newPage){
    this.pageActuelle = newPage;
    if (this.pageActuelle.indexOf("/") !== -1) { 
      this.pageActuelle = this.pageActuelle.split("/"); //split identifie "/" comme séparateur
      this.produitName  = this.pageActuelle[1]; // c'est à dire le nom (court) du produit sélectionné
      this.pageActuelle = this.pageActuelle[0]; //c'est à dire "produit" (page liste)
    }
  }

 /**
  * Génère le html du composant. Décide le bon affichage en fonction de this.pageActuelle
  * @return {void}
  */
 render(){
    console.log(this.pageActuelle);
    switch (this.pageActuelle) {
      case "produit":
        this.title.innerText = "Détail";
        this.clearProducts(this.produitName);
        break;
      default:
        this.title.innerText = "Nos produits";
        this.clearProducts();
        this.renderList();
        break;
    }
  }

  /**
   * Supprime tous les produits de la liste sauf celui qu'on a sélectionné pour pouvoir afficher son détail
   * @param  {string} keep la clé sélectionnée qui va être "gardée" pour être réutilisée
   * @return {void}      
   */
  clearProducts(keep=null){
    for (let [key, value] of Object.entries(window.mvp.products)) { //renvoie un tableau des propriétés
        // énumérables d'un objet dont la clé est une chaîne de caractères.
        if(key === keep) window.mvp.products[key].renderDetail(); //pour la clé = nom du produit cliqué : 
        //renderDétail du produit
        else window.mvp.products[key].die(); //on supprime les autres
    }
  }

  /**
   * Va chercher les données des produits dans l'api grâce au connector
   * @return {produit.JSON} les produits affichés sous forme de liste
   */
  async renderList(){
    let data = await window.mvp.dataBase.getData("furniture");
    for(var i=0; i<data.length; i++) {
      new Produit(data[i], "liste", this.dom);
    }
  }

  /**
   * Gère le changement de page liste/détail
   * @param  {string} newPage nom de la page
   * @return {void}      
   */
  change(newPage){
    this.definePage(newPage);
    this.render();
  }

  /**
   * Génère un titre pour l'affichage de this.pageActuelle
   * @return {HTMLelement} titre h2 (Nos produits || Détail)
   */ 
  createTitle(){
    this.title = document.createElement("h2");
    this.dom.appendChild(this.title);
  }
}
