export default () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
    accessTokenExpiration: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
});
