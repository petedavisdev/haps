//@ts-check

// Initialize Haps
[...document.forms].forEach((form) => {
	console.log([...new FormData(form).keys()]);
	const formName = form.name;
	const hpFieldNames = [...new FormData(form).keys()];

	hpFieldNames.forEach((fieldName) => {
		hpUpdate(formName, fieldName);

		const field = form[fieldName];
		const fieldInputs = field.length ? field : [field];

		fieldInputs.forEach((input) =>
			input?.addEventListener('input', () =>
				hpUpdate(formName, fieldName)
			)
		);
	});
});

// hp-update
/**
 * @param {string} formName - The name of the form
 * @param {string} fieldName - The name of the field
 * @param {function(string):string} [updater] - A function that takes the field's value and returns a new value
 */
function hpUpdate(formName, fieldName, updater = (value) => value) {
	const field = document.forms[formName][fieldName];
	const value = (field.value = updater(field?.value));

	// hp-text
	document
		.querySelectorAll(`[hp-text="${fieldName}"]`)
		?.forEach((el) => (el.textContent = value));

	// hp-class
	document.querySelectorAll(`[hp-class="${fieldName}"]`)?.forEach((el) => {
		el.classList.forEach(
			(item) =>
				item.startsWith(`hp-${fieldName}-`) && el.classList.remove(item)
		);

		el.classList.add(`hp-${fieldName}-${value}`);
	});

	// hp-show
	/**@type NodeListOf<HTMLElement>*/ (
		document.querySelectorAll(`[hp-show="${fieldName}"]`)
	).forEach((el) => {
		el.style.display = 'none';

		const shownValues = el
			.getAttribute('hp-show')
			?.split(':')[1]
			.split('|');

		if (shownValues?.includes(value)) el.style.removeProperty('display');
	});
}
