import { User, Article } from 'src/blog/entities';

const env = process.env;
export const blog_dev_config = {
  type: env.blog_dev_type,
  host: env.blog_dev_host,
  port: env.blog_dev_port,
  username: env.blog_dev_username,
  password: env.blog_dev_password,
  database: env.blog_dev_database,
  entities: [User, Article],
  synchronize: false,
};
