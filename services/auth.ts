import { ApplicationData, User } from '../types';

const STORAGE_KEY = 'umrah_app_users';

export const authService = {
    signUp: (data: ApplicationData): { user: User, password: string } => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        // Generate a random password
        const password = Math.random().toString(36).slice(-8);
        const id = Date.now().toString();

        const newUser: User = {
            ...data,
            id,
            password,
            status: 'step1_complete'
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        return { user: newUser, password };
    },

    login: (email: string, password: string): User | null => {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
    },

    updateUser: (email: string, updates: Partial<ApplicationData> & { status?: User['status'] }) => {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = users.findIndex(u => u.email === email);

        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            return users[index];
        }
        return null;
    },

    getUser: (email: string): User | null => {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return users.find(u => u.email === email) || null;
    },

    getPendingUsers: (): User[] => {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return users.filter(u => u.status === 'pending_approval');
    },

    activateUser: (email: string): User | null => {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = users.findIndex(u => u.email === email);

        if (index !== -1) {
            users[index].status = 'active';
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            return users[index];
        }
        return null;
    }
};
