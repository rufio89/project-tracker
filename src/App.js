import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import ProjectTimeline from './ProjectTimeline';
import CalendarView from './CalendarView';


const App = () =>{
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('add-project'); 
  const [title, setTitle] = useState('Add Project');
  const [editingProject, setEditingProject] = useState(null);


  useEffect(()=>{
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data)=> setProjects(data))
      .catch((error) => console.error('Error loading initial data:', error))
  }, []);
  
  const addProject = (project) => {
    
    if (editingProject !== null) {
      const updatedProjects = projects.map((p, index) =>
        index === editingProject ? project : p
      );
      setProjects(updatedProjects);
      setEditingProject(null);
    } else {
      setProjects([...projects, project]);
    }
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const editProject = (index) => {
    setEditingProject(index);
  };

  const resetEditingProject = () => {
    setEditingProject(null);
  };

  const handleNavClick = (view, title) => {
    setView(view);
    setTitle(title);
  };
  

  const setCardView = () => setView('card');
  const setTimelineView = () => setView('timeline');
  const setBothView = () => setView('both');
  const setAddProjectView =() => setView('add-project');

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-3 sidebar">
        <h2>Project Manager</h2>
        <nav className="nav flex-column">
        <a className={`nav-link ${view === 'add-project' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('add-project', 'Add Project')}>Add Project</a>
        <a className={`nav-link ${view === 'card' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('card', 'Card View')}>Card View</a>
        <a className={`nav-link ${view === 'timeline' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('timeline', 'Timeline View')}>Timeline View</a>
        <a className={`nav-link ${view === 'both' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('both', 'Timeline & Card')}>Timeline & Card</a>
        <a className={`nav-link ${view === 'calendar' ? 'active' : ''}`} href="#" onClick={() => handleNavClick('calendar', 'Calendar View')}>Calendar View</a>
        </nav>
      </div>
      <div className="col-md-9 offset-md-3">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h1>{title}</h1>
          <button className="btn btn-primary" onClick={() => setView('add-project')}>New Project</button>
        </div>
        {view === 'add-project' ? (
        <ProjectForm
          addProject={addProject}
          currentProject={editingProject !== null ? projects[editingProject] : null}
          resetEditingProject={resetEditingProject}
        />
        ): null}
        {view === 'timeline' || view === 'both' ? (
          <ProjectTimeline projects={projects} />
        ) : null}
        {view === 'card' || view === 'both' || view == 'add-project' ? (
          <ProjectList
            projects={projects}
            deleteProject={deleteProject}
            editProject={editProject}
          />
        ) : null}
       {view === 'calendar' ? (
            <CalendarView projects={projects} />
          ) : null}
      </div>
    </div>
  </div>
  )

}

export default App;
