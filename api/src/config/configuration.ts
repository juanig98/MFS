
import { database } from './database';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database,
});

export const isTestOrDevEnvironment = ['test', 'dev'].includes(process.env.ENVIRONMENT)