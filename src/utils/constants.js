const HASURA_GRAPHQL_ENGINE_HOSTNAME = "dyn-hasura.herokuapp.com";

const scheme = proto => {
  return window.location.protocol === "https:" ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme("http")}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
export const REALTIME_GRAPHQL_URL = `${scheme("ws")}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
