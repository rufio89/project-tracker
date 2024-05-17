import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';


const ProjectTimeline = ({ projects }) => {
  const groups = projects.map((project, index) => ({
    id: index,
    title: project.title,
  }));

  const items = projects.map((project, index) => ({
    id: index,
    group: index,
    title: project.title,
    
    start_time: moment(project.startDate),
    end_time: moment(project.endDate),
  }));

  return (
    <Timeline className="mt-3"
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-6, 'month')}
      defaultTimeEnd={moment().add(6, 'month')}
    />
  );
};

export default ProjectTimeline;