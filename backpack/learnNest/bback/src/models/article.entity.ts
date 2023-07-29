import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Article {
  // @PrimaryColumn 主键
  @PrimaryGeneratedColumn() // 自动生成的主键
  id: number;

  @Column()
  article_name: string;

  @Column()
  article_text: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: string;

  @Column('int')
  author_id: number;

  @Column('int')
  read_num: number;

  @Column('int')
  like_num: number;

  @Column()
  summary: string;

  @Column()
  poster: string; //海报 也就是说封面

  @Column('int')
  private: number;

  @Column('int')
  deleted: number;
}
