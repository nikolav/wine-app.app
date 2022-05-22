import React from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
import {
  BiBold,
  CgFormatItalic,
  AiOutlineUnderline,
  ImQuotesLeft,
  GoListOrdered,
  GoListUnordered,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  IoHelp,
} from "../icons";
import { prevent } from "../../src/util";

////
export default function SlateToolbar({
  editor,
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
}) {
  //
  const { isOn: isOnHelpSlateEditor, toggle: toggleHelpSlateEditor } =
    useStateSwitch();
  const showHelpSlateEditor = toggleHelpSlateEditor.on;

  //
  return (
    <>
      <DrawerBox
        isActive={isOnHelpSlateEditor}
        onClose={toggleHelpSlateEditor.off}
      >
        <h4>help</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus hic
          assumenda quidem minima eius mollitia nulla nemo dolore. Id provident
          beatae saepe culpa quia velit dolores accusantium placeat dolorem
          minima.
        </p>
      </DrawerBox>

      <div className="relative z-10 bg-gray-50 py-2">
        <ul className="**space-x-6 w-full h-full m-0 p-0 list-none flex flex-row justify-around items-center">
          <SlateToolbarIcon
            isActive={isMarkActive(editor, "bold")}
            onMouseDown={prevent(() => toggleMark(editor, "bold"))}
          >
            <BiBold />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isMarkActive(editor, "italic")}
            onMouseDown={prevent(() => toggleMark(editor, "italic"))}
          >
            <CgFormatItalic />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isMarkActive(editor, "underline")}
            onMouseDown={prevent(() => toggleMark(editor, "underline"))}
          >
            <AiOutlineUnderline />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "heading-one", "type")}
            onMouseDown={prevent(() => toggleBlock(editor, "heading-one"))}
          >
            <strong>h1</strong>
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "heading-two", "type")}
            onMouseDown={prevent(() => toggleBlock(editor, "heading-two"))}
          >
            <strong>h2</strong>
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "block-quote", "type")}
            onMouseDown={prevent(() => toggleBlock(editor, "block-quote"))}
          >
            <ImQuotesLeft />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "numbered-list", "type")}
            onMouseDown={prevent(() => toggleBlock(editor, "numbered-list"))}
          >
            <GoListOrdered />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "bulleted-list", "type")}
            onMouseDown={prevent(() => toggleBlock(editor, "bulleted-list"))}
          >
            <GoListUnordered />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "left", "align")}
            onMouseDown={prevent(() => toggleBlock(editor, "left"))}
          >
            <FaAlignLeft />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "center", "align")}
            onMouseDown={prevent(() => toggleBlock(editor, "center"))}
          >
            <FaAlignCenter />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "right", "align")}
            onMouseDown={prevent(() => toggleBlock(editor, "right"))}
          >
            <FaAlignRight />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            isActive={isBlockActive(editor, "justify", "align")}
            onMouseDown={prevent(() => toggleBlock(editor, "justify"))}
          >
            <FaAlignJustify />
          </SlateToolbarIcon>
          <SlateToolbarIcon
            onClick={prevent(showHelpSlateEditor)}
            classes="!text-xl"
          >
            <IoHelp />
          </SlateToolbarIcon>
        </ul>
      </div>
    </>
  );
}

function SlateToolbarIcon({
  children,
  isActive = false,
  classes = "",
  ...rest
}) {
  //
  return (
    <li
      className={`text-base text-slate-500 cursor-pointer ${
        isActive ? "opacity-90" : "opacity-30 hover:opacity-90"
      } ${classes}`}
      {...rest}
    >
      {children}
    </li>
  );
}
