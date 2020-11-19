/**
 * Authenticate the request via header token.
 */
export async function authKey(request: Request) {
  let isValid = false;
  try {
    const authString = request.headers.get('Authorization');
    const encoded = authString.match(/^Basic\s(.+)$/);
    if (encoded.length !== 2) {
      return isValid;
    }
    const [user, pass] = atob(encoded[1]).split(':');
    if (user === AUTH_BASIC_USER && pass === AUTH_BASIC_PASSWORD) {
      isValid = true;
    }
  } catch (err) {
    console.trace(err);
    console.error(err.message);
  }

  return isValid;
}
