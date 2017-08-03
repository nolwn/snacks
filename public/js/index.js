
const snacksRoot = $('#snacks')

$.getJSON('/snacks')
  .then((snacks) => {
    snacks.map((s) => {
      snacksRoot.append(createSnack(s))
    })
  })
  .catch((err) => {
    Materialize.toast('Snacks ' + err.responseText, 3000);
  })


function createSnack(snack) {
  const card = $('<div>').addClass('card')
  const imgContainer = $('<div>').addClass('card-image')
  const img = $('<img>').attr('src', snack.img)
  const title = $('<span>').addClass('card-title').text(snack.name)
  const content = $('<div>').addClass('card-content')
  const desc = $('<p>').text(snack.description)

  imgContainer.append(img)
  imgContainer.append(title)
  card.append(imgContainer)
  content.append(desc)
  card.append(content)
  return card
}
