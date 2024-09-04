import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faMinus, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const Utility = {
    getPriorityIcon:  (priority) => {
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
    }
}


export default Utility;