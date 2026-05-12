import json
import re

with open('src/data/story.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We'll just write the entire new story.js content to avoid messy regex replacement
new_story = """// ============ STORY DATA ============
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
    {
      id: 1, title: "CHAPTER I: THE SEQUENCE", subtitle: "Notebook #1 — Recovered from the Lab", scene: "lab",
      objective: "Decode the lab terminal. Unlock the first notebook.",
      enemy: { name: "CORRUPTED TERMINAL", maxHp: 10 },
      lesson: {
        intro: "Professor Bytecode adjusts his spectacles and lays the first notebook on the table.",
        teacher: "Listen carefully, detective. Python reads top to bottom — like a confession. Every line executes in order. Variables are labeled evidence bags: you write a name, put something in it. But here's the twist — the TYPE can change. x = 5 one moment, x = \\"5\\" the next. That's dynamic typing. Input from the world always arrives as a STRING — you must CONVERT it with int() or float() to do math. Miss that, and your case falls apart.",
        keyPoints: ["Variables are dynamically typed — they can change type","input() always returns a string — convert with int() or float()","// is integer division, % is remainder, ** is exponent","Python executes top-to-bottom, one line at a time"],
        clue: "The first page reads: 'The key is in the sequence. Don't skip ahead.'"
      },
      storyProgress: "You've decoded the first notebook. Inside: a coffee-stained receipt from a diner called THE WARM LOOP.",
      questions: [
        { type: "output", timeLimit: 25, q: "What prints?\\n\\nx = 5\\ny = x\\nx = 10\\nprint(y)", answer: "5", hint: "Integers are immutable. y holds a copy of the value, not a reference." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nprint(5 // 2 + 5 % 2)", answer: "3", hint: "5 // 2 is 2. 5 % 2 is 1." },
        { type: "output", timeLimit: 25, q: "What prints?\\n\\nx = 3\\nx **= 2\\nx //= 2\\nprint(x)", answer: "4", hint: "3 squared is 9. 9 // 2 is..." },
        { type: "multiselect", timeLimit: 30, q: "Select all valid variable names in Python:", options: ["_my_var", "2nd_var", "myVar2", "class"], answer: [0, 2], hint: "Cannot start with number, cannot be reserved keyword." },
        { type: "debug", timeLimit: 25, q: "What's the error?\\n\\nx = input('Age: ')\\ny = x + 5", options: ["SyntaxError", "TypeError", "ValueError", "NameError"], answer: 1, hint: "input() returns a string." },
        { type: "spot_error", timeLimit: 25, q: "Click the line with the bug in this swap attempt:", lines: [
            "a = 5",
            "b = 10",
            "temp = a",
            "a = b",
            "b = a"
          ], errorLine: 4, hint: "To swap, b should be assigned temp, not a." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\na = \\"10\\"\\nb = 2\\nprint(int(a) * b)", answer: "20", hint: "Convert string to int first." },
        { type: "mcq", timeLimit: 20, q: "What is the type of the result of 10 / 2?", options: ["int", "float", "str", "bool"], answer: 1, hint: "True division (/) always returns a float." }
      ]
    },
    {
      id: 2, title: "CHAPTER II: SELECTION", subtitle: "Notebook #2 — Found at The Warm Loop Diner", scene: "diner",
      objective: "Navigate the diner. Interrogate the waitress.",
      enemy: { name: "LOCKED DOOR", maxHp: 11 },
      lesson: {
        intro: "Inside the diner, the waitress slides you a notebook Elena left behind. The Professor flips it open.",
        teacher: "This is where Python makes DECISIONS, detective. if, elif, else — these are the branches of logic. Python uses INDENTATION to define blocks, not braces like some other languages. Whitespace matters. And watch the COLONS at the end of conditions — forget one and the whole thing collapses. For multiple possibilities, elif is your friend. For comparing equality, you need ==, not a single =. A single = is assignment, like a label on evidence.",
        keyPoints: ["Indentation (not braces) defines code blocks","Conditions end with a colon :","== compares, = assigns — never confuse them","and, or, not are logical operators","Order matters in if/elif chains"],
        clue: "The second notebook contains a photograph — a warehouse at the edge of town. Marked on the map: THE NESTED BLOCK."
      },
      storyProgress: "Professor Bytecode studies the photograph. 'I know this place. Abandoned server farm. We should go — but carefully.'",
      questions: [
        { type: "multiselect", timeLimit: 30, q: "Which of the following evaluate to True? (Select ALL)", options: ["5 > 3", "10 == '10'", "bool(0)", "not False"], answer: [0, 3], hint: "Two of these are True. 0 is falsy, string vs int is false." },
        { type: "mcq", timeLimit: 20, q: "Which keyword is used for multi-branch decision making?", options: ["switch", "case", "elif", "else if"], answer: 2, hint: "Python's specific keyword — four letters." },
        { type: "mcq", timeLimit: 20, q: "Which operator checks equality?", options: ["=", "==", "===", "equals"], answer: 1, hint: "Double it up. Single equals is assignment." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nx = 3\\nif x > 5:\\n    print(\\"A\\")\\nelif x > 2:\\n    print(\\"B\\")", answer: "B", hint: "3 is not greater than 5, but is it greater than 2?" },
        { type: "truefalse", timeLimit: 15, q: "Indentation defines code blocks in Python.", answer: true, hint: "Python doesn't use curly braces." },
        { type: "truefalse", timeLimit: 15, q: "else can exist without an if statement.", answer: false, hint: "else is ALWAYS attached to something." },
        { type: "fillblank", timeLimit: 20, q: "Complete the condition to check adulthood:\\nif age ___ 18:", answer: ">=", hint: "Greater than OR equal to." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nprint(10 > 5 and 3 < 1)", answer: "False", hint: "'and' needs BOTH sides true." },
        { type: "debug", timeLimit: 20, q: "What's the error?\\n\\nx = 5\\nif x > 3\\n    print(\\"Yes\\")", options: ["Missing colon after condition", "x should be a string", "print needs quotes", "if should be IF"], answer: 0, hint: "Every condition needs something at the end..." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nx = 0\\nif x:\\n    print(\\"True\\")\\nelse:\\n    print(\\"False\\")", answer: "False", hint: "Is 0 truthy or falsy in Python?" },
        { type: "spot_error", timeLimit: 25, q: "Click the line with the indentation error:", lines: [
            "x = 10",
            "if x > 5:",
            "print('big')",
            "else:",
            "    print('small')"
          ], errorLine: 2, hint: "The block after 'if' must be indented by 4 spaces." },
        { type: "memory_match", timeLimit: 60, q: "Flip cards to match each keyword with its role:", pairs: [
            { concept: "if", def: "First condition check" },
            { concept: "elif", def: "Extra condition branch" },
            { concept: "else", def: "Default fallback" },
            { concept: "not", def: "Inverts a boolean" }
          ], hint: "These are Python's decision-making keywords." }
      ]
    },
    {
      id: 3, title: "CHAPTER III: THE ITERATION", subtitle: "Notebook #3 — Locked in the Warehouse Safe", scene: "warehouse",
      objective: "Crack the warehouse safe. Break the infinite loop.",
      enemy: { name: "SECURITY DRONE", maxHp: 11 },
      lesson: {
        intro: "The warehouse is dark. Professor Bytecode cracks the safe on his third try. Inside: Notebook #3, its pages marked with loops of red ink.",
        teacher: "LOOPS, detective. Repetition. When you know how many times — use for with range(). When you're waiting for a condition — use while. But be CAREFUL. A while loop without an update is an INFINITE LOOP — your program will hang forever. range(5) gives you 0,1,2,3,4 — not 1 to 5. Off-by-one errors have sunk many cases. break stops a loop cold. continue skips to the next iteration. Master these or drown.",
        keyPoints: ["for loops are for KNOWN iteration counts","while loops run WHILE a condition is true","range(n) produces 0 to n-1","range(start, stop, step) — step can be negative","break exits the loop, continue skips to next iteration"],
        clue: "Inside the notebook: coordinates. A lighthouse on the coast. STRING'S END LIGHTHOUSE."
      },
      storyProgress: "The Professor's hands shake as he reads. 'Elena was investigating a criminal network that hides messages in code. We have to hurry.'",
      questions: [
        { type: "mcq", timeLimit: 20, q: "Which loop is best when the number of iterations is known beforehand?", options: ["while", "for", "do-while", "repeat"], answer: 1, hint: "It's for a FIXED number of iterations." },
        { type: "mcq", timeLimit: 20, q: "What does range(2, 8, 2) generate?", options: ["2,3,4,5,6,7", "2,4,6", "1,3,5,7", "2,4,6,8"], answer: 1, hint: "Start at 2, stop BEFORE 8, step by 2." },
        { type: "mcq", timeLimit: 20, q: "Which statement stops a loop immediately?", options: ["stop", "exit", "break", "continue"], answer: 2, hint: "It 'breaks' out of the loop." },
        { type: "truefalse", timeLimit: 15, q: "The continue statement skips the rest of the current iteration.", answer: true, hint: "It jumps ahead — doesn't exit the whole loop." },
        { type: "truefalse", timeLimit: 15, q: "A while loop always executes at least once.", answer: false, hint: "If the condition is false at the START..." },
        { type: "fillblank", timeLimit: 20, q: "Complete the loop:\\nfor i in ____(5):\\n    print(i)", answer: "range", hint: "Generates a sequence of numbers." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nfor i in range(1,4):\\n    print(i, end=\\" \\")", answer: "1 2 3", hint: "range(1,4) stops BEFORE 4. end=\\" \\" means space separator." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ntotal = 0\\nfor i in range(1,5):\\n    total += i\\nprint(total)", answer: "10", hint: "Add 1 + 2 + 3 + 4." },
        { type: "debug", timeLimit: 20, q: "What's wrong?\\n\\ni = 1\\nwhile i <= 5:\\n    print(i)", options: ["Missing colon", "Infinite loop — i never increments", "Should use for instead", "print is wrong"], answer: 1, hint: "What happens to i inside the loop?" },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nresult = [x**2 for x in range(5) if x % 2 == 0]\\nprint(result)", answer: "[0, 4, 16]", hint: "List comprehension: squares of even numbers 0-4. Even numbers: 0,2,4." },
        { type: "code_combat", timeLimit: 45, q: "ACTION PHASE!\\nCommand the detective to attack the drone exactly 3 times using a loop.\\nHint: Use range() and indented detective.attack()", answer: 3, hint: "for iter in range(3):\\n    detective.attack()" },
        { type: "drag_drop", timeLimit: 45, q: "Match each loop keyword/expression to what it does:", pairs: [
            { term: "break", def: "Exit the loop immediately" },
            { term: "continue", def: "Skip to next iteration" },
            { term: "range(5)", def: "Generates 0, 1, 2, 3, 4" },
            { term: "else (after loop)", def: "Runs if loop was not broken" }
          ], hint: "Think about what each keyword does to loop flow." },
        { type: "spot_error", timeLimit: 25, q: "Click the line that creates an infinite loop:", lines: [
            "count = 0",
            "while count < 5:",
            "    print(count)",
            "    count == count + 1"
          ], errorLine: 3, hint: "== is comparison, not assignment. count never changes!" }
      ]
    },
    {
      id: 4, title: "CHAPTER IV: THE STRINGS", subtitle: "Notebook #4 — Hidden in the Lighthouse Beam", scene: "lighthouse",
      objective: "Climb the lighthouse. Reverse the encrypted message.",
      enemy: { name: "CIPHERED MESSAGE", maxHp: 11 },
      lesson: {
        intro: "The lighthouse keeper is nowhere to be found. In the light mechanism itself, taped to the rotating beam: Notebook #4.",
        teacher: "Strings, detective. Text. In Python, strings are IMMUTABLE — once created, you cannot change a single character. You must build a new one. You access characters by INDEX — starting at ZERO. Negative indices count from the end — word[-1] is the last character. Slicing, word[1:4], gives you characters 1, 2, 3 — NOT 4. The stop index is exclusive. And word[::-1] — that reverses the whole string. A favorite trick of our criminal.",
        keyPoints: ["Strings are IMMUTABLE — cannot be modified in place","Indexing starts at 0, negative indices count from the end","Slicing [start:stop:step] — stop is EXCLUSIVE","[::-1] reverses a string","len() returns the character count","String comparison is character-by-character (lexicographic)"],
        clue: "The notebook's last page: 'If you've come this far, you know what I was investigating. Go to the old library.'"
      },
      storyProgress: "Professor Bytecode's face goes pale. 'The library... that's where she started. We're going in circles.'",
      questions: [
        { type: "mcq", timeLimit: 20, q: "Which statement about strings is TRUE?", options: ["Strings are mutable", "Strings are unordered", "Strings are immutable", "Strings store only numbers"], answer: 2, hint: "Try changing a single character and see what happens." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nword = \\"Python\\"\\nprint(word[1])", answer: "y", hint: "Index 0 is 'P'. What's index 1?" },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nword = \\"Python\\"\\nprint(word[-1])", answer: "n", hint: "Negative indexing counts from the end. -1 is the LAST character." },
        { type: "debug", timeLimit: 20, q: "What's wrong?\\n\\ntext = \\"hello\\"\\ntext[0] = \\"H\\"", options: ["hello is a reserved word", "Strings are immutable — cannot modify", "Index out of range", "Should use double quotes"], answer: 1, hint: "Can you change a string character directly?" },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nword = \\"mystery\\"\\nprint(word[::2])", answer: "msey", hint: "[::2] takes every 2nd character, starting from 0." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ntext = \\"hello\\"\\nprint(text[::-1])", answer: "olleh", hint: "[::-1] reverses the string." },
        { type: "fillblank", timeLimit: 20, q: "Print the length of name:\\nname = \\"Python\\"\\nprint(____(name))", answer: "len", hint: "Three-letter function." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nprint(\\"2\\" > \\"10\\")", answer: "True", hint: "String comparison is character-by-character. '2' vs '1'..." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ns = 'abcde'\\nprint(s[1:4])", answer: "bcd", hint: "Slice from index 1 up to (not including) 4." },
        { type: "drag_drop", timeLimit: 45, q: "For word = 'Python', match each expression to its result:", pairs: [
            { term: "word[0]", def: "P" },
            { term: "word[-1]", def: "n" },
            { term: "word[::-1]", def: "nohtyP" },
            { term: "word[1:4]", def: "yth" }
          ], hint: "Index 0 = first char. Negative counts from end." },
        { type: "spot_error", timeLimit: 25, q: "Click the line that causes a TypeError:", lines: [
            "text = 'hello'",
            "upper = text.upper()",
            "text[0] = 'H'",
            "print(upper)"
          ], errorLine: 2, hint: "Strings are immutable — you cannot assign to an index." },
        { type: "arrange", timeLimit: 50, q: "Click the lines in the correct order to reverse and uppercase a string:", lines: [
            "result = s[::-1].upper()",
            "s = 'python'",
            "print(result)"
          ], answer: [1, 0, 2], hint: "Assign the string first, then process it, then print." }
      ]
    },
    {
      id: 5, title: "CHAPTER V: THE FIREWALL", subtitle: "Mid-Boss — The Server Room", scene: "warehouse",
      objective: "Defeat the rogue Firewall using loops and logic.",
      enemy: { name: "ROGUE FIREWALL", maxHp: 20 },
      lesson: {
        intro: "Alarms blare. A massive firewall blocks your path to the deeper archives.",
        teacher: "This is a boss encounter, detective. You must combine everything you've learned: variables, logic, loops, and strings. You'll need to be fast and accurate. The sequence is ruthless.",
        keyPoints: ["Combine loops and logic", "Time limits are tight", "Execute precise code attacks"],
        clue: "The firewall shatters, revealing a hidden stairwell down to the true archive."
      },
      storyProgress: "You breach the firewall. The air grows cold as you descend.",
      questions: [
        { type: "code_combat", timeLimit: 60, q: "ACTION PHASE!\\nThe Firewall's shield pulses! Attack exactly 5 times!\\nUse a loop.", answer: 5, hint: "for i in range(5):\\n    detective.attack()" },
        { type: "arrange", timeLimit: 60, q: "Click lines in order to find the sum of even numbers 1 to 10:", lines: [
            "total = 0",
            "for i in range(1, 11):",
            "    if i % 2 == 0:",
            "        total += i",
            "print(total)"
          ], answer: [0, 1, 2, 3, 4], hint: "Initialize, loop, check even, add, print." },
        { type: "output", timeLimit: 30, q: "What prints?\\n\\ns = 'FIREWALL'\\nprint(s[1:5][::-1])", answer: "WERI", hint: "s[1:5] is 'IREW'. Reversed is 'WERI'." }
      ]
    },
    {
      id: 6, title: "CHAPTER VI: LISTS & TUPLES", subtitle: "Notebook #5 — The Library's Hidden Room", scene: "library",
      objective: "Find the hidden room. Unravel the final truth.",
      enemy: { name: "THE GHOST PROTOCOL", maxHp: 11 },
      lesson: {
        intro: "Behind a bookshelf in the old library, a hidden room. Dust everywhere. On a table — the fifth notebook and a recording device.",
        teacher: "The final concept, detective. COLLECTIONS. Lists — mutable, flexible, written with square brackets [1, 2, 3]. Tuples — IMMUTABLE, fixed, written with parentheses (1, 2, 3). Use lists when things change. Use tuples when they must not. And one warning — when you write b = a, you don't COPY the list. You share it. Change b, and a changes too. That's REFERENCE behavior. It's how the criminal hid the truth in plain sight.",
        keyPoints: ["Lists are MUTABLE — use [] and methods like append(), remove()","Tuples are IMMUTABLE — use () — no modification methods","b = a shares the reference — not a copy!","Use b = a[:] or list(a) to make a real copy","Nested lists: matrix[row][col]","list * n repeats the list n times"],
        clue: "You press PLAY on the recorder. Elena's voice: 'I'm alive. The archive — floor B. The evidence room holds everything.'"
      },
      storyProgress: "Professor Bytecode pats you on the shoulder. 'She's alive. The archive and evidence room — those are our next stops.'",
      questions: [
        { type: "multiselect", timeLimit: 30, q: "Select all the statements that describe a Python List accurately:", options: ["Lists are immutable", "You create them with square brackets []", "They can hold mixed data types", "Items cannot be appended"], answer: [1, 2], hint: "Lists are dynamic and flexible." },
        { type: "mcq", timeLimit: 20, q: "Which statement is TRUE?", options: ["Lists are immutable", "Tuples are mutable", "Lists are mutable", "Tuples use square brackets"], answer: 2, hint: "Which collection can you modify?" },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nvalues = [10, 20, 30]\\nprint(values[1])", answer: "20", hint: "Index 0 is 10, index 1 is..." },
        { type: "debug", timeLimit: 20, q: "What's wrong?\\n\\nt = (1, 2, 3)\\nt[0] = 10", options: ["Tuples are immutable", "Should use square brackets", "Index out of range", "Missing colon"], answer: 0, hint: "What's special about tuples?" },
        { type: "output", timeLimit: 20, q: "TRICKY! What prints?\\n\\na = [1, 2, 3]\\nb = a\\nb[0] = 10\\nprint(a)", answer: "[10, 2, 3]", hint: "b = a doesn't copy — both point to the SAME list." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nnumbers = [1, 2, 3]\\nnumbers.append([4, 5])\\nprint(len(numbers))", answer: "4", hint: "append() adds ONE item — the list [4,5] is one item." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ndata = [1, 2, 3, 4]\\nprint(data[1:3])", answer: "[2, 3]", hint: "Slice from index 1 up to (not including) 3." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nmatrix = [[1, 2], [3, 4]]\\nprint(matrix[1][0])", answer: "3", hint: "matrix[1] is [3,4]. Then [0] gives the first element." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\na = [1, 2, 3]\\nb = a[:]\\nb[0] = 99\\nprint(a[0])", answer: "1", hint: "a[:] creates a COPY. Modifying b does not affect a." },
        { type: "memory_match", timeLimit: 60, q: "Flip cards to match each list method with what it does:", pairs: [
            { concept: "append(x)", def: "Add x to the end" },
            { concept: "remove(x)", def: "Delete first occurrence of x" },
            { concept: "pop()", def: "Remove and return last item" },
            { concept: "sort()", def: "Order elements in-place" }
          ], hint: "These are the most common Python list methods." },
        { type: "spot_error", timeLimit: 25, q: "Click the line that raises an AttributeError:", lines: [
            "coords = (10, 20, 30)",
            "x = coords[0]",
            "coords.append(40)",
            "print(x, coords)"
          ], errorLine: 2, hint: "Tuples are immutable — they have no append method." },
        { type: "arrange", timeLimit: 50, q: "Click in correct order to remove duplicates from a list:", lines: [
            "nums = [1, 2, 2, 3, 3, 3]",
            "unique = list(set(nums))",
            "unique.sort()",
            "print(unique)"
          ], answer: [0, 1, 2, 3], hint: "Declare first, convert to set to remove duplicates, then sort, then print." }
      ]
    },
    {
      id: 7, title: "CHAPTER VII: FUNCTIONS", subtitle: "Notebook #6 — The Precinct Archive", scene: "archive",
      objective: "Crack the archive. Master the function vault.",
      enemy: { name: "RECURSIVE TRAP", maxHp: 12 },
      lesson: {
        intro: "Deep in the precinct's basement archive, rows of filing cabinets stretch into darkness. Professor Bytecode finds Notebook #6 inside a drawer labelled CLASSIFIED — FUNCTION SCOPE.",
        teacher: "FUNCTIONS, detective. Reusable blocks of logic. You define them with def, give them a name, list parameters, and use return to send a value back. Without return, Python hands you None — and None has destroyed more cases than I care to remember. Now — SCOPE. Variables inside a function are LOCAL. They do not exist outside. And watch for MUTABLE DEFAULT ARGUMENTS — def f(lst=[]) — that list is created ONCE and shared across ALL calls. It will haunt you.",
        keyPoints: ["def name(params): defines a function","return sends a value back — without it, None is returned","Parameters are LOCAL — they don't exist outside the function","Mutable default arguments are shared across ALL calls — a classic trap","lambda x: x*2 is a single-expression anonymous function","*args collects extra positional arguments into a tuple"],
        clue: "In the back of the drawer: a key card. Stamped: EVIDENCE ROOM — FLOOR B."
      },
      storyProgress: "Professor Bytecode stares at the key card. 'This is Elena's. She was here recently. The evidence room — that's where the final answer is.'",
      questions: [
        { type: "mcq", timeLimit: 20, q: "What keyword is used to define a function in Python?", options: ["function", "define", "def", "func"], answer: 2, hint: "Three letters — an abbreviation." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ndef f(x):\\n    x + 1\\n\\nprint(f(5))", answer: "None", hint: "No return statement — the function returns None automatically." },
        { type: "truefalse", timeLimit: 15, q: "A function with no return statement returns None.", answer: true, hint: "Python always returns something. Without return, it's None." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nx = 'global'\\ndef test():\\n    x = 'local'\\ntest()\\nprint(x)", answer: "global", hint: "Assigning x inside a function creates a LOCAL variable. The outer x is untouched." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ndef greet(name='World'):\\n    return 'Hi ' + name\\n\\nprint(greet())", answer: "Hi World", hint: "No argument passed — the default value 'World' is used." },
        { type: "output", timeLimit: 25, q: "CLASSIC TRAP! What prints?\\n\\ndef add(lst=[]):\\n    lst.append(1)\\n    return lst\\n\\nprint(add())\\nprint(add())", answer: "[1]\\n[1, 1]", hint: "Default list is created ONCE and shared across calls. This is a famous Python gotcha!" },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nf = lambda x, y: x ** y\\nprint(f(3, 3))", answer: "27", hint: "Lambda: f(3,3) = 3 ** 3 = 27." },
        { type: "debug", timeLimit: 20, q: "What is the bug?\\n\\ndef square(n):\\n    result = n * n\\n\\nprint(square(4))", options: ["Function is not defined", "Missing return — prints None", "n is not a valid parameter name", "print is outside the function"], answer: 1, hint: "The function computes result but never returns it." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\ndef total(*nums):\\n    return sum(nums)\\n\\nprint(total(1, 2, 3, 4))", answer: "10", hint: "*nums collects all arguments into a tuple. sum() adds them all." },
        { type: "arrange", timeLimit: 60, q: "Click the lines in correct order to write a working recursive factorial:", lines: [
            "def factorial(n):",
            "    if n == 0: return 1",
            "    return n * factorial(n - 1)",
            "print(factorial(5))"
          ], answer: [0, 1, 2, 3], hint: "Define the function body top to bottom, then call it after." },
        { type: "spot_error", timeLimit: 25, q: "Click the line that causes a NameError:", lines: [
            "result = double(10)",
            "def double(x):",
            "    return x * 2",
            "print(result)"
          ], errorLine: 0, hint: "You cannot call a function before it is defined at module level." },
        { type: "drag_drop", timeLimit: 45, q: "Match each function concept to its description:", pairs: [
            { term: "def", def: "Keyword to define a function" },
            { term: "return", def: "Sends a value back to caller" },
            { term: "lambda", def: "Anonymous single-expression function" },
            { term: "*args", def: "Collects extra arguments as a tuple" }
          ], hint: "Think about what each keyword does in Python functions." }
      ]
    },
    {
      id: 8, title: "CHAPTER VIII: DICTIONARIES", subtitle: "Notebook #7 — The Evidence Room", scene: "evidence_room",
      objective: "Access the evidence database. Decode the final cipher.",
      enemy: { name: "CORRUPTED DATABASE", maxHp: 13 },
      lesson: {
        intro: "The evidence room is cold and fluorescent-lit. Rows of labeled boxes, a whiteboard covered in connection diagrams. On the central table: Notebook #7 and Elena's laptop, still open.",
        teacher: "Dictionaries, detective. The most powerful data structure in the field. Key-value pairs — like an evidence log: badge number maps to name, case ID maps to suspect. You access values with their key: d['key']. But if the key doesn't exist — KeyError. Use d.get('key', default) to avoid the crash. Keys must be IMMUTABLE — strings, numbers, tuples. Not lists — lists change. And in Python 3.7+, dictionaries preserve insertion ORDER.",
        keyPoints: ["d = {'key': value} creates a dict","d['key'] raises KeyError if missing — use d.get('key', default) to be safe","Keys must be immutable (str, int, tuple) — NOT list or dict","Dict comprehension: {k: v for k, v in pairs}","In Python 3.7+, dicts maintain insertion order",".keys(), .values(), .items() return views of the dict"],
        clue: "Elena's laptop shows: 'I mapped every connection. The network is exposed. Case file: SOLVED.'"
      },
      storyProgress: "Case closed. Elena is safe. The criminal network is dismantled. Professor Bytecode lights a pipe. 'Seven chapters, detective. Not bad for one night's work.'",
      questions: [
        { type: "mcq", timeLimit: 20, q: "What is the correct way to create an empty dictionary?", options: ["[]", "()", "{}", "dict[]"], answer: 2, hint: "Curly braces — but empty, with no key-value pairs inside." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nd = {'name': 'Elena', 'age': 35}\\nprint(d['name'])", answer: "Elena", hint: "Access the value stored at key 'name'." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nd = {'a': 1}\\nprint(d.get('b', 99))", answer: "99", hint: "get() returns the default (99) when key 'b' doesn't exist." },
        { type: "truefalse", timeLimit: 15, q: "A Python dictionary can have two identical keys.", answer: false, hint: "Keys are unique. Assigning to an existing key OVERWRITES the value." },
        { type: "truefalse", timeLimit: 15, q: "A list can be used as a dictionary key.", answer: false, hint: "Keys must be hashable (immutable). Lists are mutable — not hashable." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nsquares = {n: n**2 for n in range(4)}\\nprint(squares[3])", answer: "9", hint: "Dict comprehension: key=n, value=n**2. squares[3] = 3**2 = 9." },
        { type: "output", timeLimit: 20, q: "TRICKY! What prints?\\n\\nd = {'x': [1, 2, 3]}\\nd['x'].append(4)\\nprint(len(d['x']))", answer: "4", hint: "The list inside the dict is a reference. append() mutates it directly." },
        { type: "debug", timeLimit: 20, q: "What error occurs?\\n\\nd = {'a': 1, 'b': 2}\\nprint(d['c'])", options: ["TypeError", "ValueError", "KeyError", "IndexError"], answer: 2, hint: "Accessing a missing key with [] raises a KeyError." },
        { type: "output", timeLimit: 20, q: "What prints?\\n\\nd1 = {'a': 1, 'b': 2}\\nd2 = {'b': 3, 'c': 4}\\nmerged = {**d1, **d2}\\nprint(merged['b'])", answer: "3", hint: "When merging with **, later values overwrite earlier ones for the same key. d2's 'b' wins." },
        { type: "arrange", timeLimit: 60, q: "Click in correct order to build a word-frequency counter:", lines: [
            "words = ['the', 'cat', 'the', 'dog']",
            "freq = {}",
            "for w in words:",
            "    freq[w] = freq.get(w, 0) + 1",
            "print(freq)"
          ], answer: [0, 1, 2, 3, 4], hint: "Declare data, then empty dict, then the loop body, then print." },
        { type: "drag_drop", timeLimit: 45, q: "Match each dict method to what it returns or does:", pairs: [
            { term: ".keys()", def: "View of all keys" },
            { term: ".values()", def: "View of all values" },
            { term: ".items()", def: "View of (key, value) pairs" },
            { term: ".pop(k)", def: "Remove and return value at k" }
          ], hint: "Think about what information each method gives you." },
        { type: "memory_match", timeLimit: 60, q: "Match each dict method with what it does:", pairs: [
            { concept: "get(k, d)", def: "Safe access with default" },
            { concept: "update(d2)", def: "Merge d2 into dict in-place" },
            { concept: "pop(k)", def: "Remove key, return value" },
            { concept: "keys()", def: "View of all keys" }
          ], hint: "These are the most important Python dict methods." },
        { type: "spot_error", timeLimit: 25, q: "Click the line that raises a TypeError:", lines: [
            "evidence = {}",
            "key = [1, 2, 3]",
            "evidence[key] = 'clue'",
            "print(evidence)"
          ], errorLine: 2, hint: "Lists are unhashable — they cannot be used as dict keys." }
      ]
    },
    {
      id: 9, title: "CHAPTER IX: THE MASTERMIND", subtitle: "Final Boss — The Core", scene: "evidence_room",
      objective: "Defeat the Mastermind and recover Dr. Variable.",
      enemy: { name: "THE MASTERMIND", maxHp: 25 },
      lesson: {
        intro: "At the center of the archive, a holographic projection of a cloaked figure appears. The Mastermind.",
        teacher: "This is it, detective. The culmination of your training. Dictionaries, lists, functions, loops... use them all. Do not falter.",
        keyPoints: ["No room for error", "Mastery of all concepts required"],
        clue: "The hologram fades. Behind it, Dr. Variable is tied to a chair. 'You did it,' she says."
      },
      storyProgress: "The Mastermind is defeated. The system is secure.",
      questions: [
        { type: "code_combat", timeLimit: 45, q: "ACTION PHASE!\\nThe Mastermind summons 7 proxies. Attack them all!\\nUse a loop.", answer: 7, hint: "for i in range(7):\\n    detective.attack()" },
        { type: "output", timeLimit: 30, q: "What prints?\\n\\ndef f(x, lst=[]):\\n    lst.append(x)\\n    return lst\\n\\nprint(f(1))\\nprint(f(2))", answer: "[1]\\n[1, 2]", hint: "Mutable default arguments trap!" },
        { type: "spot_error", timeLimit: 30, q: "Spot the error that crashes the master script:", lines: [
            "data = {'key': 'value'}",
            "keys = data.keys()",
            "keys.append('new_key')",
            "print(keys)"
          ], errorLine: 2, hint: "dict.keys() returns a view object, not a list. It has no append method." }
      ]
    }
  ],
  outro: {
    title: "CASE CLOSED",
    text: [
      "You step out of the precinct into the morning light. The rain has finally stopped.",
      "Professor Bytecode lights a pipe. 'Python is a language, detective. But it's also a way of thinking. Every problem is just a sequence of decisions, loops, strings, collections, and functions. You've learned them all.'",
      "Nine chapters. One case closed.",
      "But there are always more cases. More mysteries hidden in code.",
      "You'll be ready."
    ]
  }
};
"""

with open('src/data/story.js', 'w', encoding='utf-8') as f:
    f.write(new_story)

print("Done.")
