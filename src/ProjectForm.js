import React, { useState, useEffect } from 'react';
import moment from 'moment';

const ProjectForm = ({ addProject, currentProject, resetEditingProject }) => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Planned');
  const [manager, setManager] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [priority, setPriority] = useState('Medium');
  const [client, setClient] = useState('');
  const [completionCriteria, setCompletionCriteria] = useState('');
  const [milestones, setMilestones] = useState([{ name: '', date: '' }]);

  useEffect(() => {
    if (currentProject) {
      setTitle(currentProject.title);
      setDescription(currentProject.description);
      setStatus(currentProject.status);
      setManager(currentProject.manager);
      setTeamMembers(currentProject.teamMembers.join(', '));
      setStartDate(moment(currentProject.startDate).format('YYYY-MM-DD'));
      setEndDate(moment(currentProject.endDate).format('YYYY-MM-DD'));
      setBudget(currentProject.budget);
      setPriority(currentProject.priority);
      setClient(currentProject.client);
      setCompletionCriteria(currentProject.completionCriteria);
      setMilestones(currentProject.milestones);
    } else {
      resetForm();
    }
  }, [currentProject]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Planned');
    setManager('');
    setTeamMembers('');
    setStartDate('');
    setEndDate('');
    setBudget(0);
    setPriority('Medium');
    setClient('');
    setCompletionCriteria('');
    setMilestones([{ name: '', date: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      title,
      description,
      status,
      manager,
      milestones,
      teamMembers: teamMembers.split(',').map(name => name.trim()),
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      budget,
      priority,
      client,
      completionCriteria
    });
    resetForm();
    resetEditingProject();
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', date: '' }]);
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
            <div className="col-md-6 form-group">
                <label>Title:</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-md-6 form-group">
                <label>Description:</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
            <label>Milestones:</label>
            {milestones.map((milestone, index) => (
                <div key={index} className="row mb-2">
                <div className="col-md-6 form-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Milestone Name"
                    value={milestone.name}
                    onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                    />
                </div>
                <div className="col-md-4 form-group">
                    <input
                    type="date"
                    className="form-control"
                    value={milestone.date}
                    onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                    />
                </div>
                <div className="col-md-2 form-group">
                    <button type="button" className="btn btn-danger" onClick={() => removeMilestone(index)}>
                    Remove
                    </button>
                </div>
                </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={addMilestone}>
                Add Milestone
            </button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 form-group">
                <label>Status:</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Planned</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>On Hold</option>
                </select>
            </div>
            <div className="col-md-6 form-group">
                <label>Priority:</label>
                <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
                </select>
            </div>
        </div>
      <div className="row">
        <div className="col-md-6 form-group">
            <label>Start Date:</label>
            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="col-md-6 form-group">
            <label>End Date:</label>
            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4">{currentProject ? 'Update Project' : 'Add Project'}</button>
      {currentProject && (
        <button type="button" className="btn btn-secondary mt-4 ml-2" onClick={() => {
          resetForm();
          resetEditingProject();
        }}>
          Reset Form
        </button>
      )}
    </form>
  );
};

export default ProjectForm;
