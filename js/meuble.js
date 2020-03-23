// page PRODUIT
class Meuble{
	constructor(produit, target) {
		this.produit = produit;
		this.DOM = document.createElement("figure");
		this.DOM.className = "meuble";
		target.appendChild(this.DOM);

		//this.addPanier = document.getElementById("add-panier");
		//this.addPanier.onclick = this.ajoutPanier.bind(this);
	}

	/*ajoutPanier() {
		sessionStorage.setItem("ajout", this.produit);
	}*/

	affichageProduit(){
		let vernis = ""; //choix des vernis
		for (let i=0; i<this.produit.vernis.length; i++) {
			vernis += `<option value="${this.produit.vernis[i]}">${this.produit.vernis[i]}</option>`;
		}
		//let quantity = "";
		this.DOM.innerHTML = `
			<img src="${this.produit.image}" alt="${this.produit.nameLong}"/>
			<div id="${this.produit.name}content">
				<figcaption>${this.produit.nameLong}</figcaption>
				<p>${this.produit.description}</p>
				<select id="mon_vernis">
					<option selected>-- Choix du vernis --</option>
					${vernis}
				</select>
			</div>
			<div id="addbtn">
				<h3>${this.produit.price}€</h3>	
				<a href="panier.html?id=${this.produit.id}">
					<button id="add-panier" type="submit"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
				</a>
			</div>		
		`;
	}
}