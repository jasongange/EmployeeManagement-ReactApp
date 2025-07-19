interface IInputProps {
  type: string;
  value: string| number;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props : IInputProps) =>{
  
const { type, value, name, label, onChange } = props;

 return (
  <>
   <label className="block text-sm font-medium">{label}</label>
   <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded"
        required
      />
  </>
  );
}

export default Input;