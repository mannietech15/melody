export interface User {
  id: string;
  name: string;
  email: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  private constructor() {
    const storedUser = localStorage.getItem('melody_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  public async login(email: string, password: string):Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email
      };
      this.currentUser = user;
      localStorage.setItem('melody_user', JSON.stringify(user));
      this.notify();
      return user;
    }
    throw new Error('Invalid credentials');
  }

  public async register(email: string, password: string, name: string):Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email && password && name) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email
      };
      this.currentUser = user;
      localStorage.setItem('melody_user', JSON.stringify(user));
      this.notify();
      return user;
    }
    throw new Error('Registration failed');
  }

  public async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.currentUser = null;
    localStorage.removeItem('melody_user');
    this.notify();
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export default AuthService.getInstance();
