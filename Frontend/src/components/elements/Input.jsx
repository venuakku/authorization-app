
function Input({type, placeholder, value, onFocus, onBlur, onChange}) {
  return (
    <div>
        <input className="outline outline-blue-950 focus:outline-2 outline-1 rounded-md p-3 ml-0 h-15 w-80 text-lg" type={type} placeholder={placeholder} value={value} onFocus={onFocus} onBlur={onBlur} onChange={(e) => {onChange(e)}} />
    </div>
  )
}

export default Input