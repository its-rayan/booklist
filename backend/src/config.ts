export interface ServerConfig {
  port: number;
  db: {
    uri: string | undefined;
  };
  googleBooks: {
    apiKey?: string;
    apiUrl: string;
  };
}

const config: ServerConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
  db: {
    uri: process.env.MONGO_URI
  },
  googleBooks: {
    apiKey: process.env.GOOGLE_BOOKS_API_KEY || undefined,
    apiUrl: 'https://www.googleapis.com/books/v1/volumes'
  }
};

export default config;
