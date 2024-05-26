
import React, {useState, useEffect} from 'react';
import './App.css';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import ProjectTimeline from './ProjectTimeline';
import CalendarView from './CalendarView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const App = () =>{
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('add-project'); 
  const [title, setTitle] = useState('Add Project');
  const [editingProject, setEditingProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


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
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-container">
          <button className="btn btn-custom d-md-none" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <span className="navbar-brand mb-0 h1">Project Manager</span>
        </div>
      </nav>
    <div className="row">
      <div className={`col-md-3 sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="nav flex-column mt-5">
        <a className={`nav-link ${view === 'add-project' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('add-project', 'Add Project')} /* eslint-disable-line jsx-a11y/anchor-is-valid */>Add Project</a>
        <a className={`nav-link ${view === 'card' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('card', 'Card View')} /* eslint-disable-line jsx-a11y/anchor-is-valid */>Card View</a>
        <a className={`nav-link ${view === 'timeline' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('timeline', 'Timeline View')} /* eslint-disable-line jsx-a11y/anchor-is-valid */>Timeline View</a>
        <a className={`nav-link ${view === 'both' ? 'active' : ''}`} href="#" onClick={()=> handleNavClick('both', 'Timeline & Card')} /* eslint-disable-line jsx-a11y/anchor-is-valid */>Timeline & Card</a>
        <a className={`nav-link ${view === 'calendar' ? 'active' : ''}`} href="#" onClick={() => handleNavClick('calendar', 'Calendar View')} /* eslint-disable-line jsx-a11y/anchor-is-valid */>Calendar View</a>
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
        {view === 'card' || view === 'both' || view === 'add-project' ? (
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
