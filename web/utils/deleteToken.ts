export default async function deleteToken(token: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/logout`, {
    method: "get",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
