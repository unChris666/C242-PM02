import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import inputData from './input/input.json';

function Output() {
  const [successMetrics, setSuccessMetrics] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [projectTimeline, setProjectTimeline] = useState([]);
  const [showButtons, setShowButtons] = useState(true);

  const navigate = useNavigate();

  // Populate data from JSON when component mounts
  useEffect(() => {
    // Populate Metadata
    const metadata = inputData.Metadata;
    document.getElementById('documentVersion').textContent = metadata['Document Version'].toString();
    document.getElementById('productName').textContent = metadata['Product Name'];
    document.getElementById('documentOwner').textContent = metadata['Document Owner'];
    document.getElementById('developer').textContent = Array.isArray(metadata['Developer']) 
      ? metadata['Developer'].join(', ') 
      : metadata['Developer'];
    document.getElementById('stakeholder').textContent = metadata['Stakeholder'];
    document.getElementById('documentStage').textContent = metadata['Document Stage'];
    document.getElementById('createdDate').textContent = metadata['Created Date'];

    // Populate Overview
    const overview = inputData.Overview;
    document.getElementById('problemStatement').textContent = overview['Problem Statement'].Description;
    document.getElementById('objectives').textContent = overview['Objective'].Description;
    document.getElementById('goals').textContent = overview['Objective'].Goals.join('; ');

    // Populate DARCI Table
    const darciTable = inputData['DARCI Table'];
    const roles = ['Decider', 'Accountable', 'Responsible', 'Consulted', 'Informed'];
    
    roles.forEach((role) => {
      // Populate tags
      const tagsElement = document.getElementById(`${role.charAt(0).toLowerCase()}name`);
      const tags = darciTable[role].Tags;
      tagsElement.textContent = Array.isArray(tags) ? tags.join(', ') : tags;

      // Populate guidelines
      const guideElement = document.getElementById(`${role.charAt(0).toLowerCase()}guide`);
      guideElement.textContent = darciTable[role].Guidelines;
    });

    // Populate Project Timeline
    setProjectTimeline(inputData['Project Timeline']);

    // Populate Success Metrics
    setSuccessMetrics(inputData['Success Metrics'].map(metric => ({
      metric: metric.Metrics,
      definition: metric.Definition,
      actual: metric.Actual,
      target: metric.Target
    })));

    // Populate User Stories
    setUserStories(inputData['User Stories'].map(story => ({
      title: story.Title,
      story: story['User Story'],
      criteria: Array.isArray(story['Acceptance Criteria']) 
        ? story['Acceptance Criteria'].join('; ') 
        : story['Acceptance Criteria'],
      priority: story.Priority
    })));
  }, []);

  const addSuccessMetricRow = () => {
    setSuccessMetrics([...successMetrics, { metric: "", definition: "", actual: "", target: "" }]);
  };

  const addUserStoryRow = () => {
    setUserStories([...userStories, { title: "", story: "", criteria: "", priority: "" }]);
  };

  const addProjectTimelineRow = () => {
    setProjectTimeline([...projectTimeline, { timePeriod: "", activity: "", PIC: "" }]);
  };

  const deleteContent = () => {
    setSuccessMetrics([]);
    setUserStories([]);
    setProjectTimeline([]);
    navigate("/home");
  };

  const downloadContent = async () => {
    setShowButtons(false);

    const content = document.getElementById("downloadable-content");
    const canvas = await html2canvas(content, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("product-requirements-document.pdf");
    
    setShowButtons(true);
    navigate("/home");
  };

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
              <td id="documentVersion" className="border border-black px-4 py-2" contentEditable>1.0</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Product Name</td>
              <td id="productName" className="border border-black px-4 py-2" contentEditable>aiueo</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Document Owner</td>
              <td id="documentOwner" className="border border-black px-4 py-2" contentEditable>Draft</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Developer</td>
              <td id="developer" className="border border-black px-4 py-2" contentEditable>nama</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Stakeholder</td>
              <td id="stakeholder" className="border border-black px-4 py-2" contentEditable>nama</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Document Stage</td>
              <td id="documentStage" className="border border-black px-4 py-2" contentEditable>Done</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">Created Date</td>
              <td id="createdDate" className="border border-black px-4 py-2">2024</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overview mb-4">
        <h2 className="font-bold text-3xl mb-4">Overview</h2>
        <h3 className="font-bold text-2xl mb-2">Problem Statement</h3>
        <p id="problemStatement" className="w-1/2 mx-auto" contentEditable>Problem Statement</p>
        <h3 className="font-bold text-2xl mb-2">Objective</h3>
        <p id="objectives" className="w-1/2 mx-auto" contentEditable>Objective</p>
        <h4 className="font-bold text-xl mb-2">Key Objective</h4>
        <p id="goals" className="w-1/2 mx-auto" contentEditable>Key Objective</p>
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
            <tr>
              <td className="border-2 border-black px-4 py-2">Decider</td>
              <td id="dname" className="border-2 border-black px-4 py-2" contentEditable>nama</td>
              <td id="dguide" className="border-2 border-black px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-2">Accountable</td>
              <td id="aname" className="border-2 border-black px-4 py-2" contentEditable>nama</td>
              <td id="aguide" className="border-2 border-black px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-2">Responsible</td>
              <td id="rname" className="border-2 border-black px-4 py-2" contentEditable>nama</td>
              <td id="rguide" className="border-2 border-black px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-2">Consulted</td>
              <td id="cname" className="border-2 border-black px-4 py-2" contentEditable>nama</td>
              <td id="cguide" className="border-2 border-black px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-2">Informed</td>
              <td id="iname" className="border-2 border-black px-4 py-2" contentEditable>nama</td>
              <td id="iguide" className="border-2 border-black px-4 py-2" contentEditable>Guidelines</td>
            </tr>
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
            {projectTimeline.map((row, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.timePeriod || row['Time Period']}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.activity || row['Activity']}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.PIC || row['PIC']}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showButtons && (
          <button
            onClick={addProjectTimelineRow}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Row
          </button>
        )}
      </div>

      <div className="successMetric mb-4">
        <h2 className="font-bold text-3xl mb-6">Success Metric</h2>
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
            {successMetrics.map((row, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.metric || row.Metrics}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.definition || row.Definition}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.actual || row.Actual}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.target || row.Target}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showButtons && (
          <button
            onClick={addSuccessMetricRow}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Row
          </button>
        )}
      </div>

      <div className="userStories mb-4">
        <h2 className="font-bold text-3xl mb-6">User Stories</h2>
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
            {userStories.map((row, index) => (
              <tr key={index}>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.title || row.Title}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.story || row['User Story']}</td>
                <td className="border-2 border-black px-4 py-2" contentEditable>
                  {Array.isArray(row.criteria) 
                    ? row.criteria.join('; ') 
                    : (row.criteria || row['Acceptance Criteria'])}
                </td>
                <td className="border-2 border-black px-4 py-2" contentEditable>{row.priority || row.Priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showButtons && (
          <div>
            <button
              onClick={addUserStoryRow}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Row
            </button>
          </div>
        )}
      </div>

      <div className="container">
      {showButtons && (
        <div className="actions mt-4">
          <button
            onClick={deleteContent}
            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={downloadContent}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Download
          </button>
        </div>
      )}
        </div>
    </div>
  );
}

export default Output;