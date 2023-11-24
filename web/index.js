const userList = [];

const onLoaded = async () => {
	const dmakeaccount = document.getElementsByClassName("makeaccount")[0];
	const dmenu = document.getElementsByClassName("menu")[0];
	const dchat = document.getElementsByClassName("chat")[0];

	// const wssport = await (await fetch("wssport")).text();
	const create_account_form = document.getElementById("create_account");
	const create_room_form = document.getElementById("create_room");
	const join_room_form = document.getElementById("join_room");

	create_account_form.elements.nickcolor.value = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");

	create_account_form.addEventListener("submit", e => {
		e.preventDefault();

		const nick = create_account_form.elements.accountnick.value;
		const color = create_account_form.elements.nickcolor.value;

		if (nick.length < 2) return alert("Длинна ника должны быть 2+ символа.");

		userList.push({ nick, color });

		// TODO: request to make account

		dmakeaccount.hidden = true;
		dmenu.hidden = false;
	});

	create_room_form.addEventListener("submit", e => {
		e.preventDefault();
		const is_private   = create_room_form.elements.is_private.checked;
		const member_count = create_room_form.elements.member_count.value;

		dmenu.hidden = true;
		dchat.hidden = false;
	});


	join_room_form.addEventListener("submit", e => {
		e.preventDefault();
		const invite_code = join_room_form.elements.invite_code.value;

		dmenu.hidden = true;
		dchat.hidden = false;
	});
}

if (document.readyState == "complete") onLoaded(); else window.onload = onLoaded;