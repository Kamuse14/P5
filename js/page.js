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
      this.pageActuelle = this.pageActuelle[0]; //c'est à dire "produit" (page liste)
    }
  }

//bascule d'un affichage page à un autre 
 render(){
    console.log(this.pageActuelle);
    switch (this.pageActuelle) {
      case "produit":
        history.pushState({index:"${this.produitName}"}, "page détail", "${this.produitName}.html");
        this.title.innerText = "Détail";
        this.clearProducts(this.produitName);
        break;
      default:
      	//history.pushState({${this.produitName}:"index"}, "page liste", "index.html");
        this.title.innerText = "Nos produits";
        this.clearProducts();
        this.renderList();
        break;
    }
  }

  clearProducts(keep=null){
    for (let [key, value] of Object.entries(window.mvp.products)) { //renvoie un tableau des propriétés
        // énumérables d'un objet dont la clé est une chaîne de caractères.
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
    }
  }
// Gère le changement de page liste/détail
  change(newPage){
    this.definePage(newPage);
    this.render();
  }
// titre de chaque page  
  createTitle(){
    this.title = document.createElement("h2");
    this.dom.appendChild(this.title);
  }
}
