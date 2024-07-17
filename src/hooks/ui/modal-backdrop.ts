import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setModalBackdrop } from "store/modal-backdrop";

const useSetModalBackdrop = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.startsWith('/movies/')) {
      if (location.state?.from) {
        dispatch(setModalBackdrop(location.state.from));
      } else {
        // URL을 통해 직접 접근한 경우
        dispatch(setModalBackdrop('/'));
      }
    } else {
      // 그 외의 경우, backdropPath를 null로 설정
      dispatch(setModalBackdrop(null));
    }
  }, [location, dispatch]);
}

export default useSetModalBackdrop