import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

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
          // Increase statement timeout — large Service documents need time
          statement_timeout: 180000,
        },
        pool: { 
          min: 2, 
          max: 15,
          acquireTimeoutMillis: 120000,
          idleTimeoutMillis: 30000,
          afterCreate: (conn: any, done: any) => {
            // Batch all session-level optimizations in a single roundtrip
            conn.query(
              `SET statement_timeout = 180000;
               SET synchronous_commit = off;
               SET work_mem = '16MB';
               SET random_page_cost = 1.1;`,
              (err: any) => {
                done(err, conn);
              }
            );
          },
        },
        acquireConnectionTimeout: 120000,
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
