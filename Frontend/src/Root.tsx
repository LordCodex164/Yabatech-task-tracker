import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Root() {

  const [cookies] = useCookies()

  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
