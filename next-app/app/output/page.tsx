'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';

export default function OutputPage() {
  const router = useRouter();
  const [metadata, setMetadata] = useState<{ key: string; value: string }[]>([]);
  const [inputOverview, setInputOverview] = useState<string>('Input Overview not found');
  const [problemStatement, setProblemStatement] = useState<string>('Problem Statement not found');
  const [objectives, setObjectives] = useState<string>('Objective not found');
  const [darciArray, setDarciArray] = useState<{ Role: string; Tag: string; Guidelines: string[] }[]>([]);
  const [projectTimelineArray, setProjectTimelineArray] = useState<{ TimePeriod: string; Activity: string; PIC: string }[]>([]);
  const [successMetricsArray, setSuccessMetricsArray] = useState<{ Metric: string; Definition: string; Actual: string; Target: string }[]>([]);
  const [userStoriesArray, setUserStoriesArray] = useState<{ Title: string; UserStory: string; AcceptanceCriteria: string; Priority: string }[]>([]);

  const addDarciRow = () => {
    setDarciArray([...darciArray, { Role: "", Tag: "", Guidelines: [] }]);
  };
  const deleteDarciLastRow = () => {
    if (darciArray.length > 0) {
        setDarciArray(darciArray.slice(0, -1));
    }
  };

  const addProjectTimelineRow = () => {
    setProjectTimelineArray([...projectTimelineArray, { TimePeriod: "", Activity: "", PIC: "" }]);
  };
  const deleteProjectTimelineLastRow = () => {
    if (projectTimelineArray.length > 0) {
        setProjectTimelineArray(projectTimelineArray.slice(0, -1));
    }
  };

  const addSuccessMetricsRow = () => {
    setSuccessMetricsArray([...successMetricsArray, { Metric: "", Definition: "", Actual: "", Target: "" }]);
  };

  const deleteSuccessMetricsLastRow = () => {
    if (successMetricsArray.length > 0) {
        setSuccessMetricsArray(successMetricsArray.slice(0, -1));
    }
  };

  const addUserStoriesRow = () => {
    setUserStoriesArray([...userStoriesArray, { Title: "", UserStory: "", AcceptanceCriteria: "", Priority: "" }]);
  }
  const deleteUserStoriesLastRow = () => {
    if (userStoriesArray.length > 0) {
        setUserStoriesArray(userStoriesArray.slice(0, -1));
    }
  };

  const downloadContent = async () => {
    // Hide buttons by manipulating the DOM directly
    const buttons = document.querySelectorAll('.actions button');
    buttons.forEach(button => {
      (button as HTMLElement).style.display = 'none';
    });
  
    const content = document.getElementById("downloadable-content");
    
    if (!content) {
      // Restore buttons if content is not found
      buttons.forEach(button => {
        (button as HTMLElement).style.display = '';
      });
      return;
    }
  
    // Capture the entire content as one large canvas
    const canvas = await html2canvas(content, {
      scale: 2,
      scrollY: -window.scrollY,
      useCORS: true
    });
  
    const pdf = new jsPDF("p", "mm", "a4");
    
    // PDF page dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
  
    // Determine the ratio between the PDF width and the canvas width
    const ratio = pdfWidth / canvas.width;
  
    // Calculate how much of the canvas height fits on one PDF page
    const pageCanvasHeight = pdfPageHeight / ratio;
  
    let remainingHeight = canvas.height; 
    let currentPage = 0;
    let sourceY = 0;
  
    // Loop until we've processed all canvas height
    while (remainingHeight > 0) {
      // Create a temporary canvas to hold the current page portion
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);
  
      const pageCtx = pageCanvas.getContext("2d");
      if (pageCtx) {
        // Draw the portion of the main canvas for the current page
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height
        );
  
        const pageImgData = pageCanvas.toDataURL("image/png");
  
        // If this is not the first page, add a new page to the PDF
        if (currentPage > 0) {
          pdf.addPage();
        }
  
        // Add the cropped image to the PDF
        pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, (pageCanvas.height * ratio));
      }
  
      // Move to the next portion
      remainingHeight -= pageCanvasHeight;
      sourceY += pageCanvasHeight;
      currentPage++;
    }
  
    // Save the PDF
    pdf.save("product-requirements-document.pdf");
  
    // Restore buttons after the PDF is generated
    buttons.forEach(button => {
      (button as HTMLElement).style.display = '';
    });
  };
  
  const downloadDocx = () => {
    const originalContent = document.getElementById("downloadable-content");
    if (!originalContent) return;

    // Clone the content so we can remove buttons without affecting the displayed page
    const clone = originalContent.cloneNode(true) as HTMLElement;

    // Remove all elements with the class "actions" from the clone
    const actionElements = clone.querySelectorAll('.actions');
    actionElements.forEach(el => el.remove());

    // Now clone only has the main content without buttons
    const html = clone.innerHTML;

    // Convert to DOCX
    const blob = htmlDocx.asBlob(`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
    saveAs(blob, 'product-requirements-document.docx');
  };

  const resetData = () => {
    // Reset all state variables to their initial values
    setMetadata([]);
    setInputOverview('Input Overview not found');
    setProblemStatement('Problem Statement not found');
    setObjectives('Objective not found');
    setDarciArray([]);
    setProjectTimelineArray([]);
    setSuccessMetricsArray([]);
    setUserStoriesArray([]);
    localStorage.removeItem('outputText');

    // Navigate back to the home page
    router.push("/home");
  };

  const returnToHome = () => {
    router.push("/home");
  };


  useEffect(() => {
    const outputText = localStorage.getItem('outputText');
    // Extract metadata from the output text
    if (outputText) {
      const metadataMatch = outputText.match(/"Metadata"\s*:\s*\{([^}]+)\}/);
      if (metadataMatch) {
        const metadataText = metadataMatch[1];
        const regex = /"([^"]+)"\s*:\s*"([^"]*)"|"([^"]+)"\s*:\s*(\d+)/g;
        const extractedMetadata = [];
        let match;

        while ((match = regex.exec(metadataText)) !== null) {
          const key = match[1] || match[3];
          const value = match[2] || match[4];
          extractedMetadata.push({ key, value });
        }

        setMetadata(extractedMetadata);
      } else {
        setMetadata([{ key: 'Error', value: 'Metadata not found' }]);
      }
    }
    // Extract Overview
    if (outputText) {
      try {
        const inputOverviewMatch = outputText.match(/"Input Overview":\s*"([^"]+)"/);
        const problemStatementMatch = outputText.match(/"Problem Statement":\s*{([^}]+)}/);
        const objectiveMatch = outputText.match(/"Objective":\s*{([^}]+)}/);

        // Extract and process content
        const inputOverviewText = inputOverviewMatch ? inputOverviewMatch[1] : 'Input Overview not found';
        const problemStatementText = problemStatementMatch
          ? problemStatementMatch[1]
              .replace(/"[^"]+":\s*"/g, '') // Remove keys
              .replace(/",?\s*$/, '') // Remove trailing commas or quotes
          : 'Problem Statement not found';

        const objectivesText = objectiveMatch
          ? objectiveMatch[1]
              .replace(/"[^"]+":\s*"/g, '') // Remove keys
              .replace(/",?\s*$/, '') // Remove trailing commas or quotes
          : 'Objective not found';

        setInputOverview(inputOverviewText);
        setProblemStatement(problemStatementText);
        setObjectives(objectivesText);
      } catch (error) {
        console.error('Error processing data with regex:', error);
      }
    }
    // Extract DARCI Table
    if (outputText) {
      try {
          interface DARCIItem {
              Role: string;
              Tag: string;
              Guidelines: string[];
          }

          const extractDARCIValues = (role : string): DARCIItem[] => {
              const darciArray: DARCIItem[] = [];
              const regex = new RegExp(`"${role}":\\s*{\\s*"Tag":\\s*"([^"]+)",\\s*"Guidelines":\\s*\\[(.*?)\\]\\s*}`, 'gs');
              let match: RegExpExecArray | null;
              while ((match = regex.exec(outputText)) !== null) {
                  const tag = match[1];
                  const guidelines = match[2].split(/,\s*(?=")/).map(g => g.replace(/"/g, '').trim());
                  darciArray.push({
                      Role: role,
                      Tag: tag,
                      Guidelines: guidelines
                  });
              }
              return darciArray;
          };

          const roles = ["Decision Maker", "Accountable", "Responsible", "Consulted", "Informed"];
          const extractedDarciArray: DARCIItem[] = [];

          roles.forEach(role => {
              const roleData = extractDARCIValues(role);
              extractedDarciArray.push(...roleData);
          });

          setDarciArray(extractedDarciArray);
          console.log('Updated darciArray:', extractedDarciArray); // Debugging statement
      } catch (error) {
          console.error('Error processing DARCI Table data:', error);
      }
    }
    // Extract Project Timeline
    if (outputText) {
      const extractValues = (pattern: RegExp): string[] => {
        const valuesArray: string[] = [];
        const regex = new RegExp(pattern, 'g');
        let match: RegExpExecArray | null;
        while ((match = regex.exec(outputText)) !== null) {
          valuesArray.push(match[1]);
        }
        return valuesArray;
      };

      const timePeriods = extractValues(/"Time Period":\s*"([^"]+)"/);
      const activities = extractValues(/"Activity":\s*"([^"]+)"/);
      const pics = extractValues(/"PIC":\s*"([^"]+)"/);

      const projectTimelineArray = [];
      for (let i = 0; i < timePeriods.length; i++) {
        projectTimelineArray.push({
          TimePeriod: timePeriods[i],
          Activity: activities[i],
          PIC: pics[i]
        });
      }

      setProjectTimelineArray(projectTimelineArray);
    }
    // Extract Success Metrics
    if (outputText) {
      const extractMetrics = (pattern: RegExp): string[] => {
        const metricsArray: string[] = [];
        const regex = new RegExp(pattern, 'g');
        let match: RegExpExecArray | null;
        while ((match = regex.exec(outputText)) !== null) {
          metricsArray.push(match[1]);
        }
        return metricsArray;
      };

      const metrics = extractMetrics(/"Metric":\s*"([^"]+)"/);
      const definitions = extractMetrics(/"Definition":\s*"([^"]+)"/);
      const actuals = extractMetrics(/"Actual":\s*"([^"]+)"/);
      const targets = extractMetrics(/"Target":\s*"([^"]+)"/);

      const successMetricsArray = [];
      for (let i = 0; i < metrics.length; i++) {
        successMetricsArray.push({
          Metric: metrics[i],
          Definition: definitions[i],
          Actual: actuals[i],
          Target: targets[i]
        });
      }

      setSuccessMetricsArray(successMetricsArray);
    }
    // Extract User Stories
    if (outputText) {
      const extractUserStories = (pattern: RegExp): string[] => {
        const userStoriesArray: string[] = [];
        const regex = new RegExp(pattern, 'g');
        let match: RegExpExecArray | null;
        while ((match = regex.exec(outputText)) !== null) {
          userStoriesArray.push(match[1]);
        }
        return userStoriesArray;
      };

      const titles = extractUserStories(/"Title":\s*"([^"]+)"/);
      const userStories = extractUserStories(/"User Story":\s*"([^"]+)"/);
      const acceptanceCriteria = extractUserStories(/"Acceptance Criteria":\s*"([^"]+)"/);
      const priorities = extractUserStories(/"Priority":\s*"([^"]+)"/);

      const userStoriesArray = [];
      for (let i = 0; i < titles.length; i++) {
        userStoriesArray.push({
          Title: titles[i],
          UserStory: userStories[i],
          AcceptanceCriteria: acceptanceCriteria[i],
          Priority: priorities[i]
        });
      }

      setUserStoriesArray(userStoriesArray);
    }
  }, []);


  return (
    <div id="downloadable-content" className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Product Requirements Document
        </h1>
  
        {/* Metadata */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Metadata</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <tbody>
              {metadata.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-black">{item.key}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Overview</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-1">Input Overview</label>
            <p className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-black" contentEditable suppressContentEditableWarning>
              {inputOverview}
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-1">Problem Statement</label>
            <p className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-black" contentEditable suppressContentEditableWarning>
              {problemStatement}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Objective</label>
            <p className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-black" contentEditable suppressContentEditableWarning>
              {objectives}
            </p>
          </div>
        </div>
  
        {/* DARCI Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">DARCI Table</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-black">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Tag</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Guidelines</th>
              </tr>
            </thead>
            <tbody>
              {darciArray.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-black">{item.Role}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Tag}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <ul className="list-disc pl-5">
                      {item.Guidelines.map((guideline, idx) => (
                        <li key={idx} className="text-black" contentEditable suppressContentEditableWarning>{guideline}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-4 actions">
            <button
              onClick={addDarciRow}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Row
            </button>
            <button
              onClick={deleteDarciLastRow}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Last Row
            </button>
          </div>
        </div>
  
        {/* Project Timeline */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Project Timeline</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-black">Time Period</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Activity</th>
                <th className="border border-gray-300 px-4 py-2 text-black">PIC</th>
              </tr>
            </thead>
            <tbody>
              {projectTimelineArray.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.TimePeriod}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Activity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.PIC}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-4 actions">
            <button
              onClick={addProjectTimelineRow}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Row
            </button>
            <button
              onClick={deleteProjectTimelineLastRow}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Last Row
            </button>
          </div>
        </div>
  
        {/* Success Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Success Metrics</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-black">Metric</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Definition</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Actual</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Target</th>
              </tr>
            </thead>
            <tbody>
              {successMetricsArray.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Metric}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Definition}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Actual}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Target}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-4 actions">
            <button
              onClick={addSuccessMetricsRow}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Row
            </button>
            <button
              onClick={deleteSuccessMetricsLastRow}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Last Row
            </button>
          </div>
        </div>
  
        {/* User Stories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">User Stories</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-black">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-black">User Story</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Acceptance Criteria</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Priority</th>
              </tr>
            </thead>
            <tbody>
              {userStoriesArray.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.UserStory}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.AcceptanceCriteria}</td>
                  <td className="border border-gray-300 px-4 py-2 text-black" contentEditable suppressContentEditableWarning>{item.Priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-4 actions">
            <button
              onClick={addUserStoriesRow}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Row
            </button>
            <button
              onClick={deleteUserStoriesLastRow}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Last Row
            </button>
          </div>
        </div>
  
        {/* Actions */}
        <div className="text-center mt-8 actions">
          <button
            onClick={downloadContent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={downloadDocx}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download DOCX
          </button>
          <button
            onClick={resetData}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Reset Data
          </button>
          <button
            onClick={returnToHome}
            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );  
}