export default function Button({ type, children, click, className }) {
  return (
    <button type={type} className={`px-4 py-2.5 rounded-lg border cursor-pointer ${className}`} onClick={click}>{children}</button>
  )
}