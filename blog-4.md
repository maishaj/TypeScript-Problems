# Four Pillars of OOP in TypeScript

---

## 1. Encapsulation — Hide Internal Complexity

Encapsulation bundles data and the methods that operate on it into a single unit, exposing only what is necessary.

```typescript
class BankAccount {
    private balance: number = 0; // ❌ Not accessible outside

    deposit(amount: number): void {
        if (amount <= 0) throw new Error("Invalid amount");
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) throw new Error("Insufficient funds");
        this.balance -= amount;
    }

    getBalance(): number {
        return this.balance; // ✅ Controlled read access
    }
}

const account = new BankAccount();
account.balance = 9999;    // ❌ Compile error — private
account.deposit(100);      // ✅ Only through controlled methods
```

**Why it reduces complexity**: Internal logic is hidden. The rest of your codebase only interacts through a clean, controlled interface — changes inside the class don't ripple outward.

---

## 2. Inheritance — Reuse and Extend Logic

Inheritance lets a child class reuse and extend the logic of a parent class, avoiding duplication.

```typescript
class Animal {
    constructor(protected name: string) {}

    move(): void {
        console.log(`${this.name} is moving`);
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

class Bird extends Animal {
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}

const dog  = new Dog("Rex");
dog.move(); // ✅ Inherited from Animal
dog.bark(); // ✅ Dog-specific
```

**Why it reduces complexity**: Shared logic lives in one place. Child classes only define what makes them different — no copy-pasting, no diverging duplicates.

---

## 3. Abstraction — Define Contracts, Hide Implementation

Abstraction defines *what* something should do without specifying *how*. In TypeScript, this is done with `abstract` classes or `interfaces`.

```typescript
abstract class Notification {
    abstract send(message: string): void; // Contract — must be implemented

    // Shared logic all notifications use
    log(message: string): void {
        console.log(`[LOG] Sending: ${message}`);
    }
}

class EmailNotification extends Notification {
    send(message: string): void {
        this.log(message);
        console.log(`Email sent: ${message}`);
    }
}

class SMSNotification extends Notification {
    send(message: string): void {
        this.log(message);
        console.log(`SMS sent: ${message}`);
    }
}
```

**Why it reduces complexity**: Consumers only interact with the abstract contract — they don't need to know whether it's email, SMS, or push. Swap implementations freely without touching the rest of your code.

---

## 4. Polymorphism — One Interface, Many Behaviors

Polymorphism allows different classes to be treated as the same type, each responding to the same method call in their own way.

```typescript
const notifications: Notification[] = [
    new EmailNotification(),
    new SMSNotification(),
];

// Same call — different behavior per class
notifications.forEach(n => n.send("Your order is confirmed!"));
// Email sent: Your order is confirmed!
// SMS sent: Your order is confirmed!
```

Real-world use — a payment system:

```typescript
abstract class PaymentProcessor {
    abstract process(amount: number): void;
}

class StripeProcessor extends PaymentProcessor {
    process(amount: number) { console.log(`Stripe: charged $${amount}`); }
}

class PayPalProcessor extends PaymentProcessor {
    process(amount: number) { console.log(`PayPal: charged $${amount}`); }
}

function checkout(processor: PaymentProcessor, amount: number) {
    processor.process(amount); // Works for ANY PaymentProcessor
}

checkout(new StripeProcessor(), 99);  // ✅
checkout(new PayPalProcessor(), 49);  // ✅
```

**Why it reduces complexity**: You write one function that handles all variations. Adding a new payment method means creating a new class — not modifying existing code.

---

## How They Work Together in Large Projects

```typescript
// Abstraction — defines the contract
abstract class DataExporter {
    abstract format(data: unknown): string;  // Must implement

    // Encapsulation — shared internal logic hidden from outside
    private timestamp(): string {
        return new Date().toISOString();
    }

    export(data: unknown): void {
        const formatted = this.format(data); // Polymorphism
        console.log(`[${this.timestamp()}] ${formatted}`);
    }
}

// Inheritance — reuses DataExporter logic
class JSONExporter extends DataExporter {
    format(data: unknown): string {
        return JSON.stringify(data);
    }
}

class CSVExporter extends DataExporter {
    format(data: unknown): string {
        return Object.values(data as object).join(",");
    }
}

// Polymorphism — same interface, different behavior
const exporters: DataExporter[] = [new JSONExporter(), new CSVExporter()];
exporters.forEach(e => e.export({ id: 1, name: "Alice" }));
```
