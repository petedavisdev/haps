const uioForm = document.forms.uio;

const uioFormData = new FormData(uioForm);

const uioRefs = [...uioFormData.keys()];

function increment(name) {
  uioUpdate(name, () => uioForm[name].value++);
}

function decrement(name) {
  uioUpdate(name, () => uioForm[name].value--);
}

function toggle(name) {
  uioUpdate(name, () => {
    [...uioForm[name]].find((el) => el.checked === false).checked = true;
  });
}

uioRefs.forEach((ref) => {
  uioUpdate(ref);
  const field = uioForm[ref];
  //TODO: generate labels

  if (field.length) {
    field.forEach((el) => addChangeListener(ref, el));
  } else {
    addChangeListener(ref, field);
  }
});

function addChangeListener(ref, input) {
  input?.addEventListener("change", () => uioUpdate(ref));
}

function uioUpdate(ref, updater) {
  typeof updater === "function" && updater();

  document
    .querySelectorAll(`[data-uio="${ref}"]`)
    ?.forEach((el) => el.setHTML(uioForm[ref]?.value));

  document.querySelectorAll(`[data-uio-show^="${ref}:"]`)?.forEach((el) => {
    el.hidden = true;

    const shownValues = el.dataset.uioShow.split(":")[1].split("|");

    const current = [...uioForm[ref]].find((radio) => radio.checked);

    if (shownValues.includes(current.value)) {
      el.hidden = false;
    }
  });

  document
    .querySelectorAll(`[data-uio-class="${ref}"]`)
    ?.forEach((el) => el.classList.add(`${ref}-${uioForm[ref].value}`));
}
