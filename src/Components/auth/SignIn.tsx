import React from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthInput from './AuthInput';
import { authService } from '../../services/fbase';
import styled from 'styled-components';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  AuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const Btn = styled.button`
  margin-top: 12px;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.gray};
  color: ${(props) => props.theme.white.white};
  font-size: 16px;
  padding: 12px 0;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.purpleDark};
  }
`;

const ColoredBtn = styled(Btn)`
  background-color: ${(props) => props.theme.purple};
`;

interface ISignIn {
  toggleAccount: () => void;
}

interface ILoginForm {
  email: string;
  password: string;
}

const SignIn = ({ toggleAccount }: ISignIn) => {
  const navigate = useNavigate();
  const db = getFirestore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: 'onBlur' });
  // 닉네임 중복체크
  const checkNickNameExists = async (nickName: string) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('nickName', '==', nickName))
    );
    return querySnapshot.empty ? false : true;
  };
  // 랜덤 닉네임 만들기(중복되지 않은)
  const generateRandomNickName = async () => {
    let randomNickName: string;
    do {
      randomNickName = Math.random().toString(36).slice(2, 10);
    } while (await checkNickNameExists(randomNickName));
    return randomNickName;
  };
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
        const data = await signInWithPopup(authService, provider);
        const user = data.user;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const nickName = await generateRandomNickName();
          await setDoc(userRef, { nickName });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleValid = async ({ email, password }: ILoginForm) => {
    try {
      await signInWithEmailAndPassword(authService, email, password);
      alert('로그인 성공');
    } catch (error) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <AuthInput
          label="이메일"
          name="email"
          registerOptions={register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              message: '이메일이 형식에 맞지 않습니다',
            },
          })}
          placeholder="ex) abc1234@gmail.com"
          errors={errors}
        />
        <AuthInput
          label="비밀번호"
          name="password"
          registerOptions={register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
              message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
            },
          })}
          type="password"
          placeholder="숫자 + 영문자 + 특수문자 조합, 8자리 이상"
          errors={errors}
        />
        <ColoredBtn type="submit">로그인</ColoredBtn>
        <Btn onClick={onSocialClick} name="google" type="button">
          구글 계정으로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </Btn>
        <Btn onClick={onSocialClick} name="github" type="button">
          깃허브 계정으로 로그인 <FontAwesomeIcon icon={faGithub} />
        </Btn>
        <Btn type="button" onClick={toggleAccount}>
          회원 가입
        </Btn>
      </form>
    </div>
  );
};

export default SignIn;
// const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
//   const {
//     currentTarget: { name },
//   } = event;
//   let provider: AuthProvider | undefined;
//   if (name === 'google') {
//     provider = new GoogleAuthProvider();
//   } else if (name === 'github') {
//     provider = new GithubAuthProvider();
//   }

//   if (provider) {
//     try {
//       const data = await signInWithPopup(authService, provider);
//       const user = data.user;
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         // 사용자의 닉네임이 없는 경우
//         alert('계정의 닉네임을 입력해주세요');
//       } else {
//         alert('로그인 성공');
//         navigate('/home');
//       }
//     } catch (error) {
//       alert('로그인 실패');
//       console.error(error);
//     }
//   }
// };
