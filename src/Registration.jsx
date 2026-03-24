import { useForm } from "react-hook-form";

const Registration = ({
  onSubmitRegistration,
  loadingRegistration,
  success,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleOnSubmit = (data) => {
    onSubmitRegistration(data, setError,reset);
  };

  return (
    <>
      {errors.root && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errors.root.message}
        </div>
      )}
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label htmlFor="username">name</label>
          <input
            id="username"
            {...register("username", {
              required: "Обязательное поле для ввода",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            {...register("email", {
              required: "Обязательное поле для ввода",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
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
        <div>
          <label htmlFor="gender">gender</label>
          <input
            id="gender"
            {...register("gender", {
              required: "Обязательное поле для ввода",
            })}
          />
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input
            id="age"
            {...register("age", {
              required: "Обязательное поле для ввода",
            })}
          />
          {errors.username && <p>{errors.age.message}</p>}
        </div>
        <button type="submit" disabled={loadingRegistration}>
          Зарегистрироваться
        </button>
        {loadingRegistration && <div className="spinner"></div>}
      </form>
      {success && <div>{success}</div>}
    </>
  );
};
export default Registration;
