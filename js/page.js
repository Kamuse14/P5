// Gère le changement virtuel de page
class Page{
  constructor(target, pageActuelle){
    this.dom = document.createElement("main");
    target.appendChild(this.dom);
    window.mvp.page = this;
    this.pageActuelle = pageActuelle;
    this.render();
  }

//bascule d'un affichage page à un autre
  render(){
    this.dom.innerHTML = ``;
    switch (this.pageActuelle) {
      case "validation":
        this.renderValidation();
        break;
      case "commande":
        this.renderCommande();
        break;
      case "produit":
        console.log("coucou2");
        //target.removeChild(this.dom);
        this.renderProduit();
        break;
      default:
        this.renderList();
        break;
    }
  }
//Affichage accueil : liste des produits
  async renderList(){
    this.dom.innerHTML = `<h2 id="furnitures">Nos produits</h2>`;
    let data = await window.mvp.dataBase.getData("furniture");
    for(var i=0; i<data.length; i++) {
      new Produit(data[i], "liste", this.dom);
    }
  }
//Affichage description du produit sélectionné
  async renderProduit(){
    console.log("coucou3");
    // 5be9cc611c9d440000c1421e ou bien // :_id ?
    // faire une boucle pour les id (qui sont définis dans Produit mais pas dans Page)
    // let data = await window.mvp.dataBase.getData("furniture/" + id);
    // récupérer 
    let data = await window.mvp.dataBase.getData(`furniture/5be9cc611c9d440000c1421e`);
   //console.log(data);
    new Produit(data, "detail", this.dom);

    //}  
  }
//Affichage de la commande : panier  + formulaire
  async renderCommande(){
    this.dom.innerHTML = `<h2>Test page commande vide</h2>`;
    let data = await window.mvp.dataBase.getData(`furniture/5be9cc611c9d440000c1421e`);
    // new Panier(data, this.dom);
    // new Contact(dataUser, this.dom);

  }
//Affichage du message de validation
  async renderValidation(){

  }

  change(newPage, idProduit=null){
    this.pageActuelle = newPage();
    //on ajoute dans le sessionStorage le produit en cours
    this.render();
  }


}
     //swal('Merci!',  'Vous avez validé votre commande !',  'success');