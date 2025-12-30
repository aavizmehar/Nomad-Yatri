export const http = async (url: string, options: any = {}) => {
  const { body, headers = {}, ...rest } = options;

  const isFormData = body instanceof FormData;
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...rest,
    body,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: 'include',
  });

  const contentType = res.headers.get('content-type');

  if (!res.ok) {
    const errorData = contentType?.includes('application/json') 
      ? await res.json() 
      : { message: await res.text() };
    throw new Error(errorData.message || `Error: ${res.status}`);
  }

  if (contentType?.includes('application/json')) {
    return res.json();
  }

  return res.text();
};