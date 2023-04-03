import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSupabaseClientTyped} from "@/hooks";

const responsesKey = (noteId: number, author: string) => ['responses', noteId, author]
export const useResponses = ({noteId, author}:{author: string, noteId: number}) => {
  const supabase = useSupabaseClientTyped()
  async function queryFn() {
    const {data, error, status} = await supabase
      .from('responses')
      .select('*')
      .eq('note', noteId)
      .eq('author', author)
    if(error) throw error
    return data
  }
  return useQuery(responsesKey(noteId, author))
}