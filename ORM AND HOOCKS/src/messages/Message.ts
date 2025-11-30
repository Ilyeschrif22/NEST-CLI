import { IsString, isString } from 'class-validator';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
@Entity()
export class Message {
    @ObjectIdColumn()
    id: ObjectId;
    @IsString()
    @Column()
    content: string;
    @Column()
    status: string;
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    date: Date;
}