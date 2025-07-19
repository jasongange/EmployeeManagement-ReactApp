interface Option {
  id: string;
  name: string;
}

interface ISelectInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label: string;
}

const SelectInput = (props : ISelectInputProps) =>{

const { name, value, onChange, options, label } = props;

  return (
    <>
      <label className="block text-sm font-medium">{label}</label>
        <select
          name={name}
          className="mt-1 p-2 w-full border rounded"
          value={value}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </>
  );
};

export default SelectInput;
