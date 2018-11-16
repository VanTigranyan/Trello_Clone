export const validate = (fieldName, value) => {

  console.log('fieldName---', fieldName, 'value---', value)
  let result = {
    field: fieldName,
    message: '',
    isValid: true,
  }

/* FOR EMAIL */
  if (fieldName === 'email') {
    if(!value) {
      result.isValid = false;
      result.message = 'Field Can\'t be empty!'
    };

    if(value && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      result.isValid = false;
      result.message = 'The Mail is invalid, please provide correct Email address!'
    }
  }

/*FOR PASSWORD*/
  else if (fieldName === 'password') {
    if(!value) {
      result.isValid = false;
      result.message = 'Field Can\'t be empty!'
    }

    if(value && !value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
      result.isValid = false;
      result.message = 'The Password must be at least 6 characterwws long and contain at least one letter and one number!'
    }
  }

/*FOR NAME AND SURNAME*/
  else if(fieldName === 'name' || fieldName=== 'surname') {
    if(!value) {
      result.isValid = false;
      result.message = 'Field Can\'t be empty!'
    }

    if(value && !value.match(/[a-zA-Z']{3,20}/i)) {
      result.isValid = false;
      result.message = 'The Name and Surname must be at least 3 and max 20 characters long and contain only Letters!'
    }
  }

  /*FOR AGE*/
    else if(fieldName === 'age') {
      if(value && +value<1 && +value>99) {
        result.isValid = false;
        result.message = 'The Age Should not start with 0 and can\'t be higher than 99!'
      }
    }

  console.log('result----', result)

  return result;
}


export const checkForm = () => {
  console.log('form is checking');
  let isValid = true;
  let arr = Array.from(document.getElementsByTagName('input'));
  arr.forEach(el => {
    let val = el.value.trim();
    if(val === undefined || val===null || val==="") {
      isValid = false;
    }
  })
    console.log('Form is chacked!', `result is IsValid-->${isValid}`)
   return isValid;
}
