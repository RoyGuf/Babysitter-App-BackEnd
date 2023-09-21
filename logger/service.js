function log(message, user = null) {
  let intro = "[APPLICATION LOG] ";
  // if(user) intro += `[User ${user.sub} Org ${user.orgId}]`;
  console.log(intro, message);
}

function info(message) {
  let intro = "[APPLICATION LOG] ";
  console.info(intro, message);
}

function error(message) {
  let intro = "[APPLICATION LOG] ";
  console.error(intro, message);
}

export default {
  log,
  info,
  error
}
