// page ACCUEIL
class ListeProduits{
	constructor(target){
		this.liste = [];
		this.DOM = document.createElement("div");
		target.appendChild(this.DOM);
	}

	ajouteProduit(produit) {
		this.liste.push(produit);
	}
	
	affichageAccueil(){ //contenu 
		this.DOM.innerHTML = `<h2>Nos produits</h2>`;
		//console.log(this.liste);
		for(let produit of this.liste) {
			//console.log(produit);
			this.DOM.innerHTML += `
				<a href="produit.html?id=${produit.id}">
					<figure id="${produit.name}" class="meuble">
						<img src="${produit.image}" alt="${produit.nameLong}"/>
						<figcaption>${produit.nameLong}</figcaption>			
						<h3>${produit.price}€</h3>	
					</figure>
				</a>		
			`;
		}
	}

	/*fetch('http://localhost:3000/api/furniture')
			.then((response) => {
			  return response.json(); 
			})
			.then((text) => {
			  afficheProduit(text);
			})
			.catch((e) => {
			  console.log("error");
			});*/
}