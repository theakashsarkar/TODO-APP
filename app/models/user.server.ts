import { PrismaClient } from "@prisma/client";

const db = new  PrismaClient();

export async function User() {
    return db.user.findMany(); 
}

export async function createTodo(todo) {
    return db.user.create({ data: todo });
}

export async function 