class Produit{
	constructor(data, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.vernis = data.varnish;

		window.composants[this.name] = this;

		this.DOM = document.createElement("figure");
		this.DOM.id = this.name;
		target.appendChild(this.DOM);
		this.affichageProduit();
	}

	affichageProduit(){
		let vernis = "";
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
				<button id="addbutton" type="submit"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
			</div>		
		`;
		this.DOM.className = "meuble";
	}
}