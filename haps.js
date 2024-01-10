[...document.forms].forEach((form) => {
	const hpFieldNames = [...new FormData(form).keys()];
	hpFieldNames.forEach((fieldName) => hpUpdate(form.name, fieldName));
});

function hpUpdate(formName, fieldName, updater = (value) => value) {
	const field = document.forms[formName][fieldName];
	const value = (field.value = updater(field?.value));

	hpClass(fieldName, value);
	hpShow(fieldName, value);
	hpText(fieldName, value);
}

function hpClass(fieldName, value) {
	document.querySelectorAll(`[hp-class="${fieldName}"]`)?.forEach((el) => {
		el.classList.forEach(
			(item) =>
				item.startsWith(`hp-${fieldName}-`) && el.classList.remove(item)
		);

		el.classList.add(`hp-${fieldName}-${value}`);
	});
}

function hpShow(fieldName, value) {
	document.querySelectorAll(`[hp-show^="${fieldName}:"]`)?.forEach((el) => {
		el.style.display = 'none';

		const shownValues = el.getAttribute('hp-show').split(':')[1].split('|');

		if (shownValues.includes(value)) el.style.removeProperty('display');
	});
}

function hpText(fieldName, value) {
	document
		.querySelectorAll(`[hp-text="${fieldName}"]`)
		?.forEach((el) => (el.textContent = value));
}
