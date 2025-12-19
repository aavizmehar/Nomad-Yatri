const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function http(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: 'include', // IMPORTANT for cookies/JWT
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
