import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  where,
  getDocs,
  query,
} from 'firebase/firestore';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';

interface IForm {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickName: string;
}

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

interface INewAccount {
  toggleAccount : () => void;
}

function NewAccount({toggleAccount}:INewAccount) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<IForm>();

  const auth = getAuth();
  const db = getFirestore();

  // 이메일 focus out 시 검사
  const handleEmailBlur = useCallback(
    async (event: React.FocusEvent<HTMLInputElement>) => {
      const email = event.target.value;

      // 유효성 검사 수행
      await trigger('email');

      // 중복 확인
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length > 0) {
          setError('email', {
            type: 'validate',
            message: '이미 가입되어 있는 이메일입니다.',
          });
        } else if (!errors.email) {
          clearErrors('email');
        }
      } catch (error) {
        // console.error(error);
      }
    },
    [fetchSignInMethodsForEmail, trigger, setError, clearErrors]
  );
  // 닉네임 focus out 시 검사
  const handleNickNameBlur = useCallback(async () => {
    const nickName = watch('nickName');
    // 유효성 검사 수행
    const isValid = await trigger('nickName');

    if (isValid) {
      // 닉네임이 유효한 경우에만 서버 요청을 보냄
      try {
        const userQuery = query(
          collection(db, 'users'),
          where('nickName', '==', nickName)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          setError('nickName', {
            type: 'validate',
            message: '이미 사용 중인 닉네임입니다.',
          });
        } else {
          clearErrors('nickName');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // 닉네임이 유효하지 않은 경우 에러 처리
      setError('nickName', {
        type: 'manual',
        message: '닉네임을 올바르게 입력해주세요.',
      });
    }
  }, [watch, trigger, setError, clearErrors]);
  // 계정 등록
  const handleValid = async ({ email, password, nickName }: IForm) => {
    const isValid = await trigger(); // 유효성 검사 실행
    console.log(isValid);
    if (!isValid) {
      // 에러가 있는 경우
      alert('입력 사항을 확인해주세요');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { nickName });
      }
      alert('가입완료');
    } catch (error) {
      alert('입력 사항을 확인해주세요');
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
          onBlur={handleEmailBlur}
          errors={errors}
        />
        <AuthInput
          label="닉네임"
          name="nickName"
          registerOptions={register('nickName', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[가-힣a-zA-Z]{2,16}$/,
              message:
                '특수문자, 공백을 제외한 2자~16자의 영어 또는 한글을 입력해주세요',
            },
          })}
          placeholder="닉네임"
          onBlur={handleNickNameBlur}
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
          onBlur={() => trigger('password')}
          errors={errors}
        />
        <AuthInput
          label="비밀번호 확인"
          name="passwordConfirm"
          registerOptions={register('passwordConfirm', {
            required: '비밀번호 확인을 입력해주세요',
            validate: (value) =>
              watch().password !== value
                ? '비밀번호가 일치하지 않습니다'
                : true,
          })}
          type="password"
          placeholder="숫자 + 영문자 + 특수문자 조합, 8자리 이상"
          onBlur={() => trigger('passwordConfirm')}
          errors={errors}
        />
        <ColoredBtn type="submit">가입하기</ColoredBtn>
        <Btn type="button" onClick={toggleAccount}>로그인</Btn>
      </form>
    </div>
  );
}
export default NewAccount;
