import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

interface AIAnnotationOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiAnnotation: {
      setMark: (attributes: {
        id: string;
        text: string;
        type: string;
        position: { start: number; end: number };
      }) => ReturnType;
    };
  }
}

export const AIAnnotationExtension = Extension.create<AIAnnotationOptions>({
  name: 'aiAnnotation',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setMark:
        attributes => ({ state, view }) => {
          const { id, text, type, position } = attributes;
          const { tr } = state;
          
          // Store the annotation in the state
          const aiAnnotations = this.storage.aiAnnotations || [];
          this.storage.aiAnnotations = [...aiAnnotations, { id, text, type, position }];
          
          view.dispatch(tr);
          return true;
        },
    };
  },

  addStorage() {
    return {
      aiAnnotations: [],
    };
  },

  addProseMirrorPlugins() {
    const { storage } = this;

    return [
      new Plugin({
        key: new PluginKey('aiAnnotation'),
        props: {
          decorations(state) {
            const { doc } = state;
            const decorations: Decoration[] = [];

            if (storage.aiAnnotations) {
              storage.aiAnnotations.forEach((annotation: any) => {
                const { id, text, type, position } = annotation;
                
                // Create inline annotation decoration
                const from = position.start;
                const to = position.end;
                
                if (from < to && from >= 0 && to <= doc.content.size) {
                  const annotationDecoration = Decoration.widget(to, () => {
                    const annotationEl = document.createElement('span');
                    annotationEl.classList.add('ai-annotation');
                    annotationEl.classList.add(`annotation-type-${type}`);
                    annotationEl.setAttribute('data-annotation-id', id);
                    annotationEl.textContent = text;
                    annotationEl.style.opacity = '0';
                    
                    // Animate the annotation appearing
                    setTimeout(() => {
                      annotationEl.style.opacity = '0.75';
                    }, 100);
                    
                    // Fade out after a few seconds
                    setTimeout(() => {
                      annotationEl.style.opacity = '0';
                      setTimeout(() => {
                        if (annotationEl.parentNode) {
                          annotationEl.parentNode.removeChild(annotationEl);
                        }
                      }, 500);
                    }, 5000);
                    
                    return annotationEl;
                  });
                  
                  decorations.push(annotationDecoration);
                }
              });
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});