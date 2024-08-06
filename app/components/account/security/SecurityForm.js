'use client'
import { withFormik } from "formik";
import * as Yup from 'yup';
import AlertComponent from "../../AlertComponent";

function SecurityForm(props) {
    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4 ml-5 p-3">

                <span className="text-xl text-slate-800">Security</span>
                <span className="text-md font-bold text-slate-800">Password</span>

                <div className="relative flex flex-row justify-center items-center h-[65px] w-full min-w-[200px] rounded-xl">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                    />
                    <label
                        htmlFor="oldPassword"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Old password*
                    </label>
                </div>
                {touched.oldPassword && errors.oldPassword && <div className="text-red-600 text-sm">
                    <AlertComponent text={errors.oldPassword} gradient="from-red-400 to-red-700" height={'50'} />
                </div>}

                <span className="text-sm text-slate-800">
                    La longueur du nouveau mot de passe doit être d'au moins <span className="font-bold text-[#705DF2]">8 caractères</span>, contenant au moins une <span className="font-bold text-[#705DF2]">minuscule</span>, une <span className="font-bold text-[#705DF2]">majuscule</span>, un <span className="font-bold text-[#705DF2]">chiffre</span> et un <span className="font-bold text-[#705DF2]">caractère spécial</span>
                </span>


                <div className="relative flex flex-row justify-center items-center h-[65px] w-full min-w-[200px] rounded-xl">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="new-password"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Password*
                    </label>
                </div>
                {touched.password && errors.password && <div className="text-red-600 text-sm">
                    <AlertComponent text={errors.password} gradient="from-red-400 to-red-700" height={'50'} />
                </div>}

                <div className="relative flex flex-row justify-center items-center h-[65px] w-full min-w-[200px] rounded-xl">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="new-password"
                    />
                    <label
                        htmlFor="confirmPassword"
                        className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Password confirmation*
                    </label>
                </div>
                {touched.confirmPassword && errors.confirmPassword && <div className="text-red-600 text-sm">
                    <AlertComponent text={errors.confirmPassword} gradient="from-red-400 to-red-700" height={'50'} />
                </div>}

                <button type='submit' onClick={props.handleSubmit} className="flex justify-center items-center t-6 p-3 bg-[#8b7bf3] hover:bg-[#705DF2] w-[100px] h-[65px] rounded-lg font-bold text-white text-sm hover:text-slate-100 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Submit
                </button>

            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    }),
    validationSchema: Yup.object().shape({
        // oldPassword: Yup.string()
        //     .required('Ancien mot de passe est requis'),
        // password: Yup.string()
        //     .required('Mot de passe est requis')
        //     .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        //     .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
        //     .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        //     .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
        //     .matches(/[@$!%*?&#]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
        // confirmPassword: Yup.string()
        //     .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        //     .required('Confirmation du mot de passe est requise')
    }),
    handleSubmit: (values, { props }) => {
        props.handleUpdatePassword(values.oldPassword,values.password );
    }
})(SecurityForm);
