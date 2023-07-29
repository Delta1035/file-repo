
const useLoginLogoutHook = () => {


  function whenLoginSucces (_username,) {
    // setUserName(_username);
    // setLogingWay(loginway);
    // localStorage.setItem('loginway', loginway);
    localStorage.setItem('username', _username)
  }

  function whenLoginFail () {
    localStorage.clear();
  }

  function whenLogout () {
    localStorage.clear();
    // window.location.reload();
  }

  return { whenLoginSucces, whenLoginFail, whenLogout };
};

export default useLoginLogoutHook;
