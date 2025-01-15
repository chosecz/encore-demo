# Backend Code Standards

## Project Structure

```
backend/
├── article/           # Feature module for articles
├── auth/             # Authentication related code
├── email/            # Email service module
├── google-chat/      # Google Chat integration module
├── shared/           # Shared utilities and components
└── user/             # User management module
```

## Architecture Patterns

### Service Layer Architecture

The codebase follows a clear service-layer architecture with the following components:

1. **Controller Files (`*.controller.ts`)**

   - HTTP endpoint definitions and request handling
   - Route parameter validation
   - Request body validation
   - Clean separation from business logic
   - Clear HTTP method usage (GET, POST, PUT, DELETE)
   - Proper status code responses
   - Error handling delegation to global handler
   - Authentication and authorization checks

2. **Service Files (`*.service.ts`)**

   - Business logic implementation
   - Single responsibility principle
   - Singleton pattern using exported const instances
   - Async/await pattern for all operations
   - Clear method signatures with TypeScript interfaces

3. **Interface Files (`*.interfaces.ts`)**

   - Clear type definitions for request/response objects
   - Separation of interface and implementation

4. **Repository Pattern (`*.repository.ts`)**

   - Data access layer abstraction
   - Centralized data operations
   - Clear separation from business logic

5. **Encore Services (`encore.service.ts`)**
   - Service configuration and middleware setup
   - Global error handling
   - Clear service documentation

### Scheduled Tasks (`*.cron.ts`)

- Clearly defined execution intervals
- Proper error handling and logging
- Task isolation and single responsibility
- Retry mechanisms for failed tasks
- Proper cleanup after execution
- Monitoring and alerting setup
- Transaction handling for data consistency
- Resource cleanup on completion

### Storage Management (`*.bucket.ts`)

- Clear bucket configuration and initialization
- Proper file naming and organization
- Content type handling
- Access control and permissions
- Error handling for upload/download operations
- Cleanup procedures
- URL generation for public access
- File size and type validation

### Database Layer (`*.db.ts`)

- Clear table/collection definitions
- Type-safe query builders
- Transaction management
- Connection pooling configuration
- Migration handling
- Index definitions
- Proper error handling
- Query optimization patterns
- Data validation before persistence
- Soft delete implementations where applicable

### Testing Standards (`*.test.ts`)

- Test file organization mirrors source files
- Clear test suite and case descriptions
- Proper test isolation
- Mock and stub usage patterns
- Test data factories and fixtures
- Coverage requirements
- Integration vs unit test separation
- Error case testing
- Async operation testing
- Clean setup and teardown
- Performance testing guidelines
- Snapshot testing where appropriate
- API contract testing
- Test naming conventions:
  - `describe` blocks for feature/component
  - `it` blocks for specific behaviors
  - Clear failure messages

### Message Topics (`*.topic.ts`)

- Clear topic naming conventions
- Type-safe message definitions
- Publisher implementation patterns
- Subscriber implementation patterns
- Message validation
- Error handling for publish/subscribe
- Dead letter queue handling
- Message retry policies
- Message ordering guarantees
- Proper logging and monitoring
- Schema versioning
- Message size limitations
- Topic access control
- Message acknowledgment patterns

## Coding Standards

### TypeScript Usage

- Strict typing with TypeScript interfaces
- Explicit return types on functions
- Use of modern TypeScript features
- Proper type imports and exports

### Error Handling

- Global error handler middleware
- Consistent error response format
- Proper error logging using `encore.dev/log`
- Try-catch blocks for async operations

### Naming Conventions

- PascalCase for interfaces and types
- camelCase for variables and functions
- Descriptive and clear naming
- Consistent file naming: `feature.type.ts`

### Function Structure

- Single responsibility principle
- Clear input parameters and return types
- Async/await for asynchronous operations
- Proper error propagation

### Logging

- Consistent use of `encore.dev/log`
- Contextual logging with relevant metadata
- Different log levels (info, error)
- Meaningful log messages

### File Organization

- Related functionality grouped in feature modules
- Clear separation of concerns
- Consistent file structure within modules
- Shared code in dedicated directories

### API Response Standards

- Consistent response structures
- Clear success/error messages
- Typed response interfaces
- HTTP status code adherence

### Middleware Usage

- Global error handling middleware
- Consistent middleware application
- Clear middleware documentation
- Proper request/response typing

## Best Practices

1. **Dependency Injection**

   - Use of singleton instances
   - Clear dependency management
   - Modular service structure

2. **Code Documentation**

   - Clear service documentation
   - Interface documentation
   - Important function documentation
   - Complex logic explanation

3. **Testing**

   - Vitest configuration present
   - Test file organization
   - Separation of test concerns

4. **Security**

   - Proper session management
   - Secure authentication patterns
   - Input validation
   - Safe file handling

5. **Performance**
   - Efficient database queries
   - Proper resource cleanup
   - Optimized file operations
   - Connection pooling

## Version Control

- Meaningful `.gitignore` configuration
- Generated files in appropriate directories
- Clear module boundaries
- Environment-specific configurations

## Development Setup

- Node.js environment
- TypeScript configuration
- Development dependencies
- Build and test scripts
