# Backend Code Standards

## Architecture Patterns

### Service Layer Architecture

The codebase follows a clear service-layer architecture with the following components:

1. **Controller Files (`*.controller.ts`)**

   - HTTP endpoint definitions using `encore.dev/api`
   - Route parameter validation through TypeScript interfaces
   - Request body validation using TypeScript types
   - Clean separation from business logic via service layer
   - Clear HTTP method usage (GET, POST, PUT, DELETE)
   - Proper status code responses using APIError
   - Error handling delegation to global handler
   - Authentication using `getAuthData()`
   - Clear endpoint documentation
   - Consistent path naming conventions

2. **Service Files (`*.service.ts`)**

   - Business logic implementation
   - Single responsibility principle
   - Singleton pattern using class implementation with exported const instances
   - Async/await pattern for all operations
   - Clear method signatures with TypeScript interfaces
   - Service-to-service communication using `~encore/clients`
   - Proper error handling and logging
   - Business rule validation
   - Permission checks

3. **Interface Files (`*.interfaces.ts`)**

   - Clear type definitions for request/response objects
   - Separation of interface and implementation
   - Shared types between services
   - Consistent naming conventions
   - Proper use of TypeScript utility types
   - Clear documentation of complex types

4. **Repository Pattern (`*.repository.ts`)**

   - Data access layer abstraction using Drizzle ORM
   - Centralized data operations
   - Clear separation from business logic
   - Type-safe query building
   - Proper error handling with APIError
   - Consistent logging patterns
   - Transaction management
   - Soft delete implementation
   - Efficient query optimization

5. **Encore Services (`encore.service.ts`)**
   - Service configuration and middleware setup
   - Global error handling through middleware
   - Clear service documentation
   - Consistent middleware patterns across services
   - Type-safe request/response handling

### Database Layer (`*.db.ts`, `*.schema.ts`, and `*.relations.ts`)

- Clear table definitions using Drizzle ORM
- Type-safe query builders
- Transaction management
- Connection pooling configuration
- Migration handling through Drizzle Kit
- Index definitions
- Proper error handling
- Query optimization patterns
- Data validation before persistence
- Soft delete implementations where applicable
- Schema versioning
- Relationship definitions using Drizzle relations
- Foreign key constraints
- Timestamp handling with created_at/updated_at/deleted_at
- UUID primary keys with auto-generation
- Proper column type definitions
- Separate relation definitions in `*.relations.ts`
- Clear table naming conventions
- Proper null constraints

### Message Topics (`*.topic.ts`)

- Clear topic naming conventions
- Type-safe message definitions using TypeScript
- Publisher implementation using `encore.dev/pubsub`
- Subscriber implementation with proper error handling
- Message validation through TypeScript types
- Error handling for publish/subscribe operations
- Dead letter queue handling
- Message retry policies
- Message ordering guarantees
- Proper logging using `encore.dev/log`
- Schema versioning
- Message size limitations
- Topic access control
- Message acknowledgment patterns

### Storage Management (`*.bucket.ts`)

- Clear bucket configuration using `encore.dev/storage/objects`
- Proper file naming and organization
- Content type handling
- Access control and permissions
- Error handling for upload/download operations
- Cleanup procedures
- URL generation for public access
- File size and type validation
- Proper mime type handling
- Stream processing for large files

### Testing Standards (`*.test.ts`)

- Test file organization mirrors source files
- Clear test suite and case descriptions using Vitest
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

### Scheduled Tasks (`*.cron.ts`)

- Clearly defined execution intervals using cron syntax
- Proper error handling and logging
- Task isolation and single responsibility
- Retry mechanisms for failed tasks
- Proper cleanup after execution
- Monitoring and alerting setup
- Transaction handling for data consistency
- Resource cleanup on completion
- Clear task documentation
- Consistent logging patterns
- Error details in failure cases
- Task status reporting
- Proper service integration
- Idempotent operations

## Coding Standards

### TypeScript Usage

