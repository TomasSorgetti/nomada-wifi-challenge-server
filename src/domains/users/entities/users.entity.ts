import { Role } from 'src/domains/roles/entities/roles.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity('users')
export class User {
  @Column({ type: 'int', primary: true, generated: 'increment' })
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  roles: Role;
}
