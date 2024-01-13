//@ts-check

// Initialize Haps
/**@type NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>*/ (
	document.querySelectorAll('input[hp-is], textarea[hp-is], select[hp-is]')
).forEach((input) => {
	hpUpdate(input);
	input.addEventListener('input', () => hpUpdate(input));
});

// hp-update
/**
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | string} input - The name of the form
 * @param {function(string):string} [updater] - A function that takes the field's value and returns a new value
 */
function hpUpdate(input, updater = (value) => value) {
	if (typeof input === 'string') {
		input =
			/**@type HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement */ (
				document.querySelector(`[name="${input}"]`)
			);
		if (!input) return;
	}

	const value = (input.value = updater(input.value));
	console.log(value);
	const name = input.name;

	// hp-text
	document
		.querySelectorAll(`[hp-text="${name}"]`)
		?.forEach((el) => (el.textContent = value));

	// hp-class
	document.querySelectorAll(`[hp-class="${name}"]`)?.forEach((el) => {
		el.classList.forEach(
			(item) =>
				item.startsWith(`hp-${name}-`) && el.classList.remove(item)
		);

		el.classList.add(`hp-${name}-${value}`);
	});

	// hp-show
	/**@type NodeListOf<HTMLElement>*/ (
		document.querySelectorAll(`[hp-show="${name}"]`)
	).forEach((el) => {
		el.style.display = 'none';

		const shownValues = el
			.getAttribute('hp-show')
			?.split(':')[1]
			.split('|');

		if (shownValues?.includes(value)) el.style.removeProperty('display');
	});
}
