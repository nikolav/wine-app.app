import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { noop } from "../../src/util";
//
const initialValue = [{ type: "paragraph", children: [{ text: "" }] }];
//
export default function SlateEditorProvider({ children }) {
  const [editor] = useState(() => withReact(createEditor()));
  const handleValueChanged = noop;
  const onChangeEditor = (value) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) handleValueChanged(value);
  };
  return (
    <Slate editor={editor} value={initialValue} onChange={onChangeEditor}>
      {children}
    </Slate>
  );
}

/**
 * Path: number[]
 *   .equals(ref, path)
 * 
 * Point: { path: Path, offset: number }
 * Range: { anchor: Point, focus: Point  }
 * Location: Path | Point | Range
 * 
 * Text: { text: string }
 *   .isText(node)
 * 
 * Node{ children: Node[] }
 *   .parent: Node
 * 
 * Editor{ children: Node[] }
 *   .selection: Range
 *   .nodes() selects nodes to iterate over
 *   .insertText(editor, text)
 *   .insertFragment(editor, fragment)
 *   .deleteBackward(editor, amount)
 *   .insertBreak(editor)
 *   //
 *   .apply(<operation>); auto-applies low level operations with <Transforms>
 * 
 * 
 * Transforms{}
 *   .select()
 *   .move()
 *   .setNodes(editor, fields, options)
 *   .insertText(editor, text, options)
 * 
 * 
 * extend editor:
 *   const NEd = {
 *     ...Editor, 
 *     ...CustomAPI
 *   };
 interface Editor {
  // Current editor state
  children: Node[]
  selection: Range | null
  operations: Operation[]
  marks: Omit<Text, 'text'> | null
  // Schema-specific node behaviors.
  isInline: (element: Element) => boolean
  isVoid: (element: Element) => boolean
  normalizeNode: (entry: NodeEntry) => void
  onChange: () => void
  // Overrideable core actions.
  addMark: (key: string, value: any) => void
  apply: (operation: Operation) => void
  deleteBackward: (unit: 'character' | 'word' | 'line' | 'block') => void
  deleteForward: (unit: 'character' | 'word' | 'line' | 'block') => void
  deleteFragment: () => void
  insertBreak: () => void
  insertSoftBreak: () => void
  insertFragment: (fragment: Node[]) => void
  insertNode: (node: Node) => void
  insertText: (text: string) => void
  removeMark: (key: string) => void
}
 * 
override editor method
  {
    ...Editor, 
    isInline: (function (isInlineBase) {
      return (el) => {
        return "link" === el.type ? true : isInlineBase(el);
      };
    })(Editor.isInline.bind(Editor))
  }


  // Element renderers are just simple React components
  const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

 */
