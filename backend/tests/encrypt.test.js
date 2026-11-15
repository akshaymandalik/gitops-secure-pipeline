import test from "node:test";
import assert from "node:assert";
import { encyptPass, verifyPass } from "../utils/encrypt.js";

test("hash is not the plain password", async () => {
  const hash = await encyptPass("MyPassword123");
  assert.notStrictEqual(hash, "MyPassword123");
});

test("correct password verifies as true", async () => {
  const hash = await encyptPass("MyPassword123");
  const result = await verifyPass(hash, "MyPassword123")
  assert.strictEqual(result, true);
});

test("wrong password verifies as false", async () => {
  const hash = await encyptPass("MyPassword123");
  const result = await verifyPass(hash,"WrongPassword999");
  assert.strictEqual(result, false);
});

test("same password hashes differently each time", async () => {
  const first = await encyptPass("MyPassword123");
  const second = await encyptPass("MyPassword123");
  assert.notStrictEqual(first, second);
});