export function getApiMessage(error, fallback) {
  const status = error?.response?.status;
  const serverMsg = error?.response?.data?.message;
  const msg = serverMsg || error?.message;

  if (status === 401) return "Email or password is incorrect";
  if (status === 409) return msg || "Already exists";
  if (status === 400) return msg || fallback;

  return msg || fallback;
}
