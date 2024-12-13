import React from 'react';

// Define interfaces for the data structures
interface Metadata {
  documentVersion: number;
  productName: string;
  documentOwner: string;
  developer: string;
  stakeholder: string;
  documentStage: string;
  createdDate: string;
}

interface DARCIRole {
    role: string;
    tag: string;
    guidelines: string[];
  }

interface ProjectTimelineItem {
  timePeriod: string;
  activity: string;
  PIC: string;
}

interface SuccessMetric {
  metric: string;
  definition: string;
  actual: string;
  target: string;
}

interface UserStory {
  title: string;
  story: string;
  criteria: string;
  priority: string;
}

const OutputPage: React.FC = () => {
  // Hardcoded data directly in the component
  const metadata: Metadata = {
    documentVersion: 4,
    productName: "Leroy Weiss",
    documentOwner: "Quos ullamco amet c",
    developer: "Laborum Maiores in",
    stakeholder: "Nostrud rem consecte",
    documentStage: "Tempora ut sunt ips",
    createdDate: "2024-12-13"
  };

  const projectTimeline: ProjectTimelineItem[] = [
    {
      timePeriod: "2025-March-01 - 2025-March-31",
      activity: "Planning and Requirements Gathering: During this phase, the team will collaborate with stakeholders to define project objectives, scope, and deliverables.",
      PIC: "Sophia"
    },
    {
      timePeriod: "2025-April-01 - 2025-April-30",
      activity: "Design and Prototyping: During this phase, the team will design and develop a functional prototype that meets the project requirements.",
      PIC: "Frontend Team"
    },
    // Add other timeline items from the original document
  ];

  const successMetrics: SuccessMetric[] = [
    {
      metric: "System Performance",
      definition: "Measures the system's response time and throughput.",
      actual: "-",
      target: "Reduce response time by 30% and increase throughput by 25% within the next 6 months."
    },
    {
      metric: "User Engagement",
      definition: "Measures user interaction and retention rates.",
      actual: "-",
      target: "Increase user engagement by 40% and retention rates by 30% within the next 6 months."
    },
    // Add other success metrics
  ];

  const darciTable: DARCIRole[] = [
    {
      role: "Decision Maker",
      tag: "-",
      guidelines: [
        "Responsible for making key decisions regarding project scope and timelines.",
        "Ensures alignment with project objectives and stakeholder expectations.",
        "Collaborates with the accountable role to define project scope and deliverables.",
        "Reviews and approves project plans, timelines, and budgets.",
        "Makes informed decisions based on data-driven insights and stakeholder feedback."
      ]
    },
    {
      role: "Accountable",
      tag: "-",
      guidelines: [
        "Responsible for ensuring project deliverables meet the required quality and standards.",
        "Collaborates with the decision maker to define project scope and deliverables.",
        "Develops and manages project plans, timelines, and budgets.",
        "Ensures effective communication and stakeholder management.",
        "Identifies and mitigates project risks and deviations."
      ]
    },
    {
      role: "Responsible",
      tag: "-",
      guidelines: [
        "Responsible for executing project tasks and delivering high-quality results.",
        "Collaborates with the accountable role to develop project plans and timelines.",
        "Develops and maintains project documentation and reports.",
        "Identifies and reports project risks and deviations to the accountable role.",
        "Contributes to project meetings and ensures effective communication."
      ]
    },
    {
      role: "Consulted",
      tag: "-",
      guidelines: [
        "Provides expert input and guidance on specific project aspects.",
        "Collaborates with the responsible role to develop project plans and timelines.",
        "Reviews and provides feedback on project documentation and reports.",
        "Identifies and reports project risks and deviations to the accountable role.",
        "Contributes to project meetings and ensures effective communication."
      ]
    },
    {
      role: "Informed",
      tag: "-",
      guidelines: [
        "Receives project updates and progress reports.",
        "Provides feedback and insights on project aspects.",
        "Collaborates with the responsible role to develop project plans and timelines.",
        "Identifies and reports project risks and deviations to the accountable role.",
        "Contributes to project meetings and ensures effective communication."
      ]
    }
  ];

  const userStories: UserStory[] = [
    {
      title: "Easy Onboarding",
      story: "As a new user, I want to easily onboard onto the system so that I can quickly start using it.",
      criteria: "Given the user has access to the system, when the user follows the onboarding process, then the user is successfully onboarded and can access the system's features.",
      priority: "High"
    },
    {
      title: "Intuitive Interface",
      story: "As a user, I want an intuitive interface so that I can easily navigate the system.",
      criteria: "Given the user has access to the system, when the user interacts with the interface, then the user can easily navigate and find the desired features.",
      priority: "High"
    },
    // Add other user stories
  ];

  return (
    <div className="container mx-auto p-6 bg-white text-black">
      <h1 className="text-4xl font-bold text-center mb-8">Product Requirements Document</h1>

      {/* Metadata Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Metadata</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Document Version:</strong> {metadata.documentVersion}</div>
          <div><strong>Product Name:</strong> {metadata.productName}</div>
          <div><strong>Document Owner:</strong> {metadata.documentOwner}</div>
          <div><strong>Developer:</strong> {metadata.developer}</div>
          <div><strong>Stakeholder:</strong> {metadata.stakeholder}</div>
          <div><strong>Document Stage:</strong> {metadata.documentStage}</div>
          <div><strong>Created Date:</strong> {metadata.createdDate}</div>
        </div>
      </section>

      {/* DARCI Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">DARCI Table</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Role</th>
              <th className="border p-2">Tag</th>
              <th className="border p-2">Guidelines</th>
            </tr>
          </thead>
          <tbody>
            {darciTable.map((role, index) => (
              <tr key={index}>
                <td className="border p-2 font-medium">{role.role}</td>
                <td className="border p-2">{role.tag}</td>
                <td className="border p-2">
                  <ul className="list-disc list-inside">
                    {role.guidelines.map((guideline, guideIndex) => (
                      <li key={guideIndex} className="mb-1">{guideline}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Project Timeline Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Timeline</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Time Period</th>
              <th className="border p-2">Activity</th>
              <th className="border p-2">PIC</th>
            </tr>
          </thead>
          <tbody>
            {projectTimeline.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.timePeriod}</td>
                <td className="border p-2">{item.activity}</td>
                <td className="border p-2">{item.PIC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Success Metrics Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Success Metrics</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Metric</th>
              <th className="border p-2">Definition</th>
              <th className="border p-2">Actual</th>
              <th className="border p-2">Target</th>
            </tr>
          </thead>
          <tbody>
            {successMetrics.map((metric, index) => (
              <tr key={index}>
                <td className="border p-2">{metric.metric}</td>
                <td className="border p-2">{metric.definition}</td>
                <td className="border p-2">{metric.actual}</td>
                <td className="border p-2">{metric.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* User Stories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">User Stories</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">User Story</th>
              <th className="border p-2">Acceptance Criteria</th>
              <th className="border p-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {userStories.map((story, index) => (
              <tr key={index}>
                <td className="border p-2">{story.title}</td>
                <td className="border p-2">{story.story}</td>
                <td className="border p-2">{story.criteria}</td>
                <td className="border p-2">{story.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OutputPage;