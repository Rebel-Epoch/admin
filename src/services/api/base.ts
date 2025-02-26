const PROTOCOL = "https";
const HOST = "rebel-epoch-backend.vercel.app";
// const SUFFIX = "/api/v1/admin";

const getBaseURL = () => {
  return `${PROTOCOL}://${HOST}`;
};

const MediaUrl = "https://findx-development.s3.ap-south-1.amazonaws.com/";

export { MediaUrl, getBaseURL };
