// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(data, target){ // cible dans laquelle on va implémenter les meubles
		this.produits = [];
		window.mvp.panier = this;
		this.dom = document.createElement("tbody");
		target.appendChild(this.dom);
		this.render();
	}

	render(){
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "panier":
				this.entetePanier();
        		this.recupPanier();
		        break;
		    default:
		        this.entetePanier();
		        break;
		}
	}
	
	entetePanier() {
		this.dom.innerHTML = `
			<thead>
				<tr>
					<th>Produit</th>
					<th>Nom du produit</th>
					<th>Prix</th>
					<th><i class="far fa-trash-alt"></th>
				</tr>
			</thead>
		`;
	}

	recupPanier() {//récupération des données du localStorage
		for(let i=0; i<localStorage.length; i++) {
			let key = localStorage.key(i);
			let meubleJson = localStorage.getItem(key);
			let produit = JSON.parse(meubleJson);
			this.ajouteProduit(produit);
		}
	}

	ajouteProduit(produit){//on pousse le produit dans le tableau "produits"
			this.produits.push(produit);
			localStorage.setItem(produit.id,JSON.stringify(produit));
			
			for (let produit of this.produits) {
			this.dom.innerHTML += `
			<tr id="indexPanier">
				<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
				<td>${produit.nameLong}</td>
				<td>${produit.price}€</td>
				<td id="trash-${produit.name}" class="trash"><i class="far fa-trash-alt"></i></td>
			</tr>
		`;
		}

			this.dom.innerHTML += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;	
	}

	totalPanier() {
		let total = 0;
		for(let produit of this.produits) {
			total += produit.price;
		}
		return total;
	}
}



