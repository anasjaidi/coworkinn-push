const faqs = Array.from(
	document.getElementsByClassName("faq") as HTMLCollectionOf<HTMLElement>
);

for (let faq of faqs) {
	console.log(faq);
	faq.addEventListener("click", () => {
		faq.classList.toggle("active");
	});
}
