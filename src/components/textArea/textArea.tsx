import { RootState } from '@/redux/store';
import { MyEditorContainer } from './textArea.module';
import { Editor, EditorState, ContentState } from 'draft-js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type props = {
  initialTXT: string
  onDataReceived?: (text: string) => void
}

const TextArea = ({initialTXT, onDataReceived}: props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  useEffect(() => {
    const initialContentState = ContentState.createFromText(initialTXT);
    const initialEditorState = EditorState.createWithContent(initialContentState);
    setEditorState(initialEditorState);
  }, [initialTXT]);
  
  const handleChange = (state: EditorState) => {

    setEditorState(state);
    const contentState: ContentState = state.getCurrentContent();
    const text: string = contentState.getPlainText();

    if( !onDataReceived) return

    onDataReceived(text)
  }  

  return (
    <MyEditorContainer isDark={isDark}>
      <Editor editorState={editorState} onChange={handleChange} />
    </MyEditorContainer>
  );
};

export default TextArea;
