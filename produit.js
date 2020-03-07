class Produit{
	constructor(data, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price;
		this.image = data.imageUrl;
		window.produits[this.name] = this;

		this.DOM = document.createElement("div");
		
		target.appendChild(this.DOM);
		this.affichageAccueil();
	}
	/*affichageAccueil(){
		this.DOM.innerHTML = `
			<img src="${this.image}" alt="${this.nameLong}"/>
			<figcaption>${this.nameLong}</figcaption>			
			<h3>${this.price}€</h3>			
		`;
		this.DOM.className = "meuble";
	}*/

	affichageAccueil(){
		this.DOM.innerHTML = `
			<a href="${this.name}.html">
				<figure id="${this.name}" class="meuble">
					<img src="${this.image}" alt="${this.nameLong}"/>
					<figcaption>${this.nameLong}</figcaption>			
					<h3>${this.price}€</h3>	
				</figure>
			</a>		
		`;
	}


}