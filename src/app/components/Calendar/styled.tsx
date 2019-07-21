import styled from 'styled-components';

export const Calendar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  & label {
    margin-right: 0.5em;
  }
  & input {
    margin: 0;
    max-width: 100%;
    flex: 1 0 auto;
    outline: 0;
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    text-align: left;
    line-height: 1.21428571em;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    padding: .67857143em 1em;
    background: #fff;
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: 0;
    transition: border-color .1s ease,-webkit-box-shadow .1s ease;
    transition: box-shadow .1s ease,border-color .1s ease;
    transition: box-shadow .1s ease,border-color .1s ease,-webkit-box-shadow .1s ease;
    box-shadow: none;
    &:focus {
      border-color: ${props => props.theme.primaryColor};
    }
  }
`;
