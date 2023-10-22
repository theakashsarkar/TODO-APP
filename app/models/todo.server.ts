import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getTodo() {
    return db.todo.findMany();
}

export async function createdTodo(todo) {
    return db.todo.create({ data: todo });
}

export async function updated(id, complete) {
    return db.todo.update({
        where: {
            id: id,
        },
        data: {
            status: complete,
        }
    })
}