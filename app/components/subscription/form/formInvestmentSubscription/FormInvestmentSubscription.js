import Subscription from "./InvestmentSubscription";
import Checkout from "../formCheckout/Checkout";
import PaymentSucceeded from "../paymentSucceeded/PaymentSucceeded";
import { withFormik } from "formik";
import * as Yup from 'yup';
import Link from "next/link";

function FormInvestmentSuscription({ handleJoin, stepJoin, handleSetStepJoin, email, values, touched, errors, handleChange, handleBlur, handleSubmit }) {
    return (
        <div className="flex flex-col w-[400px] min-h-[650px] shadow-xl bg-slate-100 rounded-xl p-7 gap-y-9">
            <div className="flex flex-col w-full">
                <span className="text-sm text-slate-700 font-black">BITLEARN*</span>
                <span className="text-xl text-slate-700 font-black">INVESTISSEMENT</span>
            </div>
            {stepJoin === 'join' ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-9">
                        <div className="w-full flex flex-col gap-y-0 border-b border-gray-500 pb-5">
                            <span className="text-6xl text-slate-700 font-black">249$</span>
                            <span className="text-md text-slate-700 font-bold">one time investment</span>
                        </div>
                        <div className="flex flex-col gap-y-3 p-2">
                            <div className="flex flex-row items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                                <span className="text-slate-800"> Formation de base</span>
                            </div>
                            <div className="flex flex-row items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                                <span className="text-slate-800"> Accompagnement régulier</span>
                            </div>
                            <div className="flex flex-row items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                                <span className="text-slate-800"> Accès discord privé</span>
                            </div>
                            <div className="flex flex-row items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                                <span className="text-slate-800"> Outils de backtesting (à venir)</span>
                            </div>
                            <div className="flex flex-row items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                                <span className="text-slate-800"> Journal de trading (à venir)</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <div className="flex flex-row gap-x-5 items-center justify-center p-3 w-full h-[50px] bg-slate-200 rounded-xl">
                                <label className="text-slate-700 font-semibold w-[150px]">Email*</label>
                                <input
                                    className="w-full h-full bg-slate-200 text-slate-700"
                                    placeholder="email@domain.com"
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}
                        </div>
                        <Link href="/checkout">
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className="bg-slate-800 w-full text-slate-100 font-black rounded-xl h-[50px] text-lg"
                            >
                                Suivant
                            </button>
                        </Link>
                    </div>
                </form>
            ) : stepJoin === 'checkout' ? (
                <Checkout email={email} handleSetStepJoin={handleSetStepJoin}/>
            ) : stepJoin === 'PaymentSucceeded' ? (
                <PaymentSucceeded />
            ) : null}
        </div>
    );
}

export default withFormik({
    mapPropsToValues: () => ({
        email: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Adresse e-mail invalide.")
            .required("L'adresse e-mail est obligatoire.")
    }),
    handleSubmit: (values, { props }) => {
        props.handleJoin(values.email);
    }
})(FormInvestmentSuscription);
