import styled from 'styled-components';



export const LoginBackDoor = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	flex-direction: column;
  background-color: rgba(35, 36, 42);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  ul li{
    position: absolute;
    border: 1px solid #fff;
    background-color: #fff;
    width: 30px;
    height: 30px;
    list-style: none;
    opacity: 0;
}
.square li{
    top: 40vh;
    left: 60vw;
    /* 执行动画：动画名 时长 线性的 无限次播放 */
    animation: square 10s linear infinite;
}
.square li:nth-child(2){
    top: 80vh;
    left: 10vw;
    /* 设置动画延迟时间 */
    animation-delay: 2s;
}
.square li:nth-child(3){
    top: 80vh;
    left: 85vw;
    /* 设置动画延迟时间 */
    animation-delay: 4s;
}
.square li:nth-child(4){
    top: 10vh;
    left: 70vw;
    /* 设置动画延迟时间 */
    animation-delay: 6s;
}
.square li:nth-child(5){
    top: 10vh;
    left: 10vw;
    /* 设置动画延迟时间 */
    animation-delay: 8s;
}
.circle li{
    bottom: 0;
    left: 15vw;
    /* 执行动画 */
    animation: circle 10s linear infinite;
}
.circle li:nth-child(2){
    left: 35vw;
    /* 设置动画延迟时间 */
    animation-delay: 2s;
}
.circle li:nth-child(3){
    left: 55vw;
    /* 设置动画延迟时间 */
    animation-delay: 6s;
}
.circle li:nth-child(4){
    left: 75vw;
    /* 设置动画延迟时间 */
    animation-delay: 4s;
}
.circle li:nth-child(5){
    left: 90vw;
    /* 设置动画延迟时间 */
    animation-delay: 8s;
}

/* 定义动画 */
@keyframes square {
    0%{
        transform: scale(0) rotateY(0deg);
        opacity: 1;
    }
    100%{
        transform: scale(5) rotateY(1000deg);
        opacity: 0;
    }
}
@keyframes circle {
    0%{
        transform: scale(0) rotateY(0deg);
        opacity: 1;
        bottom: 0;
        border-radius: 0;
    }
    100%{
        transform: scale(5) rotateY(1000deg);
        opacity: 0;
        bottom: 90vh;
        border-radius: 50%;
    }
}
`

export const LoginForm = styled.div`
  position: relative;
	width: 380px;
	height: 420px;
	background: rgba(40, 41, 45);
	border-radius: 8px;
	overflow: hidden;
  &::before{
  content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg,transparent,#F5C910,#F5C910);
	animation: animate 6s linear infinite;
  }
  &::after{
    content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg,transparent,#F5C910,#F5C910);
	animation: animate 6s linear infinite;
	animation-delay: -3s;
  }
  @keyframes animate 
{
	0%
	{
		transform: rotate(0deg);
	}
	100%
	{
		transform: rotate(360deg);
	}
}

`

export const BackDoor = styled.div`
   color: #45f3ff;
	font-weight: 500;
	text-align: center;
	letter-spacing: 0.1em;
`

export const LogingForm = styled.div`
	position: absolute;
	inset: 2px;
  background-color: rgba(40, 41, 45);
	padding: 50px 40px;
	border-radius: 8px;
	z-index: 2;
	display: flex;
	flex-direction: column;

  input[type="submit"]{
    border: none;
	outline: none;
	padding: 5px 25px;
	background: #45f3ff;
	cursor: pointer;
	border-radius: 4px;
	font-weight: 600;
	width: 100px;
	margin-top: 20px;
}
input[type="submit"]:active 
{
	opacity: 0.8;
}
`
export const InputBox = styled.div`
	position: relative;
	width: 300px;
	margin-top: 35px;
  & input:valid ~ span,
  & input:focus ~ span{
    color: #45f3ff;
	transform: translateX(0px) translateY(-34px);
	font-size: 0.75em;
  }

  i{
    position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 2px;
	background: #45f3ff;
	border-radius: 4px;
	overflow: hidden;
	transition: 0.5s;
	pointer-events: none;
	z-index: 9;
  }
  & input:valid ~ i,
  & input:focus ~ i{
    height: 44px;
  }


  input{
  position: relative;
	width: 100%;
	padding: 20px 10px 10px;
	background: transparent;
	outline: none;
	box-shadow: none;
	border: none;
	color: #23242a;
	font-size: 1em;
	letter-spacing: 0.05em;
	transition: 0.5s;
	z-index: 10;
  }
  span{
    position: absolute;
	left: 0;
	padding: 20px 0px 10px;
	pointer-events: none;
	font-size: 1em;
	color: #8f8f8f;
	letter-spacing: 0.05em;
	transition: 0.5s;
  }
`

export const Log = styled.div`
  background-image: url('${require('../../assets/imgs/wipcb-logo.png')}');
  width: 100% ;
  height: 104px;
  background-repeat: no-repeat;
  background-size: contain;
`