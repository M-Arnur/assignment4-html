const registration = document.getElementById('form4');
const password = document.getElementById('password4');
const confirmation = document.getElementById('confirm4');

function checkPasswords() {
  confirmation.setCustomValidity(
    confirmation.value !== password.value
      ? 'Passwords must match.'
      : ''
  );
}

document.querySelectorAll('form').forEach(function (form) {
  const customFeedback = form.id === 'form3' || form.id === 'form4';
  let submitted = false;

  if (customFeedback) {
    form.noValidate = true;
  }

  function showFeedback() {
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      if (field.type === 'checkbox') return;

      const valid = field.checkValidity();

      field.classList.toggle('is-valid', valid);
      field.classList.toggle('is-invalid', !valid);
      field.setAttribute('aria-invalid', String(!valid));
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitted = true;

    if (form === registration) {
      checkPasswords();
    }

    const valid = form.checkValidity();

    if (customFeedback) {
      showFeedback();
    }

    form.querySelector('.result').textContent = valid
      ? 'Form is valid! This is a demo; no data was sent.'
      : '';

    if (!valid) {
      form.querySelector(':invalid').focus();
    }
  });

  function updateFeedback() {
    form.querySelector('.result').textContent = '';

    if (form === registration) {
      checkPasswords();
    }

    if (customFeedback && submitted) {
      showFeedback();
    }
  }

  form.addEventListener('input', updateFeedback);
  form.addEventListener('change', updateFeedback);

  form.addEventListener('reset', function () {
    submitted = false;

    if (form === registration) {
      confirmation.setCustomValidity('');
    }

    form.querySelector('.result').textContent = '';

    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.classList.remove('is-valid', 'is-invalid');
      field.removeAttribute('aria-invalid');
    });
  });
});