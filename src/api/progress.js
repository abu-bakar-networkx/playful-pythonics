import { supabase } from '../supabase'

// Save progress after completing a chapter
export async function saveProgress(chapterId, score) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Save chapter progress
  await supabase.from('progress').upsert({
    user_id: user.id,
    chapter_id: chapterId,
    completed: true,
    score: score
  }, { onConflict: 'user_id, chapter_id' })

  // Update leaderboard
  const { data: allProgress } = await supabase
    .from('progress')
    .select('score')
    .eq('user_id', user.id)

  const totalScore = allProgress.reduce((sum, p) => sum + p.score, 0)

  await supabase.from('leaderboard').upsert({
    user_id: user.id,
    username: user.user_metadata.username,
    total_score: totalScore,
    chapters_done: allProgress.length,
    updated_at: new Date()
  }, { onConflict: 'user_id' })
}

// Load a user's completed chapters when they log in
export async function loadProgress() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('progress')
    .select('chapter_id, score, completed')
    .eq('user_id', user.id)

  return data || []
}

// Fetch top 10 leaderboard
export async function fetchLeaderboard() {
  const { data } = await supabase
    .from('leaderboard')
    .select('username, total_score, chapters_done')
    .order('total_score', { ascending: false })
    .limit(10)

  return data || []
}