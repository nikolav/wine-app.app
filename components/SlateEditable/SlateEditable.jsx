import React, { useCallback } from "react";
import { has } from "../../src/util";
//
// Import the Slate editor factory.
import {
  //   createEditor,
  //   Node,
  //   Range,
  Transforms,
  Editor,
  //   Path,
  //   Text,
  Element as SlateElement,
  //   Descendant,
} from "slate";
// Import the Slate components and React plugin.
import { Editable } from "slate-react";
import SlateToolbar from "../SlateToolbar/SlateToolbar";
//
export const LIST_TYPES = { "numbered-list": 1, "bulleted-list": 1 };
export const TEXT_ALIGN_TYPES = { left: 1, center: 1, right: 1, justify: 1 };
//
//
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
//
export const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    has(TEXT_ALIGN_TYPES, format) ? "align" : "type"
  );
  const isList = has(LIST_TYPES, format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      has(LIST_TYPES, n.type) &&
      !has(TEXT_ALIGN_TYPES, format),
    split: true,
  });
  let newProperties;
  if (has(TEXT_ALIGN_TYPES, format)) {
    newProperties = {
      align: isActive ? null : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
////
////
const SlateEditable = ({ editor, width = "100%", height = "100%" }) => {
  //
  const renderLeaf = useCallback((props) => <LeafNode {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  //
  //
  return (
    <div className="border-4 border-gray-50 border-t-0 mx-4 rounded-lg overflow-hidden">
      <SlateToolbar editor={editor} />
      <article
        style={{
          width,
          height,
        }}
        className="prose"
      >
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder="Vaš tekst ovde..."
          autoFocus
          autoComplete="off"
          className="h-full ml-2 overflow-y-auto scrollbar-thin"
        />
      </article>
    </div>
  );
};

export default SlateEditable;

//
// Slate components
//
function LeafNode({ attributes, children, leaf }) {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : null,
        fontStyle: leaf.italic ? "italic" : null,
        textDecoration: leaf.underline ? "underline" : null,
      }}
      className={`${leaf.bold ? "!font-bold" : null} ${
        leaf.italic ? "!italic" : null
      } ${leaf.underline ? "!underline" : null}`}
    >
      {children}
    </span>
  );
}
//
function Element({ attributes, children, element }) {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}
