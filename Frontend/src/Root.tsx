import { Navigate, Outlet } from 'react-router-dom';
import { STORAGE_TOKEN } from './constants';

export default function Root() {
  const token = sessionStorage.getItem(STORAGE_TOKEN);

  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
      
    </>
  );
}
