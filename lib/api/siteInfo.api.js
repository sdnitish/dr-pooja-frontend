import { serverFetch } from "../fetcher";

export const getSiteInfo = () =>
  serverFetch("/website/settings");
