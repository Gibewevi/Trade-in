'use client'
import { withFormik } from "formik";
import * as Yup from 'yup';

function BillingForm(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    return (
        <form>
            <div className="flex flex-col gap-y-4 ml-5">

                <span className="text-xl text-slate-800">Billing</span>
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
                            Email*
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={props.values.fullName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            full Name*
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingAddressLine1"
                            name="billingAddressLine1"
                            type="text"
                            value={props.values.billingAddressLine1}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Address line 1*
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingAddressLine2"
                            name="billingAddressLine2"
                            type="text"
                            value={props.values.billingAddressLine2}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Address line 2
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingCity"
                            name="billingCity"
                            type="text"
                            value={props.values.billingCity}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            City
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingState"
                            name="billingState"
                            type="text"
                            value={props.values.billingState}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            State / Province
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingPostalCode"
                            name="billingPostalCode"
                            type="text"
                            value={props.values.billingPostalCode}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Zip / Postal Code*
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative h-[50px] w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border-solid border-slate-300 bg-slate-100 px-3 py-2.5 font-sans text-sm font-normal text-slate-800 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id="billingCountry"
                            name="billingCountry"
                            type="text"
                            value={props.values.billingCountry}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            autoComplete="username"
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Country*
                        </label>
                    </div>
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
        email: props.billingData.email || "",
        fullName: props.billingData.fullName || "",
        billingAddressLine1: props.billingData.billingAddressLine1 || "",
        billingAddressLine2: props.billingData.billingAddressLine2 || "",
        billingCity: props.billingData.billingCity || "",
        billingState:  props.billingData.billingState || "",
        billingPostalCode: props.billingData.billingPostalCode || "",
        billingCountry: props.billingData.billingCountry || "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("")
    }),
    handleSubmit: (values, { props }) => {
        const billing = {
            email: values.email,
            fullName: values.fullName,
            billingAddressLine1: values.billingAddressLine1,
            billingAddressLine2: values.billingAddressLine2,
            billingCity: values.billingCity,
            billingState: values.billingState,
            billingPostalCode: values.billingPostalCode,
            billingCountry: values.billingCountry,
        }
        console.log('billing',billing);
        props.handleLogin(billing);
    }
})(BillingForm);