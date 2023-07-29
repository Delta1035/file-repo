import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  create_time: Date;
  @Column()
  update_time: Date;
  @Column()
  author_id: number;
  @Column()
  read_number: number;
  @Column()
  like_number: number;
  @Column()
  summary: string;
  @Column()
  poster: string;
  @Column()
  deleted: 0 | 1;
  @Column()
  published: 0 | 1;
}
