# Hash Map Theory

## What is a Hash Map?
A **Hash Map** (or Hash Table) is a data structure that stores data in **key-value pairs**. It is designed to allow you to insert, retrieve, and delete data very quickly—ideally in **constant time**, or O(1).

Think of it like a real-world dictionary:
*   **Key**: The word you want to look up.
*   **Value**: The definition of that word.
You don't read every page to find a word; you go directly to the section where it should be.

## How Does It Work?
The core magic of a Hash Map relies on two things: an **Array** and a **Hash Function**.

### 1. The Array (Buckets)
Under the hood, a Hash Map uses a standard array to store data. Each slot in this array is often called a **bucket**.

### 2. The Hash Function
The **Hash Function** is a mathematical algorithm that takes a **Key** (like a string or a number) and converts it into an integer (an **Index**).

**The Process:**
1.  **Input**: You give the map a Key (e.g., "Apple").
2.  **Hash**: The Hash Function calculates a "hash code" for "Apple".
3.  **Index**: This hash code is converted into a valid index for the array (usually using the modulus operator `%`).
4.  **Store**: The Value is stored in the array at that specific index.

## Collisions
A **Collision** happens when two different keys produce the same index.
*   Example: "Apple" and "Orange" might both accidentally hash to Index 5.

Since we can't store two things in the exact same slot, we need a strategy to handle this.

### Common Resolution Strategies:
1.  **Separate Chaining**:
    *   Each bucket in the array actually holds a **Linked List**.
    *   If "Apple" is at Index 5, and "Orange" also hashes to Index 5, we just add "Orange" to the list at that index.
    *   To find an item, we go to the bucket and walk through the short list.

2.  **Open Addressing**:
    *   If Index 5 is taken, we look for the next available slot (Index 6, then 7, etc.).
    *   This is called **Probing**.

## Time Complexity
*   **Average Case**: **O(1)**. This means looking up an item takes the same amount of time regardless of how many items are in the map.
*   **Worst Case**: **O(n)**. This happens if *every single key* collides and ends up in the same bucket (forming a long list). A good hash function prevents this.

## Load Factor and Resizing
The **Load Factor** is the ratio of items to buckets (Items / Total Buckets).
*   If the map gets too full (e.g., 75% full), collisions become frequent, and performance drops.
*   To fix this, the map **Resizes**: it creates a new, larger array (usually double the size) and re-hashes all existing items into the new buckets.

## Summary
*   **Fast**: Great for lookups, insertions, and deletions.
*   **Unordered**: Data is not stored in any specific order (unlike a list).
*   **Keys**: Must be unique.
