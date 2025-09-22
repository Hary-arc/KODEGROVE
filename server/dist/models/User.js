import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class User {
    id;
    name;
    email;
    password;
    role;
    createdAt;
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role || 'user';
        this.createdAt = data.createdAt || new Date().toISOString();
    }
    validate() {
        const errors = [];
        if (!this.name) {
            errors.push('Name is required');
        }
        if (!this.email) {
            errors.push('Email is required');
        }
        else if (!this.validateEmail(this.email)) {
            errors.push('Please add a valid email');
        }
        if (!this.password) {
            errors.push('Password is required');
        }
        else if (this.password.length < 6) {
            errors.push('Password must be at least 6 characters');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    validateEmail(email) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    }
    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
    getSignedJwtToken() {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is required');
        }
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: (process.env.JWT_EXPIRE || '30d')
        });
    }
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    toJSON() {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}
