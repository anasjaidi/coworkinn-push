function spaces() {
	const head = document.querySelector(".fixed");
	if (!head?.classList.contains("scrolled")) head?.classList.toggle("scrolled");
	iconSwitch()
	activate("header .spaces");
	activate('.wrapper')
}

function Left() {
  if (document.querySelector('.menu-page')?.classList.contains('active')) return menuPage()
	activate('header .spaces')
  iconSwitch()
	activate('.wrapper')
}


