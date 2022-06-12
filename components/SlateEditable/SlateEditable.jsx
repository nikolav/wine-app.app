//
// https://nikolav.rs/app/13--slate-js-editor/
//
//
import React, { useCallback } from "react";
import { has, escapeHtml } from "../../src/util";
//
// Import the Slate editor factory.
import {
  //   createEditor,
  Node,
  //   Range,
  Point,
  Transforms,
  Editor,
  //   Path,
  Text,
  Element as SlateElement,
  //   Descendant,
} from "slate";
// Import the Slate components and React plugin.
import { Editable } from "slate-react";
import SlateToolbar from "../SlateToolbar/SlateToolbar";
//
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
/**
 * resetNodes resets the value of the editor.
 * It should be noted that passing the `at` parameter may cause 
 *   a "Cannot resolve a DOM point from Slate point" error.
 * 
  options: {
    nodes?: Node | Node[],
    at?: Location
  }
 */
export const resetNodes = (editor, options = {}) => {
  const children = [...editor.children];

  children.forEach((node) =>
    editor.apply({ type: "remove_node", path: [0], node })
  );

  if (options.nodes) {
    const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes;

    nodes.forEach((node, i) =>
      editor.apply({ type: "insert_node", path: [i], node })
    );
  }

  const point =
    options.at && Point.isPoint(options.at)
      ? options.at
      : Editor.end(editor, []);

  if (point) {
    Transforms.select(editor, point);
  }
};
//
export const slateSerializePlainText = (nodes) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};
//
//
export function slateSerializeHTML(node) {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    switch (true) {
      case node.bold:
        string = `<strong>${string}</strong>`;
        break;
      case node.italic:
        string = `<em>${string}</em>`;
        break;
      case node.underline:
        string = `<u>${string}</u>`;
        break;
      default:
        break;
    }
    return string;
  }

  const children = node.children.map((n) => slateSerializeHTML(n)).join("");

  switch (true) {
    case "block-quote" === node.type:
      return `<blockquote>${children}</blockquote>`;
    case "paragraph" === node.type:
      return `<p>${children}</p>`;
    case "heading-one" === node.type:
      return `<h1>${children}</h1>`;
    case "heading-two" === node.type:
      return `<h2>${children}</h2>`;
    case "bulleted-list" === node.type:
      return `<ul>${children}</ul>`;
    case "numbered-list" === node.type:
      return `<ol>${children}</ol>`;
    case "list-item" === node.type:
      return `<li>${children}</li>`;
    default:
      return `<div>${children}</div>`;
  }
}

////
////
const SlateEditable = ({ editor }) => {
  //
  const renderLeaf = useCallback((props) => <LeafNode {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  //
  //
  return (
    <div className="h-full px-4">
      <SlateToolbar editor={editor} />
      <div
        style={{
          height: "calc(100% - 10rem)",
        }}
        className="border-4 border-slate-900 border-t-0 rounded-b-xl overflow-y-auto scrollbar-thin"
      >
        <article className="prose">
          <Editable
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Vaš tekst ovde..."
            autoFocus
            autoComplete="off"
            className="ml-2"
          />
        </article>
      </div>
    </div>
  );
};

export default SlateEditable;

//
// Slate components
//   - render text{}
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
//   - render element{}
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
