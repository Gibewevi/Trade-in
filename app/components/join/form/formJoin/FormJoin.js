import EmailInput from "./EmailInput";
import PricingOption from "./PricingOption";
import TermsAndConditions from "./TermsAndConditions";
import { withFormik } from "formik";
import * as Yup from 'yup';

function FormJoin(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    console.log('formJoin');
    return (
        <form>
            <div className="flex flex-col w-full gap-y-8 bg-slate-100 p-[20px]">
                <EmailInput props={props}/>
                <PricingOption />
                <TermsAndConditions props={props}/>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        email: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("")
    }),
    handleSubmit: (values, { props }) => {
        props.handleJoin(values.email);
    }
})(FormJoin);
