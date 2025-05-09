import {type ContactMessage, type InsertContactMessage, type InsertUser, type User} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
    getUser(id: number): Promise<User | undefined>;

    getUserByUsername(username: string): Promise<User | undefined>;

    createUser(user: InsertUser): Promise<User>;

    createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

    getContactMessages(): Promise<ContactMessage[]>;

    getContactMessage(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
    userCurrentId: number;
    messageCurrentId: number;
    private users: Map<number, User>;
    private contactMessages: Map<number, ContactMessage>;

    constructor() {
        this.users = new Map();
        this.contactMessages = new Map();
        this.userCurrentId = 1;
        this.messageCurrentId = 1;
    }

    async getUser(id: number): Promise<User | undefined> {
        return this.users.get(id);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(
            (user) => user.username === username,
        );
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const id = this.userCurrentId++;
        const user: User = {...insertUser, id};
        this.users.set(id, user);
        return user;
    }

    async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
        const id = this.messageCurrentId++;
        const now = new Date();
        const message: ContactMessage = {
            ...insertMessage,
            id,
            createdAt: now,
            read: false
        };
        this.contactMessages.set(id, message);
        return message;
    }

    async getContactMessages(): Promise<ContactMessage[]> {
        return Array.from(this.contactMessages.values()).sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    async getContactMessage(id: number): Promise<ContactMessage | undefined> {
        return this.contactMessages.get(id);
    }
}

export const storage = new MemStorage();
