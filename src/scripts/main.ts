function activate(el: string | HTMLElement) {
	if (typeof el == 'string')
		 el = <HTMLElement>document.querySelector(el)
	el.classList.toggle("active");
}


function returnBack(e: HTMLElement) {
	window.history.back();
}