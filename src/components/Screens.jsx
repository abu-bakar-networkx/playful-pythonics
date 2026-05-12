import React, { useState, useEffect } from 'react';
import { STORY } from '../data/story';
import { DetectiveSprite, ProfessorSprite, EnemySprite } from './Sprites';
import { GameWorld } from './Worlds';
import { RainScene, CaseMap, PaperDust } from './UI';

// ============ SCREENS ============

export function TitleScreen({ onStart }) {
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
          <div className="title-subtitle">NINE CHAPTERS · NINE CONCEPTS · ONE MYSTERY</div>
          <div className="title-detective"><DetectiveSprite size={150} /></div>
          <button className="btn-primary btn-large btn-glow" onClick={onStart}>▶ OPEN CASE FILE</button>
          <div className="title-footer">
            <span>PRECINCT 404</span><span>·</span><span>CLASSIFIED</span><span>·</span><span>v3.0</span>
          </div>
        </div>
      </RainScene>
    </div>
  );
}

export function IntroScreen({ lineIndex, onContinue }) {
  const lines = STORY.intro.text;
  const showAll = lineIndex >= lines.length;
  return (
    <div className="screen intro-screen paper-bg">
      <PaperDust />
      <div className="game-name-small">PLAYFUL PYTHONICS</div>
      <div className="intro-top">
        <div className="intro-char-left">
          <DetectiveSprite size={120} />
          <div className="char-label">THE DETECTIVE</div>
        </div>
        <div className="case-header">
          <div className="case-header-title">{STORY.intro.title}</div>
          <div className="case-header-sub">{STORY.intro.location}</div>
        </div>
        <div className="intro-char-right">
          <ProfessorSprite size={120} reaction="neutral" />
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

export function ChapterHub({ chapters, completed, score, caseNotes, onSelect, onFinish }) {
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
          <div className="stat"><span className="stat-label">SOLVED</span><span className="stat-value">{completed.length}/{chapters.length}</span></div>
        </div>
      </div>
      <CaseMap completed={completed} current={nextChapter} onSelect={onSelect} />
      <div className="chapter-grid">
        {chapters.map((ch, i) => {
          const isDone = completed.includes(i);
          return (
            <div key={ch.id} className={`chapter-card ${isDone ? 'done' : ''}`} onClick={() => onSelect(i)}>
              <div className="chapter-card-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="chapter-card-body">
                <div className="chapter-card-title">{ch.title}</div>
                <div className="chapter-card-sub">{ch.subtitle}</div>
              </div>
              <div className="chapter-card-status">{isDone ? '✓ CLOSED' : '→ OPEN'}</div>
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

export function LessonScreen({ chapter, onContinue, onBack }) {
  return (
    <div className="screen lesson-screen paper-bg">
      <PaperDust />
      <button className="back-btn" onClick={onBack}>← BACK</button>
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
            <ProfessorSprite size={90} reaction="neutral" />
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

// ============ QUESTION TYPE COMPONENTS ============

function DragDropQuestion({ q, selectedOption, setSelectedOption, feedback, termLabel = 'TERMS', defLabel = 'DEFINITIONS' }) {
  const [activeTerm, setActiveTerm] = useState(null);
  const [shuffledDefs] = useState(() => [...q.pairs.map(p => p.def)].sort(() => Math.random() - 0.5));
  const matches = (selectedOption && typeof selectedOption === 'object' && !Array.isArray(selectedOption)) ? selectedOption : {};

  useEffect(() => { if (!selectedOption) setActiveTerm(null); }, [selectedOption]);

  const handleTermClick = (term) => {
    if (feedback || matches[term]) return;
    setActiveTerm(prev => prev === term ? null : term);
  };

  const handleDefClick = (def) => {
    if (!activeTerm || feedback || Object.values(matches).includes(def)) return;
    setSelectedOption({ ...matches, [activeTerm]: def });
    setActiveTerm(null);
  };

  const getTermStatus = (term) => {
    if (!feedback || !matches[term]) return '';
    return matches[term] === q.pairs.find(p => p.term === term)?.def ? 'correct' : 'wrong';
  };

  return (
    <div className="drag-drop-wrap">
      <div className="drag-instruction">
        {activeTerm ? `Selected: "${activeTerm}" — now click a definition` : 'Click a term, then click its match'}
      </div>
      <div className="drag-columns">
        <div className="drag-col">
          <div className="drag-col-label">◆ {termLabel}</div>
          {q.pairs.map((pair, i) => {
            const status = getTermStatus(pair.term);
            const isActive = activeTerm === pair.term;
            const isMatched = !!matches[pair.term];
            return (
              <div key={i}
                className={`drag-term ${isActive ? 'drag-active' : ''} ${isMatched ? 'drag-matched' : ''} ${status}`}
                onClick={() => handleTermClick(pair.term)}>
                <code className="drag-code">{pair.term}</code>
                {isMatched && <span className="drag-match-text">→ {matches[pair.term]}</span>}
              </div>
            );
          })}
        </div>
        <div className="drag-col">
          <div className="drag-col-label">◆ {defLabel}</div>
          {shuffledDefs.map((def, i) => {
            const isUsed = Object.values(matches).includes(def);
            return (
              <div key={i}
                className={`drag-def ${isUsed ? 'drag-def-used' : ''} ${activeTerm && !isUsed ? 'drag-def-available' : ''}`}
                onClick={() => handleDefClick(def)}>
                {def}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpotErrorQuestion({ q, selectedOption, setSelectedOption, feedback }) {
  return (
    <div className="spot-error-wrap">
      <div className="spot-instruction">Click the line that contains the bug</div>
      <div className="spot-lines">
        {q.lines.map((line, i) => {
          const isSelected = selectedOption === i;
          const isError = i === q.errorLine;
          let cls = 'spot-line';
          if (feedback) {
            if (isError) cls += ' spot-correct';
            else if (isSelected) cls += ' spot-wrong';
          } else if (isSelected) {
            cls += ' spot-selected';
          }
          return (
            <div key={i} className={cls} onClick={() => !feedback && setSelectedOption(i)}>
              <span className="spot-linenum">{i + 1}</span>
              <code className="spot-code">{line}</code>
              {feedback && isError && <span className="spot-bug-tag">← BUG</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MemoryMatchQuestion({ q, setSelectedOption, onWrongAttempt, feedback }) {
  const [cards] = useState(() => {
    const raw = q.pairs.flatMap((pair, i) => [
      { id: `c${i}`, pairId: i, label: pair.concept },
      { id: `d${i}`, pairId: i, label: pair.def }
    ]);
    for (let i = raw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    return raw;
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [checking, setChecking] = useState(false);

  const handleCardClick = (idx) => {
    if (checking || feedback || flipped.includes(idx) || matched.has(cards[idx].pairId) || flipped.length >= 2) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setChecking(true);
      const [a, b] = newFlipped;
      if (cards[a].pairId === cards[b].pairId) {
        setTimeout(() => {
          const newMatched = new Set([...matched, cards[a].pairId]);
          setMatched(newMatched);
          setFlipped([]);
          setChecking(false);
          if (newMatched.size === q.pairs.length) setSelectedOption('COMPLETE');
        }, 600);
      } else {
        if (onWrongAttempt) onWrongAttempt();
        setTimeout(() => { setFlipped([]); setChecking(false); }, 900);
      }
    }
  };

  const isCardFlipped = (idx) => flipped.includes(idx) || matched.has(cards[idx].pairId);

  return (
    <div className="memory-wrap">
      <div className="memory-status">
        <span className="memory-found">Pairs found: {matched.size} / {q.pairs.length}</span>
        {matched.size === q.pairs.length && <span className="memory-complete">✓ ALL MATCHED — Submit!</span>}
      </div>
      <div className="memory-grid">
        {cards.map((card, idx) => (
          <div key={card.id}
            className={`memory-card ${isCardFlipped(idx) ? 'flipped' : ''} ${matched.has(card.pairId) ? 'matched' : ''}`}
            onClick={() => handleCardClick(idx)}>
            <div className="memory-card-inner">
              <div className="memory-card-back">?</div>
              <div className="memory-card-front">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrangeCodeQuestion({ q, selectedOption, setSelectedOption, feedback }) {
  const [order, setOrder] = useState([]);
  const [shuffled] = useState(() => {
    const idx = q.lines.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  });

  useEffect(() => { if (!selectedOption) setOrder([]); }, [selectedOption]);

  const addToOrder = (lineIdx) => {
    if (feedback || order.includes(lineIdx)) return;
    const newOrder = [...order, lineIdx];
    setOrder(newOrder);
    setSelectedOption(newOrder);
  };

  const removeFromOrder = (pos) => {
    if (feedback) return;
    const newOrder = order.filter((_, i) => i !== pos);
    setOrder(newOrder);
    setSelectedOption(newOrder.length > 0 ? newOrder : null);
  };

  return (
    <div className="arrange-wrap">
      <div className="arrange-instruction">Click lines in the correct order to arrange them:</div>
      <div className="arrange-pool">
        <div className="arrange-pool-label">◆ CODE LINES</div>
        {shuffled.map((lineIdx) => {
          const posInOrder = order.indexOf(lineIdx);
          const isUsed = posInOrder !== -1;
          return (
            <div key={lineIdx} className={`arrange-line ${isUsed ? 'arrange-used' : ''}`} onClick={() => addToOrder(lineIdx)}>
              <span className="arrange-num">{isUsed ? `[${posInOrder + 1}]` : '[ ]'}</span>
              <code className="arrange-code">{q.lines[lineIdx]}</code>
            </div>
          );
        })}
      </div>
      {order.length > 0 && (
        <div className="arrange-sequence">
          <div className="arrange-seq-label">YOUR SEQUENCE — click to remove:</div>
          {order.map((lineIdx, pos) => {
            let cls = 'arrange-line arrange-seq-line';
            if (feedback) cls += q.answer[pos] === lineIdx ? ' arrange-correct' : ' arrange-wrong';
            return (
              <div key={pos} className={cls} onClick={() => removeFromOrder(pos)}>
                <span className="arrange-num">{pos + 1}</span>
                <code className="arrange-code">{q.lines[lineIdx]}</code>
                {!feedback && <span className="arrange-remove">✕</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// NEW: Code Completion Question
function CodeCompletionQuestion({ q, selectedOption, setSelectedOption, feedback }) {
  const current = selectedOption || {};

  const displayTemplate = q.template.replace(/\[B(\d+)\]/g, (_, id) => {
    const val = current[parseInt(id)];
    return val ? ` ${val} ` : ' ___ ';
  });

  return (
    <div className="code-completion-wrap">
      <div className="completion-instruction">◆ SELECT values to fill each blank in the code:</div>
      <pre className="code-block">
        <div className="code-gutter">
          {displayTemplate.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <code>{displayTemplate}</code>
      </pre>
      <div className="completion-blanks">
        {q.blanks.map(blank => {
          const selected = current[blank.id];
          let wrapCls = 'completion-blank';
          if (feedback) wrapCls += selected === blank.answer ? ' completion-correct' : ' completion-wrong';
          return (
            <div key={blank.id} className={wrapCls}>
              <span className="blank-label">Blank {blank.id + 1}:</span>
              <div className="blank-options">
                {blank.options.map((opt, i) => {
                  let cls = 'blank-opt';
                  if (selected === opt) cls += ' blank-selected';
                  if (feedback && opt === blank.answer) cls += ' blank-correct-opt';
                  return (
                    <button key={i} className={cls}
                      onClick={() => !feedback && setSelectedOption({ ...current, [blank.id]: opt })}
                      disabled={!!feedback}>
                      <code>{opt}</code>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// NEW: Match Output Question (code snippet → output, uses drag-drop logic)
function MatchOutputQuestion({ q, selectedOption, setSelectedOption, feedback }) {
  return (
    <DragDropQuestion
      q={q}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      feedback={feedback}
      termLabel="CODE SNIPPETS"
      defLabel="OUTPUTS"
    />
  );
}

// NEW: Find the Syntax Question (pick syntactically correct option, renders like MCQ but with code)
function FindSyntaxQuestion({ q, selectedOption, setSelectedOption, feedback }) {
  return (
    <div className="options find-syntax-options">
      <div className="find-syntax-label">◆ Which snippet has correct Python syntax?</div>
      {q.options.map((opt, i) => (
        <button key={i}
          className={`option find-syntax-opt ${selectedOption === i ? 'selected' : ''} ${feedback ? (i === q.answer ? 'correct' : selectedOption === i ? 'wrong' : '') : ''}`}
          onClick={() => !feedback && setSelectedOption(i)}
          disabled={!!feedback?.correct}>
          <span className="option-letter">{String.fromCharCode(65 + i)}</span>
          <pre className="option-code">{opt}</pre>
        </button>
      ))}
    </div>
  );
}

// ============ QUESTION SCREEN ============
export function QuestionScreen({
  chapter, qIndex, selectedOption, setSelectedOption,
  userAnswer, setUserAnswer, showHint, setShowHint,
  feedback, profReaction, onSubmit, onNext, onRetry,
  enemyHp, enemyHit, detectiveAction, enemyAttacking,
  triggerTimeOut, streak, onBack, onWrongAttempt
}) {
  const q = chapter.questions[qIndex];
  const total = chapter.questions.length;
  const progress = (qIndex / total) * 100;
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (q.timeLimit && !feedback) setTimeLeft(q.timeLimit);
    else setTimeLeft(null);
  }, [qIndex, q.timeLimit, feedback]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || feedback) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); triggerTimeOut && triggerTimeOut(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, feedback, triggerTimeOut]);

  const canSubmit = () => {
    if (q.type === 'mcq' || q.type === 'debug' || q.type === 'truefalse' || q.type === 'find_syntax') return selectedOption !== null;
    if (q.type === 'multiselect') return Array.isArray(selectedOption) && selectedOption.length > 0;
    if (q.type === 'drag_drop' || q.type === 'match_output') return typeof selectedOption === 'object' && selectedOption !== null && !Array.isArray(selectedOption) && Object.keys(selectedOption).length === q.pairs.length;
    if (q.type === 'spot_error') return selectedOption !== null && typeof selectedOption === 'number';
    if (q.type === 'memory_match') return selectedOption === 'COMPLETE';
    if (q.type === 'arrange') return Array.isArray(selectedOption) && selectedOption.length === q.lines.length;
    if (q.type === 'code_completion') return selectedOption && q.blanks.every(b => selectedOption[b.id] !== undefined && selectedOption[b.id] !== '');
    return userAnswer.trim().length > 0;
  };

  const renderInput = () => {
    if (q.type === 'drag_drop') return <DragDropQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;
    if (q.type === 'match_output') return <MatchOutputQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;
    if (q.type === 'spot_error') return <SpotErrorQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;
    if (q.type === 'memory_match') return <MemoryMatchQuestion q={q} setSelectedOption={setSelectedOption} onWrongAttempt={onWrongAttempt} feedback={feedback} />;
    if (q.type === 'arrange') return <ArrangeCodeQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;
    if (q.type === 'code_completion') return <CodeCompletionQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;
    if (q.type === 'find_syntax') return <FindSyntaxQuestion q={q} selectedOption={selectedOption} setSelectedOption={setSelectedOption} feedback={feedback} />;

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
    if (q.type === 'multiselect') {
      const selected = Array.isArray(selectedOption) ? selectedOption : [];
      return (
        <div className="options">
          <div style={{ fontSize: 11, color: '#f4c062', marginBottom: 6 }}>* SELECT ALL THAT APPLY *</div>
          {q.options.map((opt, i) => {
            const isSel = selected.includes(i);
            let stateClass = '';
            if (feedback) {
              const isCorrectOpt = q.answer.includes(i);
              if (isCorrectOpt && isSel) stateClass = 'correct';
              else if (!isCorrectOpt && isSel) stateClass = 'wrong';
            }
            return (
              <button key={i}
                className={`option ${isSel ? 'selected' : ''} ${stateClass}`}
                onClick={() => {
                  if (!feedback) {
                    if (isSel) setSelectedOption(selected.filter(x => x !== i));
                    else setSelectedOption([...selected, i]);
                  }
                }}
                disabled={!!feedback?.correct}>
                <span className="option-letter">{isSel ? '✓' : ' '}</span>
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
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
    return (
      <div className="text-input-wrap">
        {q.type === 'code_combat' ? (
          <textarea
            className={`text-input ${feedback ? (feedback.correct ? 'correct' : 'wrong') : ''}`}
            value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Write your Python script here...\ne.g. detective.attack()"
            disabled={!!feedback}
            autoFocus
            rows={5}
            style={{ fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre', overflowY: 'auto', resize: 'vertical', width: '100%', marginBottom: 10 }}
          />
        ) : (
          <input className={`text-input ${feedback ? (feedback.correct ? 'correct' : 'wrong') : ''}`}
            type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            disabled={!!feedback?.correct}
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit() && !feedback) onSubmit(); }} />
        )}
        {q.type === 'output' && <div className="input-hint">💡 Predict exactly what the program will PRINT</div>}
      </div>
    );
  };

  const typeLabel = {
    mcq: 'MULTIPLE CHOICE', truefalse: 'TRUE / FALSE', fillblank: 'FILL IN THE BLANK',
    output: 'PREDICT OUTPUT', debug: 'DEBUG THE CODE', multiselect: 'MULTI-SELECT',
    code_combat: 'CODE EXECUTION', drag_drop: 'MATCH THE PAIRS', match_output: 'MATCH OUTPUT',
    spot_error: 'SPOT THE ERROR', memory_match: 'MEMORY MATCH', arrange: 'ARRANGE THE CODE',
    find_syntax: 'FIND THE SYNTAX', code_completion: 'CODE COMPLETION'
  }[q.type];

  const comboLabel = streak >= 8 ? '×3' : streak >= 5 ? '×2' : streak >= 3 ? '×1.5' : null;

  return (
    <div className="screen question-screen-split">
      {/* ===== LEFT: GAME WORLD ===== */}
      <div className="game-stage">
        <GameWorld type={chapter.scene}>
          {/* Top HUD */}
          <div className="stage-hud-top">
            <div className="hud-left">
              <div className="hud-game-name">PLAYFUL PYTHONICS</div>
              <div className="hud-chapter">{chapter.title}</div>
              <div className="hud-objective">► {chapter.objective}</div>
              {streak >= 3 && (
                <div className="streak-display">
                  🔥 {streak} STREAK {comboLabel && <span className="combo-badge">{comboLabel} BONUS</span>}
                </div>
              )}
            </div>
            <div className="hud-right">
              <button className="back-btn back-btn-dark" onClick={onBack}>← LEVELS</button>
              <div className="hud-progress-label">EVIDENCE {qIndex + 1} / {total}</div>
              <div className="hud-progress-bar">
                <div className="hud-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              {timeLeft !== null && (
                <div className={`hud-timer ${timeLeft <= 5 ? 'timer-critical' : timeLeft <= 10 ? 'timer-warning' : ''}`}>
                  ⏱ {timeLeft}s
                </div>
              )}
            </div>
          </div>

          {/* Characters on stage */}
          <div className="stage-characters">
            <div className="stage-detective">
              <DetectiveSprite size={140} action={detectiveAction} />
            </div>
            <div className="stage-enemy">
              <div className="enemy-label">{chapter.enemy.name}</div>
              <EnemySprite type={chapter.scene} hit={enemyHit} hp={enemyHp} maxHp={chapter.enemy.maxHp} attacking={enemyAttacking} />
            </div>
            <div className="stage-professor">
              <div className="prof-spotlight" />
              <ProfessorSprite size={90} reaction={profReaction} />
              <div className="prof-speech">
                {feedback ? (feedback.correct ? "Excellent!" : "Again!") : showHint ? "Think..." : "Careful now..."}
              </div>
            </div>
          </div>

          {/* Detective attack effect */}
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
                <text x="250" y="110" textAnchor="middle" fill="#f4c062"
                  fontFamily="Playfair Display" fontSize="66" fontWeight="900" fontStyle="italic"
                  filter="url(#txt-glow)">SOLVED!</text>
                <line x1="40" y1="118" x2="180" y2="118" stroke="#f4c062" strokeWidth="2" opacity="0.7" />
                <line x1="320" y1="118" x2="460" y2="118" stroke="#f4c062" strokeWidth="2" opacity="0.7" />
                {[50, 130, 250, 370, 450].map((x, i) => (
                  <text key={i} x={x} y={160 + (i % 2) * 26} textAnchor="middle" fill="#f4c062" fontSize={14 + (i % 3) * 6}>✦</text>
                ))}
              </svg>
              <div className="impact-particles">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="impact-particle" style={{ '--angle': `${i * 36}deg`, '--dist': `${40 + (i % 3) * 20}px` }} />
                ))}
              </div>
            </div>
          )}

          {/* Enemy attack effect */}
          {enemyAttacking && (
            <div className="enemy-attack-effect">
              <div className="enemy-attack-flash" />
              <div className="enemy-projectile" />
              <svg viewBox="0 0 500 220" className="attack-svg" style={{ opacity: 0.85 }}>
                <text x="250" y="110" textAnchor="middle" fill="#ff2a6d"
                  fontFamily="Playfair Display" fontSize="56" fontWeight="900" fontStyle="italic"
                  style={{ filter: 'drop-shadow(0 0 12px #ff2a6d)' }}>RETALIATE!</text>
                <line x1="40" y1="118" x2="180" y2="118" stroke="#ff2a6d" strokeWidth="2" opacity="0.7" />
                <line x1="320" y1="118" x2="460" y2="118" stroke="#ff2a6d" strokeWidth="2" opacity="0.7" />
              </svg>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="back-btn" onClick={onBack} style={{ fontSize: 11, padding: '3px 10px', lineHeight: 1.4 }}>← LEVELS</button>
            <div className="q-type-badge">{typeLabel}</div>
          </div>
        </div>

        {timeLeft !== null && q.timeLimit && (
          <div className="timer-track">
            <div className="timer-fill" style={{
              width: `${(timeLeft / q.timeLimit) * 100}%`,
              background: timeLeft <= 5 ? '#ff2a6d' : timeLeft <= 10 ? '#f4c062' : '#4af27a'
            }} />
          </div>
        )}

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
                <div className="feedback-title">{feedback.correct ? 'CORRECT — ENEMY TAKES DAMAGE' : 'INCORRECT — ENEMY RETALIATES'}</div>
                <div className="feedback-msg">{feedback.message}</div>
                {!feedback.correct && q.type !== 'memory_match' && q.type !== 'arrange' && q.type !== 'code_completion' && (
                  <div className="feedback-answer-box">
                    <span className="feedback-answer-label">The answer: </span>
                    <code>
                      {q.type === 'truefalse' ? (q.answer ? 'TRUE' : 'FALSE')
                        : q.type === 'mcq' || q.type === 'debug' || q.type === 'find_syntax' ? q.options[q.answer]
                        : q.type === 'spot_error' ? `Line ${q.errorLine + 1}: ${q.lines[q.errorLine]}`
                        : q.type === 'drag_drop' || q.type === 'match_output' ? q.pairs.map(p => `${p.term} → ${p.def}`).join(' | ')
                        : q.answer}
                    </code>
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
              <button className="btn-primary" onClick={onSubmit} disabled={!canSubmit()}>
                {q.type === 'code_combat' ? '▶ RUN SCRIPT' : q.type === 'memory_match' ? '✓ CONFIRM' : '⚔ ATTACK'}
              </button>
            </>
          )}
          {feedback && !feedback.correct && (<button className="btn-primary" onClick={onRetry}>↻ TRY AGAIN</button>)}
          {feedback && feedback.correct && (<button className="btn-primary btn-glow" onClick={onNext}>CONTINUE →</button>)}
        </div>
      </div>
    </div>
  );
}

export function ChapterCompleteScreen({ chapter, onContinue }) {
  return (
    <div className="screen complete-screen paper-bg">
      <PaperDust />
      <div className="game-name-small">PLAYFUL PYTHONICS</div>
      <div className="complete-stamp stamp-anim">CHAPTER CLOSED</div>
      <h2 className="complete-title">{chapter.title}</h2>
      <div className="complete-divider">⬥⬥⬥⬥⬥</div>
      <div className="complete-chars">
        <div><DetectiveSprite size={100} action="victory" /><div className="char-label">YOU</div></div>
        <div className="complete-chars-center"><div style={{ fontSize: 48, textAlign: 'center' }}>🤝</div></div>
        <div><ProfessorSprite size={100} reaction="happy" /><div className="char-label">PROF.</div></div>
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

export function OutroScreen({ score, total, onRestart }) {
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
            <DetectiveSprite size={140} />
            <ProfessorSprite size={140} reaction="happy" />
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
