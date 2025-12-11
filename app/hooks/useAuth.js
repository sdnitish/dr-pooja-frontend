import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useAuth() {
  const { data, error, mutate } = useSWR("/api/auth/me", fetcher);

  return {
    user: data?.user || null,
    loading: !error && !data,
    error,
    mutate,
  };
}
