import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
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
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import { useNavigate } from 'react-router-dom';

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
  toggleAccount: () => void;
}

function NewAccount({ toggleAccount }: INewAccount) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onBlur' });

  const auth = getAuth();
  const db = getFirestore();

  // 이메일 중복 체크
  const checkEmailExists = async (email: string) => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0 ? '이미 가입된 이메일입니다' : undefined;
  };

  // 닉네임 중복 체크
  const checkNickNameExists = async (nickName: string) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('nickName', '==', nickName))
    );
    return querySnapshot.empty ? undefined : '이미 사용 중인 닉네임입니다';
  };
  // 계정 등록
  const handleValid = async ({ email, password, nickName }: IForm) => {
    try {
      // 이메일과 비밀번호로 계정 등록하기
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { nickName, email, userPhoto: '' });
      }
      alert('가입 완료');
    } catch (error) {
      console.error(error);
    }
  };
  // 등록 실패
  const handleError = () => {
    alert('입력사항을 확인해주세요');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid, handleError)}>
        <AuthInput
          label="이메일"
          name="email"
          registerOptions={register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              message: '이메일이 형식에 맞지 않습니다',
            },
            validate: async (value) => await checkEmailExists(value),
          })}
          placeholder="ex) abc1234@gmail.com"
          errors={errors}
        />
        <AuthInput
          label="닉네임"
          name="nickName"
          registerOptions={register('nickName', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[가-힣a-zA-Z0-9]{2,16}$/,
              message:
                '공백을 제외한 영어, 숫자, 한글 2자 ~ 12자',
            },
            validate: async (value) => await checkNickNameExists(value),
          })}
          placeholder="닉네임"
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
          errors={errors}
        />
        <ColoredBtn type="submit">가입하기</ColoredBtn>
        <Btn type="button" onClick={toggleAccount}>
          로그인
        </Btn>
      </form>
    </div>
  );
}
export default NewAccount;