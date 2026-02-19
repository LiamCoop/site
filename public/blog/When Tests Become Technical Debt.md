---
in: "[[Personal Blog]]"
---

## Why Bad Tests Hurt More Than They Help

Code coverage is a lie when your tests memorize implementation instead of validating behaviour. I've watched our test suite become a burden rather than a safety net. Tests that break with every refactor, demanding constant maintenance while providing no real confidence. The worst part? Our coverage numbers still looked impressive. 80%, 90%, sometimes higher.

I had to explain this recently to a mid-level engineer who was diligently writing tests to boost our coverage metrics. The tests they wrote checked every line, hit every branch, but validated almost nothing of value. When I asked what requirement each test verified, they couldn't answer. They were a victim of [[Goodhart's Law]]: when code coverage becomes the target, it ceases to be a good measure of test quality. 

## What Good Testing Actually Means

So what should we be doing instead? Good testing philosophy starts with a simple principle: **"Tests should sample the behaviour of the code in a way that demonstrates it satisfies the requirements."** This means we must know the requirements, the requirements must be written somewhere (ideally in code), and we must have a way to verify our code against those requirements.

But what does "sample the behaviour" really mean? Most of us default to thinking about test coverage in terms of lines or branches covered. These are mechanical measures of what code was executed. There's a better way to think about this.

## The Behavioural Graph: A Better Mental Model

Imagine your system as a graph of behaviours. Each node represents a behaviour the system should have. This could be a requirement, an invariant, or a business rule. Each edge is a relationship or pathway between those behaviours, representing how the system transitions from one state to another.

Consider a login system. The **requirement-level nodes** might be:
- "User with valid credentials can log in"
- "User with invalid credentials receives an error"
- "User account locks after 5 failed attempts"
- "Locked account displays appropriate message"

Each of these represents a business requirement. These are things stakeholders care about. Tests that sample these nodes verify that the system does what it's supposed to do.

But implementation-level nodes are different:
- "The `validatePassword()` method compares hashed strings"
- "The `loginAttempts` counter increments on failure"
- "The session token is a JWT with specific claims"

These are details of _how_ we've chosen to implement the requirements. They're not requirements themselves. There are many valid ways to implement each requirement.

In this model, each test isn't a checkmark. It's a sample from this behavioural graph. A test asserts that "this node behaves like this" or "traveling along this edge produces the correct outcome." The goal is to sample enough of the requirement-level nodes to be confident that the system behaves correctly according to the business requirements.

But problems appear when our tests start clustering around implementation nodes instead of requirement nodes.

That is:
- **Good tests** sample requirements: business rules, invariants, domain behaviours.
- **Bad tests** sample the current shape of the code: private functions, internal data structures, or incidental logic.

## What Goes Wrong: A Concrete Example

Let's see this in practice. Here are two tests for that login system:

**Implementation-Focused Test (Bad):**
```javascript
test('validatePassword calls bcrypt.compare with correct arguments', () => {
  const user = { passwordHash: '$2b$10$...' };
  const password = 'mypassword';

  validatePassword(user, password);

  expect(bcrypt.compare).toHaveBeenCalledWith(password, user.passwordHash);
});
```

**Behavior-Focused Test (Good):**
```javascript
test('user can log in with valid credentials', async () => {
  await createUser({ email: 'user@example.com', password: 'mypassword' });

  const result = await login('user@example.com', 'mypassword');

  expect(result.success).toBe(true);
  expect(result.sessionToken).toBeDefined();
});
```

The first test breaks the moment we switch from bcrypt to argon2, even though the _behavior_ hasn't changed. Users can still log in with valid passwords. The test was sampling an implementation detail.

The second test survives the refactor because it's sampling the actual requirement: "users with valid credentials can log in." We could change hashing algorithms, session token formats, or database schemas. As long as valid credentials lead to successful login, this test passes.

When tests fixate too tightly on implementation rather than underlying behaviour, we're no longer validating the intended graph. We're rebuilding the graph of "what the code currently is." And that creates fragility: the moment the implementation changes (even if behaviour does not), the tests fail. 

## Another Way to See the Same Problem: Overfitting

Here's another lens on this problem. Machine learning models are supposed to learn an underlying function from training data. But an overfit model memorizes the training data instead of learning the pattern. It performs perfectly on the training set but fails to generalize to new data.

Over-tested implementation details behave exactly like an overfit ML model. The test suite memorizes the exact shape of the current code instead of validating the intended behaviour. It performs perfectly on "training data" (the current codebase) but fails to generalize. Future refactors that should pass (because they preserve the behaviour) cause test failures instead.

Just as an overfit model can only validate training data it's already seen, an overfit test suite can only validate the exact implementation it was written against. Both fail at their core purpose: the model fails to predict new cases, and the test suite fails to provide confidence during refactoring.

## The Practical Implications

This isn't just a theoretical concern. It has real consequences for teams:

**There is a whole family of correct implementations** that could satisfy any given business requirement. Your current implementation is just one member of that family. Good tests should accept any member of the family that satisfies the requirements.

**Overfit tests collapse that family down to one.** They lock you into the current implementation. They can't tell the difference between "preserves the behavior" and "preserves the exact current code structure." This makes refactoring nearly impossible.

**How to recognize overfit tests:**
- The test name describes _how_ something works, not _what_ it does
- The test breaks when you rename a private method or reorganize internal structure
- The test mocks or stubs things at the wrong level (internal implementation rather than external dependencies)
- You can't explain what requirement the test validates without referencing code structure

**What to do about it:**
- In code review, ask: "What requirement does this test validate?"
- When inheriting an overfit suite, start by writing behavior-focused tests for new features. Don't continue the pattern
- When refactoring, use test failures as signals: if behavior didn't change but tests failed, those tests were overfit
- Think in terms of the behavioral graph: am I testing a requirement node or an implementation node?

## Takeaway

> **Tests should capture the essential shape of the intended behaviour, not the accidental shape of the current implementation.**

When your test suite memorizes implementation instead of validating behavior:
- Refactoring becomes impossible
- Tests become brittle and high-maintenance
- Coverage numbers look impressive but mean nothing
- Your suite no longer provides confidence. It enforces stagnation

---

The next time you write a test, pause and ask yourself: **Am I sampling a requirement, or am I just memorizing the current code?** If you can't articulate the business requirement being validated without referencing code structure, you're probably writing the wrong test.

Good tests are an investment in your ability to change the code with confidence. Bad tests are technical debt disguised as safety. Choose wisely.