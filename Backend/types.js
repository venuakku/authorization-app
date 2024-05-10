import zod from 'zod';

export const createUser = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string()
});

export const checkUser = zod.object({
    id: zod.string(),
});