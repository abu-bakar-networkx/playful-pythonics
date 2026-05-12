import { supabase } from '../supabase'

// Get all chapters (without questions — for the hub screen)
export async function fetchChapters() {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .order('order_num')

  if (error) throw error
  return data
}

// Get all questions for one chapter
export async function fetchQuestions(chapterId) {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('sort_order')

  if (error) throw error
  return data
}