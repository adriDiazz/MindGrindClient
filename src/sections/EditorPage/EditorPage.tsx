/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable prettier/prettier */
import "./styles.css";

import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	ChangeCodeMirrorLanguage,
	codeBlockPlugin,
	codeMirrorPlugin,
	CodeToggle,
	ConditionalContents,
	CreateLink,
	diffSourcePlugin,
	headingsPlugin,
	imagePlugin,
	InsertAdmonition,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	linkDialogPlugin,
	listsPlugin,
	ListsToggle,
	markdownShortcutPlugin,
	MDXEditor,
	MDXEditorMethods,
	quotePlugin,
	sandpackPlugin,
	ShowSandpackInfo,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNotes } from "../../context/NoteContext";
import { userType } from "../../context/UserContext";
import useDebounce from "../../hooks/useDebounce";
import { updateNote } from "../../services/NotesService";
import { Note, NoteResponse } from "../../types/types";
import NavBar from "../Ui/NavBar";
import Chat from "./Chat";




const simpleSandpackConfig: import("@mdxeditor/editor").SandpackConfig = {
	defaultPreset: "react",
	presets: [
		{
			label: "React",
			name: "react",
			meta: "live react",
			sandpackTemplate: "react",
			sandpackTheme: "light",
			snippetFileName: "/App.js",
			snippetLanguage: "jsx",
		},
	],
};

export default function EditorPage({ setIsEditorUrl }) {
  const [activeChat, setActiveChat] = useState(false);
  const { state } = useLocation() as {
    state: { data: NoteResponse | Note; user: userType };
  };
  const { user } = state;
  const [text, setText] = useState("");
  const [note, setNote] = useState(null);
  const { reloadNotes } = useNotes();
  const debouncedText = useDebounce(text, 1000);
  const ref = useRef<MDXEditorMethods>(null);

  let currentNote;
  const data = state.data;

  if ((data as NoteResponse).data?.notes?.length > 0) {
    currentNote = data.data.notes.find(
      (note) => note.noteId === state.data.noteId
    );
  } else if ("data" in state.data) {
    currentNote = state.data;
  }

  const sendScreenshotToServer = (blob) => {
    if(note) {
      const url = note.data
        ? `${String(import.meta.env.VITE_API_S3)}${user.userId}/${
            note.data?.noteId
          }`
        : `${String(import.meta.env.VITE_API_S3)}${user.userId}/${
            note?.noteId
          }`;
      const formData = new FormData();
      formData.append("image", blob, "screenshot.png");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response)
        .then((data) => void reloadNotes())
        .catch((error) => console.error("Error:", error));
    }
  };

  function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          callback(blob);
        }, file.type || "image/png");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  const sendImageS3 = async (imgData) => {
    if (note) {
      const url = `${String(import.meta.env.VITE_API_S3)}`;

      const imgResized = await new Promise((resolve, reject) => {
        resizeImage(imgData, 500, 500, async (blob) => {
          const formData = new FormData();
          formData.append("image", blob, "screenshot.png");

          try {
            const response = await fetch(url, {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      });

      return imgResized;
    }
  };

  const captureScreen = async () => {
    if (text) {
      const url = `${String(import.meta.env.VITE_DOWNLOAD_PDF)}/preview`;
      const markdownContent = text;

      console.log("markdownContent", markdownContent);

      const screenshot = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown: markdownContent }),
      })

      const imgData = await screenshot.blob();

      sendScreenshotToServer(imgData);
      
      }
    };

  const handleChange = (newText: string) => {
    ref.current?.setMarkdown(newText);
    setText(newText);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarElement = document.querySelector("._toolbarRoot_11eqz_145"); // Asegúrate de usar la clase correcta
      const SCROLL_THRESHOLD = 65;

      if (currentScrollY > SCROLL_THRESHOLD) {
        console.log(currentScrollY);
        navbarElement.style.position = "fixed";
        navbarElement.style.top = "0";
        navbarElement.style.width = "90vw";
      } else {
        console.log(currentScrollY);
        navbarElement.style.position = "unset";
        navbarElement.style.width = "inherit";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza al desmontar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
       if (!state || !state.data || !state.user) {
         window.location.href = "/";
       }
       let currentNote;
       let currentText = "";
       const data = state.data;

       if ((data as NoteResponse).data?.notes?.length > 0) {
         currentNote = data.data.notes.find(
           (note) => note.noteId === state.data.noteId
         );
         currentText = currentNote?.note || "";
         ref.current?.setMarkdown(currentText);
         setNote(currentNote);
       } else if ("data" in state.data) {
         currentNote = state.data;
         currentText = currentNote.data?.note || "";
         ref.current?.setMarkdown(currentText);
         setNote(currentNote);
       }
       // Establece el texto inicial basado en la data disponible
       setText(currentText);
     }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const newNote = { ...note?.data };
    newNote.note = debouncedText;
    void updateNote(user.userId, newNote)

    // Limpieza al desmontar
    return () => controller.abort();

  }, [debouncedText]);

  useEffect(() => {
    const editorDiv = document.querySelector<HTMLDivElement>(
      "._contentEditable_11eqz_352"
    );
    if (editorDiv && activeChat) {
      editorDiv.style.width = "60%";
      editorDiv.style.backgroundColor = "white";
      const div = document.querySelector<HTMLDivElement>(
        "._rootContentEditableWrapper_11eqz_1047"
      );
      if (div) {
        div.style.display = "block";
        div.style.marginLeft = "3rem";
      }
    }
    if (editorDiv && !activeChat) {
      editorDiv.style.width = "80%";
      editorDiv.style.padding = "2rem";
      editorDiv.style.backgroundColor = "white";
      const div = document.querySelector<HTMLDivElement>(
        "._rootContentEditableWrapper_11eqz_1047"
      );
      if (div) {
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
      }
    }
  }, [activeChat]);

  useEffect(() => {
    const isEditorUrl =
      window.location.pathname.includes("/editor") ||
      window.location.pathname.includes("/notes/");
    setIsEditorUrl(isEditorUrl);
  }, [state, user]);

   useEffect(() => {
     // Asegura que el DOM haya cargado completamente antes de la captura
     const timeOut = setTimeout(() => void captureScreen(), 3000); // Puede ajustar el tiempo según necesidad

      // Limpieza al desmontar
      return () => clearTimeout(timeOut);
   }, [debouncedText, note]);

  return (
    <>
      <NavBar note={currentNote.data} />
      <div className="editor-container" id="capture">
        <MDXEditor
          markdown={text || ""}
          ref={ref}
          onChange={(newText) => handleChange(newText)}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  {" "}
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <CreateLink />
                  <InsertAdmonition />
                  <InsertCodeBlock />
                  <InsertFrontmatter />
                  <InsertImage />
                  <InsertTable />
                  <InsertThematicBreak />
                  <ListsToggle />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === "codeblock",
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        when: (editor) => editor?.editorType === "sandpack",
                        contents: () => <ShowSandpackInfo />,
                      },
                      {
                        fallback: () => (
                          <>
                          </>
                        ),
                      },
                    ]}
                  />
                </>
              ),
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            imagePlugin({
              imageUploadHandler: async (image) => {
                const uploaded = await sendImageS3(image);

                return uploaded.Location
              },
            }),
            tablePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            linkDialogPlugin(),
            diffSourcePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: { js: "JavaScript", css: "CSS" },
            }),
          ]}
        />
        <Chat activeChat={activeChat} setActiveChat={setActiveChat} />
      </div>
    </>
  );
}
