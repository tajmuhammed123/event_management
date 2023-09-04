import { useState } from 'react';
import { SidebarWithCta } from '../Common/SideBar';
import { StickyNavbar } from '../Common/NavBar';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked');
    setSidebarOpen(!sidebarOpen);
  };

  const navigate=useNavigate()

  return (
    <div className='main'>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <SidebarWithCta sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className='content pl-12'>
        <StickyNavbar className="sticky"  />
        <div>
          <div className='background-container'>
            <h1 className='main_text'>HOME</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
