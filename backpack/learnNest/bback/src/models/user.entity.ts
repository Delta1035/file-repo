import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  user_name: string;

  @Column({ length: 20 })
  nick_name: string;

  @Column('text')
  password: string;

  @Column()
  email: string;

  @Column('int')
  phone: number;

  @Column()
  address: string;

  @Column()
  role_id: string;

  @Column()
  avatar: string;

  @Column()
  last_login_time: Date;

  @Column()
  token: string;
}
