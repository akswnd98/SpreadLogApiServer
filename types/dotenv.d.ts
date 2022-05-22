
declare namespace NodeJS {
  interface ProcessEnv {
    API_SERVER_PORT: number;

    DB_DIALECT: 'mysql' | 'mariadb';
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PW: string;

    IMAGE_PATH: string;
  }
}
