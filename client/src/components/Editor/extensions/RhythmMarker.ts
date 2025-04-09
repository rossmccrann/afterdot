import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

interface RhythmMarkerOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    rhythmMarker: {
      setMark: (attributes: {
        id: string;
        complexity: number;
        type: string;
      }) => ReturnType;
    };
  }
}

export const RhythmMarkerExtension = Extension.create<RhythmMarkerOptions>({
  name: 'rhythmMarker',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setMark:
        attributes => ({ state, view }) => {
          const { id, complexity, type } = attributes;
          const { tr } = state;
          
          // Store the rhythm marker in the state
          const rhythmMarkers = this.storage.rhythmMarkers || [];
          this.storage.rhythmMarkers = [...rhythmMarkers.filter(m => m.id !== id), { id, complexity, type }];
          
          view.dispatch(tr);
          return true;
        },
    };
  },

  addStorage() {
    return {
      rhythmMarkers: [],
    };
  },

  addProseMirrorPlugins() {
    const { storage } = this;

    return [
      new Plugin({
        key: new PluginKey('rhythmMarker'),
        props: {
          decorations(state) {
            const { doc } = state;
            const decorations: Decoration[] = [];

            // Function to find sentence boundaries in the document
            const findSentences = (text: string) => {
              const sentenceRegex = /[^.!?]+[.!?]+/g;
              const sentences: Array<{ start: number; end: number; text: string }> = [];
              let match;
              
              while ((match = sentenceRegex.exec(text)) !== null) {
                sentences.push({
                  start: match.index,
                  end: match.index + match[0].length,
                  text: match[0]
                });
              }
              
              return sentences;
            };
            
            const docText = state.doc.textContent;
            const sentences = findSentences(docText);
            
            // Apply rhythm markers to sentences
            if (storage.rhythmMarkers) {
              storage.rhythmMarkers.forEach((marker: any) => {
                const { id, complexity, type } = marker;
                
                // Find matching sentence position
                const sentenceIndex = parseInt(id.replace('sentence-', ''), 10);
                const sentence = sentences[sentenceIndex];
                
                if (sentence) {
                  const intensity = Math.min(Math.round(complexity * 100), 100);
                  const markerClass = `rhythm-marker rhythm-marker-${type} rhythm-intensity-${Math.floor(intensity / 10) * 10}`;
                  
                  // Create a decoration for the sentence
                  const from = sentence.start;
                  const to = sentence.end;
                  
                  if (from < to && from >= 0 && to <= doc.content.size) {
                    // Add subtle background or left border based on sentence type
                    const decoration = Decoration.inline(from, to, {
                      class: markerClass,
                      style: `
                        position: relative;
                        border-left: ${type === 'complex' || type === 'compound-complex' ? '2px solid rgba(109, 89, 122, 0.' + intensity / 10 + ')' : 'none'};
                        padding-left: ${type === 'complex' || type === 'compound-complex' ? '3px' : '0'};
                        background: ${type === 'simple' || type === 'compound' ? 'rgba(208, 200, 176, 0.0' + intensity / 10 + ')' : 'transparent'};
                      `
                    });
                    
                    decorations.push(decoration);
                  }
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