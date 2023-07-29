import styled from 'styled-components';



export const LoginStyle = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('${(props) => props.bgImg}');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100% ;
    height: 100%;
`

export const LoginLog = styled.img`
   display:block;
   margin-top: 4vh;

`;

export const Welcome = styled.img`
   display:block;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginTitle = styled.div`
   color: #F5C910;
   font-size: 18px;
   font-weight: 300;
   text-align: center;
   margin-top:2vh;

`;

export const LoginButton = styled.button`
  display:block;
  text-decoration:none;
  margin-top:2vh;
  width: 233px;
  background-color:#fff;
  color: #3177D8;
  font-size:16px;
  font-weight: 400px;
  line-height:38px;
  box-shadow: 3px 3px 6px #00000029;
  border: 2px solid #3177D8;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`


export const LoginNotice = styled.div`
  position:absolute;
  bottom:0;
  right:0;
  left:0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  padding:2.75vh 0;
  background-color:rgba(0,0,0,0.6);
`;

export const LoginLoading = styled.div`
  font-size: 30px;
  color: yellow; 
`