import MainLayout from "@/components/layout/MainLayout";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { setUserDetails } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery(undefined);

  const user = data?.data;

  useEffect(() => {
    if (user) {
      dispatch(setUserDetails(user));
    }
  }, [dispatch, user])

  return (
    <>
      <MainLayout />
    </>
  )
}

export default App
