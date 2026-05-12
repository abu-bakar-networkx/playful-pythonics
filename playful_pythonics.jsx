import React, { useState, useEffect, useRef } from 'react';

// ============ GAME NAME ============
const GAME_NAME = "PLAYFUL PYTHONICS";
const GAME_TAGLINE = "The Case of the Vanishing Variable";

// ============ STORY DATA ============
const STORY = {
  intro: {
    title: "THE CASE OF THE VANISHING VARIABLE",
    location: "Precinct 404 — 11:47 PM",
    text: [
      "The rain hadn't stopped for three days. I was nursing cold coffee when the file hit my desk.",
      "A programmer gone missing. Dr. Elena Variable — the city's top Python researcher — vanished from her lab last night. No signs of struggle. Just an empty terminal, a half-eaten sandwich, and five encrypted notebooks.",
      "The Captain paired me with Professor Bytecode, an old academic with more degrees than sense. 'You'll need him,' she said. 'These notebooks... they're written in code.'",
      "Five chapters. Five locked secrets. And somewhere in between — the truth about what happened to Elena."
    ]
  },
  chapters: [
    {
      id: 1, title: "CHAPTER I: THE SEQUENCE", subtitle: "Notebook #1 — Recovered from the Lab", scene: "lab",
      objective: "Decode the lab terminal. Unlock the first notebook.",
      enemy: { name: "CORRUPTED TERMINAL", maxHp: 10 },
      lesson: {
        intro: "Professor Bytecode adjusts his spectacles and lays the first notebook on the table.",
        teacher: "Listen carefully, detective. Python reads top to bottom — like a confession. Every line executes in order. Variables are labeled evidence bags: you write a name, put something in it. But here's the twist — the TYPE can change. x = 5 one moment, x = \"5\" the next. That's dynamic typing. Input from the world always arrives as a STRING — you must CONVERT it with int() or float() to do math. Miss that, and your case falls apart.",
        keyPoints: ["Variables are dynamically typed — they can change type","input() always returns a string — convert with int() or float()","// is integer division, % is remainder, ** is exponent","Python executes top-to-bottom, one line at a time"],
        clue: "The first page reads: 'The key is in the sequence. Don't skip ahead.'"
      },
      storyProgress: "You've decoded the first notebook. Inside: a coffee-stained receipt from a diner called THE WARM LOOP.",
      questions: [
        { type: "mcq", q: "Which statement about Python variables is TRUE?", options: ["Variables must be declared before use", "Variables store memory addresses only", "Variables are dynamically typed", "Variable type cannot change"], answer: 2, hint: "Think about whether x = 5 then x = 'hello' would work." },
        { type: "mcq", q: "What will be the type of x after execution?\n\nx = 5\nx = \"5\"", options: ["int", "str", "float", "error"], answer: 1, hint: "Look at the LAST assignment." },
        { type: "mcq", q: "Which operator performs integer division?", options: ["/", "//", "%", "**"], answer: 1, hint: "Double it up." },
        { type: "truefalse", q: "The input() function always returns a string.", answer: true, hint: "Even if the user types 42..." },
        { type: "fillblank", q: "Convert user input to integer:\nage = input(\"Age:\")\nage = ____(age)", answer: "int", hint: "Three letters. It's a type." },
        { type: "output", q: "What prints?\n\nx = 4\ny = 2\nprint(x ** y)", answer: "16", hint: "** is exponent. 4 to the power of 2." },
        { type: "output", q: "What prints?\n\nprint(10 % 4 + 6)", answer: "8", hint: "% is remainder. 10 divided by 4 leaves what?" },
        { type: "output", q: "What prints?\n\na = \"5\"\nb = 2\nprint(a * b)", answer: "55", hint: "String times integer = repetition." },
        { type: "debug", q: "What's wrong?\n\nage = input(\"Age:\")\nprint(age + 5)", options: ["Missing semicolon", "input() returns string, can't add int", "Variable name is reserved", "print() is spelled wrong"], answer: 1, hint: "What type does input() return?" },
        { type: "mcq", q: "Which line correctly prints text and number?", options: ["print(\"Age:\" + 20)", "print(\"Age:\", 20)", "print(\"Age:\" 20)", "print(Age, 20)"], answer: 1, hint: "Commas separate arguments in print()." },
        { type: "multiselect", q: "Which of the following are valid Python variable names? (Select ALL that apply)", options: ["my_age", "1stName", "_score", "my-var", "total2", "class"], answer: [0, 2, 4], hint: "Names can't start with digits, contain hyphens, or be reserved keywords." },
        { type: "multiselect", q: "Which statements about Python arithmetic are TRUE? (Select ALL that apply)", options: ["10 / 3 returns 3 (integer)", "10 // 3 returns 3", "2 ** 8 means 2 × 8", "10 % 3 returns 1", "float() converts string to decimal"], answer: [1, 3, 4], hint: "/ always returns float, // is integer division, ** is exponent, % is remainder." }
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
        { type: "mcq", q: "Which keyword is used for multi-branch decision making?", options: ["switch", "case", "elif", "else if"], answer: 2, hint: "Python's specific keyword — four letters." },
        { type: "mcq", q: "Which operator checks equality?", options: ["=", "==", "===", "equals"], answer: 1, hint: "Double it up. Single equals is assignment." },
        { type: "mcq", q: "Which condition evaluates to True?", options: ["5 < 3", "5 != 5", "5 >= 2", "2 > 10"], answer: 2, hint: "'Greater than or equal to' — which one is actually true?" },
        { type: "truefalse", q: "Indentation defines code blocks in Python.", answer: true, hint: "Python doesn't use curly braces." },
        { type: "truefalse", q: "else can exist without an if statement.", answer: false, hint: "else is ALWAYS attached to something." },
        { type: "fillblank", q: "Complete the condition to check adulthood:\nif age ___ 18:", answer: ">=", hint: "Greater than OR equal to." },
        { type: "output", q: "What prints?\n\nx = 3\nif x > 5:\n    print(\"A\")\nelif x > 2:\n    print(\"B\")", answer: "B", hint: "3 is not greater than 5, but is it greater than 2?" },
        { type: "output", q: "What prints?\n\nprint(10 > 5 and 3 < 1)", answer: "False", hint: "'and' needs BOTH sides true." },
        { type: "debug", q: "What's the error?\n\nx = 5\nif x > 3\n    print(\"Yes\")", options: ["Missing colon after condition", "x should be a string", "print needs quotes", "if should be IF"], answer: 0, hint: "Every condition needs something at the end..." },
        { type: "output", q: "What prints?\n\nx = 0\nif x:\n    print(\"True\")\nelse:\n    print(\"False\")", answer: "False", hint: "Is 0 truthy or falsy in Python?" },
        { type: "fillblank", q: "Write the condition to check if num is between 10 and 20 inclusive.\n\n____ <= num <= ____", answer: "10 20", hint: "Two numbers, separated by a space.", custom: (input) => input.trim().replace(/\s+/g, ' ') === "10 20" },
        { type: "multiselect", q: "Which statements about Python's if/elif/else are TRUE? (Select ALL that apply)", options: ["Indentation defines code blocks", "Curly braces {} define blocks", "Colons : are required after conditions", "elif can appear multiple times", "else is mandatory with every if"], answer: [0, 2, 3], hint: "Python uses whitespace, not braces. elif is optional and repeatable." },
        { type: "multiselect", q: "Which expressions evaluate to True in Python? (Select ALL that apply)", options: ["5 > 3", "0 == False", "not False", "5 != 5", "'a' < 'b'"], answer: [0, 1, 2, 4], hint: "0 equals False in Python. 'a' comes before 'b' lexicographically." }
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
        { type: "mcq", q: "Which loop is best when the number of iterations is known beforehand?", options: ["while", "for", "do-while", "repeat"], answer: 1, hint: "It's for a FIXED number of iterations." },
        { type: "mcq", q: "What does range(2, 8, 2) generate?", options: ["2,3,4,5,6,7", "2,4,6", "1,3,5,7", "2,4,6,8"], answer: 1, hint: "Start at 2, stop BEFORE 8, step by 2." },
        { type: "mcq", q: "Which statement stops a loop immediately?", options: ["stop", "exit", "break", "continue"], answer: 2, hint: "It 'breaks' out of the loop." },
        { type: "truefalse", q: "The continue statement skips the rest of the current iteration.", answer: true, hint: "It jumps ahead — doesn't exit the whole loop." },
        { type: "truefalse", q: "A while loop always executes at least once.", answer: false, hint: "If the condition is false at the START..." },
        { type: "fillblank", q: "Complete the loop:\nfor i in ____(5):\n    print(i)", answer: "range", hint: "Generates a sequence of numbers." },
        { type: "output", q: "What prints?\n\nfor i in range(1,4):\n    print(i, end=\" \")", answer: "1 2 3", hint: "range(1,4) stops BEFORE 4. end=\" \" means space separator." },
        { type: "output", q: "What prints?\n\nprint(list(range(3)))", answer: "[0, 1, 2]", hint: "range(3) means 0, 1, 2 — as a list." },
        { type: "debug", q: "What's wrong?\n\ni = 1\nwhile i <= 5:\n    print(i)", options: ["Missing colon", "Infinite loop — i never increments", "Should use for instead", "print is wrong"], answer: 1, hint: "What happens to i inside the loop?" },
        { type: "output", q: "What prints?\n\ntotal = 0\nfor i in range(1,5):\n    total += i\nprint(total)", answer: "10", hint: "Add 1 + 2 + 3 + 4." },
        { type: "fillblank", q: "Complete to print 5 4 3 2 1:\nfor i in range(5, 0, ____):", answer: "-1", hint: "Counting backwards means a negative step." },
        { type: "multiselect", q: "Which statements about Python loops are TRUE? (Select ALL that apply)", options: ["range(5) produces [1,2,3,4,5]", "break exits the entire loop", "continue skips the current iteration", "while loops always run at least once", "for can iterate over a string"], answer: [1, 2, 4], hint: "range(5) starts at 0. while checks condition before running. for works on any iterable." },
        { type: "multiselect", q: "Which of these could cause an infinite loop? (Select ALL that apply)", options: ["while True: pass", "for i in range(10): break", "i = 0\nwhile i < 5: print(i)", "while x > 0: x -= 1"], answer: [0, 2], hint: "A loop is infinite if its exit condition is never reached." }
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
        { type: "mcq", q: "Which statement about strings is TRUE?", options: ["Strings are mutable", "Strings are unordered", "Strings are immutable", "Strings store only numbers"], answer: 2, hint: "Try changing a single character and see what happens." },
        { type: "truefalse", q: "Strings can be enclosed in either single or double quotes.", answer: true, hint: "Python is flexible — 'hi' and \"hi\" are both valid." },
        { type: "output", q: "What prints?\n\nword = \"Python\"\nprint(word[1])", answer: "y", hint: "Index 0 is 'P'. What's index 1?" },
        { type: "output", q: "What prints?\n\nword = \"Python\"\nprint(word[-1])", answer: "n", hint: "Negative indexing counts from the end. -1 is the LAST character." },
        { type: "debug", q: "What's wrong?\n\ntext = \"hello\"\ntext[0] = \"H\"", options: ["hello is a reserved word", "Strings are immutable — cannot modify", "Index out of range", "Should use double quotes"], answer: 1, hint: "Can you change a string character directly?" },
        { type: "output", q: "What prints?\n\nword = \"mystery\"\nprint(word[::2])", answer: "msey", hint: "[::2] takes every 2nd character, starting from 0." },
        { type: "output", q: "What prints?\n\nprint(\"Python\"[0:2])", answer: "Py", hint: "Slice from index 0 up to (but not including) 2." },
        { type: "output", q: "What prints?\n\ntext = \"hello\"\nprint(text[::-1])", answer: "olleh", hint: "[::-1] reverses the string." },
        { type: "fillblank", q: "Print the length of name:\nname = \"Python\"\nprint(____(name))", answer: "len", hint: "Three-letter function." },
        { type: "output", q: "What prints?\n\nprint(\"2\" > \"10\")", answer: "True", hint: "String comparison is character-by-character. '2' vs '1'..." },
        { type: "mcq", q: "Which slicing returns \"yth\" from word = \"Python\"?", options: ["word[1:4]", "word[2:4]", "word[1:3]", "word[2:5]"], answer: 0, hint: "'y' is at index 1, 'h' is at index 3." },
        { type: "multiselect", q: "Which are valid Python string operations? (Select ALL that apply)", options: ["'hello' + ' world'", "'hi' * 3", "'abc'[0] = 'Z'", "len('python')", "'UPPER'.lower()"], answer: [0, 1, 3, 4], hint: "Strings are immutable — you cannot assign to an index." },
        { type: "multiselect", q: "Which facts about string indexing are TRUE? (Select ALL that apply)", options: ["Index 0 is the first character", "Index -1 is the last character", "word[1:3] includes index 3", "Slice stop index is exclusive", "Negative indices count from the start"], answer: [0, 1, 3], hint: "Slicing stops BEFORE the stop index. Negative indices count from the END." }
      ]
    },
    {
      id: 5, title: "CHAPTER V: LISTS & TUPLES", subtitle: "Notebook #5 — The Library's Hidden Room", scene: "library",
      objective: "Find the hidden room. Unravel the final truth.",
      enemy: { name: "THE MASTERMIND", maxHp: 11 },
      lesson: {
        intro: "Behind a bookshelf in the old library, a hidden room. Dust everywhere. On a table — the final notebook and a recording device.",
        teacher: "The final concept, detective. COLLECTIONS. Lists — mutable, flexible, written with square brackets [1, 2, 3]. Tuples — IMMUTABLE, fixed, written with parentheses (1, 2, 3). Use lists when things change. Use tuples when they must not. And one warning — when you write b = a, you don't COPY the list. You share it. Change b, and a changes too. That's REFERENCE behavior. It's how the criminal hid the truth in plain sight.",
        keyPoints: ["Lists are MUTABLE — use [] and methods like append(), remove()","Tuples are IMMUTABLE — use () — no modification methods","b = a shares the reference — not a copy!","Nested lists: matrix[row][col]","list * n repeats the list n times","+ concatenates lists"],
        clue: "You press PLAY on the recorder. Elena's voice: 'If you're hearing this, you solved the notebooks. I'm safe. I faked my disappearance to expose the network. Thank you, detective.'"
      },
      storyProgress: "Case closed. Professor Bytecode pats you on the shoulder. 'You did it. Elena Variable is safe, and the criminal network is dismantled.'",
      questions: [
        { type: "mcq", q: "Which statement is TRUE?", options: ["Lists are immutable", "Tuples are mutable", "Lists are mutable", "Tuples use square brackets"], answer: 2, hint: "Which collection can you modify?" },
        { type: "truefalse", q: "Tuples are defined using parentheses ().", answer: true, hint: "Lists use [], tuples use ()." },
        { type: "output", q: "What prints?\n\nvalues = [10, 20, 30]\nprint(values[1])", answer: "20", hint: "Index 0 is 10, index 1 is..." },
        { type: "debug", q: "What's wrong?\n\nt = (1, 2, 3)\nt[0] = 10", options: ["Tuples are immutable", "Should use square brackets", "Index out of range", "Missing colon"], answer: 0, hint: "What's special about tuples?" },
        { type: "output", q: "What prints?\n\nnumbers = [1, 2, 3]\nnumbers.append([4, 5])\nprint(len(numbers))", answer: "4", hint: "append() adds ONE item — the list [4,5] is one item." },
        { type: "output", q: "What prints?\n\ndata = [1, 2, 3, 4]\nprint(data[1:3])", answer: "[2, 3]", hint: "Slice from index 1 up to (not including) 3." },
        { type: "debug", q: "What's wrong?\n\nnumbers = [1, 2, 3]\nnumbers.add(4)", options: ["Lists use append(), not add()", "Missing parentheses", "Index out of range", "Should be numbers.insert()"], answer: 0, hint: "What's the correct list method to add an item?" },
        { type: "mcq", q: "Which creates a tuple?", options: ["[1,2,3]", "{1,2,3}", "(1,2,3)", "<1,2,3>"], answer: 2, hint: "Parentheses." },
        { type: "output", q: "Tricky one. What prints?\n\na = [1, 2, 3]\nb = a\nb[0] = 10\nprint(a)", answer: "[10, 2, 3]", hint: "b = a doesn't copy — both point to the SAME list." },
        { type: "output", q: "What prints?\n\nmatrix = [[1, 2], [3, 4]]\nprint(matrix[1][0])", answer: "3", hint: "matrix[1] is [3,4]. Then [0] gives the first element." },
        { type: "output", q: "What prints?\n\ndata = [1, 2, 3]\nprint(data * 2)", answer: "[1, 2, 3, 1, 2, 3]", hint: "Multiplying a list repeats it." },
        { type: "multiselect", q: "Which operations work on a LIST but NOT a TUPLE? (Select ALL that apply)", options: [".append(x)", "indexing with [0]", ".remove(x)", "len()", ".sort()", "slicing with [:]"], answer: [0, 2, 4], hint: "Tuples are immutable — no method that modifies content works on them." },
        { type: "multiselect", q: "Which statements about lists are TRUE? (Select ALL that apply)", options: ["b = a copies the list", "Lists can hold mixed types", "list + list concatenates", "Lists are immutable", "append() returns the modified list"], answer: [1, 2], hint: "b = a shares a reference. Lists are mutable. append() modifies in-place and returns None." }
      ]
    }
  ],
  outro: {
    title: "CASE CLOSED",
    text: [
      "You step out of the library into the morning light. The rain has finally stopped.",
      "Professor Bytecode lights a pipe. 'Python is a language, detective. But it's also a way of thinking. Every problem is just a sequence of decisions, loops, and data structures. You've learned it.'",
      "Five chapters. Five concepts. One case closed.",
      "But there are always more cases. More notebooks. More mysteries hidden in code.",
      "You'll be ready."
    ]
  }
};

