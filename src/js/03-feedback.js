import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form')
let formDataToSave = {};
  
formRef.addEventListener('input', throttle(onFormInput, 500))
formRef.addEventListener('submit', onFormSubmit)

fillInForm();

function onFormInput(event) {
  const previouslySavedFormData = localStorage.getItem(STORAGE_KEY);

  if (previouslySavedFormData) {
    const parsedFormData = JSON.parse(previouslySavedFormData);
    formDataToSave = { ...parsedFormData };
  }

  formDataToSave[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataToSave));
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
  const form = event.target;

  event.preventDefault();
  console.log('SubmitedFormData',outputFormData(form));
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function outputFormData(form) {
  const submitedFormData = {};
  
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    submitedFormData[key] = formData.get(key);
  }
  
  return submitedFormData;
}
