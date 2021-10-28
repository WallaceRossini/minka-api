import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Tag } from "./Tag";

@Entity('invoices')
export class Invoice extends BaseEntity {

  @Column()
  description: string;

  @Column({ type: "timestamp with time zone", name: 'due_date' })
  due_date: Date;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  value: number;

  @Column({ type: 'boolean', default: false })
  paid: boolean

  @JoinColumn({name: 'tag_id'})
  @ManyToOne(() => Tag)
  tag: Tag;
}