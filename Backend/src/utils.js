const routes = {
   snacks: [ "name", "description", "price", "img" ],
    users: [ "first_name", "last_name", "email", "password" ],
  reviews: [ "title", "text", "rating", "snack_id", "user_id" ]
}

function verifyEntry(entry, route) {
  const requirements = routes[route];

  console.log(requirements)

  const errors = requirements.reduce((acc, property) => {
    if (!entry[property]) {
      acc.push(property);
    }

    return acc;
  }, [] );

  return errors;
}

module.exports = { verifyEntry };
