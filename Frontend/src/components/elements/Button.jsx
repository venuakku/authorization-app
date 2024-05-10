
function Button({text, onClick}) {
  return (
    <div>
        <button onClick={onClick} className='bg-blue-950 hover:bg-blue-900 active:bg-blue-950 font-semibold text-white rounded-3xl p-3 h-15 w-80 my-4 mt-7'>{text}</button>
    </div>
  )
}

export default Button