/**  Part 1: Stack Overflow
* Declare a global counter variable.
* Create a simple function that increments the variable, and then calls itself recursively.
* Surround the initial function call in a try/catch block.
* Within the catch, log the error and the value of the counter variable.
*/
let counter = 0;

function recursiveCall() {
    counter++;  // Increment the counter for each call
    recursiveCall();  // Recursive call
}

try {
    recursiveCall();  // Start the recursion
} catch (error) {
    console.error('Stack overflow error:', error.message);  // Log the stack overflow error
    console.log('Recursion depth before overflow:', counter);  // Log the recursion depth
}

/**
 * Part 2: Trampolines
 * Write a recursive function that completely flattens an array of nested arrays,
 * regardless of how deeply nested the arrays are.
 * Once your recursive function is complete, trampoline it.
 */

// Recursive function to flatten array
const flattenArray = (arr) => {
    return arr.reduce((acc, val) => {
        return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
    }, []);
}

// Modify the recursive function for trampolining
const flattenArrayTrampoline = (arr, result = []) => {
    if (arr.length === 0) return result;  // Base case: when array is fully processed
    const [first, ...rest] = arr;

    if (Array.isArray(first)) {
        return () => flattenArrayTrampoline(first.concat(rest), result);
    } else {
        return () => flattenArrayTrampoline(rest, result.concat(first));
    }
}

// Trampoline function
const trampoline = (fn, ...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
        result = result();
    }
    return result;
}

// Testing function
const nestedArray = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10]]]]]]]]]];
console.log(trampoline(flattenArrayTrampoline, nestedArray));

/**
 * Part 3: Deferred Execution
 * Create a simple HTML element to hold text. Cache this HTML element into a JavaScript variable.
 * Write a function that takes a parameter n
 * and adds a list of all prime numbers between one and n to your HTML element.
 * Once complete, use the alert() method to alert the user that the calculation is finished.
 */
document.addEventListener('DOMContentLoaded', () => {
    const primeContainer = document.getElementById('prime');

    // check if a number is prime
    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    // find and display prime numbers
    const displayPrimes = (n) => {
        let primes = [];  // store the primes

        const renderPrime = (i) => {
            if (i > n) {
                // All numbers processed, alert the user
                alert('Calculation finished!');
                return;
            }

            if (isPrime(i)) {
                primes.push(i);  // Add prime number to the array

                // Create a new div element to display the prime
                const primeElement = document.createElement('div');
                primeElement.textContent = i;
                primeContainer.appendChild(primeElement);  // Append to the container
            }

            // Defer the next calculation and rendering
            setTimeout(() => renderPrime(i + 1), 0);
        };

        renderPrime(1);  // Start the recursive function at 1
    };

    // Start the calculation with n = 10000
    displayPrimes(10000);
});

///////////////////////////////////////////////////////////////////////////////////////
/**
 * CodeSandbox Example
 *
 * Step One: write the recursive function.
 *
 * Here, we create a function that calculates
 * the factorial of a number, n. A factorial
 * is the product of all positive integers
 * less than or equal to the number, n.
 */
// const factorial = (n) => {
//     if (n === 0) return 1; // The base case, to stop recursion
//     return n * factorial(n - 1); // The recursive call
// }

/**
 * If we were to call the above with a number as
 * high as, say, 50,000, it would result in a stack
 * overflow.
 */

/**
* Step Two: modify the recursive function.
*
* In order to trampoline the function, we must
* return another function instead of calling
* the recursive function itself.
*
* This prevents the function from being added
* directly to the call stack.
*/
// const facto = (n, a = 1) => {
//     if (n === 0) return a;
//     return () => facto(n - 1, n * a);
// }

/**
* Step Three: create a trampoline function.
*
* This function takes another function and a list
* of arguments, and uses a linear loop rather than
* traditional recursion to handle the function calls.
*
* This prevents the stack overflow, while still
* maintaining the declarative approach provided by
* recursive functions.
*/
// const trampoline = (f, ...args) => {
// let result = f(...args);
// while (typeof result === "function") {
//     result = result();
// }
// return result;
// }

/**
 * Now, we can call the factorial function with as high
 * a number as we would like (as long as we don't run into
 * other errors, like exceeding MAX_SAFE_INTEGER, or looping
 * too many times...).
 *
 * Unfortunately, both of these are the case here, but
 * the principle of trampolining holds!
 */
// console.log(trampoline(facto(10000)))
