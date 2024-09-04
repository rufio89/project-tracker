// src/ProjectList.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faMinus, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Utility from './utils/utility';


const ProjectList = ({ projects, deleteProject, editProject }) => {
  return (
    <div className="row mt-5">
      {projects.map((project, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{project.title}</h5>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(index);
                }}
              />
            </div>
            <div className="card-body">
              <div className="card-text"><strong>Status:</strong> {project.status}</div>
              <div className="card-text">
                <strong>Priority:</strong> {Utility.getPriorityIcon(project.priority)} {project.priority}
              </div>
              <div className="card-text">
                <strong>Start Date:</strong> {moment(project.startDate).format('MM/DD/YYYY')}
              </div>
              <div className="card-text">
                <strong>End Date:</strong> {moment(project.endDate).format('MM/DD/YYYY')}
              </div>
              <div className="accordion mt-2" id={`accordionExample-${index}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${index}`}
                    >
                      Milestones
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${index}`}
                    data-bs-parent={`#accordionExample-${index}`}
                  >
                    <div className="accordion-body">
                      {project.milestones && project.milestones.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {project.milestones.map((milestone, milestoneIndex) => (
                            <li key={milestoneIndex} className="list-group-item">
                              {milestone.name} - {moment(milestone.date).format('MM/DD/YYYY')}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No milestones available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  editProject(index);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
