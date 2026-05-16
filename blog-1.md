# `any` vs `unknown` and Type Narrowing in TypeScript

---

## Why `any` Is a "Type Safety Hole"

`any` completely disables TypeScript's type checking — you can call anything on it, assign it anywhere, and TypeScript won't complain. It compiles fine but crashes at runtime.

```typescript
let data: any = fetchFromAPI();
data.toUpperCase();       // ✅ No error — even if data is a number
data.nonExistent();       // ✅ No error — even if method doesn't exist
```

> Using `any` is like telling TypeScript: *"Trust me"* — with zero enforcement.

---

## Why `unknown` Is Safer

`unknown` accepts any value but **refuses to let you use it** until you verify the type first.

```typescript
let data: unknown = fetchFromAPI();
data.toUpperCase();       // ❌ Error: Object is of type 'unknown'
```

| Feature | `any` | `unknown` |
|---|---|---|
| Usable without checks | ✅ | ❌ |
| Catches mistakes at compile time | ❌ | ✅ |

---

## Type Narrowing

Type narrowing is how you **unlock** an `unknown` value — you run a runtime check and TypeScript automatically refines the type inside that branch.

```typescript
function process(value: unknown): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // ✅ Safe — TypeScript knows it's a string
    }
    if (value instanceof Error) {
        return value.message;       // ✅ Safe — TypeScript knows it's an Error
    }
    return "unknown type";
}
```

For complex objects, use a **custom type guard**:

```typescript
function isUser(value: unknown): value is User {
    return typeof value === "object" && value !== null && "id" in value && "name" in value;
}

const data: unknown = await fetch("/api/user").then(r => r.json());
if (isUser(data)) {
    console.log(data.name); // ✅ Safe
}
```