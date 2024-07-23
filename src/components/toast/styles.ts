import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  z-index: 1000;
`;

const Message = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  padding: 16px;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.color.gray};
  overflow: hidden;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  font-size: 24px;
  color: ${(props) => props.theme.color.gray};
`;

const ProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: red;
  animation: progressBar linear ${({ duration }) => `${duration}ms`};

  @keyframes progressBar {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
  }
`;

export default { Container, Message, CloseButton, ProgressBar };
