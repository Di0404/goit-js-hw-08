
import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');

// const inputHandler = e => {
//   // console.log(e.target) // - ссылка на целевой эл
//   const {name, value} = e.target  // дестукт.свойств 
//   const formData = {
//     [name]: value
//   };
//   // console.log(e.target.name) // - name - атрибут в input
  
//   console.log(formData) // - получаем обьект с тем что ввели а инпут, 
//   // name -имя ключа, value значение ключа
// }

// formRef.addEventListener('input', inputHandler)
///////////////////////////////////////////////////////////////////////////
// теперь переводим в лок. хран
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
  // name -имя ключа, value значение ключа
  const serializedData = JSON.stringify(formData);
  // console.log(serializedData)
  localStorage.setItem("feedback-form-state", serializedData)
}

const rehydrateData = () => {
  const savedData = localStorage.getItem("feedback-form-state")
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





















// const inputHandler = e =>{
//   // name это имя-атрибут у инпутов в хтмл
// //   console.log(e.target.name)
// const savedData = localStorage.getItem("feedback-form-state");
//      console.log(savedData)
//      const parsedData = JSON.parse(savedData)
//      console.log(parsedData)
  
//   const formData = { 
//     [e.target.name]: e.target.value
//   }

  
//   // name значение ключа, value значение ключча
 
// //   console.log(formData)

//   const serializedData = JSON.stringify(formData)
// console.log(serializedData)
// localStorage.setItem("feedback-form-state", serializedData)
// }

// const rehydrateData = () => {
//       const savedData = localStorage.getItem("feedback-form-state");
//       const parsedData = JSON.parse(savedData);
//       console.log(parsedData)
    
//       //  образаемся к форна форме есть свойство elements, это
//       //  обьект в котором  по ключам лежат ссылки на все элементы формы.
//       //  в виде ключей есть сити имейл и т.д
//       console.log(formRef.elements)
//       // formRef.elements.value = parsedData.input
//       // formRef.elements.value = parsedData.textarea
//     //   formRef.elements.city.value = parsedData.city
//     //   formRef.elements.canBeSpammed.checked = parsedData.city
//     formRef.elements.email.value = parsedData.email
//   formRef.elements.message.value = parsedData.message

//      }
//       rehydrateData()
// formRef.addEventListener('input', inputHandler);

