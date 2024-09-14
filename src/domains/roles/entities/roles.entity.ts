import { User } from 'src/domains/users/entities/users.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @Column({ primary: true, generated: 'increment' })
  id: number;
  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}
