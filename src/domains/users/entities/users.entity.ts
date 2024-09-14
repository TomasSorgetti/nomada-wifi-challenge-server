import { Column, Entity } from 'typeorm';

@Entity('users')
export class User {
  @Column({ type: 'int', primary: true, generated: 'increment' })
  id: number;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
}
