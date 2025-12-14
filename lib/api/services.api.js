import { serverFetch } from "../fetcher";

export const getServices = () =>
  serverFetch("/front/service");

export const getServiceBySlug = (slug) =>
  serverFetch(`/service/${slug}`);
