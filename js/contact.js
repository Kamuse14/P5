// page Formulaire
class Contact {
	constructor(){
		this.contact = {};
		this.firstName = sessionStorage.getItem("prenom");
		this.lastName = "";
		this.address = "";
		this.city = "";
		this.email = "";
		window.mvp.contact = this;

		this.saveContact();
	}
	/*recupContact() {
		let key = sessionStorage.key(i);
		let contactJson = sessionStorage.getItem(key);
		
	}*/
	saveContact() {
		if(typeof sessionStorage!='undefined') {
  			if('message' in sessionStorage) {
    		alert("Message récupéré");
    		document.getElementById("firstName").value = sessionStorage.getItem('message');
 			 }
		} else {
		  alert("sessionStorage n'est pas supporté");
		}
	}
}