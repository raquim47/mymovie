import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from '../components/components';
import {
  auth,
  doc,
  db,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from '../services/fbaseInit';

const Wrapper = styled.div`
  padding: 0 30px;
`

function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docData = await getDoc(userRef);
        const favoriteMovie = docData.exists()
          ? docData.data()?.favoriteMovie || []
          : [];
        setFavoriteList(favoriteMovie);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Wrapper>
      <List
        data={favoriteList}
        listType="favorite"
        rowSize={6}
        displayMode="portrait"
        isSlideEnabled={true}
      />
    </Wrapper>
  );
}

export default Favorite;
