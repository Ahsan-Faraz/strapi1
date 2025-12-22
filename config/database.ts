import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  // Log for debugging
  console.log('Database client:', client);
  console.log('DATABASE_HOST:', env('DATABASE_HOST', 'not set'));

  // PostgreSQL (Supabase) configuration
  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'postgres'),
          user: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD'),
          ssl: {
            rejectUnauthorized: false,
          },
        },
        pool: { 
          min: 0, 
          max: 5,
          acquireTimeoutMillis: 60000,
          idleTimeoutMillis: 30000,
        },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  // SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};
