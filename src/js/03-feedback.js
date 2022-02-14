
import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');


const inputHandler = e => {
  // console.log(e.target) // - ссылка на целевой эл
  const {name, value} = e.target  // дестукт.свойств 
  const savedData = localStorage.getItem("feedback-form-state")
  const parsedData = JSON.parse(savedData)
  // console.log(`parsedData`, parsedData)
  const formData = {
    ...parsedData,
    [name]: value
  };
  // console.log(e.target.name) // - name - атрибут в input
  // console.log(formData) // - получаем обьект с тем что ввели а инпут, 
  const serializedData = JSON.stringify(formData);
  // console.log(serializedData)
  localStorage.setItem("feedback-form-state", serializedData)
}

const rehydrateData = () => {
  const savedData = localStorage.getItem("feedback-form-state")
  if (!savedData) return
  const parsedData = JSON.parse(savedData);
  // console.log(parsedData)
  formRef.elements.email.value = parsedData.email
  formRef.elements.message.value = parsedData.message
}
rehydrateData()

const submitHandler = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form)
  const finalData = {}
  for (const [key, value] of formData.entries()){
  
    finalData[key] = value
  }
  console.log(finalData)
  e.target.reset();
}

formRef.addEventListener('input', throttle(inputHandler, 500))
formRef.addEventListener('submit', submitHandler)
