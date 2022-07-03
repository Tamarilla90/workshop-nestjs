import {Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn() id: ObjectID;
    @Column() name: string;
    @Column() lastName: string;
    @Column() phone: string;
    @Column() email: string;
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }
}
