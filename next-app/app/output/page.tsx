import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";

interface DarciDetails {
  Tag: string;
  Guidelines: string[];
}

interface Data {
  Metadata: Record<string, string>;
  ProblemStatement: string;
  Objective: string;
  "DARCI Table": Record<string, DarciDetails>;
  "Project Timeline": { "Time Period": string; Activity: string; PIC: string }[];
  "Success Metrics": { Metric: string; Definition: string; Actual: string; Target: string }[];
  "User  Stories": { Title: string; "User  Story": string; "Acceptance Criteria": string; Priority: string }[];
}

const Output = () => {
  const [data, setData] = useState<Data | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('outputText');
    if (storedData) {
      setData(JSON.parse(storedData).PRD);
    }
  }, []);

  const downloadContent = async () => {
    const content = document.getElementById("downloadable-content");
    
    // Capture the full height of the content
    if (!content) {
        console.error("Content not found");
        return;
    }
    const canvas = await html2canvas(content, {
        scale: 2,
        scrollY: -window.scrollY,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    
    let remainingHeight = pdfHeight;
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    while (remainingHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -(remainingHeight - pageHeight), pdfWidth, pdfHeight);
        remainingHeight -= pageHeight;
    }
    
    pdf.save("product-requirements-document.pdf");
    router.push("/home");
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div id="downloadable-content" className="container w-11/12 mx-auto text-center p-4">
      <div className="header mb-4">
        <h1 className="text-black text-4xl font-black text-center">
          Product Requirements Document
        </h1>
      </div>

      <div className="metadata mb-4">
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">Document Version</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Document Version"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Product Name</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Product Name"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Document Owner</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Document Owner"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Developer</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Developer"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Stakeholder</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Stakeholder"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Document Stage</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Document Stage"]}</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Created Date</td>
              <td className="border border-black px-4 py-2">{data.Metadata["Created Date"]}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overview mb-4">
        <h2 className="font-bold text-3xl mb-4">Overview</h2>
        <h3 className="font-bold text-2xl mb-2">Problem Statement</h3>
        <p className="w-1/2 mx-auto">{data.ProblemStatement}</p>
        <h3 className="font-bold text-2xl mb-2">Objective</h3>
        <p className="w-1/2 mx-auto">{data.Objective}</p>
      </div>

      <div className="darci mb-4">
        <h2 className="font-bold text-3xl mb-6">DARCI</h2>
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <thead>
            <tr>
              <th className="border-2 border-black px-4 py-2">Roles</th>
              <th className="border-2 border-black px-4 py-2">Tags</th>
              <th className="border-2 border-black px-4 py-2">Guidelines</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data["DARCI Table"]).map(([role, details]) => (
              <tr key={role}>
                <td className="border-2 border-black px-4 py-2">{role}</td>
                <td className="border-2 border-black px-4 py-2">{details.Tag}</td>
                <td className="border-2 border-black px-4 py-2">
                  <ul>
                    {details.Guidelines.map((guideline, index) => (
                      <li key={index}>{guideline}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="projectTimeline mb-4">
        <h2 className="font-bold text-3xl mb-6">Project Timeline</h2>
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <thead>
            <tr>
              <th className="border-2 border-black px-4 py-2">Time Period</th>
              <th className="border-2 border-black px-4 py-2">Activity</th>
              <th className="border-2 border-black px-4 py-2">PIC</th>
            </tr>
          </thead>
          <tbody>
            {data["Project Timeline"].map((row, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2">{row["Time Period"]}</td>
                <td className="border-2 border-black px-4 py-2">{row.Activity}</td>
                <td className="border-2 border-black px-4 py-2">{row.PIC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="successMetric mb-4">
        <h2 className="font-bold text-3xl mb-6">Success Metrics</h2>
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <thead>
            <tr>
              <th className="border-2 border-black px-4 py-2">Metric</th>
              <th className="border-2 border-black px-4 py-2">Definition</th>
              <th className="border-2 border-black px-4 py-2">Actual</th>
              <th className="border-2 border-black px-4 py-2">Target</th>
            </tr>
          </thead>
          <tbody>
            {data["Success Metrics"].map((metric, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2">{metric.Metric}</td>
                <td className="border-2 border-black px-4 py-2">{metric.Definition}</td>
                <td className="border-2 border-black px-4 py-2">{metric.Actual}</td>
                <td className="border-2 border-black px-4 py-2">{metric.Target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="userStories mb-4">
        <h2 className="font-bold text-3xl mb-6">User  Stories</h2>
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <thead>
            <tr>
              <th className="border-2 border-black px-4 py-2">Title</th>
              <th className="border-2 border-black px-4 py-2">User Story</th>
              <th className="border-2 border-black px-4 py-2">Acceptance Criteria</th>
              <th className="border-2 border-black px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {data["User  Stories"].map((story, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2">{story.Title}</td>
                <td className="border-2 border-black px-4 py-2">{story["User  Story"]}</td>
                <td className="border-2 border-black px-4 py-2">{story["Acceptance Criteria"]}</td>
                <td className="border-2 border-black px-4 py-2">{story.Priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="actions mt-4">
          <button
            onClick={downloadContent}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Output;