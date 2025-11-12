/**
 * Demo TypeScript file to showcase the Adaptify theme
 * This file demonstrates syntax highlighting for various TypeScript features
 */

import { readFile } from 'fs/promises';
import path from 'path';

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  metadata?: Record<string, unknown>;
}

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error?: string;
};

// Enum example
enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}

// Class example
class UserManager {
  private users: Map<number, User>;
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.Info) {
    this.users = new Map();
    this.logLevel = logLevel;
  }

  /**
   * Add a new user to the system
   * @param user - The user object to add
   * @returns The added user with generated ID
   */
  async addUser(user: Omit<User, 'id'>): Promise<User> {
    const id = this.users.size + 1;
    const newUser: User = { id, ...user };
    
    this.users.set(id, newUser);
    this.log(LogLevel.Info, `User ${newUser.name} added with ID ${id}`);
    
    return newUser;
  }

  /**
   * Get user by ID
   */
  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  /**
   * Update user information
   */
  updateUser(id: number, updates: Partial<Omit<User, 'id'>>): boolean {
    const user = this.users.get(id);
    if (!user) {
      this.log(LogLevel.Warning, `User with ID ${id} not found`);
      return false;
    }

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    this.log(LogLevel.Info, `User ${id} updated`);
    
    return true;
  }

  /**
   * Delete a user
   */
  deleteUser(id: number): boolean {
    const deleted = this.users.delete(id);
    if (deleted) {
      this.log(LogLevel.Info, `User ${id} deleted`);
    } else {
      this.log(LogLevel.Warning, `User ${id} not found`);
    }
    return deleted;
  }

  /**
   * Log message based on log level
   */
  private log(level: LogLevel, message: string): void {
    if (level >= this.logLevel) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      console.log(`[${timestamp}] ${levelName}: ${message}`);
    }
  }

  /**
   * Get all users as an array
   */
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}

// Async function with error handling
async function fetchUserData(userId: number): Promise<ApiResponse<User>> {
  try {
    const manager = new UserManager(LogLevel.Debug);
    const user = manager.getUser(userId);

    if (!user) {
      return {
        success: false,
        data: null,
        error: `User with ID ${userId} not found`,
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching user data:', errorMessage);
    
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
}

// Generic function
function filterByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
  value: T[K]
): T[] {
  return items.filter(item => item[property] === value);
}

// Arrow functions and array methods
const processUsers = (users: User[]): string[] => {
  return users
    .filter(user => user.role === 'admin')
    .map(user => user.name.toUpperCase())
    .sort();
};

// Destructuring and spread operator
const mergeMetadata = (
  user: User,
  newMetadata: Record<string, unknown>
): User => {
  return {
    ...user,
    metadata: {
      ...user.metadata,
      ...newMetadata,
    },
  };
};

// Constants with various types
const APP_VERSION = '1.0.0';
const MAX_RETRIES = 3;
const API_ENDPOINTS = {
  users: '/api/users',
  auth: '/api/auth',
  settings: '/api/settings',
} as const;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Main execution
async function main() {
  const manager = new UserManager(LogLevel.Debug);

  // Add some users
  const alice = await manager.addUser({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    metadata: { department: 'Engineering' },
  });

  const bob = await manager.addUser({
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'user',
  });

  // Update user
  manager.updateUser(alice.id, { email: 'alice.johnson@example.com' });

  // Filter users
  const admins = filterByProperty(manager.getAllUsers(), 'role', 'admin');
  console.log('Admin users:', processUsers(admins));

  // Fetch user data
  const response = await fetchUserData(alice.id);
  if (response.success && response.data) {
    console.log(`Found user: ${response.data.name}`);
  } else {
    console.error(`Error: ${response.error}`);
  }

  // TODO: Add user authentication
  // FIXME: Handle edge case for concurrent updates
  // NOTE: Consider adding caching layer
}

// Execute if running as main module
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { UserManager, LogLevel, User, ApiResponse };
