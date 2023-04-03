const config: { [key: string]: { baseUrl: string } } = {
  development: {
    baseUrl: "/api",
  },
  beta: {
    baseUrl: "//backend-api-02.newbee.ltd/manage-api/v1",
  },
  release: {
    baseUrl: "//backend-api-02.newbee.ltd/manage-api/v1",
  },
};

export default config;
