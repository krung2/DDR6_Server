import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export default class User {

  @PrimaryColumn({
    name: 'unique_id',
  })
  uniqueId!: string;

  @Column()
  generation!: string;

  @Column()
  name!: string;

  @Column({
    name: 'user_name',
  })
  userName!: string;

  @Column({
    name: 'profile_image',
    type: 'text'
  })
  profileImage!: string;

  @Column()
  level!: number;

  @Column({
    type: 'text'
  })
  rank!: string;

  @Column({
    type: 'text'
  })
  rankImage!: string;

  @Column({
    type: 'double'
  })
  wl!: number;

  @Column()
  wins!: number;

  @Column()
  losses!: number;

  @Column({
    type: 'double'
  })
  kd!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string;
}