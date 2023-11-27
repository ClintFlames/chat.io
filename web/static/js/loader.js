export const device = (() => {
	const ua = navigator.userAgent.toLowerCase();
	return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(ua) ? "phone" : "desktop";
})();

if (debug) console.log("device: " + device);

export const loadScript = (name, cb) => {
	const script = document.createElement("script");

	script.type = "module";
	script.src = `static/js/${name}.js`;

	document.getElementsByTagName("head")[0].appendChild(script);

	script.onload = () => {
		if (debug) console.log("loaded: " + script.src);
		if (typeof cb == "function") cb(); 
	}
}



export const loadDeviceStyle = (name) => {
	const style = document.createElement("link");

	style.rel = "stylesheet";
	style.type = "text/css";
	style.href = `static/css/${device}/${name}.css`;

	document.getElementsByTagName("head")[0].appendChild(style);

	if (debug) console.log("loaded: " + style.href);
}

export const loadDeviceScript = (name, cb) => loadScript(`${device}/${name}`, cb);


export const loadDevicePageInto = async (name, target) => {
	const res = await fetch(`static/html/${device}/${name}.html`);
	if (res.ok) {
		target.innerHTML = await res.text();
		if (debug) console.log("loaded: " + res.url);
	} else {
		console.log("error: " + res.status);
	}
}

export const runOnLoad = (cb) => {
	if (document.readyState == "complete") cb();
		else window.addEventListener("load", cb);
}