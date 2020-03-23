// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(target){ // cible dans laquelle on va implémenter les meubles
		this.commande = [];
		window.mvp.panier = this;
		this.DOM = document.createElement("tbody");
		target.appendChild(this.DOM);
		this.recupPanier();
		this.supprimerPanier();
		this.supprimeProduit();
	}

	recupPanier() {
		for(let i=0; i<localStorage.length; i++) {
			let key = localStorage.key(i);
			let meubleJson = localStorage.getItem(key);
			let meubleJs = JSON.parse(meubleJson);
			this.ajouteProduit(meubleJs);
		}
	}

	estPresent(produit) {
		for(let meuble of this.commande) {
			if(meuble.id === produit.id){
				return true;
			}
		}
		return false;
	}

	ajouteProduit(produit){
		if (!this.estPresent(produit)) {
			this.commande.push(produit);
			console.log(produit);
			localStorage.setItem(produit.id,JSON.stringify(produit));
		}
	}

	supprimeProduit(produit){/*  //ne fonctionne pas
		for(let produit of this.commande){
			if(this.estPresent(produit)){// je ne vois pas comment récupérer l'id...
				let trashId = /trash-${produit.name}/;
				document.getElementById("trashId").addEventListener('click', ()=>{
				localStorage.removeItem(produit.name);
				console.log(localStorage);
				}
			}
		}*/
	}

	affichagePanier() {
		for (let produit of this.commande) {
			this.DOM.innerHTML += `
			<tr id="indexPanier">
				<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
				<td>${produit.nameLong}</td>
				<td>${produit.price}€</td>
				<td id="trash-${produit.name}" class="trash"><i class="far fa-trash-alt"></i></td>
			</tr>
		`;	
		console.log(produit.name);
		}
		this.DOM.innerHTML += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;
	}

	supprimerPanier() {
		document.getElementById("delete").addEventListener('click', ()=>{
			console.log('test'); //ne fonctionne pas ???
			localStorage.clear(); 
			window.location.reload();
		})
	}

	totalPanier() {
		let total = 0;
		for(let produit of this.commande) {
			total += produit.price;
		}
		return total;
	}
}



