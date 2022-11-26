function Menu(e: HTMLSpanElement) {
	let list = document.querySelector("nav ul") as HTMLUListElement;
	console.log(list.classList);
	e.className === "fa-regular fa-bars"
		? ((e.className = "fa-regular fa-xmark"), list.classList.toggle("active"))
		: ((e.className = "fa-regular fa-bars"), list.classList.toggle("active"));
}

function menuPage() {
	document.querySelector(".menu-page")?.classList.toggle("active");
	document
		.querySelector(".fixed-header-wrapper")
		?.classList.toggle("background-black");
	iconSwitch();
}

function iconSwitch() {
	document.querySelector("#menu")?.classList.toggle("none");
	document.querySelector("#left-arrow")?.classList.toggle("line");
}

window.addEventListener("scroll", () => {
	const head = document.querySelector(".fixed-header-wrapper");

	if (!head?.classList.contains("background-black"))
		head?.classList.toggle("background-white", window.scrollY > 0);

});
