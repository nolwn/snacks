
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
  const col = $('<div>').addClass('col s12 m6 l4');
  const card = $('<div>').addClass('card')
  const content = $('<div>').addClass('card-content')
  const title = $('<span>').addClass('card-title').text(snack.name)
  const desc = $('<p>').text(snack.description)

  content.append(title)
  content.append(desc)
  card.append(content)
  col.append(card)
  return col
}
