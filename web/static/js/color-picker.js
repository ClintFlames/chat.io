import { runOnLoad } from "./loader.js";

// Its awful i know, i will rewrite it later TODO
runOnLoad(() => {
	for (const cpdiv of document.getElementsByClassName("color-picker")) {

		const rgb_prev = { red: 0, green: 0, blue: 0 }

		let update = () => {}

		const callback = {
			ihex: e => {
				if (e.target.value.startsWith("#")) e.target.value = e.target.value.slice(1);
				if (!/^([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
					hex.value = hex.prev;
					return update();
				}
				if (e.target.value.length == 3) e.target.value = e.target.value.split("").map(v=> v + v).join("");
				
				hex.prev = hex.value = parseInt(e.target.value, 16);
				update();
			},
			red: e => {
				let val = Number(e.target.value);

				if (val < 0 || val > 255 || e.target.value == "" || !Number.isInteger(val)) {
					hex.value = (rgb_prev.red << 16) + (rgb_prev.green << 8) + rgb_prev.blue;
					return update();
				}

				hex.value = (val << 16) + (rgb_prev.green << 8) + rgb_prev.blue;
				update();
			},
			green: e => {
				let val = Number(e.target.value);

				if (val < 0 || val > 255 || e.target.value == "" || !Number.isInteger(val)) {
					hex.value = (rgb_prev.red << 16) + (rgb_prev.green << 8) + rgb_prev.blue;
					return update();
				}

				hex.value = (rgb_prev.red << 16) + (val << 8) + rgb_prev.blue;
				update();
			},
			blue: e => {
				let val = Number(e.target.value);

				if (val < 0 || val > 255 || e.target.value == "" || !Number.isInteger(val)) {
					hex.value = (rgb_prev.red << 16) + (rgb_prev.green << 8) + rgb_prev.blue;
					return update();
				}

				hex.value = (rgb_prev.red << 16) + (rgb_prev.green << 8) + val;
				update();
			}
		}

		const hex = {
			value: 0,
			prev: 0,
			random: () => hex.value = Math.floor(Math.random() * 0xFFFFFF),
			rgb: () => [hex.value >> 16, (hex.value >> 8) & 0xFF, hex.value & 0xFF],
			toString: () => "#" + hex.value.toString(16).padStart(6, "0").toUpperCase()
		}

		hex.random();
		hex.prev = hex.value;
		[rgb_prev.red, rgb_prev.green, rgb_prev.blue] = hex.rgb();

		runOnLoad(() => {
			const ihex       = cpdiv.querySelector('input[name = "hex"       ]');
			const text_red   = cpdiv.querySelector('input[name = "text_red"  ]');
			const ired       = cpdiv.querySelector('input[name = "red"       ]');
			const text_green = cpdiv.querySelector('input[name = "text_green"]');
			const igreen     = cpdiv.querySelector('input[name = "green"     ]');
			const text_blue  = cpdiv.querySelector('input[name = "text_blue" ]');
			const iblue      = cpdiv.querySelector('input[name = "blue"      ]');

			update = () => {
				ihex.value = hex.toString();
				ihex.prev = hex.value;
				const rgb = hex.rgb();
				[text_red.value, text_green.value, text_blue.value] = rgb;
				[ired.value, igreen.value, iblue.value] = rgb;
				[rgb_prev.red, rgb_prev.green, rgb_prev.blue] = rgb;
				cpdiv.querySelector('input[name = "hexprev"]').style = "background-color: " + hex.toString();
			}

			update();

			// Hex text input
			ihex.addEventListener("keyup", e => { if (e.key == "Enter") callback.ihex(e); });
			ihex.addEventListener("focusout", callback.ihex);

			// RGB text input
			text_red  .addEventListener("keyup", e => { if (e.key == "Enter") callback.red(e); });
			text_red  .addEventListener("focusout", callback.red);
			text_green.addEventListener("keyup", e => { if (e.key == "Enter") callback.green(e); });
			text_green.addEventListener("focusout", callback.green);
			text_blue .addEventListener("keyup", e => { if (e.key == "Enter") callback.blue(e); });
			text_blue .addEventListener("focusout", callback.blue);

			// Sliders
			ired  .addEventListener("input", e => { hex.value = (hex.value & 0xFFFF  ) + (parseInt(e.target.value) << 16); update(); });
			igreen.addEventListener("input", e => { hex.value = (hex.value & 0xFF00FF) + (parseInt(e.target.value) << 8 ); update(); });
			iblue .addEventListener("input", e => { hex.value = (hex.value & 0xFFFF00) +  parseInt(e.target.value)       ; update(); });
		});
	}
});