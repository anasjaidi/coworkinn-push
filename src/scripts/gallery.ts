const galleries = Array.from(
	document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>
);

const lastChilds = document.getElementsByClassName(
	"last-child"
) as HTMLCollectionOf<HTMLElement>;

function checkElement(elem: HTMLElement, index: number): boolean {
	const rect = elem.getBoundingClientRect();
	if (
		rect.right <= galleries[index].getBoundingClientRect().right &&
		rect.left <= document.documentElement.clientWidth
	) {
		return true;
	}
	return false;
}

galleries.forEach((element, index) => {
	element.addEventListener("wheel", (e: WheelEvent) => {
		if (checkElement(lastChilds[index], index)) return true;
		e.preventDefault();
		element.scrollLeft += e.deltaY;
		element.scrollLeft += e.deltaX;
	});
});
