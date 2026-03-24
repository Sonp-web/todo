import { useForm } from "react-hook-form";

const Login = ({ loadingLogin, onSubmitLogin }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = (data) => {
    onSubmitLogin(data, setError);
  };
  return (
    <>
      {errors.root && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errors.root.message}
        </div>
      )}
      <h2>Логин</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label htmlFor="email">email</label>
          <input
            name="email"
            {...register("email", {
              required: "Обязательное поле для ввода",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный email",
              },
            })}
          />{" "}
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            name="password"
            {...register("password", {
              required: "Обязательное поле для ввода",
              minLength: {
                value: 6,
                message: "Слишком короткий пароль",
              },
              pattern: {
                value: /[A-Z]/,
                message: "Должна быть хотя бы одна заглавная буква",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={loadingLogin}>
          Логин
        </button>
        {loadingLogin && <div className="spinner"></div>}
      </form>
    </>
  );
};

export default Login;
