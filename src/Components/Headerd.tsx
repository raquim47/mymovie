import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 60px;
  font-size: 14px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 50px;
  fill: url(#grad1);
  transform: scale(2);
  path {
  }

  linearGradient {
    stop:nth-child(1) {
      stop-color: RGB(193, 107, 213);
      stop-opacity: 1;
    }
    stop:nth-child(2) {
      stop-color: RGB(116, 67, 192);
      stop-opacity: 1;
    }
    stop:nth-child(3) {
      stop-color: RGB(49, 35, 171);
      stop-opacity: 1;
    }
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker} transition color 0.3s
    ease-in-out;

  &:hover {
    color: ${(props) => props.theme.white.white};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  left: 0;
  right: 0;
  bottom: -8px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 6px 10px;
  padding-left: 35px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.white};
`;

const logoVariants = {
  initial: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');
  // const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const searchRef = useRef(null);
  const { scrollY } = useScroll();

  const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    onClickOutside: (e: React.MouseEvent) => void
  ) => {
    useEffect(() => {
      const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
          onClickOutside(e);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };

  useClickOutside(searchRef, () => {
    if (!searchOpen) return;
    setSearchOpen((prev) => !prev);
  });

  const toggleSearch = () => {
    // * useAnimation 훅으로 시작과 중지 메서드  만들기
    // if (searchOpen) {
    //   inputAnimation.start({ scaleX: 0 });
    // } else {
    //   inputAnimation.start({ scaleX: 1 });
    // }
    setSearchOpen((prev) => !prev);
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (scrollY.get() > 80) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  });

  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={'top'}>
      <Col>
        <Logo
          variants={logoVariants}
          initial="initial"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 239.58 219.65"
        >
          <defs>
            <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" />
              <stop offset="50%" />
              <stop offset="100%" />
            </linearGradient>
          </defs>
          <motion.path
            d="M200.64,177.56c.3,0,.61,0,.91,0A15.16,15.16,0,1,0,188,155.74c-21-28.23-64.84-35.79-64.84-35.79,50.1-15.58,57.26-59.79,55.15-62.32s-39-9.54-70.73,5.9c-32,15.58-76.21,80.21-57.27,110.31,16.34,26,58,3.87,69.21-2.71a1.2,1.2,0,0,1,1.72,1.47c-3.62,9.08-14,33.24-59.14,33.24-54.94,0-58.34-64.43-58.34-64.43q0-1.24,0-2.52A123.79,123.79,0,0,1,129.27,15.12c67.28,1,113.89,56.31,114,123.59.06,38.6-18.55,73.08-46.19,95.82a1,1,0,0,1-1.46-1.19C200.32,224.49,210.13,203.57,200.64,177.56Z"
            transform="translate(-3.68 -15.11)"
          />
          <path
            d="M75.63,164.37s-5.37-16,10.26-21.16C85.89,143.21,91.89,158.53,75.63,164.37Z"
            transform="translate(-3.68 -15.11)"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv shows
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search ref={searchRef} onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: 'linear' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: 'linear' }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}
export default Header;