// ============ MAIN GAME ============
export default function PlayfulPythonics() {
  const [screen, setScreen] = useState('title');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [introLineIndex, setIntroLineIndex] = useState(0);
  const [profReaction, setProfReaction] = useState('neutral');
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyHit, setEnemyHit] = useState(false);
  const [detectiveAction, setDetectiveAction] = useState('idle'); // idle, attack, hurt, victory

  useEffect(() => {
    if (screen === 'intro' && introLineIndex < STORY.intro.text.length) {
      const t = setTimeout(() => setIntroLineIndex(i => i + 1), 2000);
      return () => clearTimeout(t);
    }
  }, [screen, introLineIndex]);

  useEffect(() => {
    if (feedback) {
      setProfReaction(feedback.correct ? 'happy' : 'disappointed');
      const t = setTimeout(() => setProfReaction('neutral'), 2000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  // Initialize enemy HP when entering questions
  useEffect(() => {
    if (screen === 'questions') {
      const ch = STORY.chapters[currentChapter];
      setEnemyHp(ch.enemy.maxHp);
    }
  }, [screen, currentChapter]);

  const resetQuestionState = () => {
    setShowHint(false); setFeedback(null); setUserAnswer('');
    setSelectedOption(null); setWrongAttempts(0); setSelectedOptions([]);
  };

  const startGame = () => { setScreen('intro'); setIntroLineIndex(0); };
  const enterChapter = (idx) => {
    setCurrentChapter(idx); setCurrentQuestion(0);
    resetQuestionState(); setScreen('lesson');
  };
  const startQuestions = () => { resetQuestionState(); setScreen('questions'); };

  const checkAnswer = () => {
    const chapter = STORY.chapters[currentChapter];
    const q = chapter.questions[currentQuestion];
    let correct = false;
    if (q.type === 'mcq' || q.type === 'debug') correct = selectedOption === q.answer;
    else if (q.type === 'truefalse') correct = (selectedOption === 0 && q.answer === true) || (selectedOption === 1 && q.answer === false);
    else if (q.type === 'multiselect') {
      const sort = arr => [...arr].sort((a, b) => a - b);
      correct = JSON.stringify(sort(selectedOptions)) === JSON.stringify(sort(q.answer));
    } else if (q.type === 'fillblank' || q.type === 'output') {
      if (q.custom) correct = q.custom(userAnswer);
      else {
        const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
        correct = normalize(userAnswer) === normalize(q.answer);
      }
    }
    setTotalAnswered(t => t + 1);
    if (correct) {
      setScore(s => s + Math.max(10, 30 - wrongAttempts * 10));
      setFeedback({ correct: true, message: getCorrectMessage() });
      // Animate attack + enemy hit
      setDetectiveAction('attack');
      setTimeout(() => setEnemyHit(true), 200);
      setTimeout(() => {
        setEnemyHp(hp => Math.max(0, hp - 1));
        setEnemyHit(false);
        setDetectiveAction('idle');
      }, 700);
    } else {
      setWrongAttempts(w => w + 1);
      setFeedback({ correct: false, message: getWrongMessage(wrongAttempts) });
      setDetectiveAction('hurt');
      setTimeout(() => setDetectiveAction('idle'), 600);
    }
  };

  const getCorrectMessage = () => {
    const msgs = ["Good work, detective.", "The Professor nods approvingly.", "Another piece of the puzzle.", "You're getting sharper.", "Elementary."];
    return msgs[Math.floor(Math.random() * msgs.length)];
  };
  const getWrongMessage = (attempts) => {
    if (attempts === 0) return "Not quite. The Professor frowns.";
    if (attempts === 1) return "Try again. Consider the hint.";
    return "Take your time, detective.";
  };

  const nextQuestion = () => {
    const chapter = STORY.chapters[currentChapter];
    if (currentQuestion + 1 < chapter.questions.length) {
      setCurrentQuestion(q => q + 1);
      resetQuestionState();
    } else {
      setDetectiveAction('victory');
      if (!completedChapters.includes(currentChapter)) {
        setCompletedChapters(c => [...c, currentChapter]);
        setCaseNotes(n => [...n, { chapter: currentChapter, text: chapter.lesson.clue }]);
      }
      setTimeout(() => {
        setDetectiveAction('idle');
        setScreen('chapterComplete');
      }, 1200);
    }
  };

  const afterChapterComplete = () => {
    if (currentChapter + 1 < STORY.chapters.length) setScreen('chapterHub');
    else setScreen('outro');
  };

  return (
    <div className="pp-app">
      <GlobalStyles />
      {screen === 'title' && <TitleScreen onStart={startGame} />}
      {screen === 'intro' && <IntroScreen lineIndex={introLineIndex} onContinue={() => setScreen('chapterHub')} />}
      {screen === 'chapterHub' && (
        <ChapterHub chapters={STORY.chapters} completed={completedChapters} score={score}
          caseNotes={caseNotes} onSelect={enterChapter} onFinish={() => setScreen('outro')} />
      )}
      {screen === 'lesson' && <LessonScreen chapter={STORY.chapters[currentChapter]} onContinue={startQuestions} />}
      {screen === 'questions' && (
        <QuestionScreen chapter={STORY.chapters[currentChapter]} qIndex={currentQuestion}
          selectedOption={selectedOption} setSelectedOption={setSelectedOption}
          selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
          userAnswer={userAnswer} setUserAnswer={setUserAnswer}
          showHint={showHint} setShowHint={setShowHint} feedback={feedback}
          profReaction={profReaction} onSubmit={checkAnswer} onNext={nextQuestion}
          onRetry={() => { setFeedback(null); setSelectedOption(null); setUserAnswer(''); setSelectedOptions([]); }}
          enemyHp={enemyHp} enemyHit={enemyHit} detectiveAction={detectiveAction} />
      )}
      {screen === 'chapterComplete' && (
        <ChapterCompleteScreen chapter={STORY.chapters[currentChapter]} onContinue={afterChapterComplete} />
      )}
      {screen === 'outro' && <OutroScreen score={score} total={totalAnswered} onRestart={() => {
        setScreen('title'); setCurrentChapter(0); setCurrentQuestion(0); setScore(0);
        setTotalAnswered(0); setCompletedChapters([]); setCaseNotes([]); resetQuestionState();
      }} />}
    </div>
  );
}

// ============ CHARACTERS ============

function DetectiveSprite({ size = 120, action = 'idle' }) {
  // Transform based on action
  const transform = action === 'attack' ? 'translateX(30px) rotate(5deg)'
    : action === 'hurt' ? 'translateX(-10px) rotate(-5deg)'
    : action === 'victory' ? 'translateY(-8px)'
    : 'translateX(0)';

  return (
    <div className="sprite-wrap" style={{ transform, transition: 'transform 0.3s ease-out' }}>
      <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
        <ellipse cx="50" cy="136" rx="32" ry="4" fill="#000" opacity="0.4" />
        {/* Coat */}
        <path d="M 25 70 L 22 135 L 78 135 L 75 70 Z" fill="#2a2420" stroke="#0a0806" strokeWidth="1.5" />
        <path d="M 50 60 L 38 75 L 45 110 L 50 85 L 55 110 L 62 75 Z" fill="#1a1614" stroke="#0a0806" strokeWidth="1" />
        <rect x="28" y="95" width="44" height="4" fill="#1a0f08" />
        <rect x="47" y="94" width="6" height="6" fill="#6b4a20" />
        {/* Arm extended if attacking */}
        {action === 'attack' && (
          <g>
            {/* Extended arm */}
            <rect x="70" y="75" width="22" height="7" fill="#2a2420" stroke="#0a0806" strokeWidth="1" />
            <rect x="88" y="69" width="7" height="18" fill="#d4a888" />
            {/* Gun body */}
            <rect x="91" y="71" width="18" height="9" fill="#1a1414" stroke="#0a0a0a" strokeWidth="0.8" rx="1" />
            {/* Barrel */}
            <rect x="107" y="73" width="13" height="5" fill="#0a0a0a" rx="1" />
            {/* Handle */}
            <rect x="93" y="80" width="9" height="7" fill="#2a1a0a" rx="1" />
            {/* Trigger guard */}
            <path d="M 98 80 Q 102 86 107 80" fill="none" stroke="#0a0a0a" strokeWidth="1" />
            {/* Muzzle flash – layered bursts */}
            <ellipse cx="122" cy="75" rx="11" ry="8" fill="#fff8c0" opacity="0.95">
              <animate attributeName="opacity" values="0.95;0.3;0.95" dur="0.08s" repeatCount="indefinite" />
              <animate attributeName="rx" values="11;16;11" dur="0.08s" repeatCount="indefinite" />
              <animate attributeName="ry" values="8;11;8" dur="0.08s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="122" cy="75" rx="6" ry="4" fill="#fff">
              <animate attributeName="opacity" values="1;0.4;1" dur="0.08s" repeatCount="indefinite" />
            </ellipse>
            {/* Spark rays */}
            <line x1="122" y1="75" x2="136" y2="66" stroke="#f4c062" strokeWidth="1.8" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0;0.9" dur="0.12s" repeatCount="indefinite" />
            </line>
            <line x1="122" y1="75" x2="136" y2="84" stroke="#f4c062" strokeWidth="1.8" opacity="0.9">
              <animate attributeName="opacity" values="0;0.9;0" dur="0.12s" repeatCount="indefinite" />
            </line>
            <line x1="122" y1="75" x2="140" y2="75" stroke="#fff" strokeWidth="2.5" opacity="0.95">
              <animate attributeName="opacity" values="0.95;0.15;0.95" dur="0.1s" repeatCount="indefinite" />
            </line>
            <line x1="122" y1="75" x2="130" y2="70" stroke="#ff8800" strokeWidth="1.2" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0;0.8" dur="0.09s" repeatCount="indefinite" />
            </line>
            <line x1="122" y1="75" x2="130" y2="80" stroke="#ff8800" strokeWidth="1.2" opacity="0.8">
              <animate attributeName="opacity" values="0;0.8;0" dur="0.09s" repeatCount="indefinite" />
            </line>
          </g>
        )}
        {/* Neck */}
        <rect x="42" y="55" width="16" height="10" fill="#1a1410" />
        {/* Head */}
        <ellipse cx="50" cy="40" rx="13" ry="15" fill="#d4a888" />
        <path d="M 40 45 Q 50 54 60 45 L 58 52 Q 50 58 42 52 Z" fill="#b08864" opacity="0.5" />
        {/* Fedora */}
        <ellipse cx="50" cy="25" rx="22" ry="4" fill="#1a1208" />
        <path d="M 36 25 Q 36 10 50 9 Q 64 10 64 25 Z" fill="#2a1a0c" stroke="#0a0806" strokeWidth="1" />
        <rect x="36" y="22" width="28" height="3" fill="#0a0806" />
        {/* Eyes shadow */}
        <rect x="38" y="32" width="24" height="4" fill="#0a0806" opacity="0.6" />
        {/* Cigarette */}
        <rect x="56" y="46" width="8" height="1.5" fill="#f4f0e0" />
        <circle cx="64" cy="46" r="0.8" fill="#ff6b2a">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Smoke */}
        <g opacity="0.5">
          <circle cx="66" cy="40" r="2" fill="#aaa">
            <animate attributeName="cy" values="40;15" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;6" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Victory sparkles */}
        {action === 'victory' && (
          <g>
            <text x="30" y="20" fill="#f4c062" fontSize="14">✦</text>
            <text x="70" y="25" fill="#f4c062" fontSize="12">✦</text>
            <text x="75" y="60" fill="#f4c062" fontSize="10">✦</text>
          </g>
        )}
      </svg>
    </div>
  );
}

function ProfessorSprite({ size = 100, reaction = 'neutral' }) {
  const browY = reaction === 'happy' ? 40 : reaction === 'disappointed' ? 43 : 42;
  const browSkew = reaction === 'happy' ? -2 : reaction === 'disappointed' ? 3 : 0;
  const mouthPath = reaction === 'happy'
    ? "M 42 58 Q 50 64 58 58"
    : reaction === 'disappointed'
    ? "M 42 62 Q 50 56 58 62"
    : "M 43 60 L 57 60";
  const reactColor = reaction === 'happy' ? '#2d5f3f' : reaction === 'disappointed' ? '#8b2635' : 'transparent';

  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <circle cx="50" cy="50" r="36" fill={reactColor} opacity="0.15">
        <animate attributeName="r" values="36;42;36" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="50" cy="136" rx="30" ry="3" fill="#000" opacity="0.4" />
      <path d="M 28 68 L 24 135 L 76 135 L 72 68 Z" fill="#5a4a30" stroke="#2a2010" strokeWidth="1.5" />
      {[[34,85],[42,95],[38,110],[58,88],[64,105],[54,118]].map((p,i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="0.8" fill="#3a2c18" />
      ))}
      <path d="M 44 68 L 38 64 L 38 72 L 44 68 L 56 68 L 62 64 L 62 72 L 56 68 Z" fill="#6e1f12" stroke="#3a0f08" strokeWidth="0.8" />
      <circle cx="50" cy="68" r="1.5" fill="#3a0f08" />
      <path d="M 42 64 L 50 72 L 58 64 L 58 68 L 50 76 L 42 68 Z" fill="#f0e8d8" />
      <rect x="44" y="58" width="12" height="8" fill="#d4a888" />
      <ellipse cx="50" cy="45" rx="15" ry="16" fill="#e0b898" />
      <ellipse cx="37" cy="42" rx="5" ry="7" fill="#e8e0d0" />
      <ellipse cx="63" cy="42" rx="5" ry="7" fill="#e8e0d0" />
      <path d="M 40 34 Q 50 30 60 34" fill="none" stroke="#e8e0d0" strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M 38 ${browY} L 44 ${browY + browSkew}`} stroke="#6a5540" strokeWidth="1.8" strokeLinecap="round" />
      <path d={`M 56 ${browY + browSkew} L 62 ${browY}`} stroke="#6a5540" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="42" cy="48" r="4.5" fill="none" stroke="#1a1410" strokeWidth="1.5" />
      <circle cx="58" cy="48" r="4.5" fill="none" stroke="#1a1410" strokeWidth="1.5" />
      <line x1="46.5" y1="48" x2="53.5" y2="48" stroke="#1a1410" strokeWidth="1.5" />
      <circle cx="42" cy="48" r="1.2" fill="#1a1410">
        <animate attributeName="ry" values="1.2;0.2;1.2" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="58" cy="48" r="1.2" fill="#1a1410">
        <animate attributeName="ry" values="1.2;0.2;1.2" dur="4s" repeatCount="indefinite" />
      </circle>
      <path d="M 42 55 Q 50 58 58 55 Q 54 56 50 55 Q 46 56 42 55" fill="#6a5540" />
      <path d={mouthPath} stroke="#3a2418" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Enemy sprites — one per chapter
function EnemySprite({ type, hit, hp, maxHp }) {
  const opacity = hp > 0 ? 1 : 0.3;
  const shake = hit ? 'enemy-shake' : '';

  const sprites = {
    lab: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={shake} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {/* Monitor body */}
        <rect x="20" y="30" width="80" height="70" fill="#1a1a24" stroke="#6e1f12" strokeWidth="2" />
        {/* Screen */}
        <rect x="28" y="38" width="64" height="54" fill={hit ? "#8b2635" : "#0a1a1a"} />
        {/* Glitch bars */}
        <rect x="28" y="50" width="64" height="4" fill="#ff2a6d" opacity={hit ? "1" : "0.7"}>
          <animate attributeName="y" values="50;70;40;50" dur="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="28" y="70" width="64" height="2" fill="#4af27a" opacity="0.8">
          <animate attributeName="y" values="70;45;80;70" dur="0.4s" repeatCount="indefinite" />
        </rect>
        {/* Evil eyes */}
        <rect x="40" y="58" width="10" height="8" fill="#ff2a6d">
          <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="70" y="58" width="10" height="8" fill="#ff2a6d">
          <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
        </rect>
        {/* Angry mouth */}
        <path d="M 40 80 L 48 84 L 56 80 L 64 84 L 72 80 L 80 84" fill="none" stroke="#ff2a6d" strokeWidth="2" />
        {/* Stand */}
        <rect x="52" y="100" width="16" height="14" fill="#2a2a34" />
        <rect x="36" y="112" width="48" height="6" fill="#1a1a24" />
        {/* Electric sparks */}
        <g opacity="0.8">
          <path d="M 25 35 L 22 28 L 26 30" stroke="#f4c062" strokeWidth="1.5" fill="none">
            <animate attributeName="opacity" values="0;1;0" dur="0.7s" repeatCount="indefinite" />
          </path>
          <path d="M 100 40 L 105 32 L 102 36" stroke="#f4c062" strokeWidth="1.5" fill="none">
            <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    ),
    diner: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={shake} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {/* Door frame */}
        <rect x="25" y="15" width="70" height="115" fill="#3a2418" stroke="#1a0f08" strokeWidth="2" />
        {/* Door panels */}
        <rect x="32" y="22" width="56" height="40" fill={hit ? "#8b2635" : "#2a1810"} stroke="#1a0f08" strokeWidth="1" />
        <rect x="32" y="68" width="56" height="40" fill={hit ? "#8b2635" : "#2a1810"} stroke="#1a0f08" strokeWidth="1" />
        {/* Huge padlock */}
        <g transform="translate(60, 85)">
          <path d="M -12 0 Q -12 -14 0 -14 Q 12 -14 12 0" fill="none" stroke="#6a5540" strokeWidth="4" />
          <rect x="-16" y="-2" width="32" height="22" fill="#8a7050" stroke="#3a2a18" strokeWidth="1.5" />
          <circle cx="0" cy="8" r="3" fill="#3a2a18" />
          <rect x="-1" y="10" width="2" height="6" fill="#3a2a18" />
        </g>
        {/* Warning sign */}
        <g transform="translate(60, 12)">
          <path d="M 0 -8 L 10 8 L -10 8 Z" fill="#f4c062" stroke="#1a0f08" strokeWidth="1" />
          <text y="6" textAnchor="middle" fill="#1a0f08" fontFamily="Oswald" fontSize="10" fontWeight="700">!</text>
        </g>
        {/* Chain links swaying */}
        <g opacity="0.7">
          <circle cx="40" cy="115" r="3" fill="none" stroke="#5a5a5a" strokeWidth="1.5">
            <animate attributeName="cy" values="115;117;115" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="118" r="3" fill="none" stroke="#5a5a5a" strokeWidth="1.5">
            <animate attributeName="cy" values="118;116;118" dur="2.3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={shake} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {/* Drone body */}
        <path d="M 35 70 L 85 70 L 90 85 L 80 100 L 40 100 L 30 85 Z" fill={hit ? "#8b2635" : "#3a3a44"} stroke="#1a1a24" strokeWidth="2" />
        {/* Top hump */}
        <ellipse cx="60" cy="70" rx="20" ry="10" fill="#2a2a34" stroke="#1a1a24" strokeWidth="1.5" />
        {/* Single red eye */}
        <circle cx="60" cy="85" r="10" fill="#1a1a24" />
        <circle cx="60" cy="85" r="6" fill="#ff2a6d">
          <animate attributeName="r" values="6;4;6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="85" r="3" fill="#fff" />
        {/* Rotors */}
        <g>
          <ellipse cx="20" cy="65" rx="18" ry="2" fill="#1a1a24">
            <animateTransform attributeName="transform" type="rotate" from="0 20 65" to="360 20 65" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="100" cy="65" rx="18" ry="2" fill="#1a1a24">
            <animateTransform attributeName="transform" type="rotate" from="0 100 65" to="360 100 65" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
        </g>
        {/* Rotor mounts */}
        <rect x="15" y="62" width="10" height="10" fill="#2a2a34" />
        <rect x="95" y="62" width="10" height="10" fill="#2a2a34" />
        <line x1="35" y1="70" x2="15" y2="65" stroke="#2a2a34" strokeWidth="2" />
        <line x1="85" y1="70" x2="105" y2="65" stroke="#2a2a34" strokeWidth="2" />
        {/* Scanning beam */}
        <path d="M 60 100 L 40 135 L 80 135 Z" fill="#ff2a6d" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    lighthouse: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={shake} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {/* Scroll body */}
        <rect x="20" y="30" width="80" height="90" fill={hit ? "#d88858" : "#d4b888"} stroke="#6a4020" strokeWidth="2" />
        {/* Parchment shading */}
        <rect x="20" y="30" width="80" height="8" fill="#b8986a" />
        <rect x="20" y="112" width="80" height="8" fill="#b8986a" />
        {/* Scroll rolls top and bottom */}
        <ellipse cx="60" cy="30" rx="40" ry="6" fill="#6a4020" />
        <ellipse cx="60" cy="120" rx="40" ry="6" fill="#6a4020" />
        {/* Encrypted text lines */}
        <g fill="#2a1810" fontFamily="JetBrains Mono" fontSize="8">
          <text x="26" y="52">X8#@!q2w</text>
          <text x="26" y="64">?z!9c$%m</text>
          <text x="26" y="76">p@n!w3</text>
          <text x="26" y="88">!!##@@?!</text>
          <text x="26" y="100">kj#82x</text>
        </g>
        {/* Red seal */}
        <circle cx="60" cy="75" r="12" fill="#8b2635" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="60" y="79" textAnchor="middle" fill="#f4e8b8" fontFamily="Playfair Display" fontSize="12" fontWeight="900">?</text>
        {/* Glow */}
        <circle cx="60" cy="75" r="18" fill="none" stroke="#ff2a6d" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    library: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={shake} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {/* Hooded figure body */}
        <path d="M 30 125 L 35 60 Q 60 35 85 60 L 90 125 Z" fill={hit ? "#8b2635" : "#1a0a1a"} stroke="#000" strokeWidth="2" />
        {/* Hood */}
        <path d="M 35 60 Q 60 30 85 60 L 80 70 Q 60 50 40 70 Z" fill="#0a0610" stroke="#000" strokeWidth="1.5" />
        {/* Dark face (just eyes) */}
        <ellipse cx="60" cy="65" rx="18" ry="15" fill="#000" />
        {/* Glowing eyes */}
        <ellipse cx="52" cy="65" rx="3" ry="2" fill="#ff2a6d">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="68" cy="65" rx="3" ry="2" fill="#ff2a6d">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        </ellipse>
        {/* Cloak details */}
        <path d="M 30 125 Q 40 120 45 125" fill="none" stroke="#000" strokeWidth="1" />
        <path d="M 75 125 Q 80 120 90 125" fill="none" stroke="#000" strokeWidth="1" />
        {/* Floating code particles around figure */}
        {['[ ]', '( )', '{ }', ':', '==', 'if'].map((sym, i) => (
          <text key={i} x={20 + (i * 18) % 90} y={95 + (i * 7) % 30}
            fill="#6e1f12" fontFamily="JetBrains Mono" fontSize="9" opacity="0.6">
            {sym}
            <animate attributeName="y" values={`${95 + (i * 7) % 30};${85 + (i * 7) % 30};${95 + (i * 7) % 30}`} dur={`${3 + (i % 2)}s`} repeatCount="indefinite" />
          </text>
        ))}
      </svg>
    )
  };

  return (
    <div className="enemy-sprite-wrap">
      {sprites[type] || sprites.lab}
      <div className="enemy-hp-bar">
        <div className="enemy-hp-fill" style={{ width: `${(hp / maxHp) * 100}%` }} />
      </div>
    </div>
  );
}

// ============ BACKGROUND SCENES (full game-world backgrounds, not just illustrations) ============

function GameWorld({ type, children }) {
  const worlds = {
    lab: <LabWorld />,
    diner: <DinerWorld />,
    warehouse: <WarehouseWorld />,
    lighthouse: <LighthouseWorld />,
    library: <LibraryWorld />
  };
  return (
    <div className="game-world">
      {worlds[type]}
      <div className="game-world-overlay">{children}</div>
    </div>
  );
}

function LabWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1428" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
        <radialGradient id="lw-lamp" cx="0.5" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lw-sky)" />
      {/* Back wall with posters */}
      <rect x="0" y="0" width="800" height="280" fill="#1a1422" opacity="0.7" />
      <rect x="80" y="60" width="70" height="90" fill="#8b2635" opacity="0.6" />
      <rect x="82" y="62" width="66" height="86" fill="#2a1a1a" />
      <text x="115" y="100" textAnchor="middle" fill="#f4e8b8" fontFamily="Oswald" fontSize="12" fontWeight="700">WANTED</text>
      <rect x="620" y="40" width="100" height="70" fill="#1a2428" />
      <text x="670" y="70" textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="10">PYTHON</text>
      <text x="670" y="85" textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="8">v3.12.1</text>
      {/* Pipes */}
      <rect x="0" y="20" width="800" height="6" fill="#2a2a3a" />
      <rect x="0" y="26" width="800" height="2" fill="#1a1a24" />
      {/* Floor */}
      <rect y="280" width="800" height="120" fill="#1a0f08" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 40} y="280" width="40" height="2" fill="#2a1a10" />
      ))}
      {/* Desk lamp pool */}
      <ellipse cx="400" cy="300" rx="300" ry="60" fill="url(#lw-lamp)" />
      {/* Desk */}
      <rect x="150" y="260" width="500" height="20" fill="#4a3018" />
      <rect x="150" y="256" width="500" height="6" fill="#6a4820" />
      <rect x="165" y="280" width="10" height="80" fill="#2a1a08" />
      <rect x="625" y="280" width="10" height="80" fill="#2a1a08" />
      {/* Left computer */}
      <rect x="190" y="200" width="80" height="60" fill="#0a0a14" stroke="#2a2420" strokeWidth="2" />
      <rect x="195" y="205" width="70" height="48" fill="#0a1a1a" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x="200" y={215 + i * 8} width={30 + i * 5} height="2" fill="#4af27a" opacity="0.7" />
      ))}
      <rect x="200" y="245" width="3" height="2" fill="#4af27a">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Coffee cup */}
      <rect x="300" y="245" width="18" height="16" fill="#6a4a2a" />
      <ellipse cx="309" cy="245" rx="9" ry="3" fill="#1a0f08" />
      <path d="M 305 243 Q 303 235 306 228" stroke="#aaa" strokeWidth="1" fill="none" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Papers scattered */}
      <rect x="350" y="248" width="30" height="14" fill="#e8e0cf" transform="rotate(-8 365 255)" />
      <rect x="380" y="252" width="30" height="14" fill="#d4c9b0" transform="rotate(5 395 259)" />
      {/* Hanging lamp */}
      <line x1="400" y1="0" x2="400" y2="140" stroke="#2a2420" strokeWidth="2" />
      <path d="M 370 140 L 430 140 L 420 170 L 380 170 Z" fill="#3a2818" stroke="#1a1410" strokeWidth="1" />
      <ellipse cx="400" cy="170" rx="20" ry="3" fill="#f4c062" opacity="0.9" />
    </svg>
  );
}

function DinerWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a2a" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#dw-bg)" />
      {/* Back window with city rain */}
      <rect x="50" y="40" width="700" height="220" fill="#0a0a18" stroke="#3a2a3a" strokeWidth="3" />
      {/* Distant city lights */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={70 + (i * 17) % 660} y={60 + (i * 23) % 180} width="3" height="4" fill="#f4c062" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* Rain streaks on window */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1={70 + (i * 24) % 660} y1={60 + (i * 7) % 40}
          x2={70 + (i * 24) % 660 - 3} y2={150 + (i * 7) % 40}
          stroke="#4a5a7a" strokeWidth="1" opacity="0.4" />
      ))}
      {/* Neon signs */}
      <g transform="translate(140, 100)">
        <rect x="-4" y="-4" width="90" height="40" fill="#0a0612" stroke="#ff2a6d" strokeWidth="2" />
        <text x="41" y="25" textAnchor="middle" fill="#ff2a6d" fontFamily="Oswald" fontSize="20" fontWeight="700" letterSpacing="3">
          OPEN
          <animate attributeName="opacity" values="1;0.6;1;1;0.9;1" dur="3s" repeatCount="indefinite" />
        </text>
      </g>
      <g transform="translate(500, 80)">
        <text x="100" y="40" textAnchor="middle" fill="#f4c062" fontFamily="Playfair Display" fontSize="36" fontStyle="italic" fontWeight="700">
          Warm Loop
        </text>
        <text x="100" y="60" textAnchor="middle" fill="#f4c062" fontFamily="Oswald" fontSize="12" letterSpacing="4">DINER — 24 HRS</text>
        <line x1="40" y1="48" x2="160" y2="48" stroke="#f4c062" strokeWidth="1" />
      </g>
      {/* Floor (checkered) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={i * 20} y="300" width="20" height="20" fill={i % 2 ? "#2a1f24" : "#1a1014"} />
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={`r${i}`} x={i * 20} y="320" width="20" height="20" fill={i % 2 ? "#1a1014" : "#2a1f24"} />
      ))}
      {/* Counter */}
      <rect x="0" y="260" width="800" height="40" fill="#3a2418" />
      <rect x="0" y="256" width="800" height="6" fill="#5a3a28" />
      {/* Counter stools */}
      {[100, 220, 340, 580, 700].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="290" r="14" fill="#8b2635" />
          <circle cx={x} cy="290" r="10" fill="#6e1f12" />
          <rect x={x - 3} y="290" width="6" height="40" fill="#3a2418" />
          <rect x={x - 20} y="330" width="40" height="4" fill="#2a1818" />
        </g>
      ))}
      {/* Coffee cups, plates */}
      <rect x="380" y="248" width="14" height="12" fill="#f0e8d8" />
      <ellipse cx="387" cy="248" rx="7" ry="2.5" fill="#3a2418" />
      <ellipse cx="460" cy="256" rx="14" ry="3" fill="#e0d0b0" />
      {/* Pendant lamps */}
      {[200, 400, 600].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2="30" stroke="#1a1010" strokeWidth="1" />
          <path d={`M ${x - 20} 30 L ${x + 20} 30 L ${x + 14} 55 L ${x - 14} 55 Z`} fill="#6e1f12" stroke="#2a0a0a" strokeWidth="1" />
          <ellipse cx={x} cy="55" rx="14" ry="3" fill="#f4c062" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

function WarehouseWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ww-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <radialGradient id="ww-light" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#ww-bg)" />
      {/* Flashlight pool */}
      <ellipse cx="400" cy="260" rx="350" ry="130" fill="url(#ww-light)" />
      {/* Steel girders */}
      <rect x="0" y="40" width="800" height="8" fill="#1a1814" />
      <rect x="0" y="44" width="800" height="2" fill="#0a0808" />
      {[120, 380, 680].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="0" width="12" height="300" fill="#1a1814" />
          <rect x={x - 8} y="30" width="16" height="20" fill="#0a0808" />
        </g>
      ))}
      {/* Floor */}
      <rect y="300" width="800" height="100" fill="#0a0a0a" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={i * 50} y1="300" x2={i * 50} y2="400" stroke="#1a1818" strokeWidth="0.5" />
      ))}
      {/* Server racks (left and right) */}
      {[50, 160, 590, 700].map((x, i) => (
        <g key={i}>
          <rect x={x} y="120" width="80" height="180" fill="#1a1818" stroke="#2a2828" strokeWidth="1.5" />
          <rect x={x} y="118" width="80" height="4" fill="#2a2828" />
          {Array.from({ length: 12 }).map((_, j) => (
            <circle key={j} cx={x + 15 + (j % 3) * 20} cy={140 + Math.floor(j / 3) * 40}
              r="2" fill={j % 4 === 0 ? "#4af27a" : j % 3 === 0 ? "#ff2a6d" : "#f4c062"}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1 + (j % 3)}s`} begin={`${i * 0.2 + j * 0.1}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      ))}
      {/* Safe in the middle */}
      <rect x="340" y="170" width="120" height="120" fill="#2a1f1a" stroke="#5a4a30" strokeWidth="3" />
      <rect x="340" y="168" width="120" height="8" fill="#3a2a1a" />
      <circle cx="400" cy="230" r="25" fill="none" stroke="#5a4a30" strokeWidth="2" />
      <circle cx="400" cy="230" r="18" fill="#1a1008" stroke="#3a2a18" strokeWidth="1" />
      <line x1="400" y1="230" x2="400" y2="215" stroke="#f4c062" strokeWidth="2" />
      <circle cx="400" cy="230" r="3" fill="#f4c062" />
      {/* Tick marks around dial */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 400 + Math.cos(angle) * 22;
        const y1 = 230 + Math.sin(angle) * 22;
        const x2 = 400 + Math.cos(angle) * 25;
        const y2 = 230 + Math.sin(angle) * 25;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a4a30" strokeWidth="1" />;
      })}
      {/* Dust particles */}
      {Array.from({ length: 25 }).map((_, i) => {
        const x = 100 + (i * 29) % 600;
        const y = 80 + (i * 23) % 200;
        return (
          <circle key={i} cx={x} cy={y} r="0.8" fill="#d4c9b0" opacity="0.5">
            <animate attributeName="cy" values={`${y};${y - 50}`} dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

function LighthouseWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lhw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1a2a" />
          <stop offset="50%" stopColor="#12283f" />
          <stop offset="100%" stopColor="#0a1424" />
        </linearGradient>
        <radialGradient id="lhw-beam" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff8d4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff8d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lhw-sky)" />
      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <circle key={i} cx={(i * 47) % 800} cy={(i * 13) % 180} r="0.8" fill="#fff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`} begin={`${i * 0.1}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Moon */}
      <circle cx="150" cy="80" r="35" fill="#f4e8b8" opacity="0.2" />
      <circle cx="150" cy="80" r="25" fill="#f4e8b8" opacity="0.4" />
      <circle cx="150" cy="80" r="18" fill="#f4e8b8" opacity="0.85" />
      {/* Sea */}
      <path d="M 0 270 Q 200 262 400 270 T 800 270 L 800 400 L 0 400 Z" fill="#0a1a28" />
      {Array.from({ length: 15 }).map((_, i) => (
        <path key={i} d={`M ${i * 55} ${285 + (i % 3) * 8} Q ${i * 55 + 15} ${282 + (i % 3) * 8} ${i * 55 + 30} ${285 + (i % 3) * 8}`}
          fill="none" stroke="#2a4a6a" strokeWidth="1.2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur={`${3 + (i % 2)}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* Cliff */}
      <path d="M 400 270 L 420 200 L 480 180 L 580 180 L 620 200 L 800 200 L 800 270 Z" fill="#1a1a20" />
      <path d="M 420 200 L 480 180 L 500 195 L 460 205 Z" fill="#252530" opacity="0.6" />
      {/* Lighthouse tower */}
      <path d="M 490 80 L 540 80 L 548 200 L 482 200 Z" fill="#d8d0c0" />
      {/* Stripes */}
      <rect x="483" y="110" width="66" height="16" fill="#8b2635" />
      <rect x="483" y="150" width="66" height="16" fill="#8b2635" />
      <rect x="483" y="185" width="66" height="15" fill="#8b2635" />
      {/* Windows */}
      <rect x="510" y="135" width="10" height="10" fill="#1a1a20" />
      <rect x="510" y="175" width="10" height="10" fill="#1a1a20" />
      {/* Lamp room */}
      <rect x="478" y="60" width="74" height="24" fill="#1a1a20" />
      <circle cx="515" cy="72" r="12" fill="#fff8d4">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Rotating beam */}
      <g transform="translate(515, 72)">
        <path d="M 0 0 L -350 -120 L -350 120 Z" fill="url(#lhw-beam)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
        </path>
      </g>
      {/* Roof */}
      <path d="M 478 60 L 515 35 L 552 60 Z" fill="#2a1618" />
      {/* Base */}
      <rect x="472" y="196" width="86" height="8" fill="#5a4a30" />
      {/* Rocks */}
      <ellipse cx="450" cy="210" rx="20" ry="6" fill="#2a2530" />
      <ellipse cx="600" cy="215" rx="25" ry="7" fill="#2a2530" />
    </svg>
  );
}

function LibraryWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lib-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f1a" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
        <radialGradient id="lib-candle" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lib-bg)" />
      {/* Floor */}
      <rect y="310" width="800" height="90" fill="#2a1a18" />
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={i * 28} y="310" width="28" height="2" fill="#3a2418" />
      ))}
      {/* Shelves */}
      {[20, 160, 540, 680].map((x, idx) => (
        <g key={idx}>
          <rect x={x} y="50" width="100" height="260" fill="#3a2418" stroke="#1a0f08" strokeWidth="2" />
          {[100, 150, 200, 250].map((y, i) => (
            <rect key={i} x={x} y={y} width="100" height="4" fill="#1a0f08" />
          ))}
          {Array.from({ length: 40 }).map((_, i) => {
            const shelf = Math.floor(i / 10);
            const pos = i % 10;
            const colors = ['#6e1f12', '#2a4a6a', '#5a4a30', '#3a2a3a', '#1a3a2a', '#6a3a2a', '#4a2a20'];
            return (
              <rect key={i} x={x + 3 + pos * 9.5} y={55 + shelf * 50}
                width={8 + (i % 2)} height={44 - (i % 3) * 2} fill={colors[i % colors.length]} />
            );
          })}
        </g>
      ))}
      {/* Central hidden doorway glow */}
      <rect x="340" y="100" width="120" height="210" fill="#000" />
      <rect x="345" y="105" width="110" height="200" fill="url(#lib-candle)" />
      <rect x="332" y="98" width="8" height="214" fill="#1a0f08" />
      <rect x="460" y="98" width="8" height="214" fill="#1a0f08" />
      <rect x="332" y="94" width="136" height="8" fill="#1a0f08" />
      {/* Reading lamp on table */}
      <rect x="390" y="275" width="20" height="35" fill="#5a4a30" />
      <rect x="382" y="270" width="36" height="10" fill="#8b2635" />
      <ellipse cx="400" cy="278" rx="30" ry="4" fill="#f4c062" opacity="0.7" />
      {/* Candles */}
      {[80, 740].map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y="275" width="6" height="20" fill="#f0e8d8" />
          <ellipse cx={x + 1} cy="272" rx="2" ry="5" fill="#f4c062">
            <animate attributeName="ry" values="5;4;5" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={x + 1} cy="272" rx="6" ry="10" fill="#f4c062" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.3;0.2" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
      {/* Dust motes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i} cx={50 + (i * 41) % 700} cy={60 + (i * 19) % 200} r="0.8" fill="#f4c062" opacity="0.5">
          <animate attributeName="cy" values={`${60 + (i * 19) % 200};${30 + (i * 19) % 200}`} dur={`${6 + (i % 3)}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${6 + (i % 3)}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

// ============ OTHER UI PIECES ============

function RainScene({ children, intensity = 'heavy' }) {
  const drops = intensity === 'heavy' ? 80 : 40;
  const dropArr = Array.from({ length: drops });
  return (
    <div className="rain-scene">
      <svg className="city-backdrop" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0612" />
            <stop offset="50%" stopColor="#1a1028" />
            <stop offset="100%" stopColor="#2a1a3a" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0810" />
            <stop offset="100%" stopColor="#1a1828" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#skyGrad)" />
        <circle cx="620" cy="90" r="50" fill="#f4e8b8" opacity="0.08" />
        <circle cx="620" cy="90" r="30" fill="#f4e8b8" opacity="0.18" />
        <circle cx="620" cy="90" r="18" fill="#f4e8b8" opacity="0.35" />
        <rect x="0" y="180" width="120" height="320" fill="url(#buildingGrad)" />
        <rect x="100" y="220" width="80" height="280" fill="#120e1c" />
        <rect x="170" y="150" width="140" height="350" fill="url(#buildingGrad)" />
        <rect x="300" y="200" width="90" height="300" fill="#120e1c" />
        <rect x="380" y="120" width="160" height="380" fill="url(#buildingGrad)" />
        <rect x="530" y="180" width="100" height="320" fill="#120e1c" />
        <rect x="620" y="150" width="180" height="350" fill="url(#buildingGrad)" />
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 20 + (i % 15) * 52;
          const y = 200 + Math.floor(i / 15) * 50;
          const on = (i * 37) % 3 !== 0;
          return on ? (
            <rect key={i} x={x} y={y} width="6" height="8" fill="#f4c062" opacity={0.4 + ((i * 13) % 5) * 0.1}>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </rect>
          ) : null;
        })}
        <g transform="translate(40, 340)">
          <rect x="-4" y="-4" width="148" height="34" fill="#0a0612" stroke="#ff2a6d" strokeWidth="1" opacity="0.9" />
          <text x="70" y="18" textAnchor="middle" fill="#ff2a6d" fontFamily="Oswald, sans-serif" fontSize="16" fontWeight="700" letterSpacing="2">
            PRECINCT 404
            <animate attributeName="opacity" values="1;0.6;1;1;0.9;1" dur="4s" repeatCount="indefinite" />
          </text>
        </g>
        <rect width="800" height="500" fill="#fff" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0.5;0;0.3;0;0;0;0;0" dur="12s" repeatCount="indefinite" />
        </rect>
      </svg>
      <svg className="rain-layer" viewBox="0 0 800 500" preserveAspectRatio="none">
        {dropArr.map((_, i) => {
          const x = (i * 73) % 800;
          const delay = (i * 0.13) % 1.2;
          const dur = 0.5 + ((i * 7) % 5) * 0.1;
          return (
            <line key={i} x1={x} y1="-20" x2={x - 10} y2="10" stroke="#8a9db8" strokeWidth="1" opacity="0.4">
              <animateTransform attributeName="transform" type="translate"
                values="0,-20; 0,520" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </line>
          );
        })}
      </svg>
      {children && <div className="rain-content">{children}</div>}
    </div>
  );
}

function CaseMap({ completed, current, onSelect }) {
  const locations = [
    { x: 70, y: 80, name: 'LAB' },
    { x: 180, y: 130, name: 'DINER' },
    { x: 300, y: 90, name: 'WAREHOUSE' },
    { x: 420, y: 160, name: 'LIGHTHOUSE' },
    { x: 540, y: 100, name: 'LIBRARY' }
  ];
  return (
    <div className="case-map-wrap">
      <div className="case-map-label">◆ INVESTIGATION MAP</div>
      <svg viewBox="0 0 620 220" className="case-map">
        <rect width="620" height="220" fill="#d4c9b0" opacity="0.15" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="620" y2={i * 20} stroke="#1a1612" strokeWidth="0.3" opacity="0.15" />
        ))}
        {Array.from({ length: 31 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" stroke="#1a1612" strokeWidth="0.3" opacity="0.15" />
        ))}
        {locations.slice(0, -1).map((loc, i) => {
          const next = locations[i + 1];
          const unlocked = completed.includes(i);
          return (
            <path key={i}
              d={`M ${loc.x} ${loc.y} Q ${(loc.x + next.x) / 2} ${Math.min(loc.y, next.y) - 20} ${next.x} ${next.y}`}
              fill="none" stroke={unlocked ? "#a8321f" : "#6a5540"}
              strokeWidth="2" strokeDasharray="4 3"
              opacity={unlocked ? 0.9 : 0.4}>
              {unlocked && <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite" />}
            </path>
          );
        })}
        {locations.map((loc, i) => {
          const isDone = completed.includes(i);
          const isLocked = i > 0 && !completed.includes(i - 1);
          const isCurrent = current === i;
          return (
            <g key={i} onClick={() => !isLocked && onSelect(i)}
              style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}>
              {isCurrent && (
                <circle cx={loc.x} cy={loc.y} r="20" fill="none" stroke="#a8321f" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={loc.x} cy={loc.y} r="12"
                fill={isDone ? "#2d5f3f" : isLocked ? "#6a5540" : "#a8321f"}
                stroke="#1a1612" strokeWidth="2" />
              <text x={loc.x} y={loc.y + 4} textAnchor="middle" fill="#e8e0cf"
                fontFamily="Oswald" fontWeight="700" fontSize="12">
                {isDone ? '✓' : isLocked ? '🔒' : i + 1}
              </text>
              <text x={loc.x} y={loc.y + 28} textAnchor="middle" fill="#1a1612"
                fontFamily="Oswald" fontWeight="700" fontSize="10" letterSpacing="1">
                {loc.name}
              </text>
            </g>
          );
        })}
        <g transform="translate(580, 30)">
          <circle r="16" fill="none" stroke="#1a1612" strokeWidth="1" opacity="0.5" />
          <path d="M 0 -12 L 3 0 L 0 12 L -3 0 Z" fill="#1a1612" opacity="0.7" />
          <text y="-18" textAnchor="middle" fontFamily="Oswald" fontSize="8" fill="#1a1612">N</text>
        </g>
      </svg>
    </div>
  );
}

function PaperDust() {
  return (
    <div className="paper-dust" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="dust" style={{
          left: `${(i * 37) % 100}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${10 + (i % 4) * 3}s`
        }} />
      ))}
    </div>
  );
}

// ============ SCREENS ============

function TitleScreen({ onStart }) {
  return (
    <div className="screen title-screen">
      <RainScene>
        <div className="title-content">
          <div className="title-stamp">CASE FILE #404</div>
          <div className="game-name-wrap">
            <h1 className="game-name">PLAYFUL<br />PYTHONICS</h1>
            <div className="game-name-deco">◆ ◆ ◆</div>
          </div>
          <div className="title-small">A Python Detective Mystery Game</div>
          <h2 className="title-main">
            <span className="title-line-1">The Case of the</span>
            <span className="title-line-2">VANISHING VARIABLE</span>
          </h2>
          <div className="title-subtitle">FIVE CHAPTERS · FIVE CONCEPTS · ONE MYSTERY</div>
          <div className="title-detective"><DetectiveSprite size={140} /></div>
          <button className="btn-primary btn-large btn-glow" onClick={onStart}>▶ OPEN CASE FILE</button>
          <div className="title-footer">
            <span>PRECINCT 404</span><span>·</span><span>CLASSIFIED</span><span>·</span><span>v1.0</span>
          </div>
        </div>
      </RainScene>
    </div>
  );
}

function IntroScreen({ lineIndex, onContinue }) {
  const lines = STORY.intro.text;
  const showAll = lineIndex >= lines.length;
  return (
    <div className="screen intro-screen paper-bg">
      <PaperDust />
      <div className="game-name-small">PLAYFUL PYTHONICS</div>
      <div className="intro-top">
        <div className="intro-char-left">
          <DetectiveSprite size={110} />
          <div className="char-label">THE DETECTIVE</div>
        </div>
        <div className="case-header">
          <div className="case-header-title">{STORY.intro.title}</div>
          <div className="case-header-sub">{STORY.intro.location}</div>
        </div>
        <div className="intro-char-right">
          <ProfessorSprite size={110} reaction="neutral" />
          <div className="char-label">PROF. BYTECODE</div>
        </div>
      </div>
      <div className="intro-body">
        {lines.slice(0, lineIndex + 1).map((line, i) => (
          <p key={i} className="intro-paragraph" style={{ animationDelay: `${i * 0.1}s` }}>{line}</p>
        ))}
      </div>
      {showAll && (
        <button className="btn-primary btn-large btn-glow" onClick={onContinue}>
          BEGIN INVESTIGATION →
        </button>
      )}
    </div>
  );
}

function ChapterHub({ chapters, completed, score, caseNotes, onSelect, onFinish }) {
  const allDone = completed.length === chapters.length;
  const nextChapter = completed.length < chapters.length ? completed.length : null;

  return (
    <div className="screen hub-screen paper-bg">
      <PaperDust />
      <div className="game-name-small">PLAYFUL PYTHONICS</div>
      <div className="hub-header">
        <div>
          <div className="hub-kicker">CASE DASHBOARD</div>
          <h2 className="hub-title">Evidence Board</h2>
        </div>
        <div className="hub-stats">
          <div className="stat"><span className="stat-label">SCORE</span><span className="stat-value">{score}</span></div>
          <div className="stat"><span className="stat-label">SOLVED</span><span className="stat-value">{completed.length}/5</span></div>
        </div>
      </div>

      <CaseMap completed={completed} current={nextChapter} onSelect={onSelect} />

      <div className="chapter-grid">
        {chapters.map((ch, i) => {
          const isLocked = i > 0 && !completed.includes(i - 1);
          const isDone = completed.includes(i);
          return (
            <div key={ch.id}
              className={`chapter-card ${isLocked ? 'locked' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => !isLocked && onSelect(i)}>
              <div className="chapter-card-num">0{i + 1}</div>
              <div className="chapter-card-body">
                <div className="chapter-card-title">{ch.title}</div>
                <div className="chapter-card-sub">{ch.subtitle}</div>
              </div>
              <div className="chapter-card-status">
                {isDone ? '✓ CLOSED' : isLocked ? '🔒 LOCKED' : '→ OPEN'}
              </div>
              {isDone && <div className="stamp-done">SOLVED</div>}
            </div>
          );
        })}
      </div>

      {caseNotes.length > 0 && (
        <div className="case-notes">
          <div className="case-notes-title">◆ CASE NOTES</div>
          {caseNotes.map((note, i) => (
            <div key={i} className="case-note">
              <div className="case-note-num">Clue #{note.chapter + 1}</div>
              <div className="case-note-text">{note.text}</div>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <button className="btn-primary btn-large btn-glow" onClick={onFinish}>CLOSE THE CASE →</button>
      )}
    </div>
  );
}

function LessonScreen({ chapter, onContinue }) {
  return (
    <div className="screen lesson-screen paper-bg">
      <PaperDust />
      <div className="lesson-scene-preview">
        <GameWorld type={chapter.scene}>
          <div className="lesson-scene-label">LOCATION: {chapter.scene.toUpperCase()}</div>
        </GameWorld>
      </div>

      <div className="chapter-marker">{chapter.title}</div>
      <div className="chapter-sub">{chapter.subtitle}</div>
      <div className="objective-box">
        <span className="objective-label">OBJECTIVE:</span> {chapter.objective}
      </div>

      <div className="lesson-intro">{chapter.lesson.intro}</div>

      <div className="teacher-block">
        <div className="teacher-header">
          <div className="teacher-avatar-lg">
            <ProfessorSprite size={80} reaction="neutral" />
          </div>
          <div>
            <div className="teacher-name">PROF. BYTECODE</div>
            <div className="teacher-role">Lecturer, Dept. of Python Forensics</div>
          </div>
        </div>
        <div className="speech-bubble">
          <div className="speech-tail" />
          "{chapter.lesson.teacher}"
        </div>
      </div>

      <div className="key-points">
        <div className="key-points-title">◆ KEY EVIDENCE</div>
        <ul>
          {chapter.lesson.keyPoints.map((p, i) => (
            <li key={i} style={{ animationDelay: `${i * 0.08}s` }}>{p}</li>
          ))}
        </ul>
      </div>

      <button className="btn-primary btn-large btn-glow" onClick={onContinue}>ENTER INTERROGATION →</button>
    </div>
  );
}

// ============ THE CODECOMBAT-STYLE QUESTION SCREEN ============
function QuestionScreen({ chapter, qIndex, selectedOption, setSelectedOption, selectedOptions, setSelectedOptions, userAnswer, setUserAnswer, showHint, setShowHint, feedback, profReaction, onSubmit, onNext, onRetry, enemyHp, enemyHit, detectiveAction }) {
  const q = chapter.questions[qIndex];
  const total = chapter.questions.length;
  const progress = (qIndex / total) * 100;

  const canSubmit = () => {
    if (q.type === 'mcq' || q.type === 'debug' || q.type === 'truefalse') return selectedOption !== null;
    if (q.type === 'multiselect') return selectedOptions.length > 0;
    return userAnswer.trim().length > 0;
  };

  const renderInput = () => {
    if (q.type === 'mcq' || q.type === 'debug') {
      return (
        <div className="options">
          {q.options.map((opt, i) => (
            <button key={i}
              className={`option ${selectedOption === i ? 'selected' : ''} ${feedback ? (i === q.answer ? 'correct' : selectedOption === i ? 'wrong' : '') : ''}`}
              onClick={() => !feedback && setSelectedOption(i)}
              disabled={!!feedback?.correct}>
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      );
    }
    if (q.type === 'truefalse') {
      return (
        <div className="options tf-options">
          {['TRUE', 'FALSE'].map((opt, i) => (
            <button key={i}
              className={`option tf-option ${selectedOption === i ? 'selected' : ''} ${feedback ? ((i === 0 && q.answer === true) || (i === 1 && q.answer === false) ? 'correct' : selectedOption === i ? 'wrong' : '') : ''}`}
              onClick={() => !feedback && setSelectedOption(i)}
              disabled={!!feedback?.correct}>{opt}</button>
          ))}
        </div>
      );
    }
    if (q.type === 'multiselect') {
      const toggleOpt = (i) => {
        if (feedback) return;
        setSelectedOptions(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
      };
      return (
        <div className="options">
          <div className="multiselect-hint-text">◆ Select ALL correct answers</div>
          {q.options.map((opt, i) => {
            const isSelected = selectedOptions.includes(i);
            const isCorrectAns = Array.isArray(q.answer) && q.answer.includes(i);
            return (
              <button key={i}
                className={`option ${isSelected ? 'selected' : ''} ${feedback ? (isCorrectAns ? 'correct' : isSelected ? 'wrong' : '') : ''}`}
                onClick={() => toggleOpt(i)}
                disabled={!!feedback?.correct}>
                <span className="option-letter multiselect-check">{isSelected ? '✓' : String.fromCharCode(65 + i)}</span>
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
        </div>
      );
    }
    return (
      <div className="text-input-wrap">
        <input className={`text-input ${feedback ? (feedback.correct ? 'correct' : 'wrong') : ''}`}
          type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer..."
          disabled={!!feedback?.correct}
          autoFocus
          onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit() && !feedback) onSubmit(); }} />
        {q.type === 'output' && <div className="input-hint">💡 Predict what the program will PRINT</div>}
      </div>
    );
  };

  const typeLabel = {
    mcq: 'MULTIPLE CHOICE', truefalse: 'TRUE / FALSE', fillblank: 'FILL IN THE BLANK',
    output: 'PREDICT OUTPUT', debug: 'DEBUG THE CODE', multiselect: 'SELECT ALL THAT APPLY'
  }[q.type];

  return (
    <div className="screen question-screen-split">
      {/* ===== LEFT: GAME WORLD (like CodeCombat) ===== */}
      <div className="game-stage">
        <GameWorld type={chapter.scene}>
          {/* Top HUD */}
          <div className="stage-hud-top">
            <div className="hud-left">
              <div className="hud-game-name">PLAYFUL PYTHONICS</div>
              <div className="hud-chapter">{chapter.title}</div>
              <div className="hud-objective">► {chapter.objective}</div>
            </div>
            <div className="hud-right">
              <div className="hud-progress-label">EVIDENCE {qIndex + 1} / {total}</div>
              <div className="hud-progress-bar">
                <div className="hud-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Characters on stage */}
          <div className="stage-characters">
            <div className="stage-detective">
              <DetectiveSprite size={120} action={detectiveAction} />
            </div>

            {/* Enemy */}
            <div className="stage-enemy">
              <div className="enemy-label">{chapter.enemy.name}</div>
              <EnemySprite type={chapter.scene} hit={enemyHit} hp={enemyHp} maxHp={chapter.enemy.maxHp} />
            </div>

            {/* Professor (observer) */}
            <div className="stage-professor">
              <div className="prof-spotlight" />
              <div className="prof-sprite-wrap">
                <ProfessorSprite size={80} reaction={profReaction} />
              </div>
              <div className="prof-speech">
                {feedback ? (feedback.correct ? "Excellent!" : "Again!") : showHint ? "Think..." : "Careful now..."}
              </div>
            </div>
          </div>

          {/* Attack effect */}
          {detectiveAction === 'attack' && (
            <div className="attack-effect">
              <div className="gunshot-screen-flash" />
              <div className="bullet-trail" />
              <svg viewBox="0 0 500 220" className="attack-svg">
                <defs>
                  <filter id="txt-glow" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* SOLVED text */}
                <text x="250" y="100" textAnchor="middle" fill="#f4c062"
                  fontFamily="Playfair Display" fontSize="62" fontWeight="900" fontStyle="italic"
                  filter="url(#txt-glow)">SOLVED!</text>
                {/* Decorative lines */}
                <line x1="40" y1="108" x2="180" y2="108" stroke="#f4c062" strokeWidth="2" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.3s" repeatCount="indefinite" />
                </line>
                <line x1="320" y1="108" x2="460" y2="108" stroke="#f4c062" strokeWidth="2" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.3s" repeatCount="indefinite" />
                </line>
                {/* Star sparks */}
                {[50,130,250,370,450].map((x, i) => (
                  <text key={i} x={x} y={150 + (i % 2) * 30}
                    textAnchor="middle" fill="#f4c062" fontSize={14 + (i % 3) * 6}
                    className={`spark-${i}`}>✦</text>
                ))}
              </svg>
              {/* Impact particles */}
              <div className="impact-particles">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className="impact-particle"
                    style={{ '--angle': `${i * 36}deg`, '--dist': `${40 + (i % 3) * 20}px` }} />
                ))}
              </div>
            </div>
          )}
        </GameWorld>
      </div>

      {/* ===== RIGHT: CODE / QUESTION PANEL ===== */}
      <div className="code-panel">
        <div className="code-panel-header">
          <div className="code-panel-tabs">
            <span className="code-tab active">◆ evidence_{qIndex + 1}.py</span>
            <span className="code-tab">notes</span>
          </div>
          <div className="q-type-badge">{typeLabel}</div>
        </div>

        <div className="code-panel-body">
          <div className="q-body">
            {(() => {
              const lines = q.q.split('\n');
              const firstLine = lines[0].trim();
              const firstIsProse = /[?:]$/.test(firstLine) && !/^(if |for |while |elif |else|match)/.test(firstLine);
              if (lines.length === 1) return <div className="q-text">{firstLine}</div>;
              if (firstIsProse) {
                const codeLines = lines.slice(1).join('\n').replace(/^\n+/, '');
                return (
                  <>
                    <div className="q-text">{firstLine}</div>
                    {codeLines && (
                      <pre className="code-block">
                        <div className="code-gutter">
                          {codeLines.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                        </div>
                        <code>{codeLines}</code>
                      </pre>
                    )}
                  </>
                );
              }
              return (
                <pre className="code-block">
                  <div className="code-gutter">
                    {q.q.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>
                  <code>{q.q}</code>
                </pre>
              );
            })()}
          </div>

          {renderInput()}

          {feedback && (
            <div className={`feedback ${feedback.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
              <div className="feedback-icon">{feedback.correct ? '✓' : '✗'}</div>
              <div className="feedback-text">
                <div className="feedback-title">{feedback.correct ? 'CORRECT — ENEMY TAKES DAMAGE' : 'INCORRECT'}</div>
                <div className="feedback-msg">{feedback.message}</div>
                {!feedback.correct && (
                  <div className="feedback-answer-box">
                    <span className="feedback-answer-label">The answer: </span>
                    <code>{
                      q.type === 'truefalse' ? (q.answer ? 'TRUE' : 'FALSE')
                      : q.type === 'mcq' || q.type === 'debug' ? q.options[q.answer]
                      : q.type === 'multiselect' ? q.answer.map(i => q.options[i]).join(' · ')
                      : q.answer
                    }</code>
                  </div>
                )}
              </div>
            </div>
          )}

          {showHint && !feedback && (
            <div className="hint-box">
              <div className="hint-label">🔍 HINT</div>
              <div>{q.hint}</div>
            </div>
          )}
        </div>

        <div className="code-panel-footer">
          {!feedback && (
            <>
              <button className="btn-secondary" onClick={() => setShowHint(true)} disabled={showHint}>🔍 HINT</button>
              <button className="btn-primary" onClick={onSubmit} disabled={!canSubmit()}>⚔ ATTACK</button>
            </>
          )}
          {feedback && !feedback.correct && (<button className="btn-primary" onClick={onRetry}>↻ TRY AGAIN</button>)}
          {feedback && feedback.correct && (<button className="btn-primary btn-glow" onClick={onNext}>CONTINUE →</button>)}
        </div>
      </div>
    </div>
  );
}

function ChapterCompleteScreen({ chapter, onContinue }) {
  return (
    <div className="screen complete-screen paper-bg">
      <PaperDust />
      <div className="game-name-small">PLAYFUL PYTHONICS</div>
      <div className="complete-stamp stamp-anim">CHAPTER CLOSED</div>
      <h2 className="complete-title">{chapter.title}</h2>
      <div className="complete-divider">⬥⬥⬥⬥⬥</div>

      <div className="complete-chars">
        <div><DetectiveSprite size={90} action="victory" /><div className="char-label">YOU</div></div>
        <div className="complete-chars-center">
          <div style={{ fontSize: 48, textAlign: 'center' }}>🤝</div>
        </div>
        <div><ProfessorSprite size={90} reaction="happy" /><div className="char-label">PROF.</div></div>
      </div>

      <div className="story-progress">
        <div className="story-progress-label">◆ CASE UPDATE</div>
        <div className="story-progress-text">{chapter.storyProgress}</div>
      </div>

      <div className="clue-reveal">
        <div className="clue-reveal-label">NEW CLUE RECOVERED</div>
        <div className="clue-reveal-text">"{chapter.lesson.clue}"</div>
      </div>

      <button className="btn-primary btn-large btn-glow" onClick={onContinue}>RETURN TO EVIDENCE BOARD →</button>
    </div>
  );
}

function OutroScreen({ score, total, onRestart }) {
  const accuracy = total > 0 ? Math.round((score / (total * 30)) * 100) : 0;
  return (
    <div className="screen outro-screen">
      <RainScene intensity="light">
        <div className="outro-content">
          <div className="game-name-small outro-game-name">PLAYFUL PYTHONICS</div>
          <div className="outro-stamp stamp-anim">CASE: CLOSED</div>
          <h1 className="outro-title">{STORY.outro.title}</h1>
          <div className="title-divider">⬥⬥⬥⬥⬥</div>

          <div className="outro-chars">
            <DetectiveSprite size={130} />
            <ProfessorSprite size={130} reaction="happy" />
          </div>

          <div className="outro-body">
            {STORY.outro.text.map((line, i) => (
              <p key={i} className="intro-paragraph" style={{ animationDelay: `${i * 0.15}s` }}>{line}</p>
            ))}
          </div>

          <div className="final-stats">
            <div className="stat-big"><div className="stat-big-label">FINAL SCORE</div><div className="stat-big-value">{score}</div></div>
            <div className="stat-big"><div className="stat-big-label">QUESTIONS</div><div className="stat-big-value">{total}</div></div>
            <div className="stat-big"><div className="stat-big-label">RATING</div><div className="stat-big-value">{accuracy >= 90 ? '★★★' : accuracy >= 70 ? '★★' : '★'}</div></div>
          </div>

          <button className="btn-primary btn-large btn-glow" onClick={onRestart}>⟲ NEW CASE</button>
        </div>
      </RainScene>
    </div>
  );
}

// ============ STYLES ============
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;600&family=Oswald:wght@400;600;700&display=swap');

      :root {
        --paper: #e8e0cf;
        --paper-dark: #d4c9b0;
        --ink: #1a1612;
        --ink-faded: #3d342a;
        --red-stamp: #a8321f;
        --red-deep: #6e1f12;
        --accent: #b8860b;
        --correct: #2d5f3f;
        --wrong: #8b2635;
        --neon-pink: #ff2a6d;
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }

      .pp-app {
        min-height: 100vh;
        width: 100%;
        background: #0a0612;
        font-family: 'Special Elite', 'Courier New', monospace;
        color: var(--ink);
        position: relative;
        overflow-x: hidden;
      }

      .paper-bg {
        background: var(--paper);
        background-image:
          radial-gradient(circle at 20% 30%, rgba(139, 108, 66, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(110, 31, 18, 0.07) 0%, transparent 40%),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26, 22, 18, 0.02) 2px, rgba(26, 22, 18, 0.02) 3px);
      }

      .screen {
        position: relative;
        max-width: 820px;
        margin: 0 auto;
        padding: 40px 32px;
        min-height: 100vh;
        animation: fadeIn 0.6s ease-out;
      }
      .paper-bg { box-shadow: 0 0 80px rgba(0,0,0,0.5); }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes stampIn {
        0% { transform: scale(3) rotate(-15deg); opacity: 0; }
        50% { transform: scale(1.3) rotate(-4deg); opacity: 1; }
        100% { transform: scale(1) rotate(-4deg); opacity: 1; }
      }
      @keyframes slowFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 4px 4px 0 var(--red-stamp), 0 0 20px rgba(168, 50, 31, 0.3); }
        50% { box-shadow: 4px 4px 0 var(--red-stamp), 0 0 35px rgba(168, 50, 31, 0.6); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      @keyframes floatUp {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-110vh); opacity: 0; }
      }

      /* ===== GAME NAME ===== */
      .game-name-wrap {
        margin: 10px 0 18px;
        position: relative;
      }
      .game-name {
        font-family: 'Playfair Display', serif;
        font-weight: 900;
        font-size: clamp(48px, 11vw, 96px);
        line-height: 0.88;
        color: #f4e8b8;
        letter-spacing: -2px;
        text-transform: uppercase;
        text-shadow:
          4px 4px 0 var(--red-deep),
          8px 8px 0 rgba(110, 31, 18, 0.6),
          0 0 40px rgba(255, 42, 109, 0.3);
        transform: rotate(-1deg);
      }
      .game-name-deco {
        color: var(--neon-pink);
        letter-spacing: 16px;
        margin-top: 8px;
        font-size: 12px;
      }
      .game-name-small {
        font-family: 'Playfair Display', serif;
        font-weight: 900;
        font-size: 16px;
        letter-spacing: 4px;
        color: var(--red-stamp);
        text-align: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(168, 50, 31, 0.3);
      }
      .outro-game-name { color: #f4c062; border-bottom-color: rgba(244, 192, 98, 0.3); }

      /* ===== RAIN SCENE ===== */
      .rain-scene { position: absolute; inset: 0; overflow: hidden; }
      .city-backdrop, .rain-layer { position: absolute; inset: 0; width: 100%; height: 100%; }
      .rain-layer { pointer-events: none; }
      .rain-content {
        position: relative; z-index: 2; width: 100%; height: 100%;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: 24px 20px;
      }

      .paper-dust { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
      .dust {
        position: absolute; width: 4px; height: 4px;
        background: rgba(184, 134, 11, 0.4); border-radius: 50%;
        animation: floatUp linear infinite; bottom: -10px;
      }

      /* ===== TITLE ===== */
      .title-screen { padding: 0; min-height: 100vh; }
      .title-content { text-align: center; max-width: 760px; padding: 30px 20px; }
      .title-stamp {
        display: inline-block;
        font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px;
        color: var(--neon-pink); border: 3px solid var(--neon-pink);
        padding: 6px 18px; letter-spacing: 4px; transform: rotate(-3deg);
        margin-bottom: 12px; animation: stampIn 0.8s ease-out;
        box-shadow: 0 0 20px rgba(255, 42, 109, 0.4);
      }
      .title-small {
        font-family: 'Oswald', sans-serif; letter-spacing: 5px;
        font-size: 11px; color: #b8a890; text-transform: uppercase;
        margin-bottom: 14px;
      }
      .title-divider { color: var(--neon-pink); letter-spacing: 12px; margin: 12px 0; font-size: 10px; }
      .title-main {
        font-family: 'Playfair Display', serif; font-weight: 700;
        line-height: 1; margin: 6px 0 14px;
      }
      .title-line-1 {
        display: block; font-size: clamp(18px, 3.5vw, 26px);
        color: #d4c9b0; font-style: italic; letter-spacing: 2px;
      }
      .title-line-2 {
        display: block; font-size: clamp(24px, 5vw, 40px);
        color: #f4e8b8; letter-spacing: 1px;
        text-shadow: 2px 2px 0 var(--red-deep);
        font-weight: 900;
      }
      .title-subtitle {
        font-family: 'Oswald', sans-serif; letter-spacing: 3px;
        font-size: 11px; color: #b8a890; margin-bottom: 16px;
      }
      .title-detective {
        animation: slowFloat 4s ease-in-out infinite;
        margin: 6px 0 16px;
        filter: drop-shadow(0 0 20px rgba(0,0,0,0.6));
      }
      .title-footer {
        margin-top: 24px; display: flex; justify-content: center; gap: 10px;
        font-family: 'Oswald', sans-serif; font-size: 10px; letter-spacing: 3px;
        color: #b8a890; opacity: 0.7; flex-wrap: wrap;
      }

      /* ===== BUTTONS ===== */
      .btn-primary, .btn-secondary {
        font-family: 'Oswald', sans-serif; font-weight: 600;
        letter-spacing: 2px; text-transform: uppercase;
        padding: 13px 26px; border: none; cursor: pointer;
        transition: all 0.2s ease; font-size: 13px;
      }
      .btn-primary {
        background: var(--ink); color: var(--paper);
        border: 2px solid var(--ink);
        box-shadow: 4px 4px 0 var(--red-stamp);
      }
      .btn-primary:hover:not(:disabled) {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 var(--red-stamp);
      }
      .btn-primary:disabled {
        opacity: 0.4; cursor: not-allowed;
        box-shadow: 4px 4px 0 var(--ink-faded);
      }
      .btn-large { padding: 16px 38px; font-size: 15px; }
      .btn-glow:not(:disabled) { animation: glowPulse 2.5s ease-in-out infinite; }
      .btn-secondary {
        background: transparent; color: var(--ink);
        border: 2px solid var(--ink);
      }
      .btn-secondary:hover:not(:disabled) { background: var(--ink); color: var(--paper); }
      .btn-secondary:disabled { opacity: 0.3; cursor: not-allowed; }

      /* ===== INTRO ===== */
      .intro-top {
        display: grid; grid-template-columns: auto 1fr auto;
        gap: 20px; align-items: center;
        border-bottom: 3px double var(--ink);
        padding-bottom: 20px; margin-bottom: 28px;
      }
      .intro-char-left, .intro-char-right {
        text-align: center;
        animation: slowFloat 4s ease-in-out infinite;
      }
      .intro-char-right { animation-delay: 2s; }
      .char-label {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 10px; letter-spacing: 3px;
        color: var(--red-stamp); margin-top: 4px;
      }
      .case-header { text-align: center; }
      .case-header-title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(20px, 3.5vw, 30px);
        font-weight: 900; letter-spacing: 2px; line-height: 1.1;
      }
      .case-header-sub {
        font-size: 13px; color: var(--ink-faded);
        letter-spacing: 2px; margin-top: 6px;
      }
      .intro-body { margin-bottom: 28px; }
      .intro-paragraph {
        font-size: 16px; line-height: 1.7; margin-bottom: 20px;
        animation: fadeInUp 0.8s ease-out backwards;
      }

      /* ===== HUB ===== */
      .hub-screen { max-width: 900px; }
      .hub-header {
        display: flex; justify-content: space-between; align-items: flex-end;
        border-bottom: 3px double var(--ink); padding-bottom: 18px;
        margin-bottom: 22px; flex-wrap: wrap; gap: 16px;
      }
      .hub-kicker {
        font-family: 'Oswald', sans-serif; font-size: 11px;
        letter-spacing: 4px; color: var(--red-stamp);
      }
      .hub-title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(28px, 5vw, 40px); font-weight: 900;
      }
      .hub-stats { display: flex; gap: 24px; }
      .stat { text-align: center; }
      .stat-label {
        display: block; font-family: 'Oswald', sans-serif;
        font-size: 10px; letter-spacing: 2px; color: var(--ink-faded);
      }
      .stat-value {
        display: block; font-family: 'Playfair Display', serif;
        font-weight: 900; font-size: 28px;
      }
      .case-map-wrap {
        background: var(--paper-dark); border: 2px solid var(--ink);
        padding: 14px; margin-bottom: 24px;
        box-shadow: 4px 4px 0 var(--ink);
      }
      .case-map-label {
        font-family: 'Oswald', sans-serif; font-size: 11px;
        letter-spacing: 3px; color: var(--red-stamp); margin-bottom: 10px;
      }
      .case-map { width: 100%; height: auto; display: block; }

      .chapter-grid { display: grid; gap: 14px; margin-bottom: 24px; }
      .chapter-card {
        position: relative; background: var(--paper-dark);
        border: 2px solid var(--ink); padding: 18px 22px;
        display: grid; grid-template-columns: auto 1fr auto;
        gap: 18px; align-items: center; cursor: pointer;
        transition: all 0.2s; box-shadow: 4px 4px 0 var(--ink);
      }
      .chapter-card:not(.locked):hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 var(--red-stamp);
      }
      .chapter-card.locked { opacity: 0.5; cursor: not-allowed; }
      .chapter-card.done { background: var(--paper); }
      .chapter-card-num {
        font-family: 'Playfair Display', serif; font-weight: 900;
        font-size: 42px; line-height: 1; color: var(--red-stamp);
      }
      .chapter-card-title {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        letter-spacing: 2px; font-size: 15px;
      }
      .chapter-card-sub {
        font-size: 12px; color: var(--ink-faded);
        margin-top: 4px; font-style: italic;
      }
      .chapter-card-status {
        font-family: 'Oswald', sans-serif;
        font-size: 11px; letter-spacing: 2px;
      }
      .stamp-done {
        position: absolute; top: 10px; right: 10px;
        font-family: 'Oswald', sans-serif; font-weight: 700;
        color: var(--red-stamp); border: 2px solid var(--red-stamp);
        padding: 3px 10px; letter-spacing: 3px; font-size: 10px;
        transform: rotate(8deg); opacity: 0.85;
      }
      .case-notes {
        border: 2px dashed var(--ink-faded); padding: 18px;
        margin-bottom: 22px; background: rgba(184, 134, 11, 0.06);
      }
      .case-notes-title {
        font-family: 'Oswald', sans-serif; letter-spacing: 3px;
        font-size: 12px; color: var(--red-stamp); margin-bottom: 12px;
      }
      .case-note { padding: 10px 0; border-top: 1px solid rgba(26, 22, 18, 0.15); font-size: 14px; }
      .case-note:first-of-type { border-top: none; }
      .case-note-num {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 11px; letter-spacing: 2px;
        color: var(--red-stamp); margin-bottom: 4px;
      }
      .case-note-text { line-height: 1.5; font-style: italic; }

      /* ===== LESSON SCREEN ===== */
      .lesson-scene-preview {
        width: calc(100% + 64px); margin: -40px -32px 20px;
        height: 220px; overflow: hidden;
        border-bottom: 3px solid var(--ink);
        box-shadow: inset 0 -20px 30px rgba(0,0,0,0.4);
      }
      .lesson-scene-label {
        position: absolute; bottom: 12px; left: 16px;
        background: rgba(10, 6, 18, 0.85); color: #f4e8b8;
        font-family: 'Oswald', sans-serif; font-size: 11px;
        letter-spacing: 3px; padding: 4px 10px;
        border: 1px solid var(--neon-pink);
      }
      .chapter-marker {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 13px; letter-spacing: 4px;
        color: var(--red-stamp); border-bottom: 2px solid var(--red-stamp);
        padding-bottom: 6px; margin-bottom: 6px; display: inline-block;
      }
      .chapter-sub { font-style: italic; color: var(--ink-faded); font-size: 13px; margin-bottom: 14px; }
      .objective-box {
        font-family: 'Oswald', sans-serif; font-size: 13px;
        background: var(--ink); color: var(--paper);
        padding: 10px 16px; margin-bottom: 20px;
        letter-spacing: 1px;
      }
      .objective-label {
        color: var(--neon-pink); font-weight: 700;
        letter-spacing: 3px; margin-right: 8px;
      }
      .lesson-intro {
        font-size: 15px; line-height: 1.7; font-style: italic;
        color: var(--ink-faded); margin-bottom: 22px;
        padding: 16px 20px; border-left: 3px solid var(--ink);
        background: rgba(184, 134, 11, 0.06);
      }
      .teacher-block {
        background: var(--paper-dark); border: 2px solid var(--ink);
        padding: 20px; margin-bottom: 24px;
        box-shadow: 4px 4px 0 var(--ink);
      }
      .teacher-header {
        display: flex; align-items: center; gap: 14px;
        padding-bottom: 14px; border-bottom: 1px solid var(--ink-faded);
        margin-bottom: 14px;
      }
      .teacher-avatar-lg {
        background: var(--paper); border: 2px solid var(--ink);
        padding: 4px; flex-shrink: 0;
      }
      .teacher-name {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        letter-spacing: 2px; font-size: 15px;
      }
      .teacher-role {
        font-size: 12px; color: var(--ink-faded); font-style: italic;
      }
      .speech-bubble {
        position: relative; font-size: 15px; line-height: 1.75;
        font-style: italic; background: var(--paper);
        padding: 16px 18px; border: 1px solid var(--ink);
      }
      .speech-tail {
        position: absolute; top: -10px; left: 30px;
        width: 16px; height: 16px; background: var(--paper);
        border-left: 1px solid var(--ink); border-top: 1px solid var(--ink);
        transform: rotate(45deg);
      }
      .key-points {
        margin-bottom: 28px; padding: 18px 20px;
        border: 1px solid var(--ink); background: var(--paper);
      }
      .key-points-title {
        font-family: 'Oswald', sans-serif; font-size: 12px;
        letter-spacing: 3px; color: var(--red-stamp); margin-bottom: 12px;
      }
      .key-points ul { list-style: none; }
      .key-points li {
        padding: 8px 0 8px 24px; position: relative;
        font-size: 14px; line-height: 1.5;
        animation: fadeInUp 0.4s ease-out backwards;
      }
      .key-points li::before {
        content: '◆'; position: absolute; left: 0; color: var(--red-stamp);
      }

      /* ===== GAME WORLD (split screen layout) ===== */
      .question-screen-split {
        max-width: 100%; padding: 0; min-height: 100vh;
        display: grid; grid-template-columns: 1fr 420px;
        gap: 0; background: #0a0612;
      }
      .game-stage {
        position: relative; overflow: hidden;
        min-height: 100vh;
        border-right: 3px solid #2a1a1a;
      }
      .game-world {
        position: relative; width: 100%; height: 100%;
        min-height: 100vh;
      }
      .world-bg {
        position: absolute; inset: 0; width: 100%; height: 100%;
      }
      .game-world-overlay {
        position: relative; z-index: 2; width: 100%; height: 100%;
        min-height: 100vh; display: flex; flex-direction: column;
      }

      .stage-hud-top {
        display: flex; justify-content: space-between;
        align-items: flex-start; padding: 18px 22px;
        background: linear-gradient(180deg, rgba(10,6,18,0.9) 0%, transparent 100%);
      }
      .hud-game-name {
        font-family: 'Playfair Display', serif; font-weight: 900;
        font-size: 14px; color: var(--neon-pink);
        letter-spacing: 3px; text-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
      }
      .hud-chapter {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 18px; color: #f4e8b8;
        letter-spacing: 3px; margin-top: 2px;
      }
      .hud-objective {
        font-family: 'Special Elite', monospace; font-size: 12px;
        color: #d4c9b0; margin-top: 6px; max-width: 400px;
      }
      .hud-right { text-align: right; }
      .hud-progress-label {
        font-family: 'Oswald', sans-serif; font-size: 11px;
        letter-spacing: 2px; color: #f4c062; margin-bottom: 6px;
      }
      .hud-progress-bar {
        width: 150px; height: 10px; background: rgba(0,0,0,0.5);
        border: 1px solid var(--neon-pink); overflow: hidden;
      }
      .hud-progress-fill {
        height: 100%; background: linear-gradient(90deg, var(--neon-pink), #f4c062);
        transition: width 0.5s ease-out;
      }

      .stage-characters {
        flex: 1; display: flex; justify-content: space-around;
        align-items: flex-end; padding: 0 40px 80px;
        position: relative;
      }
      .sprite-wrap { filter: drop-shadow(0 8px 16px rgba(0,0,0,0.7)) drop-shadow(0 0 12px rgba(244,192,98,0.3)); }
      .stage-detective { animation: slowFloat 3s ease-in-out infinite; }
      .stage-enemy {
        display: flex; flex-direction: column;
        align-items: center; gap: 10px;
        animation: slowFloat 2.5s ease-in-out infinite;
      }
      .enemy-label {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 11px; letter-spacing: 2px;
        color: #fff; background: rgba(139, 38, 53, 0.9);
        padding: 3px 10px; border: 1px solid var(--neon-pink);
      }
      .enemy-sprite-wrap {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8));
      }
      .enemy-hp-bar {
        width: 110px; height: 8px; background: rgba(0,0,0,0.7);
        border: 1px solid #fff; overflow: hidden;
      }
      .enemy-hp-fill {
        height: 100%; background: linear-gradient(90deg, #8b2635, #ff2a6d);
        transition: width 0.6s cubic-bezier(.25,.8,.25,1);
      }
      .enemy-shake { animation: shake 0.5s; }

      .stage-professor {
        position: absolute; bottom: 70px; left: 18px;
        display: flex; align-items: flex-end; gap: 8px;
        z-index: 20;
      }
      .prof-spotlight {
        position: absolute; bottom: -10px; left: -10px;
        width: 100px; height: 120px;
        background: radial-gradient(ellipse at 50% 80%, rgba(244,192,98,0.25) 0%, transparent 75%);
        pointer-events: none;
      }
      .prof-sprite-wrap {
        filter: drop-shadow(0 0 8px rgba(244,192,98,0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.8));
        position: relative; z-index: 1;
      }
      .prof-speech {
        background: #f4e8b8; color: var(--ink);
        padding: 6px 10px; margin-bottom: 14px;
        font-size: 11px; font-style: italic;
        max-width: 110px; border: 2px solid var(--ink);
        position: relative; border-radius: 4px;
        z-index: 1;
      }
      .prof-speech::before {
        content: ''; position: absolute;
        left: -8px; bottom: 12px;
        border: 6px solid transparent;
        border-right-color: var(--ink);
      }
      .prof-speech::after {
        content: ''; position: absolute;
        left: -5px; bottom: 14px;
        border: 5px solid transparent;
        border-right-color: #f4e8b8;
      }

      @keyframes fadeOut { to { opacity: 0; transform: scale(1.15); } }
      @keyframes gunshotFlash {
        0%   { opacity: 0; }
        5%   { opacity: 0.7; }
        20%  { opacity: 0.4; }
        40%  { opacity: 0.6; }
        100% { opacity: 0; }
      }
      @keyframes bulletFly {
        0%   { transform: translateX(-35%) scaleX(0.2); opacity: 0; }
        15%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateX(65%) scaleX(1.2); opacity: 0; }
      }
      @keyframes particleBurst {
        0%   { transform: rotate(var(--angle)) translateX(0) scale(1); opacity: 1; }
        100% { transform: rotate(var(--angle)) translateX(var(--dist)) scale(0); opacity: 0; }
      }
      @keyframes sparkFloat {
        0%   { opacity: 0; transform: scale(0.4) translateY(0); }
        30%  { opacity: 1; transform: scale(1.2) translateY(-6px); }
        100% { opacity: 0; transform: scale(0.6) translateY(-14px); }
      }
      .attack-effect {
        position: absolute; inset: 0;
        pointer-events: none;
        display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.15s, fadeOut 0.5s 0.55s forwards;
      }
      .attack-svg { width: 100%; height: 100%; max-width: 520px; }
      .gunshot-screen-flash {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 28% 58%,
          rgba(255,248,192,0.55) 0%, rgba(244,192,98,0.25) 30%, transparent 70%);
        animation: gunshotFlash 0.65s ease-out forwards;
        pointer-events: none;
      }
      .bullet-trail {
        position: absolute;
        top: 58%; left: 22%; right: 30%;
        height: 3px;
        background: linear-gradient(90deg, transparent 0%, #fff8c0 40%, #f4c062 70%, transparent 100%);
        border-radius: 2px;
        animation: bulletFly 0.45s ease-out forwards;
        pointer-events: none;
      }
      .impact-particles {
        position: absolute; top: 52%; right: 32%;
        width: 0; height: 0; pointer-events: none;
      }
      .impact-particle {
        position: absolute; width: 6px; height: 6px;
        background: #f4c062; border-radius: 50%;
        animation: particleBurst 0.55s ease-out forwards;
        top: 0; left: 0;
      }

      /* ===== CODE PANEL (right side) ===== */
      .code-panel {
        background: #1a1612; color: var(--paper);
        display: flex; flex-direction: column;
        min-height: 100vh; overflow-y: auto;
      }
      .code-panel-header {
        display: flex; justify-content: space-between;
        align-items: center; padding: 12px 18px;
        background: #0f0a06; border-bottom: 2px solid var(--red-stamp);
      }
      .code-panel-tabs { display: flex; gap: 2px; }
      .code-tab {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px; padding: 6px 12px;
        background: #1a1612; color: #6a5540;
        border-top: 2px solid transparent;
      }
      .code-tab.active {
        background: #0f0a06; color: #f4c062;
        border-top-color: var(--neon-pink);
      }
      .q-type-badge {
        font-family: 'Oswald', sans-serif; font-size: 10px;
        letter-spacing: 2px; padding: 4px 10px;
        background: var(--neon-pink); color: #0a0612;
      }
      .code-panel-body {
        flex: 1; padding: 22px 20px;
      }
      .q-body { margin-bottom: 22px; }
      .q-text {
        font-size: 15px; line-height: 1.6; margin-bottom: 12px;
        color: #e8e0cf;
      }
      .code-block {
        background: #0a0608; color: #e8e0cf;
        padding: 14px 16px 14px 50px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px; line-height: 1.6;
        border-left: 4px solid var(--neon-pink);
        overflow-x: auto; white-space: pre;
        margin: 12px 0; position: relative;
        box-shadow: inset 0 0 20px rgba(255, 42, 109, 0.05);
      }
      .code-gutter {
        position: absolute; left: 10px; top: 14px;
        display: flex; flex-direction: column;
        color: #4a4038; font-size: 12px; line-height: 1.6;
        user-select: none;
      }
      .code-gutter span {
        text-align: right; padding-right: 10px;
        border-right: 1px solid #2a2420; width: 24px;
      }

      .multiselect-hint-text {
        font-family: 'Oswald', sans-serif; font-size: 10px;
        letter-spacing: 2px; color: #f4c062;
        margin-bottom: 8px; padding: 4px 8px;
        background: rgba(244,192,98,0.1); border-left: 2px solid #f4c062;
      }
      .multiselect-check { font-size: 14px; }
      .options { display: grid; gap: 8px; margin-bottom: 18px; }
      .option {
        display: grid; grid-template-columns: auto 1fr;
        gap: 12px; align-items: center; text-align: left;
        padding: 12px 14px; background: #2a2420;
        border: 2px solid #3a2e24; cursor: pointer;
        font-family: 'Special Elite', monospace;
        font-size: 14px; transition: all 0.15s;
        color: #e8e0cf;
      }
      .option:hover:not(:disabled):not(.correct):not(.wrong) {
        transform: translateX(4px); border-color: var(--neon-pink);
        background: #3a2e24;
      }
      .option.selected {
        background: var(--neon-pink); color: #0a0612;
        border-color: var(--neon-pink);
      }
      .option.selected .option-letter { background: #0a0612; color: var(--neon-pink); }
      .option.correct {
        background: var(--correct); color: #fff; border-color: #4af27a;
      }
      .option.correct .option-letter { background: #fff; color: var(--correct); }
      .option.wrong {
        background: var(--wrong); color: #fff; border-color: var(--wrong);
      }
      .option.wrong .option-letter { background: #fff; color: var(--wrong); }
      .option:disabled { cursor: default; }
      .option-letter {
        width: 24px; height: 24px;
        display: flex; align-items: center; justify-content: center;
        background: #f4c062; color: #0a0612;
        font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12px;
      }
      .option-text { white-space: pre-wrap; }
      .tf-options { grid-template-columns: 1fr 1fr; }
      .tf-option {
        justify-content: center; padding: 18px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700; letter-spacing: 3px; font-size: 15px;
      }

      .text-input-wrap { margin-bottom: 18px; }
      .text-input {
        width: 100%; padding: 14px 16px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 15px; background: #0a0608; color: #f4c062;
        border: 2px solid #3a2e24; outline: none;
        transition: all 0.2s;
      }
      .text-input:focus {
        border-color: var(--neon-pink);
        box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
      }
      .text-input.correct { background: rgba(45, 95, 63, 0.3); color: #4af27a; border-color: #4af27a; }
      .text-input.wrong { background: rgba(139, 38, 53, 0.2); border-color: var(--wrong); }
      .input-hint {
        margin-top: 8px; font-size: 11px;
        color: #8a7860; font-style: italic; letter-spacing: 1px;
      }

      .feedback {
        display: grid; grid-template-columns: auto 1fr;
        gap: 14px; padding: 14px; margin-bottom: 16px;
        border: 2px solid; animation: fadeInUp 0.3s ease-out;
      }
      .feedback-correct { background: rgba(45, 95, 63, 0.2); border-color: #4af27a; }
      .feedback-wrong { background: rgba(139, 38, 53, 0.2); border-color: var(--wrong); }
      .feedback-icon {
        width: 38px; height: 38px;
        display: flex; align-items: center; justify-content: center;
        font-size: 20px; font-weight: 700;
      }
      .feedback-correct .feedback-icon { background: #4af27a; color: #0a0612; }
      .feedback-wrong .feedback-icon { background: var(--wrong); color: #fff; }
      .feedback-title {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        letter-spacing: 2px; font-size: 11px; margin-bottom: 4px;
      }
      .feedback-correct .feedback-title { color: #4af27a; }
      .feedback-wrong .feedback-title { color: #ff8a9f; }
      .feedback-msg { font-size: 13px; font-style: italic; color: #d4c9b0; }
      .feedback-answer-box { margin-top: 6px; font-size: 13px; color: #d4c9b0; }
      .feedback-answer-label { font-family: 'Oswald', sans-serif; letter-spacing: 1px; font-size: 11px; }
      .feedback-answer-box code {
        font-family: 'JetBrains Mono', monospace;
        background: var(--neon-pink); color: #0a0612;
        padding: 2px 8px;
      }
      .hint-box {
        padding: 12px 16px; background: rgba(184, 134, 11, 0.15);
        border: 2px dashed var(--accent); margin-bottom: 14px;
        font-size: 13px; line-height: 1.5; color: #f4c062;
        animation: fadeInUp 0.3s ease-out;
      }
      .hint-label {
        font-family: 'Oswald', sans-serif; font-weight: 700;
        font-size: 11px; letter-spacing: 3px;
        color: #f4c062; margin-bottom: 4px;
      }

      .code-panel-footer {
        padding: 14px 20px; border-top: 1px solid #3a2e24;
        display: flex; gap: 10px; justify-content: flex-end;
        background: #0f0a06;
      }
      .code-panel-footer .btn-secondary {
        color: #f4c062; border-color: #3a2e24;
      }
      .code-panel-footer .btn-secondary:hover:not(:disabled) {
        background: #f4c062; color: #0a0612; border-color: #f4c062;
      }
      .code-panel-footer .btn-primary {
        background: var(--neon-pink); color: #0a0612;
        border-color: var(--neon-pink);
        box-shadow: 3px 3px 0 #6e1f12;
      }
      .code-panel-footer .btn-primary:hover:not(:disabled) {
        box-shadow: 5px 5px 0 #6e1f12;
      }

      /* ===== COMPLETE / OUTRO ===== */
      .complete-screen, .outro-screen { text-align: center; padding-top: 40px; }
      .complete-stamp, .outro-stamp {
        display: inline-block; font-family: 'Oswald', sans-serif;
        font-weight: 700; letter-spacing: 6px; color: var(--red-stamp);
        border: 4px double var(--red-stamp);
        padding: 10px 28px; margin-bottom: 20px; font-size: 16px;
      }
      .stamp-anim { animation: stampIn 0.7s ease-out; transform: rotate(-4deg); }
      .complete-title {
        font-family: 'Playfair Display', serif; font-weight: 900;
        font-size: clamp(22px, 4vw, 32px); margin-bottom: 12px;
      }
      .complete-divider {
        color: var(--red-stamp); letter-spacing: 10px; margin: 20px 0;
      }
      .complete-chars {
        display: grid; grid-template-columns: 1fr auto 1fr;
        gap: 20px; align-items: center; margin: 24px 0;
      }
      .story-progress {
        border: 2px solid var(--ink); padding: 20px;
        margin-bottom: 20px; text-align: left;
        background: var(--paper-dark); box-shadow: 4px 4px 0 var(--ink);
      }
      .story-progress-label {
        font-family: 'Oswald', sans-serif; font-size: 12px;
        letter-spacing: 3px; color: var(--red-stamp); margin-bottom: 10px;
      }
      .story-progress-text { font-size: 15px; line-height: 1.7; }
      .clue-reveal {
        border: 2px dashed var(--accent); padding: 20px;
        margin-bottom: 28px; background: rgba(184, 134, 11, 0.1);
      }
      .clue-reveal-label {
        font-family: 'Oswald', sans-serif; font-size: 11px;
        letter-spacing: 4px; color: var(--accent); margin-bottom: 10px;
      }
      .clue-reveal-text { font-size: 15px; font-style: italic; line-height: 1.6; }
      .outro-screen { padding: 0; min-height: 100vh; }
      .outro-content {
        text-align: center; max-width: 720px;
        padding: 40px 24px; color: #e8e0cf;
      }
      .outro-title {
        font-family: 'Playfair Display', serif; font-weight: 900;
        font-size: clamp(36px, 7vw, 60px);
        text-shadow: 4px 4px 0 var(--red-deep), 0 0 30px rgba(255, 42, 109, 0.3);
        margin-bottom: 16px; color: #f4e8b8;
      }
      .outro-chars {
        display: flex; justify-content: center; gap: 32px; margin: 20px 0;
      }
      .outro-body {
        max-width: 620px; margin: 20px auto 28px;
        text-align: left; color: #d4c9b0;
      }
      .outro-body .intro-paragraph { color: #d4c9b0; }
      .final-stats {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: 16px; margin-bottom: 28px;
        border-top: 2px solid #d4c9b0; border-bottom: 2px solid #d4c9b0;
        padding: 18px 0;
      }
      .stat-big-label {
        font-family: 'Oswald', sans-serif; font-size: 10px;
        letter-spacing: 2px; color: #b8a890; margin-bottom: 6px;
      }
      .stat-big-value {
        font-family: 'Playfair Display', serif; font-weight: 900;
        font-size: clamp(24px, 4vw, 34px); color: #ff6b4a;
      }

      /* ===== MOBILE ===== */
      @media (max-width: 900px) {
        .question-screen-split {
          grid-template-columns: 1fr;
          grid-template-rows: 340px 1fr;
        }
        .game-stage { min-height: 340px; border-right: none; border-bottom: 3px solid #2a1a1a; }
        .game-world, .game-world-overlay { min-height: 340px; }
        .stage-characters { padding: 0 20px 40px; }
        .stage-professor { bottom: 30px; left: 12px; }
        .prof-speech { font-size: 10px; max-width: 90px; padding: 4px 8px; }
        .hud-objective { display: none; }
        .code-panel { min-height: auto; }
      }
      @media (max-width: 640px) {
        .screen { padding: 24px 18px; }
        .lesson-scene-preview { width: calc(100% + 36px); margin: -24px -18px 16px; height: 180px; }
        .intro-top { grid-template-columns: 1fr; gap: 12px; }
        .intro-char-left, .intro-char-right { display: none; }
        .chapter-card { grid-template-columns: auto 1fr; gap: 12px; }
        .chapter-card-status {
          grid-column: 1 / -1; text-align: right;
          padding-top: 8px; border-top: 1px solid var(--ink-faded); margin-top: 6px;
        }
        .chapter-card-num { font-size: 34px; }
        .hub-header { flex-direction: column; align-items: flex-start; }
        .tf-options { grid-template-columns: 1fr; }
        .code-panel-footer { flex-direction: column-reverse; }
        .code-panel-footer button { width: 100%; }
        .final-stats { grid-template-columns: 1fr; gap: 8px; }
        .complete-chars { grid-template-columns: 1fr; gap: 12px; }
        .outro-chars { gap: 12px; }
        .teacher-header { flex-direction: column; text-align: center; align-items: center; gap: 8px; }
        .stage-hud-top { flex-direction: column; gap: 10px; }
        .hud-right { align-self: flex-start; text-align: left; }
        .stage-characters { padding: 0 16px 30px; gap: 10px; }
      }
    `}</style>
  );
}
