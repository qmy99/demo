// import qs from "qs"

function encode(obj){
	if(typeof obj==="object"){
		let newObj="";
		for(var i in obj){
			newObj+="&";
			newObj+=i;
			newObj+="=";
			newObj+=encodeURIComponent(obj[i]);
		}
		return newObj.substr(1);
	}else if(typeof obj==="string"){
		return encodeURIComponent(obj);
	}
}


export default {
	encode
}