- Strict typing with TypeScript interfaces
- Explicit return types on functions
- Use of modern TypeScript features (ES2022)
- Proper type imports and exports
- Path aliases for clean imports
- Proper use of generics
- Strict null checks
- Consistent type declarations

### Error Handling

- Global error handler middleware
- Consistent error response format using APIError
- Proper error logging using `encore.dev/log`
- Try-catch blocks for async operations
- Type-safe error details
- Clear error messages
- Proper error propagation
- Error categorization

### Naming Conventions

- PascalCase for interfaces and types
- camelCase for variables and functions
- Descriptive and clear naming
- Consistent file naming: `feature.type.ts`
- Clear service naming
- Meaningful error messages
- Consistent endpoint paths

### Function Structure

- Single responsibility principle
- Clear input parameters and return types
- Async/await for asynchronous operations
- Proper error propagation
- Input validation
- Clear documentation
- Consistent return types
- Proper logging

### Logging

- Consistent use of `encore.dev/log`
- Contextual logging with relevant metadata
- Different log levels (info, error, debug)
- Meaningful log messages
- Structured logging
- Performance logging
- Error logging
- Audit logging

### File Organization

- Related functionality grouped in feature modules
- Clear separation of concerns
- Consistent file structure within modules:
  - `encore.service.ts` - Service configuration
  - `*.controller.ts` - API endpoints
  - `*.service.ts` - Business logic
  - `*.repository.ts` - Data access
  - `*.interfaces.ts` - Type definitions
  - `*.schema.ts` - Database schema
  - `*.relations.ts` - Database relationships
  - `*.cron.ts` - Scheduled tasks
  - `*.db.ts` - Database configuration
  - `migrations/` - Database migrations
- Shared code in dedicated directories
- Clear module boundaries
- Proper import organization
- Resource organization

### API Response Standards

- Consistent response structures
- Clear success/error messages
- Typed response interfaces
- HTTP status code adherence
- Proper error details
- Consistent field naming
- Proper pagination
- Resource identifiers

### Middleware Usage

- Global error handling middleware
- Consistent middleware application
- Clear middleware documentation
- Proper request/response typing
- Authentication middleware
- Logging middleware
- Error handling middleware
- Request validation

## Best Practices

1. **Dependency Injection**

   - Use of singleton instances
   - Clear dependency management
   - Modular service structure
   - Proper initialization
   - Configuration management

2. **Code Documentation**

   - Clear service documentation
   - Interface documentation
   - Important function documentation
   - Complex logic explanation
   - API documentation
   - Error handling documentation
   - Configuration documentation

3. **Testing**

   - Vitest configuration present
   - Test file organization
   - Separation of test concerns
   - Integration testing
   - Unit testing
   - Performance testing
   - Error testing

4. **Security**

   - Proper session management
   - Secure authentication patterns
   - Input validation
   - Safe file handling
   - API key management
   - CORS configuration
   - Rate limiting
   - Data validation

5. **Performance**
   - Efficient database queries
   - Proper resource cleanup
   - Optimized file operations
   - Connection pooling
   - Caching strategies
   - Batch operations
   - Query optimization
   - Resource management

## Version Control

- Meaningful `.gitignore` configuration
- Generated files in appropriate directories
- Clear module boundaries
- Environment-specific configurations
- Dependency management
- Build artifacts
- Test configurations

## Development Setup

- Node.js environment (v20+)
- TypeScript configuration
- Development dependencies
- Build and test scripts
- Environment configuration
- Package management
- Development tools
- Testing framework

### Database Best Practices

- Use of UUIDs for primary keys
- Consistent timestamp fields (created_at, updated_at, deleted_at)
- Soft delete pattern implementation
- Foreign key constraints for referential integrity
- Proper index definitions
- Clear naming conventions for constraints
- Relationship definitions in separate files
- Proper null/not-null constraints
- Use of appropriate column types
- Proper timestamp handling with timezone consideration
- Efficient query patterns
- Connection pooling configuration
