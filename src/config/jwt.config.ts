export default () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
    accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
});
