import json
import re

with open('src/data/story.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Chapter 1 HP
content = content.replace('enemy: { name: "CORRUPTED TERMINAL", maxHp: 10 }', 'enemy: { name: "CORRUPTED TERMINAL", maxHp: 8 }')

# Fix Mid-Boss
content = content.replace('enemy: { name: "ROGUE FIREWALL", maxHp: 20 }', 'enemy: { name: "ROGUE FIREWALL", maxHp: 22 }')
content = content.replace('Attack exactly 5 times!', 'Attack exactly 20 times!')
content = content.replace('answer: 5, hint: "for i in range(5):', 'answer: 20, hint: "for i in range(20):')

# Fix Final Boss
content = content.replace('enemy: { name: "THE MASTERMIND", maxHp: 25 }', 'enemy: { name: "THE MASTERMIND", maxHp: 52 }')
content = content.replace('The Mastermind summons 7 proxies', 'The Mastermind summons 50 proxies')
content = content.replace('answer: 7, hint: "for i in range(7):', 'answer: 50, hint: "for i in range(50):')

with open('src/data/story.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("HP patched.")
