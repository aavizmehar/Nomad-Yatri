export const http = async (url: string, options: any = {}) => {
  const { body, headers = {}, ...rest } = options;

  const isFormData = body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...rest,
    body,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    credentials: 'include',
  });

  const contentType = res.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return res.json();
  }

  return res.text();
};
