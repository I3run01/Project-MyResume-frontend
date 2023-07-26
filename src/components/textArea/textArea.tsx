import { RootState } from '@/redux/store';
import { MyEditorContainer } from './textArea.module';
import { Editor, EditorState, ContentState } from 'draft-js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type props = {
  initialTXT: string
  onDataReceived?: (text: string, index?:number) => void
  index?: number
  DoesNotReRenderInitialTXT?: boolean
}

const TextArea = ({initialTXT, onDataReceived, index, DoesNotReRenderInitialTXT}: props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  useEffect(() => {
    if(DoesNotReRenderInitialTXT) return

    const initialContentState = ContentState.createFromText(initialTXT);
    const initialEditorState = EditorState.createWithContent(initialContentState);
    setEditorState(initialEditorState);
  }, [initialTXT]);

  useEffect(() => {
    const initialContentState = ContentState.createFromText(initialTXT);
    const initialEditorState = EditorState.createWithContent(initialContentState);
    setEditorState(initialEditorState);
  }, []);
  
  const handleChange = (state: EditorState) => {

    setEditorState(state);
    const contentState: ContentState = state.getCurrentContent();
    const text: string = contentState.getPlainText();

    if(onDataReceived) onDataReceived(text, index)
  }  

  return (
    <MyEditorContainer isDark={isDark}>
      <Editor editorState={editorState} onChange={handleChange} />
    </MyEditorContainer>
  );
};

export default TextArea;
