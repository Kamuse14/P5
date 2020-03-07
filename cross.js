class Produit{
	constructor(data, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price;
		this.description = data.description;
		this.image = data.imageUrl;

		this.dark = data.varnish[0];
		this.light = data.varnish[1];
		this.maho = data.varnish[2];
		/* this.vernis = data.varnish[i];
		for (let i=0; i<vernis.length; i++) {
		this.vernis.innerHTML = `${this.vernis}`
		}
		*/

		window.produits[this.name] = this;

		this.DOM = document.createElement("figure");
		this.DOM.id = this.name;
		target.appendChild(this.DOM);
		this.affichageProduit();
	}
	affichageProduit(){
		this.DOM.innerHTML = `
			<img src="${this.image}" alt="${this.nameLong}"/>
			<div id="${this.name}content">
				<figcaption>${this.nameLong}</figcaption>
				<p>${this.description}</p>
				<label for="mon_vernis">Choisissez un vernis</label>
				<select id="mon_vernis">
					<option>${this.dark}</option>
					<option>${this.light}</option>
					<option>${this.maho}</option>
					<!-- <option>${this.vernis}</option> -->
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