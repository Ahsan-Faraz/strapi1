import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  // Log for debugging
  console.log('Database client:', client);
  console.log('DATABASE_URL exists:', !!env('DATABASE_URL'));

  // For Supabase/PostgreSQL in production
  if (env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
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
