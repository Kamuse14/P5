// Gère le changement virtuel de page
class Page{
  constructor(target, pageActuelle){
    this.dom = document.createElement("main");
    target.appendChild(this.dom);
    this.dom.onclick = this.evenement.bind(this);
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
      case "panier":
        this.renderPanier();
        break;
      case "produit":
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
    for(let i=0; i<data.length; i++) {
      new Produit(data[i], "liste", this.dom);
    }
  }
//Affichage description du produit sélectionné
  async renderProduit(){
    //utilisation du localstorage
    let id = localStorage.getItem("produitClique");
    let data = await window.mvp.dataBase.getData("furniture/" + id);
    //console.log(data);
    new Produit(data, "detail", this.dom);
    localStorage.removeItem("produitClique");
    //}  
  }
//Affichage du panier : commande  + formulaire
   async renderPanier(){
    // this.dom.innerHTML = `<h2 id="commande">Test commande</h2>`;
    // let id = localStorage.getItem("produitAjout");
    // let data = await window.mvp.dataBase.getData("furniture/" + id);
    // new Panier(data, this.dom);
    // new Contact(dataUser, this.dom);

  }
//Affichage du message de validation
  renderValidation(){

  }

  evenement() {
    let cliqueSurProduit = localStorage.getItem("produitClique");
    let ajouteAuPanier = localStorage.getItem("produitAjout");
    //console.log(localStorage);
    if(cliqueSurProduit) {//quand on clique sur la page, si le localstorage contient quelquechose à cet endroit, 
    //alors on revient sur la page de description du produit sélectionné
      this.pageActuelle = "produit";
      this.render();
    }// else if(ajouteAuPanier != null) {
    //   this.pageActuelle = "panier";
    //   this.render();
    // }//Sinon, il ne se passe rien 
  }

// icone caddie
  iconCart(){
    this.pageActuelle = "panier";
    this.render();
  }

}
     //swal('Merci!',  'Vous avez validé votre commande !',  'success');