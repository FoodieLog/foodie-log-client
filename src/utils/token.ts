export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration") as string;
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const kakaoRefreshtoken = localStorage.getItem("kakaoRefresh");

  const tokenDuration = getTokenDuration();

  if (tokenDuration === 0 || tokenDuration < 0) {
    return "EXPIRED";
  }

  return kakaoRefreshtoken;
}

export function tokenLoader() {
  return getAuthToken();
}
