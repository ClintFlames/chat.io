import { loadDevicePageInto, loadDeviceScript, loadDeviceStyle, runOnLoad } from "./loader.js";

const page = {
	register: document.getElementById("fake_body"),
	main: document.getElementById("page_main"),
	footer: document.getElementsByTagName("footer")[0],
	hideAll: () => {
		page.register.hidden = true;
		page.main.hidden = true;
		page.footer.hidden = true;
	}
}

loadDeviceStyle("size");

let isOpened = false;



const openchat = (token, nick, color) => {
	console.log(token);
	console.log(nick);
	console.log(color);
	const span_nick = document.getElementById("profile").getElementsByTagName("span")[0];

	span_nick.innerHTML = nick;
	span_nick.style = "color: #" + color.toString(16);

	page.hideAll();
	page.main.hidden = false;
}
// openchat(null, "Anon", 0x9b2d30);


if (true) {
	// Create new account
	runOnLoad(() => {
		const fr = document.getElementById("form_register");
		fr.querySelector('[type = "button"]').addEventListener("click", () => openchat(null, fr.elements.nick.value, parseInt(fr.elements.hex.value.slice(1), 16)));
	});
} else {
	// Restore by token
}