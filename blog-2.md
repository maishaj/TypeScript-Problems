# `Pick` and `Omit` Utility Types — Keeping Code DRY

---

## The Problem: Repeating Interfaces

Without utility types, you end up copy-pasting interfaces and maintaining them separately:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

// ❌ Duplicated manually — if User changes, these break
interface UserPreview {
    id: number;
    name: string;
}

interface UserPublic {
    id: number;
    name: string;
    email: string;
}
```

Change one field in `User` and you must hunt down every duplicate — this violates **DRY**.

---

## `Pick` — Take Only What You Need

`Pick<Type, Keys>` creates a new type using only the fields you specify:

```typescript
// ✅ Derived from User — stays in sync automatically
type UserPreview = Pick<User, "id" | "name">;
type UserPublic  = Pick<User, "id" | "name" | "email">;
```

Real-world use — showing a user card without exposing sensitive data:

```typescript
function renderUserCard(user: UserPreview) {
    return `${user.id} — ${user.name}`;
}
```

---

## `Omit` — Exclude What You Don't Want

`Omit<Type, Keys>` creates a new type with specific fields removed:

```typescript
// ✅ Everything except password and createdAt
type UserPublicProfile = Omit<User, "password" | "createdAt">;

// ✅ For create forms — no id yet (DB generates it)
type CreateUserInput = Omit<User, "id" | "createdAt">;
```

Real-world use — API payload without sensitive fields:

```typescript
function createUser(input: CreateUserInput) {
    // input has: name, email, password — but no id or createdAt
}
```

---

## How This Keeps Code DRY

```typescript
// One master interface — single source of truth
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

// All derived from it — zero duplication
type UserPreview     = Pick<User, "id" | "name">;
type UserPublic      = Omit<User, "password">;
type CreateUserInput = Omit<User, "id" | "createdAt">;
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;
```

Now if you add a field to `User`, all derived types **automatically inherit it** (or exclude it, if omitted). No manual updates, no missed duplicates.
