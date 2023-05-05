import {Note} from "@/hooks";
import {getNoteType, NoteType} from "@/models/notes/utils";

export const UnprocessedMenu = ({onFail, onKnow}:OpenQuestionMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'bg-red-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-red-500'}>
        Not Sure
      </div>
      <div className={'bg-green-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-green-500'}>
        Got it!
      </div>
    </div>
  )
}

interface OpenQuestionMenuProps {

  onFail: () => void,
  onKnow: () => void,
}
const OpenQuestionMenu = ({onFail, onKnow}:OpenQuestionMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'bg-red-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-red-500'}>
        Not Sure
      </div>
      <div className={'bg-green-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-green-500'}>
        Got it!
      </div>
    </div>
  )
}


interface FlashcardMenuProps {
  onFail: () => void,
  onHard: () => void,
  onMedium: () => void,
  onEasy: () => void,
}
const FlashcardMenu = ({onFail, onMedium, onHard, onEasy}:FlashcardMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'p-4 flex justify-center cursor-pointer bg-red-400 hover:bg-red-500 w-1/4'}>
        Not Sure
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-orange-400 hover:bg-orange-500 w-1/4'}>
        Hard
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-green-400 hover:bg-green-500 w-1/4'}>
        Good
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-blue-400 hover:bg-blue-500 w-1/4'}>
        Easy
      </div>
    </div>
  )
}
export const BottomMenu = ({note, showAnswer, setShowAnswer}:{note?: Note, showAnswer: boolean, setShowAnswer: (show: boolean) => void}) => {
  const noteType:NoteType = getNoteType(note)
  let bottomMenu = <div></div>
  if(noteType === 'answered') {
    bottomMenu = <FlashcardMenu onFail={() => {}} onHard={() => {}} onMedium={() => {}} onEasy={() => {}}/>
  } else if (noteType === 'open') {
    bottomMenu = <OpenQuestionMenu onFail={() => {}} onKnow={() => {}}/>
  } else if (noteType === 'unprocessed') {
    bottomMenu = <UnprocessedMenu onFail={() => {}} onKnow={() => {}} />
  }
  return (
    showAnswer ? (
        bottomMenu
      ): (
        <div></div>
    )
  )
}
