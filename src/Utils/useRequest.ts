import { useCallback, useState } from "react";
import request from "../services/api/request";

type useRequestPropsType<T> = {
  requestParams: Parameters<typeof request>[0];
  initialState: T | null;
};

const useRequest = <T>({
  requestParams,
  initialState,
}: useRequestPropsType<T>) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getResponse = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      const {
        data: responseData,
        status,
        HttpStatusCode,
      } = await request<any>(requestParams);
      if (status === HttpStatusCode.OK && responseData) {
        setData(responseData);
      }
      setLoading(false);
    }
  }, [loading, requestParams]);

  return {
    loading,
    getResponse,
    data,
    setData,
  };
};

export default useRequest;
