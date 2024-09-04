import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Utility from './utils/utility';
import moment from 'moment';

const ListView = ({ projects }) => {
    return (
            <div>
            {projects.map((project, index) => (
                <div key={index} className="row mt-5">
                        <div><h2 style={{display: 'inline-block', with:'auto'}} >{project.title}</h2><span style={{marginLeft: '15px'}}>{moment(project.startDate).format('MM/DD/YYYY')} - {moment(project.endDate).format('MM/DD/YYYY')}</span></div>
                    <div>
                    {project.milestones && project.milestones.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {project.milestones.map((milestone, milestoneIndex) => (
                            <li key={milestoneIndex} className="list-group-item">
                              {milestone.name} - {moment(milestone.date).format('MM/DD/YYYY')} - {project.status} - {Utility.getPriorityIcon(project.priority)} {project.priority}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No milestones available</p>
                      )}
                    </div>
                </div>
            ))}
            </div>
        
    )
};

export default ListView;