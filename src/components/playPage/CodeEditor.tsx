'use client';

import React, { useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import { FaPlay, FaCode, FaLightbulb, FaDownload, FaUndo } from 'react-icons/fa';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultValue?: string;
  height?: string;
  theme?: string;
  onCodeRun?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultLanguage = 'javascript',
  defaultValue = '// Write your code here...',
  height = '70vh',
  theme = 'vs-dark',
  onCodeRun
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState(defaultLanguage);
  
  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }
  
  function runCode() {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      if (onCodeRun) {
        onCodeRun(code);
      } else {
        console.log("Code executed:", code);
      }
    }
  }
  
  function downloadCode() {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${language === 'javascript' ? 'js' : language}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
  
  function resetCode() {
    if (editorRef.current) {
      editorRef.current.setValue(defaultValue);
    }
  }

  const languages = ['javascript', 'typescript', 'python', 'java'];
  
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
      <div className="flex justify-between items-center p-2 bg-gray-900">
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`px-3 py-1 text-sm rounded-md ${
                language === lang 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              onClick={() => setLanguage(lang)}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center"
            onClick={runCode}
          >
            <FaPlay className="mr-1" /> Run
          </button>
          <button 
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
            onClick={downloadCode}
          >
            <FaDownload />
          </button>
          <button 
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
            onClick={resetCode}
          >
            <FaUndo />
          </button>
        </div>
      </div>

      <Editor
        height={height}
        language={language}
        defaultValue={defaultValue}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 10 }
        }}
      />
      
      <div className="bg-gray-900 p-2 text-xs text-gray-400 flex justify-between">
        <div className="flex items-center">
          <FaCode className="mr-1" /> AlgoBattle Editor
        </div>
        <div className="flex items-center">
          <FaLightbulb className="mr-1" /> Press Ctrl+Space for suggestions
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;