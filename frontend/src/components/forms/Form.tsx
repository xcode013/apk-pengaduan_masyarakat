interface FormProps {
  children: React.ReactNode;
  headline: string;
}

function Form({children, headline}: FormProps) {
  return (
    <div className="container-form fixed bg-black/30 w-full h-screen left-0 flex justify-center items-center rounded">
      <div className="content bg-white w-96">
        <header className="bg-emerald-600 text-white font-bold p-2 flex justify-center items-center">
          <h1 className="text-2xl font-sans">{headline}</h1>
        </header>
        <form className="flex flex-col gap-3 ">{children}</form>
      </div>
    </div>
  );
}

export default Form;

interface FieldProps {
  label: string;
  inputType: React.HTMLInputTypeAttribute;
  id: string;
}

export const Field = ({label, inputType, id}: FieldProps) => {
  return (
    <label htmlFor={id} className="field">
      <h4 className="label-field">{label}</h4>
      <input type={inputType} id={id} className="input-field" />
    </label>
  );
};
