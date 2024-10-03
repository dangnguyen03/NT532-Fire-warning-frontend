import '../App.css'
import MainDash from '../components/MainDash/MainDash';
import Sidebar from '../components/Sidebar';
import Webcam from './Webcam';
import Device from '../components/Device/Device';
import Account from '../components/Account/Account';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
  const [selectedMainDash, setSelectedMainDash] = useState(0); // State để lưu trữ chỉ mục của MainDash được chọn

  const handleSidebarItemClick = (index) => {
    setSelectedMainDash(index); // Cập nhật chỉ mục của MainDash được chọn
  }
  return (
      <div className="App">
        <div className="AppGlass">
          <Sidebar handleSidebarItemClick={handleSidebarItemClick} />
          {selectedMainDash === 0 ? <MainDash /> :selectedMainDash===1? <Webcam/>:selectedMainDash===2?<Device/>:<Account/>}        
        </div>
      </div>
  );
}

export default Home;
