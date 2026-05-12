// ============ STORY DATA ============
export const STORY = {
  intro: {
    title: "THE CASE OF THE VANISHING VARIABLE",
    location: "Precinct 404 — 11:47 PM",
    text: [
      "The rain hadn't stopped for three days. I was nursing cold coffee when the file hit my desk.",
      "A programmer gone missing. Dr. Elena Variable — the city's top Python researcher — vanished from her lab last night. No signs of struggle. Just an empty terminal, a half-eaten sandwich, and seven encrypted notebooks.",
      "The Captain paired me with Professor Bytecode, an old academic with more degrees than sense. 'You'll need him,' she said. 'These notebooks... they're written in code.'",
      "Seven chapters. Seven locked secrets. And somewhere in between — the truth about what happened to Elena."
    ]
  },
  chapters: [
    // ═══════════════════════════════════════════════════════════════
    // CHAPTER I — VARIABLES & TYPES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 1, title: "CHAPTER I: THE SEQUENCE", subtitle: "Notebook #1 — Recovered from the Lab", scene: "lab",
      objective: "Decode the lab terminal. Unlock the first notebook.",
      enemy: { name: "CORRUPTED TERMINAL", maxHp: 12 },
      lesson: {
        intro: "Professor Bytecode adjusts his spectacles and lays the first notebook on the table.",
        teacher: "Listen carefully, detective. Python reads top to bottom — like a confession. Variables are labeled evidence bags: you write a name, assign a value. The TYPE can change — that's dynamic typing. input() always returns a STRING. Convert with int() or float() or your case collapses. And operator precedence: ** before * before + before //. Miss the order and you'll get the wrong suspect.",
        keyPoints: [
          "Variables are dynamically typed — they can change type",
          "input() always returns a string — convert with int() or float()",
          "// is integer division, % is remainder, ** is exponent",
          "Augmented assignment: x += 1 is x = x + 1",
          "Multiple assignment: a, b = b, a swaps without a temp variable",
          "Operator precedence: ** > * / // % > + -"
        ],
        clue: "The first page reads: 'The key is in the sequence. Don't skip ahead.'"
      },
      storyProgress: "You've decoded the first notebook. Inside: a coffee-stained receipt from a diner called THE WARM LOOP.",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\nx = 5\ny = x\nx = 10\nprint(y)", answer: "5", hint: "Integers are immutable. y holds the value 5, not a reference to x." },
        { type: "output", timeLimit: 20, q: "What prints?\n\nx = 2 ** 3 + 10 // 3\nprint(x)", answer: "11", hint: "** first: 2**3=8. // next: 10//3=3. Then 8+3=11." },
        { type: "output", timeLimit: 22, q: "What prints?\n\na, b = 3, 7\na, b = b, a\nprint(a, b)", answer: "7 3", hint: "Python evaluates the right side first, then assigns. This is tuple unpacking." },
        { type: "mcq", timeLimit: 20, q: "What is the type of: 10 / 2", options: ["int", "float", "str", "complex"], answer: 1, hint: "True division / always returns a float, even when the result is a whole number." },
        { type: "debug", timeLimit: 22, q: "What's the error?\n\nage = input('Age: ')\nif age > 17:\n    print('Adult')", options: ["SyntaxError", "TypeError", "NameError", "IndentationError"], answer: 1, hint: "input() returns a string. You can't compare a string to an integer with >." },
        { type: "truefalse", timeLimit: 15, q: "In Python, x = x + 1 and x += 1 are always equivalent.", answer: true, hint: "For basic types like int, they behave identically." },
        { type: "multiselect", timeLimit: 28, q: "Which are valid Python variable names? (Select ALL)", options: ["_data", "2fast", "myVar", "class", "total_sum", "for"], answer: [0, 2, 4], hint: "Cannot start with digit. Cannot be a reserved keyword (class, for are keywords)." },
        { type: "spot_error", timeLimit: 25, q: "Click the line with the bug in this swap attempt:", lines: ["a = 5", "b = 10", "temp = a", "a = b", "b = a"], errorLine: 4, hint: "After a=b, both hold 10. b should be assigned temp (which holds original a=5)." },
        { type: "match_output", timeLimit: 38, q: "Match each expression to its result:", pairs: [
          { term: "7 % 3", def: "1" },
          { term: "7 // 3", def: "2" },
          { term: "2 ** 4", def: "16" },
          { term: "int('42')", def: "42" }
        ], hint: "% is remainder, // is floor division, ** is exponent." },
        { type: "code_completion", timeLimit: 35, q: "Complete the code to read an integer and print its square:", template: "n = [B0](input('Enter: '))\nprint(n [B1] 2)", blanks: [
          { id: 0, options: ["int", "str", "float", "input"], answer: "int" },
          { id: 1, options: ["**", "*", "//", "%"], answer: "**" }
        ], hint: "Convert input to int first. Use ** for exponentiation." },
        { type: "find_syntax", timeLimit: 22, q: "Which snippet has correct Python syntax?", options: ["x == 5", "x = = 5", "x := 5\nprint(x)", "x = 5\nprint(x)"], answer: 3, hint: "Single = assigns. == compares. := is walrus (needs context). Only the last is a valid standalone assignment + print." },
        { type: "arrange", timeLimit: 40, q: "Click in order to compute and print the area of a circle (r=5):", lines: ["print(area)", "import math", "r = 5", "area = math.pi * r ** 2"], answer: [1, 2, 3, 0], hint: "Import first, then define r, compute area, then print." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER II — SELECTION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 2, title: "CHAPTER II: SELECTION", subtitle: "Notebook #2 — Found at The Warm Loop Diner", scene: "diner",
      objective: "Navigate the diner. Interrogate the waitress.",
      enemy: { name: "LOCKED DOOR", maxHp: 12 },
      lesson: {
        intro: "Inside the diner, the waitress slides you a notebook Elena left behind. The Professor flips it open.",
        teacher: "Decisions, detective. if / elif / else — branches of logic. Python uses INDENTATION to define blocks. Whitespace matters — four spaces, every time. Conditions end with a COLON. Never confuse == with =. And learn your short-circuit rules: in 'A and B', if A is false, B never evaluates. In 'A or B', if A is true, B is skipped. The 'is' operator tests object identity — not equality. Use == for values, is for None.",
        keyPoints: [
          "Indentation defines code blocks — 4 spaces standard",
          "Conditions end with a colon :",
          "== compares values, is checks identity (use is None, not == None)",
          "and/or short-circuit: stop early when result is determined",
          "Chained comparisons: 1 < x < 10 works in Python",
          "Truthy: non-zero, non-empty. Falsy: 0, '', [], None, False"
        ],
        clue: "The second notebook has a photograph — a warehouse. Marked on the map: THE NESTED BLOCK."
      },
      storyProgress: "Professor Bytecode studies the photograph. 'I know this place. Abandoned server farm. Be careful.'",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\nx = 7\nif 5 < x < 10:\n    print('in range')\nelse:\n    print('out')", answer: "in range", hint: "Python supports chained comparisons. 5 < 7 < 10 is True." },
        { type: "output", timeLimit: 20, q: "What prints?\n\nprint(0 or '' or 'found')", answer: "found", hint: "or returns the first truthy value, or the last value. 0 and '' are falsy." },
        { type: "output", timeLimit: 20, q: "What prints?\n\nx = None\nprint(x is None)", answer: "True", hint: "Use 'is' to check for None. None is a singleton." },
        { type: "mcq", timeLimit: 20, q: "What does short-circuit evaluation mean for 'A and B'?", options: ["B always runs first", "If A is False, B is never evaluated", "Both are always evaluated", "A and B must be booleans"], answer: 1, hint: "If A is False, the 'and' result is already determined — no need to check B." },
        { type: "truefalse", timeLimit: 15, q: "The expression 'not not 5' evaluates to True.", answer: true, hint: "not 5 is False (5 is truthy). not False is True." },
        { type: "debug", timeLimit: 22, q: "What's the error?\n\nif x = 5:\n    print(x)", options: ["Should be ==", "Missing colon", "x not defined", "print needs quotes"], answer: 0, hint: "Inside a condition, you compare with ==. Single = is assignment." },
        { type: "spot_error", timeLimit: 25, q: "Click the line causing the IndentationError:", lines: ["x = 10", "if x > 5:", "print('big')", "else:", "    print('small')"], errorLine: 2, hint: "The block after 'if' must be indented." },
        { type: "multiselect", timeLimit: 28, q: "Which values are falsy in Python? (Select ALL)", options: ["0", "''", "False", "None", "'False'", "0.0"], answer: [0, 1, 2, 3, 5], hint: "'False' is a non-empty string — truthy! 0.0 is falsy." },
        { type: "match_output", timeLimit: 38, q: "Match each condition to its boolean result:", pairs: [
          { term: "bool([])", def: "False" },
          { term: "bool('0')", def: "True" },
          { term: "10 == 10.0", def: "True" },
          { term: "'' == False", def: "False" }
        ], hint: "Empty list is falsy. '0' is a non-empty string (truthy). 10 == 10.0 compares values." },
        { type: "code_completion", timeLimit: 35, q: "Fill the blanks to classify a score:", template: "score = 72\nif score [B0] 90:\n    grade = 'A'\n[B1] score >= 70:\n    grade = 'B'\nelse:\n    grade = 'C'", blanks: [
          { id: 0, options: [">=", ">", "==", "<="], answer: ">=" },
          { id: 1, options: ["elif", "else if", "elseif", "else"], answer: "elif" }
        ], hint: "Use >= for 'at least'. Use elif for chained conditions." },
        { type: "find_syntax", timeLimit: 22, q: "Which is the correct ternary expression?", options: ["x = if a > b then a else b", "x = a if a > b else b", "x = (a > b) ? a : b", "x = a when a > b otherwise b"], answer: 1, hint: "Python's ternary is: value_if_true if condition else value_if_false" },
        { type: "arrange", timeLimit: 40, q: "Click in order to safely check if a key exists before accessing it:", lines: ["    print(d[key])", "key = 'name'", "d = {'name': 'Elena'}", "if key in d:"], answer: [2, 1, 3, 0], hint: "Define dict, define key, check membership, then access." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER III — LOOPS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 3, title: "CHAPTER III: THE ITERATION", subtitle: "Notebook #3 — Locked in the Warehouse Safe", scene: "warehouse",
      objective: "Crack the warehouse safe. Break the infinite loop.",
      enemy: { name: "SECURITY DRONE", maxHp: 12 },
      lesson: {
        intro: "The warehouse is dark. Professor Bytecode cracks the safe. Inside: Notebook #3, pages marked with loops of red ink.",
        teacher: "LOOPS, detective. for gives you control over a sequence. while runs until a condition breaks. range(start, stop, step) — stop is EXCLUSIVE, step can be negative. A while without an increment is an INFINITE LOOP. break exits the entire loop. continue skips to next iteration. The ELSE clause on a loop runs if — and only if — the loop was NOT broken. enumerate gives you index and value together. zip pairs two sequences.",
        keyPoints: [
          "for loops iterate over any iterable (list, string, range...)",
          "range(start, stop, step) — stop is exclusive",
          "while loops run while condition is True — ensure it terminates",
          "break exits the loop, continue skips to next iteration",
          "else on a loop runs only if break was NOT triggered",
          "enumerate(seq) yields (index, value) pairs"
        ],
        clue: "Inside the notebook: coordinates. A lighthouse on the coast. STRING'S END LIGHTHOUSE."
      },
      storyProgress: "The Professor's hands shake. 'Elena was investigating a criminal network. We have to hurry.'",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\nfor i in range(2, 10, 3):\n    print(i, end=' ')", answer: "2 5 8", hint: "range(2,10,3): starts at 2, steps by 3, stops before 10." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nfor i in range(3):\n    if i == 1: continue\n    print(i, end=' ')", answer: "0 2", hint: "continue skips the rest of the body for that iteration. i=1 is skipped." },
        { type: "output", timeLimit: 25, q: "What prints?\n\nfor i in range(5):\n    if i == 3: break\nelse:\n    print('done')\nprint(i)", answer: "3", hint: "break fires at i=3 so the else does NOT run. After the loop, i holds its last value: 3." },
        { type: "truefalse", timeLimit: 15, q: "The else clause of a for loop executes even when break is triggered.", answer: false, hint: "Loop else only runs when the loop completes WITHOUT hitting break." },
        { type: "mcq", timeLimit: 20, q: "What does enumerate(['a','b','c']) yield as its first item?", options: ["'a'", "(0, 'a')", "(1, 'a')", "0"], answer: 1, hint: "enumerate yields (index, value) tuples. Default start index is 0." },
        { type: "debug", timeLimit: 22, q: "What's wrong?\n\ni = 0\nwhile i < 5:\n    print(i)\n    i == i + 1", options: ["print is wrong", "Infinite loop — == doesn't increment", "Should use for", "Range is incorrect"], answer: 1, hint: "== is comparison, not assignment. i never changes, so the loop never ends." },
        { type: "spot_error", timeLimit: 25, q: "Click the line causing an infinite loop:", lines: ["total = 0", "n = 1", "while n <= 10:", "    total += n"], errorLine: 3, hint: "n is never incremented inside the loop. It stays 1 forever." },
        { type: "multiselect", timeLimit: 28, q: "Which are TRUE about Python loops? (Select ALL)", options: ["range(5) yields [1,2,3,4,5]", "break exits the entire loop", "continue skips current iteration", "Loop else runs if no break", "for can iterate over a string"], answer: [1, 2, 3, 4], hint: "range(5) yields 0-4, not 1-5." },
        { type: "code_combat", timeLimit: 45, q: "ACTION PHASE!\nCommand the detective to attack the drone exactly 4 times using a loop.\nHint: Use range() and indented detective.attack()", answer: 4, hint: "for i in range(4):\n    detective.attack()" },
        { type: "match_output", timeLimit: 38, q: "Match each loop snippet to what it prints:", pairs: [
          { term: "list(range(0,6,2))", def: "[0, 2, 4]" },
          { term: "list(range(5,0,-2))", def: "[5, 3, 1]" },
          { term: "list(range(3))", def: "[0, 1, 2]" },
          { term: "list(range(1,4))", def: "[1, 2, 3]" }
        ], hint: "Trace each range carefully: start, stop (exclusive), step." },
        { type: "code_completion", timeLimit: 38, q: "Fill blanks to print all odd numbers 1-9:", template: "for i in [B0](1, 10, [B1]):\n    print(i)", blanks: [
          { id: 0, options: ["range", "list", "len", "iter"], answer: "range" },
          { id: 1, options: ["2", "1", "3", "-1"], answer: "2" }
        ], hint: "range(start, stop, step). Step 2 from 1 gives odd numbers." },
        { type: "arrange", timeLimit: 42, q: "Click in order to find the first number divisible by both 3 and 7:", lines: ["    if n % 3 == 0 and n % 7 == 0:", "        break", "for n in range(1, 200):", "print(n)"], answer: [2, 0, 1, 3], hint: "Loop first, then check condition, break when found, print after." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER IV — STRINGS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 4, title: "CHAPTER IV: THE STRINGS", subtitle: "Notebook #4 — Hidden in the Lighthouse Beam", scene: "lighthouse",
      objective: "Climb the lighthouse. Reverse the encrypted message.",
      enemy: { name: "CIPHERED MESSAGE", maxHp: 12 },
      lesson: {
        intro: "The lighthouse keeper is gone. Notebook #4 is taped to the rotating beam.",
        teacher: "Strings, detective. IMMUTABLE. You cannot change a character in place — you build a new string. Index from 0. Negative indices count from the end. Slicing [start:stop:step] — stop is EXCLUSIVE. word[::-1] reverses. f-strings are your best friend: f'Name: {name}'. join() is efficient — use it instead of concatenating in a loop. split() breaks a string by a delimiter. strip() removes leading/trailing whitespace.",
        keyPoints: [
          "Strings are immutable — reassign, don't mutate in place",
          "Indexing: s[0] first, s[-1] last",
          "Slicing s[start:stop:step] — stop is exclusive",
          "f-strings: f'Value is {expr}' — evaluated at runtime",
          "'sep'.join(iterable) — efficient string building",
          "s.split(), s.strip(), s.upper(), s.replace() — common methods"
        ],
        clue: "Last page: 'If you've come this far, you know what I was investigating. Go to the old library.'"
      },
      storyProgress: "Professor Bytecode goes pale. 'The library... that's where she started. We're going in circles.'",
      questions: [
        { type: "output", timeLimit: 20, q: "What prints?\n\ns = 'detective'\nprint(s[3:7])", answer: "ecti", hint: "s[3] is 'e', s[4]='c', s[5]='t', s[6]='i'. Stop before index 7." },
        { type: "output", timeLimit: 20, q: "What prints?\n\nword = 'Python'\nprint(word[::2])", answer: "Pto", hint: "[::2] takes every 2nd character starting from index 0: P(0), t(2), o(4)." },
        { type: "output", timeLimit: 20, q: "What prints?\n\nname = 'Elena'\nprint(f'Agent: {name!r}')", answer: "Agent: 'Elena'", hint: "!r in f-string calls repr() — adds quotes around strings." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nwords = ['the', 'case', 'is']\nprint('-'.join(words))", answer: "the-case-is", hint: "join() concatenates items in the iterable using the separator." },
        { type: "truefalse", timeLimit: 15, q: "Strings in Python are mutable — you can change individual characters.", answer: false, hint: "Try s[0] = 'X' and Python raises a TypeError." },
        { type: "debug", timeLimit: 22, q: "What's the error?\n\ns = 'hello'\nprint(s[10])", options: ["TypeError", "ValueError", "IndexError", "AttributeError"], answer: 2, hint: "'hello' has indices 0-4. Index 10 is out of range." },
        { type: "spot_error", timeLimit: 25, q: "Click the line raising a TypeError:", lines: ["text = 'hello'", "count = 3", "result = text + count", "print(result)"], errorLine: 2, hint: "Cannot concatenate str and int directly. Use str(count) or an f-string." },
        { type: "multiselect", timeLimit: 28, q: "Which string operations are valid Python? (Select ALL)", options: ["'hi' * 3", "'abc'[0] = 'Z'", "len('test')", "'hello'.upper()", "'a,b,c'.split(',')"], answer: [0, 2, 3, 4], hint: "Strings are immutable — you cannot assign to an index." },
        { type: "match_output", timeLimit: 38, q: "For s = 'mystery', match each expression:", pairs: [
          { term: "s[-2]", def: "r" },
          { term: "s[1:4]", def: "yst" },
          { term: "s[::-1]", def: "yretysm" },
          { term: "s.upper()", def: "MYSTERY" }
        ], hint: "mystery: m(0)y(1)s(2)t(3)e(4)r(5)y(6). -2 counts from end." },
        { type: "code_completion", timeLimit: 35, q: "Fill blanks to reverse and capitalize a string:", template: "s = 'clue'\nresult = s[B0].upper()\nprint(result)", blanks: [
          { id: 0, options: ["::-1", "::1", "::-2", ":-1"], answer: "::-1" }
        ], hint: "[::-1] reverses. Chain .upper() after." },
        { type: "find_syntax", timeLimit: 22, q: "Which is a valid f-string?", options: ["f'result: ' + x", "f'result: {x}'", "'result: {x}'.format", "f('result:', x)"], answer: 1, hint: "f-strings wrap expressions in {curly braces} inside the f'' string." },
        { type: "memory_match", timeLimit: 60, q: "Match each string method to its description:", pairs: [
          { concept: ".strip()", def: "Remove leading/trailing whitespace" },
          { concept: ".split(x)", def: "Split string by delimiter x" },
          { concept: ".replace(a,b)", def: "Replace all occurrences of a with b" },
          { concept: ".join(lst)", def: "Concatenate list items with separator" }
        ], hint: "These are four of the most common string methods in Python." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER V — MID-BOSS (Mixed Concepts)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 5, title: "CHAPTER V: THE FIREWALL", subtitle: "Mid-Boss — The Server Room", scene: "warehouse",
      objective: "Defeat the rogue Firewall using loops and logic.",
      enemy: { name: "ROGUE FIREWALL", maxHp: 24 },
      lesson: {
        intro: "Alarms blare. A massive firewall blocks your path. This is it — combine everything.",
        teacher: "This is a boss encounter, detective. Variables, logic, loops, strings — all at once. You must be fast and flawless. The firewall knows your weaknesses. One slip and it retaliates.",
        keyPoints: ["Combine all concepts learned so far", "Time limits are aggressive", "Accuracy is rewarded — mistakes are punished"],
        clue: "The firewall shatters, revealing a hidden stairwell down to the true archive."
      },
      storyProgress: "You breach the firewall. The air grows cold as you descend.",
      questions: [
        { type: "code_combat", timeLimit: 55, q: "ACTION PHASE!\nThe Firewall's shields are up! Attack exactly 6 times using a loop!", answer: 6, hint: "for i in range(6):\n    detective.attack()" },
        { type: "output", timeLimit: 25, q: "What prints?\n\ns = 'FIREWALL'\nprint(s[1:5][::-1])", answer: "WERI", hint: "s[1:5] = 'IREW'. Reversed = 'WERI'." },
        { type: "output", timeLimit: 25, q: "What prints?\n\nresult = [x**2 for x in range(1,6) if x % 2 != 0]\nprint(result)", answer: "[1, 9, 25]", hint: "Squares of odd numbers 1-5: 1²=1, 3²=9, 5²=25." },
        { type: "multiselect", timeLimit: 28, q: "Which evaluate to True? (Select ALL)", options: ["len('abc') == 3", "'z' > 'a'", "'abc' == 'ABC'", "bool([])", "not False"], answer: [0, 1, 4], hint: "String comparison is lexicographic. Empty list is False. not False = True." },
        { type: "code_completion", timeLimit: 38, q: "Fill the boss-phase counter attack:", template: "total = 0\nfor i in [B0](1, 11):\n    if i [B1] 2 == 0:\n        total [B2] i\nprint(total)", blanks: [
          { id: 0, options: ["range", "list", "len", "iter"], answer: "range" },
          { id: 1, options: ["%", "//", "**", "/"], answer: "%" },
          { id: 2, options: ["+=", "=+", "=", "-="], answer: "+=" }
        ], hint: "Sum even numbers 1-10: range stops before 11. % for even check. += to accumulate." },
        { type: "spot_error", timeLimit: 25, q: "Click the line causing the bug (prints wrong total):", lines: ["nums = [1,2,3,4,5]", "total = 0", "for n in nums:", "total = total + n", "print(total)"], errorLine: 3, hint: "Line 4 is not indented — it's outside the loop! Only the last value is 'added'." },
        { type: "find_syntax", timeLimit: 22, q: "Which list comprehension is valid Python?", options: ["[x*2 for x in range(5)]", "[for x in range(5): x*2]", "(x*2 for each x in range(5))", "list x*2 where x in range(5)"], answer: 0, hint: "List comprehension: [expression for variable in iterable]" },
        { type: "arrange", timeLimit: 42, q: "Click in order to count vowels in a word:", lines: ["    if char in 'aeiou':", "count = 0", "        count += 1", "word = 'detective'", "for char in word:", "print(count)"], answer: [3, 1, 4, 0, 2, 5], hint: "Define word, init count, loop, check vowel, increment, then print." },
        { type: "match_output", timeLimit: 38, q: "Match each snippet to its output:", pairs: [
          { term: "'x' * 3", def: "xxx" },
          { term: "str(42)", def: "42" },
          { term: "int('7') + 3", def: "10" },
          { term: "''.join(['a','b'])", def: "ab" }
        ], hint: "String repeat, type conversion, arithmetic, and join." },
        { type: "code_combat", timeLimit: 55, q: "ACTION PHASE!\nFinal surge! The Firewall reboots. Attack exactly 18 times!", answer: 18, hint: "for i in range(18):\n    detective.attack()" },
        { type: "output", timeLimit: 25, q: "What prints?\n\nfor i in range(1, 6):\n    if i % 2 == 0: continue\n    if i > 4: break\n    print(i, end=' ')", answer: "1 3", hint: "continue skips evens. break fires when i=5 (>4). So 1 and 3 print." },
        { type: "memory_match", timeLimit: 55, q: "Final recall — match each operator to its meaning:", pairs: [
          { concept: "//", def: "Floor division" },
          { concept: "**", def: "Exponentiation" },
          { concept: "%", def: "Modulo (remainder)" },
          { concept: "!=", def: "Not equal to" }
        ], hint: "Core Python operators — you've seen all of these." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER VI — LISTS & TUPLES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 6, title: "CHAPTER VI: LISTS & TUPLES", subtitle: "Notebook #5 — The Library's Hidden Room", scene: "library",
      objective: "Find the hidden room. Unravel the collections mystery.",
      enemy: { name: "THE GHOST PROTOCOL", maxHp: 12 },
      lesson: {
        intro: "Behind a bookshelf, a hidden room. On a table: the fifth notebook and a recording device.",
        teacher: "COLLECTIONS, detective. Lists — mutable, flexible, [1,2,3]. Tuples — immutable, fixed, (1,2,3). CRITICAL WARNING: b = a does NOT copy a list. It shares the reference. Change b, and a changes too. Use b = a[:] or list(a) for a shallow copy. Sorting: sorted(lst) returns a new list. lst.sort() modifies in place. The key parameter lets you sort by custom criteria. And zip() pairs two sequences together.",
        keyPoints: [
          "Lists are mutable — tuples are immutable",
          "b = a shares the reference — use a[:] or list(a) to copy",
          "append() adds one item, extend() adds all items from an iterable",
          "sorted(lst) returns new list, lst.sort() modifies in place",
          "Nested lists: matrix[row][col]",
          "zip(a, b) yields (a[i], b[i]) pairs"
        ],
        clue: "You press PLAY on the recorder. Elena's voice: 'I'm alive. The archive — floor B. The evidence room holds everything.'"
      },
      storyProgress: "Professor Bytecode: 'She's alive. The archive and evidence room — those are our next stops.'",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)", answer: "[1, 2, 3, 4]", hint: "b = a shares the reference. Modifying b also modifies a." },
        { type: "output", timeLimit: 22, q: "What prints?\n\na = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(a)", answer: "[1, 2, 3]", hint: "a[:] creates a shallow copy. Modifying b does NOT affect a." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nnums = [3, 1, 4, 1, 5]\nprint(sorted(nums))\nprint(nums)", answer: "[1, 1, 3, 4, 5]\n[3, 1, 4, 1, 5]", hint: "sorted() returns a NEW sorted list. The original is unchanged." },
        { type: "output", timeLimit: 22, q: "What prints?\n\ndata = [1, 2, 3]\ndata.append([4, 5])\nprint(len(data))", answer: "4", hint: "append() adds ONE item — the list [4,5] is one item." },
        { type: "truefalse", timeLimit: 15, q: "Tuples support item assignment: t = (1,2); t[0] = 5", answer: false, hint: "Tuples are immutable. t[0] = 5 raises a TypeError." },
        { type: "debug", timeLimit: 22, q: "What error does this raise?\n\nt = (1, 2, 3)\nt.append(4)", options: ["TypeError", "AttributeError", "IndexError", "SyntaxError"], answer: 1, hint: "Tuples don't have an append method. AttributeError." },
        { type: "spot_error", timeLimit: 25, q: "Click the line raising an AttributeError:", lines: ["coords = (10, 20)", "x = coords[0]", "coords.append(30)", "print(coords)"], errorLine: 2, hint: "Tuples are immutable — they have no append method." },
        { type: "multiselect", timeLimit: 28, q: "Which statements about lists are TRUE? (Select ALL)", options: ["Lists are ordered", "Lists allow duplicates", "b = a copies a list", "append() adds to the end", "remove() deletes all occurrences"], answer: [0, 1, 3], hint: "b=a shares reference, not a copy. remove() only deletes the FIRST occurrence." },
        { type: "match_output", timeLimit: 38, q: "Match each list method to what it does:", pairs: [
          { term: "[1,2].extend([3,4])", def: "[1, 2, 3, 4]" },
          { term: "[3,1,2].sort()", def: "None (in-place)" },
          { term: "[1,2,3].pop()", def: "3 (returns it)" },
          { term: "[1,2,3].count(2)", def: "1" }
        ], hint: "extend adds all items, sort is in-place (returns None), pop removes & returns last, count counts occurrences." },
        { type: "code_completion", timeLimit: 38, q: "Fill blanks to remove duplicates and sort a list:", template: "nums = [3, 1, 2, 1, 3]\nunique = [B0]([B1](nums))\nunique.[B2]()\nprint(unique)", blanks: [
          { id: 0, options: ["list", "tuple", "set", "sorted"], answer: "list" },
          { id: 1, options: ["set", "list", "sorted", "tuple"], answer: "set" },
          { id: 2, options: ["sort", "sorted", "reverse", "append"], answer: "sort" }
        ], hint: "Convert to set (removes dupes), back to list, then sort in-place." },
        { type: "find_syntax", timeLimit: 22, q: "Which creates a list of squares for even numbers 0-9?", options: ["[x**2 if x%2==0 for x in range(10)]", "[x**2 for x in range(10) if x%2==0]", "{x**2 for x in range(10) if x%2==0}", "(x**2 for x in range(10) if x%2==0)"], answer: 1, hint: "The filter condition goes AFTER the for clause. {} is a set, () is a generator." },
        { type: "memory_match", timeLimit: 60, q: "Match each list method with what it returns:", pairs: [
          { concept: "append(x)", def: "None (modifies in-place)" },
          { concept: "pop(i)", def: "The removed element" },
          { concept: "index(x)", def: "First index of x" },
          { concept: "count(x)", def: "Number of occurrences" }
        ], hint: "append, pop, index, count — four critical list methods." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER VII — FUNCTIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 7, title: "CHAPTER VII: FUNCTIONS", subtitle: "Notebook #6 — The Precinct Archive", scene: "archive",
      objective: "Crack the archive. Master the function vault.",
      enemy: { name: "RECURSIVE TRAP", maxHp: 12 },
      lesson: {
        intro: "Deep in the basement archive, Professor Bytecode finds Notebook #6 in a drawer labelled CLASSIFIED — FUNCTION SCOPE.",
        teacher: "FUNCTIONS, detective. def defines a reusable block. return sends back a value — without it, Python returns None. SCOPE: variables inside a function are LOCAL. They do not exist outside. The global keyword lets you modify a global variable from inside a function — but avoid it when you can. MUTABLE DEFAULT ARGUMENTS — def f(lst=[]) — that list is created ONCE and shared across ALL calls. Use None as default instead. Closures capture variables from the enclosing scope.",
        keyPoints: [
          "def name(params): — return sends the value back",
          "No return statement → returns None",
          "Parameters are LOCAL — they don't exist outside the function",
          "Mutable default arguments are shared across ALL calls (use None)",
          "*args collects extra positional args as a tuple",
          "**kwargs collects extra keyword args as a dict"
        ],
        clue: "In the back of the drawer: a key card. Stamped: EVIDENCE ROOM — FLOOR B."
      },
      storyProgress: "Professor Bytecode stares at the key card. 'This is Elena's. She was here recently.'",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\ndef f(x):\n    x + 1\n\nprint(f(5))", answer: "None", hint: "No return statement — the function returns None automatically." },
        { type: "output", timeLimit: 25, q: "TRAP! What prints?\n\ndef add(lst=[]):\n    lst.append(1)\n    return lst\n\nprint(add())\nprint(add())", answer: "[1]\n[1, 1]", hint: "The default list [] is created ONCE and shared. Second call appends to the same list." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nx = 'global'\ndef test():\n    x = 'local'\ntest()\nprint(x)", answer: "global", hint: "Assigning x inside a function creates a LOCAL variable. The outer x is untouched." },
        { type: "output", timeLimit: 22, q: "What prints?\n\ndef total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4))", answer: "10", hint: "*nums collects all positional arguments into a tuple. sum() adds them." },
        { type: "truefalse", timeLimit: 15, q: "A function with no return statement returns None in Python.", answer: true, hint: "Python always returns something. Without an explicit return, it's None." },
        { type: "mcq", timeLimit: 20, q: "What does **kwargs collect?", options: ["All positional arguments", "Extra keyword arguments as a dict", "Extra keyword arguments as a tuple", "All arguments as a list"], answer: 1, hint: "**kwargs collects extra keyword args as a dictionary." },
        { type: "debug", timeLimit: 22, q: "What's the bug?\n\ndef square(n):\n    result = n * n\n\nprint(square(4))", options: ["NameError", "Missing return — prints None", "n is not defined", "square is not callable"], answer: 1, hint: "The function computes result but never returns it. Returns None." },
        { type: "spot_error", timeLimit: 25, q: "Click the line causing a NameError:", lines: ["result = double(10)", "def double(x):", "    return x * 2", "print(result)"], errorLine: 0, hint: "Cannot call a function before its def statement (at module level, Python reads top to bottom)." },
        { type: "match_output", timeLimit: 38, q: "Match each lambda to its result when called:", pairs: [
          { term: "(lambda x: x**2)(4)", def: "16" },
          { term: "(lambda x,y: x+y)(3,4)", def: "7" },
          { term: "(lambda s: s[::-1])('hi')", def: "ih" },
          { term: "(lambda x: x%2==0)(5)", def: "False" }
        ], hint: "Lambdas are anonymous functions. Evaluate each expression." },
        { type: "code_completion", timeLimit: 38, q: "Fill blanks to write a safe add function (no mutable default):", template: "def safe_add(lst=[B0]):\n    if lst [B1] None:\n        lst = []\n    lst.append(1)\n    return lst", blanks: [
          { id: 0, options: ["None", "[]", "0", "''"], answer: "None" },
          { id: 1, options: ["is", "==", "!=", "is not"], answer: "is" }
        ], hint: "Use None as default. Check 'is None' (identity check for singletons)." },
        { type: "find_syntax", timeLimit: 22, q: "Which is a valid function with a default argument?", options: ["def f(x, y=10):", "def f(y=10, x):", "def f(x=1, y):", "def f(x, y = ):" ], answer: 0, hint: "Default arguments must come AFTER non-default arguments." },
        { type: "arrange", timeLimit: 45, q: "Click in correct order for a recursive factorial:", lines: ["def factorial(n):", "    if n == 0: return 1", "    return n * factorial(n - 1)", "print(factorial(5))"], answer: [0, 1, 2, 3], hint: "Define function with base case first, recursive case second, then call it." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER VIII — DICTIONARIES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 8, title: "CHAPTER VIII: DICTIONARIES", subtitle: "Notebook #7 — The Evidence Room", scene: "evidence_room",
      objective: "Access the evidence database. Decode the final cipher.",
      enemy: { name: "CORRUPTED DATABASE", maxHp: 12 },
      lesson: {
        intro: "The evidence room. Cold, fluorescent-lit. On the table: Notebook #7 and Elena's laptop, still open.",
        teacher: "Dictionaries, detective. Key-value pairs. Access values with d['key'] — KeyError if missing, so use d.get('key', default) to be safe. Keys must be IMMUTABLE. Lists? Not allowed. Tuples? Fine. In Python 3.7+, dicts preserve insertion order. Dict comprehensions: {k: v for k, v in pairs}. Merging with {**d1, **d2} — later keys win. And beware: d['x'] = [...]; e = d; e['x'].append(1) — that modifies d too.",
        keyPoints: [
          "d['key'] raises KeyError if missing — use d.get('key', default)",
          "Keys must be immutable (str, int, tuple) — NOT list or dict",
          "Dict comprehension: {k: f(k) for k in iterable}",
          "{**d1, **d2} merges dicts — d2 values overwrite d1 on collision",
          "Dicts maintain insertion order (Python 3.7+)",
          ".keys(), .values(), .items() return dict views"
        ],
        clue: "Elena's laptop: 'I mapped every connection. The network is exposed. Case file: SOLVED.'"
      },
      storyProgress: "Case almost closed. Elena is safe. One final obstacle remains.",
      questions: [
        { type: "output", timeLimit: 22, q: "What prints?\n\nd = {'a': 1, 'b': 2}\nprint(d.get('c', 99))", answer: "99", hint: "get() returns the default (99) when key 'c' doesn't exist — no KeyError." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nd1 = {'x': 1, 'y': 2}\nd2 = {'y': 10, 'z': 3}\nmerged = {**d1, **d2}\nprint(merged['y'])", answer: "10", hint: "When merging with **, later values overwrite earlier ones. d2's 'y'=10 wins." },
        { type: "output", timeLimit: 25, q: "TRAP! What prints?\n\nd = {'nums': [1, 2]}\ne = d\ne['nums'].append(3)\nprint(d['nums'])", answer: "[1, 2, 3]", hint: "e = d shares the reference. The list inside is also shared. Mutation affects both." },
        { type: "output", timeLimit: 22, q: "What prints?\n\nsquares = {n: n**2 for n in range(4)}\nprint(squares[3])", answer: "9", hint: "Dict comprehension: key=n, value=n**2. squares[3] = 3**2 = 9." },
        { type: "truefalse", timeLimit: 15, q: "A Python dictionary can contain duplicate keys.", answer: false, hint: "Keys are unique. Assigning to an existing key OVERWRITES its value." },
        { type: "truefalse", timeLimit: 15, q: "A tuple can be used as a dictionary key.", answer: true, hint: "Tuples are immutable and hashable — valid as dict keys. Lists are not." },
        { type: "debug", timeLimit: 22, q: "What error occurs?\n\nd = {'a': 1}\nprint(d['b'])", options: ["TypeError", "ValueError", "KeyError", "IndexError"], answer: 2, hint: "Accessing a missing key with [] raises KeyError." },
        { type: "spot_error", timeLimit: 25, q: "Click the line raising a TypeError:", lines: ["evidence = {}", "key = [1, 2]", "evidence[key] = 'clue'", "print(evidence)"], errorLine: 2, hint: "Lists are unhashable — cannot be used as dict keys." },
        { type: "multiselect", timeLimit: 28, q: "Which can be used as a dict key? (Select ALL)", options: ["'name'", "(1, 2)", "[1, 2]", "42", "frozenset({1})"], answer: [0, 1, 3, 4], hint: "Keys must be hashable/immutable. Lists are mutable — not allowed." },
        { type: "match_output", timeLimit: 38, q: "Match each dict operation to its result:", pairs: [
          { term: "{'a':1}.get('b', 0)", def: "0" },
          { term: "len({'x':1,'y':2})", def: "2" },
          { term: "list({'a':1}.keys())", def: "['a']" },
          { term: "{'a':1,'b':2}.pop('a')", def: "1" }
        ], hint: "get returns default, len counts keys, keys() returns view, pop removes and returns value." },
        { type: "code_completion", timeLimit: 38, q: "Fill blanks to count word frequencies:", template: "words = ['the','cat','the']\nfreq = {}\nfor w in words:\n    freq[w] = freq.[B0](w, [B1]) + 1\nprint(freq)", blanks: [
          { id: 0, options: ["get", "pop", "keys", "update"], answer: "get" },
          { id: 1, options: ["0", "1", "None", "-1"], answer: "0" }
        ], hint: "get(w, 0) returns 0 if 'w' not yet in dict. Then +1 for current word." },
        { type: "arrange", timeLimit: 45, q: "Click in order to invert a dict (swap keys and values):", lines: ["original = {'a': 1, 'b': 2}", "inverted = {}", "for k, v in original.items():", "    inverted[v] = k", "print(inverted)"], answer: [0, 1, 2, 3, 4], hint: "Define original, init empty inverted dict, iterate items, assign v→k, then print." }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAPTER IX — FINAL BOSS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 9, title: "CHAPTER IX: THE MASTERMIND", subtitle: "Final Boss — The Core", scene: "evidence_room",
      objective: "Defeat the Mastermind and recover Dr. Variable.",
      enemy: { name: "THE MASTERMIND", maxHp: 52 },
      lesson: {
        intro: "At the center of the archive, a holographic projection of a cloaked figure. The Mastermind.",
        teacher: "This is it, detective. Every concept. Every trap. Every gotcha. Mutable defaults, scope, reference semantics, comprehensions, closures — they will test you all at once. Do not falter. The case depends on it.",
        keyPoints: ["All concepts combined", "Every Python gotcha weaponized", "No room for error"],
        clue: "The hologram fades. Dr. Variable is found alive. 'You did it,' she says."
      },
      storyProgress: "The Mastermind is defeated. The criminal network is dismantled.",
      questions: [
        { type: "code_combat", timeLimit: 45, q: "ACTION PHASE!\nThe Mastermind summons 12 proxies — destroy them all!", answer: 12, hint: "for i in range(12):\n    detective.attack()" },
        { type: "output", timeLimit: 28, q: "TRAP! What prints?\n\ndef f(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(f(1))\nprint(f(2))", answer: "[1]\n[1, 2]", hint: "Mutable default argument — same list is shared across calls." },
        { type: "output", timeLimit: 28, q: "What prints?\n\ndef outer():\n    x = 10\n    def inner():\n        return x * 2\n    return inner()\n\nprint(outer())", answer: "20", hint: "inner() closes over x from outer scope. x=10, so 10*2=20." },
        { type: "spot_error", timeLimit: 28, q: "Click the line crashing the master script:", lines: ["data = {'key': 'value'}", "keys = data.keys()", "keys.append('new')", "print(list(keys))"], errorLine: 2, hint: "dict.keys() returns a VIEW object — it has no append method." },
        { type: "multiselect", timeLimit: 30, q: "Which will cause a KeyError? (Select ALL)", options: ["d = {}; d['x']", "d = {}; d.get('x')", "d = {'x':1}; d['x']", "d = {}; del d['x']", "d = {'x':1}; d.pop('y')"], answer: [0, 3, 4], hint: "get() never raises KeyError. del and pop() on missing keys do raise KeyError." },
        { type: "output", timeLimit: 28, q: "What prints?\n\ndata = [1, [2, 3], 4]\ncopy = data[:]\ncopy[1].append(99)\nprint(data[1])", answer: "[2, 3, 99]", hint: "[:] is a SHALLOW copy. The nested list [2,3] is still shared by reference." },
        { type: "code_completion", timeLimit: 40, q: "Fill blanks to flatten a nested list:", template: "nested = [[1,2],[3,4],[5]]\nflat = [x for sub in [B0] for x in [B1]]\nprint(flat)", blanks: [
          { id: 0, options: ["nested", "flat", "sub", "range(3)"], answer: "nested" },
          { id: 1, options: ["sub", "nested", "x", "flat"], answer: "sub" }
        ], hint: "Outer for iterates sublists. Inner for iterates elements within each sublist." },
        { type: "find_syntax", timeLimit: 25, q: "Which correctly uses **kwargs?", options: ["def f(**args): print(args['x'])", "def f(**kwargs): print(kwargs['x'])", "def f(*kwargs): print(kwargs['x'])", "def f(kwargs**): print(kwargs)"], answer: 1, hint: "**kwargs is the convention. It collects keyword args as a dict." },
        { type: "match_output", timeLimit: 38, q: "Match each tricky expression to its output:", pairs: [
          { term: "print(0 == False)", def: "True" },
          { term: "print([] == False)", def: "False" },
          { term: "print(bool([]))", def: "False" },
          { term: "print(1 == True)", def: "True" }
        ], hint: "0==False is True (value equality). []==False is False (different types). bool([]) is False." },
        { type: "arrange", timeLimit: 50, q: "Click in order to memoize a function using a dict:", lines: ["def fib(n, memo={}):", "    if n in memo: return memo[n]", "    if n <= 1: return n", "    memo[n] = fib(n-1) + fib(n-2)", "    return memo[n]"], answer: [0, 1, 2, 3, 4], hint: "Check cache first, handle base case, compute and store, then return." },
        { type: "code_combat", timeLimit: 50, q: "ACTION PHASE!\nFinal wave — 28 more proxies! Finish this!", answer: 28, hint: "for i in range(28):\n    detective.attack()" },
        { type: "memory_match", timeLimit: 60, q: "Final challenge — match each Python gotcha:", pairs: [
          { concept: "Mutable default arg", def: "Shared across all calls" },
          { concept: "b = a (list)", def: "Reference, not a copy" },
          { concept: "dict.keys()", def: "Returns a view, not a list" },
          { concept: "Shallow copy", def: "Nested objects still shared" }
        ], hint: "These are the four most infamous Python gotchas." }
      ]
    }
  ],
  outro: {
    title: "CASE CLOSED",
    text: [
      "You step out of the precinct into the morning light. The rain has finally stopped.",
      "Professor Bytecode lights his pipe. 'Python is a language, detective. But it's also a way of thinking. Every problem is a sequence of decisions, loops, strings, collections, and functions. You've mastered them all.'",
      "Nine chapters. Nine concepts. One case closed.",
      "But there are always more cases. More mysteries hidden in code.",
      "You'll be ready."
    ]
  }
};
