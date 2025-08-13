import bcrypt from 'bcryptjs'

export async function hashPassword(plainPassword: string) {
	return await bcrypt.hash(plainPassword, 10)
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
	return await bcrypt.compare(plainPassword, hashedPassword)
}