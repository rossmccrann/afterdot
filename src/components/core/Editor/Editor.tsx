import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent as EditorContentType } from '../../../types';
import { EditorContainer, EditorWrapper, EditorStats } from './EditorStyles';

interface EditorProps {
  placeholder?: string;
  onChange?: (content: EditorContentType) => void;
}

export const Editor: React.FC<EditorProps> = ({ 
  placeholder = 'Start writing your paragraph...', 
  onChange 
}) => {
  // Calculate stats from editor content
  const calculateStats = useCallback((text: string, html: string) => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const characterCount = text.length;
    
    return {
      text,
      html,
      wordCount,
      characterCount,
      isPristine: text.length === 0
    };
  }, []);
  
  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      })
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (onChange) {
        const text = editor.getText();
        const html = editor.getHTML();
        const stats = calculateStats(text, html);
        onChange(stats);
      }
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        style: 'height: 100%; width: 100%;'
      }
    }
  });

  return (
    <EditorContainer>
      <EditorWrapper>
        <EditorContent editor={editor} style={{ height: '100%' }} />
      </EditorWrapper>
      <EditorStats>
        {editor?.getText().split(/\s+/).filter(Boolean).length || 0} words
      </EditorStats>
    </EditorContainer>
  );
};