import React, { useState, useEffect, useRef } from 'react';
import { STORY } from './data/story';
import {
  TitleScreen, IntroScreen, ChapterHub, LessonScreen,
  QuestionScreen, ChapterCompleteScreen, OutroScreen
} from './components/Screens';
import './index.css';

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
  const [streak, setStreak] = useState(0);
  const [introLineIndex, setIntroLineIndex] = useState(0);
  const [profReaction, setProfReaction] = useState('neutral');
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyHit, setEnemyHit] = useState(false);
  const [detectiveAction, setDetectiveAction] = useState('idle');
  const [enemyAttacking, setEnemyAttacking] = useState(false);

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

  useEffect(() => {
    if (screen === 'questions') {
      const ch = STORY.chapters[currentChapter];
      setEnemyHp(ch.enemy.maxHp);
    }
  }, [screen, currentChapter]);

  const resetQuestionState = () => {
    setShowHint(false); setFeedback(null); setUserAnswer('');
    setSelectedOption(null); setWrongAttempts(0);
  };

  const startGame = () => { setScreen('intro'); setIntroLineIndex(0); };

  const enterChapter = (idx) => {
    setCurrentChapter(idx); setCurrentQuestion(0);
    resetQuestionState(); setScreen('lesson');
  };

  const startQuestions = () => { resetQuestionState(); setScreen('questions'); };

  const goBack = () => {
    if (screen === 'questions') { resetQuestionState(); setScreen('chapterHub'); }
    else if (screen === 'lesson') setScreen('chapterHub');
  };

  const triggerEnemyAttack = () => {
    setEnemyAttacking(true);
    setTimeout(() => setEnemyAttacking(false), 900);
  };

  const checkAnswer = async () => {
    const chapter = STORY.chapters[currentChapter];
    const q = chapter.questions[currentQuestion];
    setTotalAnswered(t => t + 1);

    if (q.type === 'code_combat') {
      let commands = [];
      const lines = userAnswer.split('\n').map(l => l.trimStart());
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('for ') && line.includes('in range(')) {
          const iterStr = line.match(/range\((\d+)\)/);
          if (iterStr) {
            const iters = parseInt(iterStr[1], 10);
            if (i + 1 < lines.length && lines[i + 1].includes('detective.attack()')) {
              for (let k = 0; k < iters; k++) commands.push('attack');
            }
          }
        } else if (line.includes('detective.attack()')) {
          commands.push('attack');
        }
      }

      if (commands.length === 0) {
        setWrongAttempts(w => w + 1);
        setFeedback({ correct: false, message: "Syntax error or no recognizable commands found." });
        setDetectiveAction('hurt');
        triggerEnemyAttack();
        setTimeout(() => setDetectiveAction('idle'), 600);
        return;
      }

      let currentEnemyHp = enemyHp;
      for (let cmd of commands) {
        if (cmd === 'attack') {
          await new Promise(resolve => {
            setDetectiveAction('attack');
            setTimeout(() => setEnemyHit(true), 200);
            setTimeout(() => {
              currentEnemyHp = Math.max(0, currentEnemyHp - 1);
              setEnemyHp(currentEnemyHp);
              setEnemyHit(false);
              setDetectiveAction('idle');
              setTimeout(resolve, 300);
            }, 700);
          });
        }
      }

      if (commands.length === q.answer) {
        setScore(s => s + Math.max(10, 50 - wrongAttempts * 10));
        setFeedback({ correct: true, message: "Script execution successful! Enemy destroyed!" });
      } else {
        setWrongAttempts(w => w + 1);
        setFeedback({ correct: false, message: `Script executed ${commands.length} hits instead of ${q.answer}. Enemy retaliates!` });
        setDetectiveAction('hurt');
        triggerEnemyAttack();
        setTimeout(() => setDetectiveAction('idle'), 600);
        setEnemyHp(chapter.enemy.maxHp);
      }
      return;
    }

    let correct = false;
    if (q.type === 'mcq' || q.type === 'debug' || q.type === 'find_syntax') {
      correct = selectedOption === q.answer;
    } else if (q.type === 'multiselect') {
      correct = Array.isArray(selectedOption) && selectedOption.length === q.answer.length && selectedOption.every(v => q.answer.includes(v));
    } else if (q.type === 'truefalse') {
      correct = (selectedOption === 0 && q.answer === true) || (selectedOption === 1 && q.answer === false);
    } else if (q.type === 'fillblank' || q.type === 'output') {
      if (q.custom) correct = q.custom(userAnswer);
      else {
        const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
        correct = normalize(userAnswer) === normalize(q.answer);
      }
    } else if (q.type === 'drag_drop' || q.type === 'match_output') {
      correct = selectedOption && q.pairs.every(p => selectedOption[p.term] === p.def);
    } else if (q.type === 'spot_error') {
      correct = selectedOption === q.errorLine;
    } else if (q.type === 'memory_match') {
      correct = selectedOption === 'COMPLETE';
    } else if (q.type === 'arrange') {
      correct = Array.isArray(selectedOption) && selectedOption.length === q.answer.length && selectedOption.every((v, i) => v === q.answer[i]);
    } else if (q.type === 'code_completion') {
      correct = q.blanks.every(b => selectedOption?.[b.id] === b.answer);
    }

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const multiplier = newStreak >= 8 ? 3 : newStreak >= 5 ? 2 : newStreak >= 3 ? 1.5 : 1;
      const base = (q.type === 'drag_drop' || q.type === 'match_output' || q.type === 'memory_match' || q.type === 'arrange' || q.type === 'code_completion') ? 50 : 30;
      setScore(s => s + Math.round(Math.max(10, base - wrongAttempts * 10) * multiplier));
      setFeedback({ correct: true, message: getCorrectMessage(newStreak) });
      setDetectiveAction('attack');
      setTimeout(() => setEnemyHit(true), 200);
      setTimeout(() => {
        setEnemyHp(hp => Math.max(0, hp - 1));
        setEnemyHit(false);
        setDetectiveAction('idle');
      }, 700);
    } else {
      setStreak(0);
      setWrongAttempts(w => w + 1);
      setFeedback({ correct: false, message: getWrongMessage(wrongAttempts) });
      setDetectiveAction('hurt');
      triggerEnemyAttack();
      setTimeout(() => setDetectiveAction('idle'), 600);
    }
  };

  const getCorrectMessage = (s = 0) => {
    if (s >= 8) return `★★★ ${s}× STREAK — UNSTOPPABLE! ★★★`;
    if (s >= 5) return `★★ ${s} IN A ROW — COMBO BONUS! ★★`;
    if (s >= 3) return `★ ${s} STREAK — The Professor is impressed. ★`;
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
      {screen === 'title' && <TitleScreen onStart={startGame} />}
      {screen === 'intro' && <IntroScreen lineIndex={introLineIndex} onContinue={() => setScreen('chapterHub')} />}
      {screen === 'chapterHub' && (
        <ChapterHub chapters={STORY.chapters} completed={completedChapters} score={score}
          caseNotes={caseNotes} onSelect={enterChapter} onFinish={() => setScreen('outro')} />
      )}
      {screen === 'lesson' && (
        <LessonScreen chapter={STORY.chapters[currentChapter]} onContinue={startQuestions} onBack={goBack} />
      )}
      {screen === 'questions' && (
        <QuestionScreen chapter={STORY.chapters[currentChapter]} qIndex={currentQuestion}
          selectedOption={selectedOption} setSelectedOption={setSelectedOption}
          userAnswer={userAnswer} setUserAnswer={setUserAnswer}
          showHint={showHint} setShowHint={setShowHint} feedback={feedback}
          profReaction={profReaction} onSubmit={checkAnswer} onNext={nextQuestion}
          onRetry={() => { setFeedback(null); setSelectedOption(null); setUserAnswer(''); }}
          enemyHp={enemyHp} enemyHit={enemyHit} detectiveAction={detectiveAction}
          enemyAttacking={enemyAttacking}
          streak={streak}
          onBack={goBack}
          onWrongAttempt={() => setWrongAttempts(w => w + 1)}
          triggerTimeOut={() => {
            setStreak(0);
            setWrongAttempts(w => w + 1);
            setFeedback({ correct: false, message: "OUT OF TIME! The sequence struck while you hesitated." });
            setDetectiveAction('hurt');
            triggerEnemyAttack();
            setTimeout(() => setDetectiveAction('idle'), 600);
          }} />
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
