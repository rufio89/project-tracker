// src/ProjectList.js
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faMinus, faArrowDown } from '@fortawesome/free-solid-svg-icons';



const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'High':
      return <FontAwesomeIcon icon={faArrowUp} className="text-danger" />;
    case 'Medium':
      return <FontAwesomeIcon icon={faMinus} className="text-warning" />;
    case 'Low':
      return <FontAwesomeIcon icon={faArrowDown} className="text-success" />;
    default:
      return null;
  }
};

const ProjectList = ({ projects, deleteProject, editProject  }) => {
  return (
    <div className="row mt-3">
      {projects.map((project, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card" onClick={() => editProject(index)}>
            <div className="card-body position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(index);
                }}
              ></button>
              <h5 className="card-title">{project.title}</h5>
              <div className="card-text">Status: {project.status}</div>
              <div className="card-text">Priority: {getPriorityIcon(project.priority)} {project.priority}</div>
              <div className="card-text">Start Date: {moment(project.startDate).format('MM/DD/YYYY')}</div>
              <div className="card-text">End Date: {moment(project.endDate).format('MM/DD/YYYY')}</div>
              {project.milestones && project.milestones.length > 0 ? (
                <>
                  <p className="card-text">Milestones:</p>
                  <ul className="list-group list-group-flush">
                    {project.milestones.map((milestone, milestoneIndex) => (
                      <li key={milestoneIndex} className="list-group-item">
                        {milestone.name} - {moment(milestone.date).format('MM/DD/YYYY')}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="card-text">No milestones available</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
