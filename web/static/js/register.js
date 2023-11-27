import { runOnLoad } from "./loader.js";

runOnLoad(() => {
	const hexprev = document.getElementById("form_register").getElementsByClassName("color-picker")[0].querySelector('[name = "hexprev"]');
	const inick = document.querySelector('[name = "nick"]');
	inick.style = hexprev.style.cssText.replace("background-", "");

	new MutationObserver(() => inick.style = hexprev.style.cssText.replace("background-", "")).observe(hexprev, { attributes: true, attributeFilter: ["style"] });
});