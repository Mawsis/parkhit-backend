export const userTransform = (user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
});