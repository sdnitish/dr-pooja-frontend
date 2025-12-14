const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export async function serverFetch(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store", // or "force-cache" if needed
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }

  return res.json();
}
