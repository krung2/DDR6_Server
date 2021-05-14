import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export default class User {

  @PrimaryColumn({
    name: 'member_idx',
  })
  memberIdx!: string;

  @Column()
  generation!: string;

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
  level!: string;

  @Column({
    type: 'text'
  })
  rank!: string;

  @Column({
    type: 'text'
  })
  rankImage!: string;

  @Column({
    name: 'win_reate',
  })
  winRate!: string;

  @Column()
  wins!: number;

  @Column()
  losses!: number;

  @Column({
    type: 'double'
  })
  kd!: number;
}