export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];
  private baseUrl = 'http://localhost:8080/api';

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

  public async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Login failed');
      }

      const data = await response.json();
      
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      };

      this.currentUser = user;
      localStorage.setItem('melody_user', JSON.stringify(user));
      this.notify();
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async register(email: string, password: string, name: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Registration failed');
      }

      const data = await response.json();
      
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      };

      this.currentUser = user;
      localStorage.setItem('melody_user', JSON.stringify(user));
      this.notify();
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('melody_user');
    this.notify();
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    return this.currentUser?.token || null;
  }
}

export default AuthService.getInstance();
