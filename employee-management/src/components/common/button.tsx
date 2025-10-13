interface IButtonProps {
  color: ButtonColor;
  label: string;
  type: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonColor = 'blue' | 'red' | 'green'| 'gray';

const colorClasses: Record<ButtonColor, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  red: 'bg-red-600 hover:bg-red-700',
  green: 'bg-green-600 hover:bg-green-700',
  gray: 'bg-gray-600 hover:bg-gray-700',
}

const Button = (props : IButtonProps) =>{

const { color, label, type, disabled, onClick } = props;

 return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled ?? false}
      className={`${colorClasses[color]} text-white px-4 py-2 rounded cursor-pointer`}>
      {label}
    </button>
  );
}

export default Button;