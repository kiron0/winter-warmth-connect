import App from '@/App';
import NoRedirectToAuth from '@/components/layout/NoRedirectToAuth';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Community from '@/pages/Community/Community';
import CreateTestimonial from '@/pages/Dashboard/CreateTestimonial/CreateTestimonial';
import DashCreateWinterClothes from '@/pages/Dashboard/DashCreateWinterClothes/DashCreateWinterClothes';
import DashWinterClothes from '@/pages/Dashboard/DashWinterClothes/DashWinterClothes';
import Dashboard from '@/pages/Dashboard/Dashboard';
import AddNewImage from '@/pages/Dashboard/Gallery/AddNewImage';
import GalleryManagement from '@/pages/Dashboard/Gallery/GalleryManagement';
import Index from '@/pages/Dashboard/Index';
import GalleryPage from '@/pages/Gallery/GalleryPage';
import LeaderBoard from '@/pages/LeaderBoard/LeaderBoard';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Volunteer from '@/pages/Volunteer/Volunteer';
import SingleWinterClothes from '@/pages/WinterClothes/SingleWinterClothes';
import WinterClothes from '@/pages/WinterClothes/WinterClothes';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
          {
                    path: '/',
                    element: <App />,
          },
          {
                    path: '/dashboard',
                    element: <ProtectedRoute>
                              <Dashboard />
                    </ProtectedRoute>,
                    children: [
                              {
                                        index: true,
                                        element: <Index />,
                              },
                              {
                                        path: 'winter-clothes',
                                        element: <DashWinterClothes />,
                              },
                              {
                                        path: 'create-winter-clothes',
                                        element: <DashCreateWinterClothes />,
                              },
                              {
                                        path: 'create-testimonial',
                                        element: <CreateTestimonial />,
                              },
                              {
                                        path: 'gallery',
                                        element: <GalleryManagement />,
                              },
                              {
                                        path: 'add-new-image',
                                        element: <AddNewImage />,
                              },
                    ],
          },
          {
                    path: '/leaderboard',
                    element: <LeaderBoard />,
          },
          {
                    path: '/community',
                    element: <Community />,
          },
          {
                    path: '/volunteer',
                    element: <Volunteer />,
          },
          {
                    path: '/gallery',
                    element: <GalleryPage />,
          },
          {
                    path: '/winter-clothes',
                    element: <WinterClothes />,
          },
          {
                    path: '/winter-clothes/:id',
                    element: <SingleWinterClothes />,
          },
          {
                    path: '/login',
                    element: <NoRedirectToAuth>
                              <Login />
                    </NoRedirectToAuth>,
          },
          {
                    path: '/register',
                    element: <NoRedirectToAuth>
                              <Register />
                    </NoRedirectToAuth>,
          },
]);

export default router;