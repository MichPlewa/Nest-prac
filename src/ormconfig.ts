export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql123',
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
  migrationsRun: false,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};
