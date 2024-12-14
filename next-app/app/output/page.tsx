'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div id="downloadable-content" className="container w-11/12 mx-auto text-center p-4 bg-white">
      <div className="header mb-4">
        <h1 className="text-black text-4xl font-black text-center">
          Product Requirements Document
        </h1>
      </div>

      {/* Metadata */}
      <div className="metadata mb-4 text-black">
        <table className="table-auto mx-auto border-2 border-black w-1/2">
          <tbody>
            {metadata.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{item.key}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overview */}
      <div className="overview mb-4 text-black">
        <h2 className="font-bold text-3xl mb-4">Overview</h2>
        <p id="inputOverview" className="w-5/6 mx-auto" contentEditable suppressContentEditableWarning>
          {inputOverview}
        </p>
        <h3 className="font-bold text-2xl mb-2">Problem Statement</h3>
        <p id="problemStatement" className="w-5/6 mx-auto" contentEditable suppressContentEditableWarning>
          {problemStatement}
        </p>
        <h3 className="font-bold text-2xl mb-2"> Objective</h3>
        <p id="objectives" className="w-5/6 mx-auto" contentEditable suppressContentEditableWarning>
          {objectives}
        </p>
      </div>

      {/* DARCI Table */}
      <div className="darci-table mb-4 text-black">
            <h2 className="font-bold text-3xl mb-4">DARCI Table</h2>
            <table className="table-auto mx-auto border-2 border-black w-5/6">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2">Role</th>
                        <th className="border border-black px-4 py-2">Tag</th>
                        <th className="border border-black px-4 py-2">Guidelines</th>
                    </tr>
                </thead>
                <tbody>
                    {darciArray.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-black px-4 py-2">{item.Role}</td>
                            <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Tag}</td>
                            <td className="border border-black px-4 py-2">
                                <ul>
                                    {item.Guidelines.map((guideline, idx) => (
                                        <li key={idx} contentEditable suppressContentEditableWarning>{guideline}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      {/* Project Timeline */}
      <div className="project-timeline mb-4 text-black">
            <h2 className="font-bold text-3xl mb-4">Project Timeline</h2>
            <table className="table-auto mx-auto border-2 border-black w-5/6">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2">Time Period</th>
                        <th className="border border-black px-4 py-2">Activity</th>
                        <th className="border border-black px-4 py-2">PIC</th>
                    </tr>
                </thead>
                <tbody>
                    {projectTimelineArray.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.TimePeriod}</td>
                            <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Activity}</td>
                            <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.PIC}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="actions mt-4">
                <button
                    onClick={addProjectTimelineRow}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Row
                </button>
                <button
                    onClick={deleteProjectTimelineLastRow}
                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Delete Last Row
                </button>
            </div>
        </div>

      {/* Success Metrics */}
      <div className="success-metrics mb-4 text-black">
        <h2 className="font-bold text-3xl mb-4">Success Metrics</h2>
        <table className="table-auto mx-auto border-2 border-black w-5/6">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2" >Metric</th>
              <th className="border border-black px-4 py-2" >Definition</th>
              <th className="border border-black px-4 py-2" >Actual</th>
              <th className="border border-black px-4 py-2" >Target</th>
            </tr>
          </thead>
          <tbody>
            {successMetricsArray.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Metric}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Definition}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Actual}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Target}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions mt-4">
                <button
                    onClick={addSuccessMetricsRow}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Row
                </button>
                <button
                    onClick={deleteSuccessMetricsLastRow}
                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Delete Last Row
                </button>
            </div>
      </div>

      {/* User Stories */}
      <div className="user-stories mb-4 text-black">
        <h2 className="font-bold text-3xl mb-4">User  Stories</h2>
        <table className="table-auto mx-auto border-2 border-black w-5/6">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Title</th>
              <th className="border border-black px-4 py-2">User  Story</th>
              <th className="border border-black px-4 py-2">Acceptance Criteria</th>
              <th className="border border-black px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {userStoriesArray.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Title}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.UserStory}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.AcceptanceCriteria}</td>
                <td className="border border-black px-4 py-2" contentEditable suppressContentEditableWarning>{item.Priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions mt-4">
                <button
                    onClick={addUserStoriesRow}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Row
                </button>
                <button
                    onClick={deleteUserStoriesLastRow}
                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Delete Last Row
                </button>
            </div>
      </div>
    </div>
  );
}