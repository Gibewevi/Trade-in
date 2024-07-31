'use client'
import { withFormik } from "formik";
import * as Yup from 'yup';

function BillingForm(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    return (
        <form>
            <div className="flex flex-col gap-y-4 ml-5">

                <span className="text-xl text-slate-800">Billing</span>


                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="email"
                        name="email"
                        type="text"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Email*
                    </label>
                </div>



                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={props.values.fullName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="fullName"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        full Name*
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingAddressLine1"
                        name="billingAddressLine1"
                        type="text"
                        value={props.values.billingAddressLine1}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingAddressLine1"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Address line 1*
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingAddressLine2"
                        name="billingAddressLine2"
                        type="text"
                        value={props.values.billingAddressLine2}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingAddressLine2"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Address line 2
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingCity"
                        name="billingCity"
                        type="text"
                        value={props.values.billingCity}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingCity"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        City*
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingState"
                        name="billingState"
                        type="text"
                        value={props.values.billingState}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingState"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        State / Province
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingPostalCode"
                        name="billingPostalCode"
                        type="text"
                        value={props.values.billingPostalCode}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingPostalCode"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Zip / Postal Code*
                    </label>
                </div>

                <div className="relative flex flex-row justify-center items-center h-[80px] w-full min-w-[200px]  rounded-xl p-2">
                    <input
                        className="flex-1 pl-[200px] h-full text-slate-800 text-[1.1em] p-3 bg-slate-50 focus:outline-none focus:ring-[0.1em] focus:ring-[#705DF2] focus:ring-offset-2 focus:ring-offset-slate-50 focus:shadow-xl rounded-xl placeholder-transparent"
                        placeholder=" "
                        id="billingCountry"
                        name="billingCountry"
                        type="text"
                        value={props.values.billingCountry}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoComplete="username"
                    />
                    <label
                        htmlFor="billingCountry"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800"
                    >
                        Country*
                    </label>
                </div>

                <button type='submit' onClick={props.handleSubmit} className="flex justify-center items-center t-6 p-3 bg-[#8b7bf3] hover:bg-[#705DF2] w-[100px] h-[40px] rounded-lg font-bold text-white text-sm hover:text-slate-100 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Modify
                </button>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: props => ({
        userId: props.billingData.userId || "",
        email: props.billingData.email || "",
        fullName: props.billingData.fullName || "",
        billingAddressLine1: props.billingData.billingAddressLine1 || "",
        billingAddressLine2: props.billingData.billingAddressLine2 || "",
        billingCity: props.billingData.billingCity || "",
        billingState: props.billingData.billingState || "",
        billingPostalCode: props.billingData.billingPostalCode || "",
        billingCountry: props.billingData.billingCountry || "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Veuillez entrer une adresse email valide.")
            .required("L'email est obligatoire.")
            .max(100, "L'email ne doit pas dépasser 100 caractères."),
        fullName: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s'-]*$/, "Le nom complet ne doit contenir que des lettres, espaces, apostrophes ou tirets.")
            .min(2, "Le nom complet doit contenir au moins 2 caractères.")
            .max(50, "Le nom complet ne doit pas dépasser 50 caractères.")
            .required("Le nom complet est obligatoire."),
        billingAddressLine1: Yup.string()
            .min(5, "L'adresse doit contenir au moins 5 caractères.")
            .max(100, "L'adresse ne doit pas dépasser 100 caractères.")
            .required("L'adresse ligne 1 est obligatoire."),
        billingCity: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s'-]*$/, "La ville ne doit contenir que des lettres, espaces, apostrophes ou tirets.")
            .min(2, "La ville doit contenir au moins 2 caractères.")
            .max(50, "La ville ne doit pas dépasser 50 caractères.")
            .required("La ville est obligatoire."),
        billingPostalCode: Yup.string()
            .matches(/^[a-zA-Z0-9\s-]*$/, "Le code postal contient des caractères invalides.")
            .min(2, "Le code postal doit contenir au moins 2 caractères.")
            .max(20, "Le code postal ne doit pas dépasser 20 caractères.")
            .required("Le code postal est obligatoire."),
        billingCountry: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s'-]*$/, "Le pays ne doit contenir que des lettres, espaces, apostrophes ou tirets.")
            .min(2, "Le pays doit contenir au moins 2 caractères.")
            .max(50, "Le pays ne doit pas dépasser 50 caractères.")
            .required("Le pays est obligatoire."),
    }),

    handleSubmit: (values, { props }) => {
        const billing = {
            userId: values.userId,
            email: values.email,
            fullName: values.fullName,
            billingAddressLine1: values.billingAddressLine1,
            billingAddressLine2: values.billingAddressLine2,
            billingCity: values.billingCity,
            billingState: values.billingState,
            billingPostalCode: values.billingPostalCode,
            billingCountry: values.billingCountry,
        }
        console.log('billing', billing);
        props.handleModifyBillingForm(billing);
    }
})(BillingForm);