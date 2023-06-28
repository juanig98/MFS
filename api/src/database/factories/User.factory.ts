import { User } from "src/models/entities/User.entity";

export const userFactory: Partial<User>[] = [
    { username: 'Admin', email: 'admin@admin', password: 'admin1234' },
    { username: 'User1', email: 'user1@email', password: 'user1234' },
]