const PROTOCOL = "https";
const HOST = "api.rebelepoch.com";
// const SUFFIX = "/api/v1/admin";

const getBaseURL = () => {
  return `${PROTOCOL}://${HOST}`;
};

export { getBaseURL };
