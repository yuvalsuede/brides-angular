interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '87mNtWenTcuPgcTkjV9ad4JjdKKbXNyJ',
  domain: 'brides.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
