import { BASE_API } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

type JWTDecode = {
          userId: string;
          exp: number;
          iat: number;
          role: string;
};

const useAuth = () => {
          const token = localStorage.getItem("wwAccessToken") as string | undefined;

          const navigate = useNavigate();

          const { isLoading, data, refetch } = useQuery(["userInit", token], async () => {
                    if (token) {
                              const decodedData = jwtDecode(token as string) as JWTDecode;

                              if (!decodedData) {
                                        localStorage.removeItem("wwAccessToken");
                                        navigate("/");
                              }

                              const res = await axios.get(`${BASE_API}/users/me`, {
                                        headers: {
                                                  authorization: `${token}`,
                                        },
                              });

                              if (decodedData?.userId !== res?.data?.data?._id) {
                                        localStorage.removeItem("wwAccessToken");
                                        navigate("/");
                              }

                              return res?.data?.data;
                    }
          });

          return { isLoading, isValidUser: data, refetch, token };
};

export default useAuth;