# MyMovie-App
## MyMovie-App
- React, Redux, Typescript, Firebase, styled-component 
- TheMovieDB API를 이용해 영화 검색, 저장, 평가를 할 수 있는 서비스 만들기
- TypeScript을 사용 경험_프로젝트의 코드 안정성과 가독성을 향상
## Results
[URL: https://mymovie-285fd.web.app/]

<div>
  <h3>1. 메인</h3>
  
  <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img01.gif?raw=true" />
  
  <h4>1) 슬라이드, 마우스 오버, 팝업 애니메이션_Motion-Framer 라이브러리</h4>
  <h4>2) useQuery 훅으로 영화 데이터 비동기로 가져오기</h4>
  <h4>3) 앱 마운트 시 firebase 초기화, 사용자 인증처리, 사용자 데이터를 가져와 Redux 스토어에 저장 </h4>

  ```
  //firebase 초기화, 사용자 인증

  useEffect(() => {
    auth
      .setPersistence(browserSessionPersistence)
      .then(() => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setIsLoggedIn(true));
          } else {
            dispatch(setIsLoggedIn(false));
          }
          dispatch(setInitFirebase());
        });
      })
      .catch((error) => {
        console.log(error);
        // 오류 처리
      });
  }, []);
  // firestore의 user컬렉션을 구독, 리덕스 스토어에 실시간 업데이트
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        const userData = doc.data() as IUserAccount;
        dispatch(setUserData(userData));
      });
      // Clean up subscription
      return () => {
        unsubscribe();
      };
    } else {
      dispatch(clearUserData());
    }
  }, [isLoggedIn]);
  ```
  <hr/>

  <h3>2. 로그인, 회원가입</h3>
  
   <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img02.gif?raw=true" />
  
  <h4>1) 로그인, 회원가입 기능_Firebase의 Authentication 메서드 signInWithEmailAndPassword, createUserWithEmailAndPassword 활용</h4>
  <h4>2) 로그인, 회원가입 폼_react-hook-form 라이브러리를 사용한 간결한 폼 구현, input컴포넌트 분리, 재사용</h4>
  <h4>3) 회원가입시 firestore에 저장된 유저 정보와 비교해 입력한 이메일, 닉네임 중복 검사</h4>
  <h4>4) 소셜 로그인 기능_firebase에서 제공하는 메서드로 구글, 깃허브 로그인 구현</h4>
  
  ```
  // 소셜 로그인(랜덤 닉네임 생성)
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider: AuthProvider | undefined;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    if (provider) {
      try {
        const data = await signInWithPopup(auth, provider);
        const user = data.user;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            // 이미 등록된 계정일 경우
            return;
          }
          const nickName = await generateRandomNickName();
          await setDoc(userRef, { nickName, email: user.email, userPhoto: '' });
        }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }
  };
  ```
  <hr/>

  <h3>3. 프로필</h3>
  
  <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img03.gif?raw=true" />
  
  <h4>1) 닉네임 수정 기능</h4>
  <h4>2) 이미지 업로드 기능_Firebase Storage 등록, 삭제 </h4>
  <hr/>
  
  <h3>4. 영화 세부 정보</h3>
  
  <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img04.gif?raw=true" />
  
  <h4>1) '보고싶어요' 기능_사용자가 '보고싶어요' 클릭시 firestore users컬렉션에 해당 영화 정보 저장, 찜한 영화 페이지에서 보여주기</h4>
  <h4>2) '별점매기기','코멘트' 기능_사용자가 별점, 코멘트를 남길 시 firestore users컬렉션드에 해당 영화 정보 별점과 함께 저장, ratings컬렉션에 별점,코멘트 저장</h4>
  <h4>3) users컬렉션의 데이터는 영화 세부 정보 페이지 UI, 평가한 영화 페이지에서 활용, ratings컬렉션의 데이터로 다른 사용자들이 남긴 별점, 코멘트를 실시간으로 화면에 업데이트</h4>

  ```
  // '보고 싶어요' 영화 데이터 firestore에 등록/삭제
  export const handleUserFavoriteMovie = async (movie: IMovie) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      const docData = await getDoc(userRef);
      // 문서가 있는지 ? favoriteMovies가있는지?(없으면 {}반환) : 문서가 없으면 {}
      const favoriteMovies = docData.exists()
        ? docData.data()?.favoriteMovies || {}
        : {};
      // favorite이면 삭제
      if (favoriteMovies[movie.id]) {
        await updateDoc(userRef, {
          [`favoriteMovies.${movie.id}`]: deleteField(),
        });
      } else {
        // favorite이 아니면 새로운 객체 저장
        await updateDoc(userRef, {
          [`favoriteMovies.${movie.id}`]: {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            genre_ids: movie?.genres ? movie?.genres.map((m) => m.id) : [],
            timestamp: Date.now(),
          },
        });
      }
    }
  };
  ```

  <h3>5. 찜한 영화, 평가한 영화 페이지</h3>
  
  <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img05.gif?raw=true" />
  
  <h4>1) firestore에 저장된 사용자가 보고싶은 영화, 평가한 영화 데이터를 가져와서 리스트 형식으로 랜더링</h4>
  <h4>2) 무한스크롤 기능_웹 API IntersectionObserver로 리스트 데이터를 한번에 전부 보여주지 않고 사용자가 스크롤 할 때마다 추가 데이터 렌더링 하기</h4>

  <h3>6. 검색 기능</h3>
  
  <img width="90%" src="https://github.com/raquim47/data/blob/main/mymovie/mymovie_img06.gif?raw=true" />
  <h4>1) useInfiniteQuery 훅으로 영화 데이터를 비동기로 가져와 무한 스크롤로 보여주기</h4>
  <h4>2) 검색한 키워드와 함께 검색된 영화 목록, firestore에 저장된 유저 닉네임을 출력</h4>
  <h4>3) 검색어가 변경될 때마다 이전 결과를 캐시에서 제거해서 최신화</h4>
  
</div>