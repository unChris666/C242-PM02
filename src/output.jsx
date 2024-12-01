import { useState } from "react";

function Output() {
  const [successMetrics, setSuccessMetrics] = useState([
    { metric: "", definition: "", actual: "", target: "" },
  ]);

  const [userStories, setUserStories] = useState([
    { title: "", story: "", criteria: "", priority: "" },
  ]);

  const addSuccessMetricRow = () => {
    setSuccessMetrics([...successMetrics, { metric: "", definition: "", actual: "", target: "" }]);
  };

  const addUserStoryRow = () => {
    setUserStories([...userStories, { title: "", story: "", criteria: "", priority: "" }]);
  };

  return (
    <div className="container mx-auto text-center p-4">
      <div className="header mb-4">
        <h1
          className="text-black text-4xl font-black text-center"
          contentEditable
        >
          Title
        </h1>
      </div>

      <div className="metadata mb-4">
        <table className="table-auto mx-auto border border-black">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Document Version</td>
              <td className="border px-4 py-2" contentEditable>1.0</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Product Name</td>
              <td className="border px-4 py-2" contentEditable>aiueo</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Document Owner</td>
              <td className="border px-4 py-2" contentEditable>Draft</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Developer</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Stakeholder</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Document Stage</td>
              <td className="border px-4 py-2" contentEditable>Done</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Created Date</td>
              <td className="border px-4 py-2">2024</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overview mb-4">
        <h2 className="font-bold">Overview</h2>
        <p contentEditable>Overview</p>
        <h3 className="font-bold">Problem Statement</h3>
        <p contentEditable>Problem Statement</p>
        <h3 className="font-bold">Objective</h3>
        <p contentEditable>Objective</p>
        <h4 className="font-bold">Key Objective</h4>
        <p contentEditable>Key Objective</p>
      </div>

      <div className="darci mb-4">
        <table className="table-auto mx-auto border border-black">
          <thead>
            <tr>
              <th className="border px-4 py-2">Roles</th>
              <th className="border px-4 py-2">Tags</th>
              <th className="border px-4 py-2">Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Decider</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
              <td className="border px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Accountable</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
              <td className="border px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Responsible</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
              <td className="border px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Consulted</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
              <td className="border px-4 py-2" contentEditable>Guidelines</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Informed</td>
              <td className="border px-4 py-2" contentEditable>nama</td>
              <td className="border px-4 py-2" contentEditable>Guidelines</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="successMetric mb-4">
        <h2 className="font-bold">Success Metric</h2>
        <table className="table-auto mx-auto border border-black">
          <thead>
            <tr>
              <th className="border px-4 py-2">Metric</th>
              <th className="border px-4 py-2">Definition</th>
              <th className="border px-4 py-2">Actual</th>
              <th className="border px-4 py-2">Target</th>
            </tr>
          </thead>
          <tbody>
            {successMetrics.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.metric}</td>
                <td className="border px-4 py-2">{row.definition}</td>
                <td className="border px-4 py-2">{row.actual}</td>
                <td className="border px-4 py-2">{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addSuccessMetricRow}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Row
        </button>
      </div>

      <div className="stories mb-4">
        <h2 className="font-bold">User Stories</h2>
        <table className="table-auto mx-auto border border-black">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">User Story</th>
              <th className="border px-4 py-2">Acceptance Criteria</th>
              <th className="border px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {userStories.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.title}</td>
                <td className="border px-4 py-2">{row.story}</td>
                <td className="border px-4 py-2">{row.criteria}</td>
                <td className="border px-4 py-2">{row.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addUserStoryRow}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Row
        </button>
      </div>
    </div>
  );
}

export default Output;
