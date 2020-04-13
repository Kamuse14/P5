// Gère le changement virtuel de page
class Page{
  constructor(target, pageActuelle){
    window.mvp.page  = this;
    this.dom          = document.createElement("main");
    this.idProduit    = null;
    this.definePage(pageActuelle);
    target.appendChild(this.dom);
    this.createTitle();
    this.render();
  }

 definePage(newPage){
    this.pageActuelle = newPage;
    if (this.pageActuelle.indexOf("/") !== -1) { //si le contenu de la page contient le caractère "/" 
      this.pageActuelle = this.pageActuelle.split("/"); //split identifie "/" comme séparateur et 
      //divise la chaîne de caractère "product/Cross"
      this.produitName  = this.pageActuelle[1]; // c'est à dire le nom (court) du produit sélectionné
      this.pageActuelle = this.pageActuelle[0]; //c'est à dire "produit"
    }
  }

//bascule d'un affichage page à un autre 
 render(){
    // console.clear();
    console.log(this.pageActuelle);
    switch (this.pageActuelle) {
      case "validation":
        this.title.innerText = "Validation de votre commande";
        this.renderValidation();
        break;
      // case "commande":
      //   this.title.innerText = "Votre commande";
      //   this.renderCommande();
      //   break;
      case "produit":
        //window.history.replaceState({index:"produit"}, "page détail", "produit.html");
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

  clearProducts(keep=null){
    for (let [key, value] of Object.entries(window.mvp.products)) { //renvoie un tableau des propriétés
        // énumérables d'un objet dont la clé est une chaîne de caractères.
        //console.log(`${key}: ${value}`);
        if(key === keep) window.mvp.products[key].renderDetail(); //pour la clé = nom du produit cliqué : 
        //renderDétail du produit
        else window.mvp.products[key].die(); //on supprime les autres
    }
  }

//Affichage accueil : liste des products
  async renderList(){
    let data = await window.mvp.dataBase.getData("furniture");
    for(var i=0; i<data.length; i++) {
      new Produit(data[i], "liste", this.dom);
      //console.log(data[i]);
    }
  }

//Affichage de la commande : panier  + formulaire
  async renderCommande(){
    // new Panier(data, this.dom); //c'est encore un autre affichage de produit, doit-on recréer une classe "panier" ?
    // new Contact(dataUser, this.dom);

  }
//Affichage du message de validation
  async renderValidation(){
    // new Commande

  }

  change(newPage){
    this.definePage(newPage);
    this.render();
  }
  
  createTitle(){
    this.title = document.createElement("h2");
    this.dom.appendChild(this.title);
  }
}
     //swal('Merci!',  'Vous avez validé votre commande !',  'success');