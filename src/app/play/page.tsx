'use client';

import React, { useState } from 'react';
import CodeEditor from '@/components/playPage/CodeEditor';
import { FaPlay, FaSave, FaChevronDown, FaUsers, FaClock } from 'react-icons/fa';

export default function PlayPage() {
  const [output, setOutput] = useState<string>('');
  const [challenge, setChallenge] = useState<string>('Factorial Challenge');

  const runUserCode = (code: string) => {
    try {
      // In a real app, you would want to safely evaluate this code
      // Consider using a Web Worker or server-side evaluation
      const result = eval(`(function() { ${code} })()`);
      setOutput(`// Output:\n${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`// Error:\n${error.message}`);
      } else {
        setOutput(`// Error:\n${String(error)}`);
      }
    }
  };

  const sampleCode = `// ${challenge}
// Write a function to calculate the factorial of a number

function factorial(n) {
  // Your code here
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Test your solution
factorial(5); // Should return 120
`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">AlgoBattle</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-yellow-400">
              <FaClock className="mr-1" />
              <span>15:00</span>
            </div>
            <div className="flex items-center text-green-400">
              <FaUsers className="mr-1" />
              <span>2 Players</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center">
              <FaSave className="mr-1" />
              Save
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center">
              <FaPlay className="mr-1" />
              Submit
            </button>
          </div>
        </div>

        {/* Challenge Selector */}
        <div className="mb-4 p-3 bg-gray-800 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{challenge}</h2>
            <button className="flex items-center text-gray-400 hover:text-white">
              Change Challenge <FaChevronDown className="ml-1" />
            </button>
          </div>
          <p className="text-gray-400 mt-2">
            Write a function that calculates the factorial of a given number n.
            The factorial of n is the product of all positive integers less than or equal to n.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <CodeEditor 
              defaultLanguage="javascript"
              defaultValue={sampleCode}
              height="70vh"
              onCodeRun={runUserCode}
            />
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-900 p-2 font-medium">Output</div>
            <div className="p-4 font-mono text-sm overflow-auto h-[70vh]">
              {output || "// Code output will appear here when you run your code"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}