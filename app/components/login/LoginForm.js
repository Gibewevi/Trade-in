'use client'
import { withFormik } from "formik";
import * as Yup from 'yup';

function LoginForm(props) {
    const { values, touched, errors, handleChange, handleBlur, setForm } = props;
    return (
        <form>
            <div className="flex-1 flex flex-col gap-y-8">
                <div className="flex flex-col w-full">

                    <span className="text-xl text-slate-700 font-black">LOGIN*</span>
                </div>


                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="email"
                            name="email"
                            type="text"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email
                        </label>
                    </div>
                </div>


                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="password"
                            type="password"
                            name="password"
                            value={props.values.password}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="new-password"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">
                    <span onClick={() => setForm('forgotPassword')} className="underline underline-offset-1 text-slate-600 text-sm cursor-pointer">Vous avez oublié votre mot de passe ?</span>

                </div>
                <div className="flex items-center justify-center w-full">
                    <span className="text-red-600 text-sm">{props.errorLogin}</span>
                </div>

                <div className="w-full flex justify-end">
                    <button
                        type='submit'
                        onClick={props.handleSubmit}
                        className="flex justify-center items-center p-3 w-[120px] bg-[#8b7bf3] hover:bg-[#705DF2] h-[50px] rounded-xl font-bold text-lg text-white hover:text-slate-100 transition duration-300 ease-in-out text-center"
                    >
                        Login
                    </button>
                </div>

            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("")
    }),
    handleSubmit: (values, { props }) => {
        const credentials = {
            email: values.email,
            password: values.password
        }
        console.log('credentials', credentials);
        props.handleLogin(credentials);
    }
})(LoginForm);