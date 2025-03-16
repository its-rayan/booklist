export interface ServerConfig {
  port: number;
  db: {
    uri: string | undefined;
  };
}

const config: ServerConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
  db: {
    uri: process.env.MONGO_URI
  }
};

export default config;
