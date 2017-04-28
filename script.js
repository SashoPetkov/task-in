'use strict';

(function(){
    // create a container for messages
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('passive');
  document.querySelector('.main-img').appendChild(messageContainer);

  const nameInp = document.querySelector('.form-section-first input[type="text"]');
  const mail = document.querySelector('input[name="email"]');
  const countryCode = document.querySelector('.form-section-second input[type="text"]');
  const phone = document.querySelector('input[name="phone_number"]');
  const country = document.querySelector('select');
  const form = document.querySelector('form');

  let validation = [false, false, false, false];

  mail.addEventListener('focusout', mailValidate);
  nameInp.addEventListener('focusout', nameValidate);
  phone.addEventListener('focusout', phoneNumValidate);
  country.addEventListener('change', onSelectChange);
  form.addEventListener('submit', checkForSubmit);

    // E-MAIL field validation
  function mailValidate() {
    // isn`t email without '@'
    if(!this.value.includes('@')) {
      removePassive('this is not e-mail');
      // minimum 3 char before '@' and '@' can not be the last idem
    } else if( this.value.indexOf('@') < 3 || this.value.indexOf('@')  == (this.value.length - 1)) {
      removePassive('@ can not be first or last and you must have 3 signs before @')
    } else {
      messageContainer.classList.add('passive');
      messageContainer.classList.remove('active');
      return validation[0] = true;
    }
  }

    // FULL NAME field validation
  function nameValidate() {
    const words = this.value.split(" ");

    if (words.length !== 2) {
      removePassive('Please write your first and last name');
    } else {
      if((2 < words[0].length && words[0].length < 20) && (2 < words[1].length && words[1].length < 20)) {
        messageContainer.classList.add('passive');
        messageContainer.classList.remove('active');
        return validation[1] = true;
      } else {
        removePassive('Each word must be between 3 to 20 symbols.')
      }
    }
  }

    // PHONE NUMBER validation
  function phoneNumValidate() {
    const val = parseInt(this.value);
    const regEx = /^\d+$/g;
    if(isNaN(val) || phone.value.charAt(0) !== '0' || phone.value.length < 4 || !phone.value.match(regEx)) {
      removePassive('you can write only numbers and first must be 0 minimum 5 digits');
    } else {
      messageContainer.classList.add('passive');
      messageContainer.classList.remove('active');
      return validation[2] = true;
    }
  }

    // SELECT change phone code of Country
  function onSelectChange() {
    console.log(this);
    switch(this.value) {
      case 'Bulgaria':
        validation[3] = true;
        this.querySelectorAll('option')[1].setAttribute('value', 'BG');
        return countryCode.value = '+359';

      case 'Spain':
        validation[3] = true;
        this.querySelectorAll('option')[2].setAttribute('value', 'ES');
        return countryCode.value = '+34';
    }
  }
    // popUp remove, addText and active
  function removePassive(text) {
    messageContainer.classList.remove('passive');
    messageContainer.classList.add('active');
    messageContainer.innerHTML = text;
  }

    // prevent submit information if some of validations are not true
  function checkForSubmit(e) {
    if(validation.indexOf(false) > -1) {
      e.preventDefault();
    }
  }

})();