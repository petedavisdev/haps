hpFieldNames.forEach((fieldName) => {
	const field = hpForm[fieldName];
	const inputs = field.length ? field : [field];

	inputs.forEach((input) =>
		//TODO: generate labels
		input?.addEventListener('input', () => hpUpdate(fieldName))
	);
});
