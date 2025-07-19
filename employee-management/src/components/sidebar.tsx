import { Link } from 'react-router-dom';

interface ISidebarProps {
  title: string
  color: string;
}

const Sidebar = (props : ISidebarProps) => {
    
const { title, color } = props;

  return (
    <aside className={`h-screen w-64 bg-${color}-800 text-white fixed`}>
      <div className={`p-4 text-xl font-semibold border-b border-${color}-700`}>
       {title}
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/" className={`hover:bg-${color}-700 p-2 rounded`}>Employee</Link>
        <Link to="/department" className={`hover:bg-${color}-700 p-2 rounded`}>Department</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
