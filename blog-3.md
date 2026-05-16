# Generics — Reusable Yet Strictly Typed Code

---

## The Problem Without Generics

Without generics, you either repeat yourself for every type or lose type safety with `any`:

```typescript
// ❌ Repeated for every type
function getNumberArray(arr: number[]): number[] { return arr; }
function getStringArray(arr: string[]): string[] { return arr; }

// ❌ Works for all types but loses type safety
function getArray(arr: any[]): any[] { return arr; }

let result = getArray(["hello", "world"]);
result[0].toFixed(); // No compile error — crashes at runtime
```

---

## Generics to the Rescue

Generics let TypeScript **remember the type** you pass in and enforce it throughout:

```typescript
// ✅ One function — works for any type — stays strictly typed
function getArray<T>(arr: T[]): T[] {
    return arr;
}

let strings = getArray(["hello", "world"]);
strings[0].toFixed(); // ❌ Compile error — TypeScript knows it's string[]

let numbers = getArray([1, 2, 3]);
numbers[0].toFixed(); // ✅ Safe — TypeScript knows it's number[]
```

`T` is a **type placeholder** — it gets replaced with the actual type at the point of use.

---

## Generic Functions

```typescript
// Reusable API response wrapper
function wrapResponse<T>(data: T): { success: boolean; data: T } {
    return { success: true, data };
}

const userRes = wrapResponse({ id: 1, name: "Alice" });
// Type: { success: boolean; data: { id: number; name: string } } ✅

const numRes = wrapResponse(42);
// Type: { success: boolean; data: number } ✅
```

---

## Generic Interfaces

```typescript
// One interface — works for any data shape
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

type UserResponse  = ApiResponse<{ id: number; name: string }>;
type PostsResponse = ApiResponse<{ title: string; body: string }[]>;
```

---

## Generic Constraints

Use `extends` to restrict what types are allowed:

```typescript
// T must have an `id` field — no unconstrained any
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

findById([{ id: 1, name: "Alice" }], 1); // ✅
findById(["hello", "world"], 1);          // ❌ Compile error — string has no id
```

---

## Real-World Example: Generic Data Fetcher

```typescript
async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const data: unknown = await res.json();
    return data as T;
}

// Strictly typed at every call site
const user = await fetchData<User>("/api/user/1");
// user.name ✅  user.nonExistent ❌ — TypeScript enforces User shape

const posts = await fetchData<Post[]>("/api/posts");
// posts[0].title ✅ — TypeScript enforces Post[] shape
```