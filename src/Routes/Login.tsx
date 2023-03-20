import {
  GoogleAuthProvider,
  GithubAuthProvider,
  AuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../services/fbase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';

const Wrapper = styled.div``;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  height: 95px;
  label {
    margin-bottom: 4px;
    font-size: 14px;
    color: #686e7b;
  }
  input {
    height: 44px;
    padding: 0 16px;
    border: 1px solid #a6adbd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    ::placeholder {
      color: #a6adbd;
    }
  }
  span {
    color: #f42844;
    font-size: 12px;
    margin-top: 4px;
    margin: 4px 0 0 2px;
  }
`;
interface ILogin {
  isLoggedIn: boolean;
}

interface IForm {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickName: string;
}

function Login({ isLoggedIn }: ILogin) {
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  const [newAccount, setNewAccount] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
  } = useForm<IForm>();

  const toggleAccount = () => setNewAccount((prev) => !prev);

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
      const data = await signInWithPopup(authService, provider);
    }
  };

  const handleValid = async (data: IForm) => {
    const { email, password, nickName } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('가입완료');
      reset();
    } catch (error) {
      alert('입력 사항을 확인해주세요');
      console.error(error);
    }
  };
  // 이메일
  const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;

    // 유효성 검사 수행
    await trigger('email');

    // 중복 확인
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError('email', {
          message: '이미 가입되어 있는 이메일입니다.',
        });
      } else if (!errors.email) {
        clearErrors('email');
      }
    } catch (error) {
      // console.error(error);
    }
  };
  // 닉네임
  const handleNickNameBlur = async () => {
    const nickName = watch('nickName');
    // 유효성 검사 수행
    await trigger('nickName');
    // 중복 확인
    try {
      const userRef = doc(db, 'users', nickName);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setError('nickName', {
          type: 'manual',
          message: '이미 사용 중인 닉네임입니다.',
        });
      } else {
        clearErrors('nickName');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Wrapper>
      <h2>login</h2>
      <div>
        <form onSubmit={handleSubmit(handleValid)}>
          <InputField>
            <label>
              이메일<span>✶</span>
            </label>
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  message: '이메일이 형식에 맞지 않습니다',
                },
              })}
              placeholder="ex) abc1234@gmail.com"
              onBlur={handleEmailBlur}
            />
            <span>{errors && errors?.email?.message}</span>
          </InputField>
          <InputField>
            <label>
              닉네임<span>✶</span>
            </label>
            <input
              // validate 인자로 항목에 현재 쓰여지고 있는 값을 받음, boolean을 반환
              {...register('nickName', {
                required: '닉네임을 입력해주세요',
                pattern: {
                  value: /^[가-힣a-zA-Z]{2,16}$/,
                  message:
                    '특수문자, 공백을 제외한 2자~16자의 영어 또는 한글을 입력해주세요',
                },
              })}
              placeholder="닉네임"
              onBlur={handleNickNameBlur}
            />
            <span>{errors?.nickName?.message}</span>
          </InputField>
          <InputField>
            <label>
              비밀번호<span>✶</span>
            </label>
            <input
              {...register('password', {
                required: '비밀번호를 입력해주세요',

                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                  message:
                    '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
                },
              })}
              type="password"
              placeholder="숫자 + 영문자 + 특수문자 조합, 8자리 이상"
              onBlur={() => trigger('password')}
            />
            <span>{errors?.password?.message}</span>
          </InputField>
          <InputField>
            <label>
              비밀번호 확인<span>✶</span>
            </label>
            <input
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) =>
                  watch().password !== value
                    ? '비밀번호가 일치하지 않습니다'
                    : true,
              })}
              type="password"
              onBlur={() => trigger('passwordConfirm')}
            />
            <span>{errors?.passwordConfirm?.message}</span>
          </InputField>
          <button type="submit">가입하기</button>
        </form>
        <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
            Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button onClick={onSocialClick} name="github" className="authBtn">
            Continue with Github <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;
