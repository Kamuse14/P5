// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(target){ // cible dans laquelle on va implémenter les meubles
		this.commande = [];
		window.mvp.panier = this;
		this.DOM = document.createElement("tbody");
		target.appendChild(this.DOM);
		this.render();
	}

	render(){
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "panier":
        		this.recupPanier();
		        break;
		    default:
		        this.renderPanierVide();
		        break;
		}
	}
	
	recupPanier() {//récupération des données du localStorage
		// for(let i=0; i<localStorage.length; i++) {
		// 	let key = localStorage.key(i);
		// 	let meubleJson = localStorage.getItem(key);
		// 	let produit = JSON.parse(meubleJson);
		// 	this.ajouteProduit(produit);
		// }
	}

	ajouteProduit(produit){//on pousse le produit dans le tableau "commande"
		// 	this.commande.push(produit);
		// 	localStorage.setItem(produit.id,JSON.stringify(produit));
		//	
		//	for (let produit of this.commande) {
		// 	this.DOM.innerHTML += `
		// 	<tr id="indexPanier">
		// 		<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
		// 		<td>${produit.nameLong}</td>
		// 		<td>${produit.price}€</td>
		// 		<td id="trash-${produit.name}" class="trash"><i class="far fa-trash-alt"></i></td>
		// 	</tr>
		// `;
		// }

		//	this.DOM.innerHTML += `
		// 	<tr id="total">
		// 		<td colspan="2"> Total :</td>
		// 		<td>${this.totalPanier()}€</td>
		// 	</tr>
		// `;	
	}

	renderPanierVide() {
		
	}

	totalPanier() {
		// let total = 0;
		// for(let produit of this.commande) {
		// 	total += produit.price;
		// }
		// return total;
	}
}



