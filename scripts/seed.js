import { createClient } from '@supabase/supabase-js'
import { STORY } from '../src/data/story.js'

const supabase = createClient(
  'https://dzgayfmkowbkzopdurqg.supabase.co',  
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Z2F5Zm1rb3dia3pvcGR1cnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTU5NTYsImV4cCI6MjA5NDE3MTk1Nn0.gImYcUHrHFYQlweuNUCrvg7QHo2wEb5HIhsRKLYJzxk'                 // paste your key
)

async function seed() {
  console.log('Seeding chapters and questions...')

  for (const chapter of STORY.chapters) {
    // Insert chapter
    const { data: chapterRow, error: chapterError } = await supabase
      .from('chapters')
      .upsert({
        order_num: chapter.id,
        title: chapter.title,
        subtitle: chapter.subtitle,
        scene: chapter.scene,
        objective: chapter.objective,
        story_progress: chapter.storyProgress,
        enemy_name: chapter.enemy.name,
        enemy_max_hp: chapter.enemy.maxHp,
        lesson_intro: chapter.lesson.intro,
        lesson_teacher: chapter.lesson.teacher,
        key_points: chapter.lesson.keyPoints,
        clue: chapter.lesson.clue
      }, { onConflict: 'order_num' })
      .select()
      .single()

    if (chapterError) {
      console.error('Chapter error:', chapterError)
      continue
    }

    console.log(`✓ Chapter ${chapter.id} inserted`)

    // Insert questions for this chapter
    for (let i = 0; i < chapter.questions.length; i++) {
      const q = chapter.questions[i]

      const { error: qError } = await supabase
        .from('questions')
        .upsert({
          chapter_id: chapterRow.id,
          sort_order: i,
          type: q.type,
          question_text: q.q,
          options: q.options || null,
          answer: q.answer,
          hint: q.hint,
          time_limit: q.timeLimit || null,
          extra_data: q.pairs || q.lines
            ? { pairs: q.pairs, lines: q.lines, errorLine: q.errorLine }
            : null
        }, { onConflict: 'chapter_id, sort_order' })

      if (qError) console.error(`Question error ch${chapter.id} q${i}:`, qError)
      else console.log(`  ✓ Question ${i + 1} inserted`)
    }
  }

  console.log('Done! All data seeded.')
}

seed()