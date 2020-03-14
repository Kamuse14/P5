// HEADER - menu hamburger
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.dom.onclick = this.changeAffichage.bind(this);
    this.minified = true;
    this.render();
  }

  render(){
    if (this.minified) return this.renderMinified();
    this.renderUnMinified();
  }
 
  changeAffichage(){
    this.minified = ! this.minified;
    this.render();
  }

  renderMinified(){
    this.dom.innerHTML = `<div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>`;
    this.dom.className = "smallburger";
  }

  renderUnMinified(){
    this.dom.innerHTML = `
      	<div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>

      	<ul class="accordion-inner"> 
			<li><a  href="index.html"><i class="fas fa-home"></i> Accueil</a></li>
			<li><a href="panier.html"><i class="fas fa-shopping-cart"></i> Panier</a></li>
		</ul>
`;
    this.dom.className = "bigburger";
  }
}

/*
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    this.dom.id = "burger";
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.dom.onclick = this.changeAffichage.bind(this);
    this.smallBurger();
  }
 smallBurger(){
   this.dom.innerHTML = `<div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>`;
    this.dom.className = "smallburger";
 }
  changeAffichage(){
    this.dom.innerHTML = `
      <div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>
      <ul class="accordion-inner"> 
         <li><a  href="index.html"><i class="fas fa-home"></i> Accueil</a></li>
         <li><a href="panier.html"><i class="fas fa-shopping-cart"></i> Panier</a></li>
      </ul>
`;
    this.dom.className = "bigburger";
    
  }
}
*/


// LISTE DES PRODUITS page accueil
class ListeProduits{
	constructor(data, target){
		this.name = data.name.split(" ")[0]; //nom sans espace (qui peut nous gêner)
		this.nameLong = data.name; //nom en entier
		this.price = data.price/100; //en centimes d'euros
		this.image = data.imageUrl;	//adresse images dans l'API
		this.id = data._id;
		window.mvp.produits[this.name] = this;

		this.DOM = document.createElement("div");
		target.appendChild(this.DOM);
		this.affichageAccueil();
	}
	
	affichageAccueil(){ //contenu inséré
		this.DOM.innerHTML = `
			<a href="produit.html?id=${this.id}">
				<figure id="${this.name}" class="meuble">
					<img src="${this.image}" alt="${this.nameLong}"/>
					<figcaption>${this.nameLong}</figcaption>			
					<h3>${this.price}€</h3>	
				</figure>
			</a>		
		`;
	}
}
// page SELECTION PRODUIT avec description, choix du vernis et "ajouter au panier"
class Produit{
	constructor(data, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.vernis = data.varnish;
		this.id = data._id;
		window.mvp.produits[this.name] = this;

		/*window.mvp.panier.ajoute({
			"imageUrl" : this.image,
			"name" : this.name,
			"price" : this.price
		})*/

		this.DOM = document.createElement("figure");
		this.DOM.id = this.name;
		target.appendChild(this.DOM);
		this.affichageProduit();
	}

	affichageProduit(){
		let vernis = ""; //choix des vernis
		for (let i=0; i<this.vernis.length; i++) {
			vernis += `<option value="${this.vernis[i]}">${this.vernis[i]}</option>`;
		}
		this.DOM.innerHTML = `
			<img src="${this.image}" alt="${this.nameLong}"/>
			<div id="${this.name}content">
				<figcaption>${this.nameLong}</figcaption>
				<p>${this.description}</p>
				
				<select id="mon_vernis">
					<option selected>-- Choix du vernis --</option>
					${vernis}
				</select>
			</div>
			<div id="addbtn">
				<h3>${this.price}€</h3>	
				<a href="panier.html?id=${this.id}">
					<button id="addbutton" type="submit"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
				</a>
			</div>		
		`;
		this.DOM.className = "meuble";
	}
}

//page PANIER
class Panier {
	constructor(data, target){
		//this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.content = [];
		this.total = this.price++;

		window.mvp.panier = this;
		this.DOM = document.createElement("tbody");
		target.appendChild(this.DOM);

		//this.affichageLignePanier();
		this.affichageTotalPanier();
		//this.affichagePanier()
	}
		
	//affichage du tableau de produits sélectionnés (pour le moment un par un : pas de liste)
	/*async function*/ affichageLignePanier(){ 
		this.DOM.innerHTML = `
			<tr>
				<td><img src="${this.image}" alt="${this.nameLong}"/></td>
				<td>${this.nameLong}</td>
				<td>${this.price}€</td>
			</tr>
		`;
		//this.affichageLignePanier()
	}
	/*async function*/ affichageTotalPanier(){
		this.DOM.innerHTML = `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.total}€</td>
			</tr>
		`;
	}

	/*async function affichagePanier(){
		const ligneCommande = await affichageLignePanier();
		const totalCommande = await affichageTotalPanier();
		return ligneCommande + totalCommande;
	}*/

}
class Contact {
	constructor(){
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.address = data.address;
		this.city = data.city;
		this.email = data.email;

		 window.mvp.contact = this;
	}


}
