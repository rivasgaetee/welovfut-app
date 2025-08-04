# Services

This directory contains service classes that handle data operations and business logic.

## BaseService

The `BaseService` is an abstract generic class that provides CRUD operations for Firestore documents. It uses the modular Firebase/Firestore SDK and works with strong typing.

### Usage

To use the `BaseService`, create a new class that extends it and specifies the data type:

```typescript
import { BaseService } from './BaseService';
import { YourDataType } from '@/types/YourDataType';

export class YourService extends BaseService<YourDataType> {
  constructor() {
    // Pass the collection name to the BaseService constructor
    super('yourCollectionName');
  }

  // Add custom methods as needed
  async customMethod(): Promise<void> {
    // Implementation
  }
}

// Export a singleton instance of the service
export const yourService = new YourService();
```

### Available Methods

The `BaseService` provides the following methods:

- `getAll()`: Get all documents from the collection
- `getById(id: string)`: Get a document by ID
- `create(id: string, data: T)`: Create a new document with the specified ID
- `update(id: string, data: Partial<T>)`: Update an existing document
- `delete(id: string)`: Delete a document

### Example

See `UserService.ts` for an example of how to extend the `BaseService` for a specific data type.

## UserService

The `UserService` extends `BaseService<UserProfile>` and handles user profile documents in the 'users' collection.

### Available Methods

In addition to the methods inherited from `BaseService`, `UserService` provides:

- `createFromAuth(user: User, extraData: Partial<UserProfile>)`: Creates a user profile in Firestore after authentication with any method (email, Google, Facebook, phone). It handles timestamps (`dateJoined`, `lastLogin`) and sets default values like `isActive: true`.
- `updateProfile(uid: string, updates: Partial<UserProfile>)`: Updates a user profile and automatically updates the `lastLogin` timestamp if not provided.
- `findByEmail(email: string)`: Finds a user by their email address.

### Usage Example

```typescript
import { userService } from '@/services/UserService';
import { firebaseAuthService } from '@/services/firebaseAuthService';

// After user authentication
const user = await firebaseAuthService.login(email, password);
await userService.createFromAuth(user, {
  firstName: 'John',
  lastName: 'Doe'
});

// Update user profile
await userService.updateProfile(user.uid, {
  phoneNumber: '+1234567890'
});
```

## Authentication Service

The authentication service follows the interface-implementation pattern:

- `IAuthService.ts`: Interface defining the contract for authentication services
- `firebaseAuthService.ts`: Firebase implementation of the authentication service

This pattern allows for dependency injection and easier testing by mocking the service.
