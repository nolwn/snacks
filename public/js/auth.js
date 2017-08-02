
const submit = $('button[type=submit]')

submit.click((e) => {
  e.preventDefault()

  const first_name = $('#first_name').val().trim();
  const last_name = $('#last_name').val().trim();
  const email = $('#email').val().trim();
  const password = $('#password').val();

  const newUser = {
    first_name,
    last_name,
    email,
    password
  }

  console.log(newUser);

  $.ajax({
    type: "POST",
    url: '/users',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newUser)
  })
  .then((res) => {
    console.log('In then', res);
     window.location.href = '/favorites.html';

  })
  .catch((err) => {
    Materialize.toast('Registration successful!', 3000);
    console.log(err);
  })

})
