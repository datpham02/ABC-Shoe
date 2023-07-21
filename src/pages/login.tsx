import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../Components/Form/Login"), {
  ssr: false,
});

const Login = () => {
  return <LoginForm />;
};

export default Login;
