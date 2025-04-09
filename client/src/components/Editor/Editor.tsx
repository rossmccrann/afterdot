import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContainer, EditorWrapper } from './EditorStyles';
import { theme } from '../../assets/styles/theme';

interface EditorProps {
  referenceText: string;
  onContentChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ referenceText, onContentChange }) => {
  // Simplified editor setup for initial testing
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your paragraph...'
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      onContentChange(text);
      console.log('Editor updated:', text); // Debug
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none',
        style: 'height: 100%; min-height: 60vh; padding: 1.5rem;'
      }
    }
  });

  // Force editor to focus when component mounts
  useEffect(() => {
    setTimeout(() => {
      if (editor) {
        editor.commands.focus('end');
      }
    }, 100);
  }, [editor]);

  return (
    <EditorContainer>
      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>
    </EditorContainer>
  );
};