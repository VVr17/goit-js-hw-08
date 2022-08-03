import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form')

formRef.addEventListener('input', throttle(onFormInput, 500))
formRef.addEventListener('submit', onFormSubmit)

fillInForm();

function onFormInput(event) {
  const formData = {};
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillInForm() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);

    const keys = Object.keys(parsedFormData);
    keys.forEach(key => formRef[key].value = parsedFormData[key]);
  }
}


function onFormSubmit(event) {
  event.preventDefault();
  
  const {
    elements: {
      email,
      message,
    }
  } = event.target;

  const submitedFormData = {};
  submitedFormData.email = email.value;
  submitedFormData.message = message.value;

  console.log(submitedFormData);

  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}