export default function EmailInput({props}) {
    return (
        <div className="flex flex-row gap-x-5 items-center justify-center p-3 w-full h-[80px] bg-slate-200 rounded-2xl">
            <label className="text-slate-700 font-semibold w-[150px]">Email*</label>
            <input  className="w-full h-full bg-slate-200" placeholder="email@domain.com" 
            id="email"
            name="email" 
            type="text" 
            value={props.values.email} 
            onChange={props.handleChange} 
            onBlur={props.handleBlur} />
        </div>
    );
}
