
import '../InputContainer/InputContainer.css'

export default function InputContainer({ label, bgColor, children }) {
  return (
    <div className='container' style={{ backgroundColor: bgColor }}>
      <label className='label'>{label}</label>
      <div className='content'>{children}</div>
    </div>
  );
}